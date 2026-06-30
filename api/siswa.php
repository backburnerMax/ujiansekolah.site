<?php
// api/siswa.php
require_once __DIR__ . '/config/db.php';

// Ensure user is logged in as a student (siswa)
$currentUser = checkRole(['siswa']);

$input = getJsonInput();
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'list_exams':
        // Fetch all exams and join with user's attempts to see if they have taken them
        $stmt = $pdo->prepare("
            SELECT e.*, 
                   (SELECT COUNT(q.id) FROM questions q WHERE q.exam_id = e.id) as question_count,
                   (SELECT MAX(a.score) FROM attempts a WHERE a.exam_id = e.id AND a.student_id = ?) as highest_score,
                   (SELECT COUNT(a.id) FROM attempts a WHERE a.exam_id = e.id AND a.student_id = ?) as attempt_count
            FROM exams e
            ORDER BY e.created_at ASC
        ");
        $stmt->execute([$currentUser['id'], $currentUser['id']]);
        sendResponse($stmt->fetchAll());
        break;

    case 'get_exam_questions':
        $examId = $_GET['exam_id'] ?? '';
        if (empty($examId)) {
            sendResponse(["error" => "Exam ID required."], 400);
        }

        // Fetch exam metadata
        $stmtExam = $pdo->prepare("SELECT * FROM exams WHERE id = ?");
        $stmtExam->execute([$examId]);
        $exam = $stmtExam->fetch();
        if (!$exam) {
            sendResponse(["error" => "Ujian tidak ditemukan."], 404);
        }

        // Fetch questions but DO NOT select correct_option and hint to prevent cheating
        $stmt = $pdo->prepare("
            SELECT id, exam_id, nomor, bagian, tingkat, pertanyaan, option_a, option_b, option_c, option_d, option_e 
            FROM questions 
            WHERE exam_id = ? 
            ORDER BY nomor ASC
        ");
        $stmt->execute([$examId]);
        $questions = $stmt->fetchAll();

        sendResponse([
            "exam" => $exam,
            "questions" => $questions
        ]);
        break;

    case 'submit_exam':
        $examId = $input['exam_id'] ?? '';
        $answers = $input['answers'] ?? []; // format: [question_id => selected_option]
        $cheatingAttempts = $input['cheating_attempts'] ?? 0;

        if (empty($examId)) {
            sendResponse(["error" => "Exam ID required."], 400);
        }

        // Fetch exam details
        $stmtExam = $pdo->prepare("SELECT id FROM exams WHERE id = ?");
        $stmtExam->execute([$examId]);
        if (!$stmtExam->fetch()) {
            sendResponse(["error" => "Ujian tidak ditemukan."], 404);
        }

        // Fetch all correct answers for this exam
        $stmtQuestions = $pdo->prepare("SELECT id, correct_option, hint, pertanyaan, option_a, option_b, option_c, option_d, option_e, nomor FROM questions WHERE exam_id = ? ORDER BY nomor ASC");
        $stmtQuestions->execute([$examId]);
        $questions = $stmtQuestions->fetchAll();

        $totalQuestions = count($questions);
        if ($totalQuestions === 0) {
            sendResponse(["error" => "Ujian ini tidak memiliki pertanyaan."], 400);
        }

        $correctAnswers = 0;
        $review = [];

        foreach ($questions as $q) {
            $questionId = $q['id'];
            $selected = $answers[$questionId] ?? '';
            $isCorrect = (strtoupper($selected) === strtoupper($q['correct_option']));
            if ($isCorrect) {
                $correctAnswers++;
            }

            // Prepare review payload (showing details only after submit is done)
            $review[] = [
                "id" => $q['id'],
                "nomor" => $q['nomor'],
                "pertanyaan" => $q['pertanyaan'],
                "option_a" => $q['option_a'],
                "option_b" => $q['option_b'],
                "option_c" => $q['option_c'],
                "option_d" => $q['option_d'],
                "option_e" => $q['option_e'],
                "selected" => $selected,
                "correct_option" => $q['correct_option'],
                "is_correct" => $isCorrect,
                "hint" => $q['hint']
            ];
        }

        // Calculate score out of 100
        $score = ($correctAnswers / $totalQuestions) * 100;
        $score = round($score, 2);

        $durationSeconds = isset($input['duration_seconds']) ? intval($input['duration_seconds']) : 0;

        // Record the attempt
        $stmtInsert = $pdo->prepare("
            INSERT INTO attempts (student_id, exam_id, score, total_questions, correct_answers, cheating_attempts, duration_seconds) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmtInsert->execute([
            $currentUser['id'],
            $examId,
            $score,
            $totalQuestions,
            $correctAnswers,
            $cheatingAttempts,
            $durationSeconds
        ]);

        $attemptId = $pdo->lastInsertId();

        sendResponse([
            "message" => "Ujian berhasil diselesaikan.",
            "attempt_id" => $attemptId,
            "score" => $score,
            "total_questions" => $totalQuestions,
            "correct_answers" => $correctAnswers,
            "cheating_attempts" => $cheatingAttempts,
            "review" => $review
        ]);
        break;

    case 'history':
        // Fetch student's attempt logs
        $stmt = $pdo->prepare("
            SELECT a.id, e.title, e.difficulty_level, a.score, a.total_questions, a.correct_answers, a.cheating_attempts, a.completed_at
            FROM attempts a
            JOIN exams e ON a.exam_id = e.id
            WHERE a.student_id = ?
            ORDER BY a.completed_at DESC
        ");
        $stmt->execute([$currentUser['id']]);
        sendResponse($stmt->fetchAll());
        break;

    default:
        sendResponse(["error" => "Aksi tidak valid."], 400);
        break;
}

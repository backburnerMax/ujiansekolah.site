<?php
// api/guru.php
require_once __DIR__ . '/config/db.php';

// Ensure user is logged in as a teacher (guru)
$currentUser = checkRole(['guru']);

$input = getJsonInput();
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'stats':
        // 1. Overall average score across all attempts
        $stmtAvgAll = $pdo->query("SELECT AVG(score) as overall_avg FROM attempts");
        $overallAvg = $stmtAvgAll->fetch()['overall_avg'] ?? 0.00;

        // 2. Average score based on difficulty level
        $stmtAvgDiff = $pdo->query("
            SELECT e.difficulty_level, AVG(a.score) as avg_score 
            FROM attempts a 
            JOIN exams e ON a.exam_id = e.id 
            GROUP BY e.difficulty_level
        ");
        $avgDifficulty = $stmtAvgDiff->fetchAll();

        // 3. Average score per student
        $stmtAvgStudent = $pdo->query("
            SELECT u.nama_lengkap, u.nisn, u.kelas, AVG(a.score) as avg_score, COUNT(a.id) as total_completed
            FROM users u 
            JOIN attempts a ON u.id = a.student_id 
            GROUP BY u.id
        ");
        $avgStudents = $stmtAvgStudent->fetchAll();

        // 4. Students who have completed exams (distinct)
        $stmtCompleted = $pdo->query("
            SELECT DISTINCT u.id, u.nama_lengkap, u.nisn, u.kelas, u.email, u.nomor_telepon 
            FROM users u 
            JOIN attempts a ON u.id = a.student_id
        ");
        $completedStudents = $stmtCompleted->fetchAll();

        // 5. Score ranges distribution for dashboard charts (0-50, 51-70, 71-85, 86-100)
        $stmtDistribution = $pdo->query("
            SELECT 
                SUM(CASE WHEN score < 60 THEN 1 ELSE 0 END) as low,
                SUM(CASE WHEN score >= 60 AND score < 80 THEN 1 ELSE 0 END) as mid,
                SUM(CASE WHEN score >= 80 THEN 1 ELSE 0 END) as high,
                COUNT(id) as total
            FROM attempts
        ");
        $distribution = $stmtDistribution->fetch();

        // 6. Fastest attempts (leaderboard)
        $stmtFastest = $pdo->query("
            SELECT a.id, u.nama_lengkap, u.nisn, u.kelas, e.title, e.difficulty_level, a.score, a.duration_seconds, a.completed_at
            FROM attempts a
            JOIN users u ON a.student_id = u.id
            JOIN exams e ON a.exam_id = e.id
            WHERE a.duration_seconds > 0
            ORDER BY a.duration_seconds ASC
            LIMIT 5
        ");
        $fastestAttempts = $stmtFastest->fetchAll();

        // 7. Best attempts (leaderboard)
        $stmtBest = $pdo->query("
            SELECT a.id, u.nama_lengkap, u.nisn, u.kelas, e.title, e.difficulty_level, a.score, a.duration_seconds, a.completed_at
            FROM attempts a
            JOIN users u ON a.student_id = u.id
            JOIN exams e ON a.exam_id = e.id
            ORDER BY a.score DESC, a.duration_seconds ASC
            LIMIT 5
        ");
        $bestAttempts = $stmtBest->fetchAll();

        sendResponse([
            "overall_average" => round($overallAvg, 2),
            "difficulty_averages" => array_map(function($row) {
                return [
                    "difficulty" => $row['difficulty_level'],
                    "avg_score" => round($row['avg_score'], 2)
                ];
            }, $avgDifficulty),
            "student_averages" => array_map(function($row) {
                return [
                    "name" => $row['nama_lengkap'],
                    "nisn" => $row['nisn'],
                    "kelas" => $row['kelas'],
                    "avg_score" => round($row['avg_score'], 2),
                    "completed" => $row['total_completed']
                ];
            }, $avgStudents),
            "completed_students" => $completedStudents,
            "score_distribution" => [
                "kurang" => (int)($distribution['low'] ?? 0),
                "cukup" => (int)($distribution['mid'] ?? 0),
                "baik" => (int)($distribution['high'] ?? 0)
            ],
            "fastest_attempts" => array_map(function($row) {
                return [
                    "id" => $row['id'],
                    "name" => $row['nama_lengkap'],
                    "nisn" => $row['nisn'],
                    "kelas" => $row['kelas'],
                    "title" => $row['title'],
                    "difficulty" => $row['difficulty_level'],
                    "score" => $row['score'],
                    "duration_seconds" => (int)$row['duration_seconds'],
                    "completed_at" => $row['completed_at']
                ];
            }, $fastestAttempts),
            "best_attempts" => array_map(function($row) {
                return [
                    "id" => $row['id'],
                    "name" => $row['nama_lengkap'],
                    "nisn" => $row['nisn'],
                    "kelas" => $row['kelas'],
                    "title" => $row['title'],
                    "difficulty" => $row['difficulty_level'],
                    "score" => $row['score'],
                    "duration_seconds" => (int)$row['duration_seconds'],
                    "completed_at" => $row['completed_at']
                ];
            }, $bestAttempts),
        ]);
        break;

    case 'scores_list':
        // Detailed score list for every single attempt including duration_seconds
        $stmt = $pdo->query("
            SELECT a.id, u.nama_lengkap, u.nisn, u.kelas, e.title, e.difficulty_level, a.score, a.total_questions, a.correct_answers, a.cheating_attempts, a.completed_at, a.duration_seconds
            FROM attempts a
            JOIN users u ON a.student_id = u.id
            JOIN exams e ON a.exam_id = e.id
            ORDER BY a.completed_at DESC
        ");
        $scores = $stmt->fetchAll();
        sendResponse($scores);
        break;

    case 'list_exams':
        $stmt = $pdo->query("SELECT id, title, subject, difficulty_level, duration_minutes, created_at, (SELECT COUNT(id) FROM questions q WHERE q.exam_id = exams.id) as question_count FROM exams ORDER BY created_at DESC");
        sendResponse($stmt->fetchAll());
        break;

    case 'list_questions':
        $examId = $_GET['exam_id'] ?? '';
        if (empty($examId)) {
            sendResponse(["error" => "Exam ID required."], 400);
        }
        $stmt = $pdo->prepare("SELECT * FROM questions WHERE exam_id = ? ORDER BY nomor ASC");
        $stmt->execute([$examId]);
        sendResponse($stmt->fetchAll());
        break;

    case 'create_question':
        $examId = $input['exam_id'] ?? '';
        $bagian = $input['bagian'] ?? 'Dasar Listrik';
        $pertanyaan = $input['pertanyaan'] ?? '';
        $option_a = $input['option_a'] ?? '';
        $option_b = $input['option_b'] ?? '';
        $option_c = $input['option_c'] ?? '';
        $option_d = $input['option_d'] ?? '';
        $option_e = $input['option_e'] ?? '';
        $correct_option = $input['correct_option'] ?? '';
        $hint = $input['hint'] ?? '';

        if (empty($examId) || empty($pertanyaan) || empty($option_a) || empty($option_b) || empty($option_c) || empty($option_d) || empty($option_e) || empty($correct_option)) {
            sendResponse(["error" => "Semua kolom pertanyaan dan pilihan wajib diisi."], 400);
        }

        // Get exam difficulty to set question tingkat
        $stmtExam = $pdo->prepare("SELECT difficulty_level FROM exams WHERE id = ?");
        $stmtExam->execute([$examId]);
        $exam = $stmtExam->fetch();
        if (!$exam) {
            sendResponse(["error" => "Exam tidak ditemukan."], 404);
        }
        $tingkat = $exam['difficulty_level'];

        // Get max number
        $stmtNum = $pdo->prepare("SELECT MAX(nomor) as max_num FROM questions WHERE exam_id = ?");
        $stmtNum->execute([$examId]);
        $maxNum = $stmtNum->fetch()['max_num'] ?? 0;
        $nomor = $maxNum + 1;

        $stmt = $pdo->prepare("INSERT INTO questions (exam_id, nomor, bagian, tingkat, pertanyaan, option_a, option_b, option_c, option_d, option_e, correct_option, hint) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$examId, $nomor, $bagian, $tingkat, $pertanyaan, $option_a, $option_b, $option_c, $option_d, $option_e, $correct_option, $hint ?: null]);

        sendResponse(["message" => "Pertanyaan berhasil ditambahkan."]);
        break;

    case 'delete_question':
        $questionId = $input['id'] ?? null;
        if (!$questionId) {
            sendResponse(["error" => "ID Pertanyaan diperlukan."], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM questions WHERE id = ?");
        $stmt->execute([$questionId]);
        sendResponse(["message" => "Pertanyaan berhasil dihapus."]);
        break;

    default:
        sendResponse(["error" => "Aksi tidak valid."], 400);
        break;
}

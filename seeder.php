<?php
header('Content-Type: text/plain');

$isLocal = (
    php_sapi_name() === 'cli' || 
    (isset($_SERVER['HTTP_HOST']) && (
        $_SERVER['HTTP_HOST'] === 'localhost' || 
        $_SERVER['HTTP_HOST'] === '127.0.0.1' || 
        strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0
    ))
);

if ($isLocal) {
    $host = '127.0.0.1';
    $db   = 'ujian_sekolah';
    $user = 'root';
    $pass = '';
} else {
    $host = 'localhost';
    $db = 'u352605846_ujianSekolah';
    $user = 'u352605846_ujianSekolah';
    $pass = 'UjianSekolah2026';
}

try {
    if ($isLocal) {
        // Create database if not exists when running locally
        $pdoInit = new PDO("mysql:host=$host", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        $pdoInit->exec("CREATE DATABASE IF NOT EXISTS `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdoInit = null;
    }

    // Connect directly to the specific database
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo "Connected to MySQL server.\n";

    // 2. Read schema file
    $schemaFile = __DIR__ . '/schema.sql';
    if (!file_exists($schemaFile)) {
        throw new Exception("schema.sql not found at $schemaFile");
    }
    $schemaSql = file_get_contents($schemaFile);

    // 3. Execute Schema
    echo "Initializing database schema...\n";
    $pdo->exec($schemaSql);
    echo "Database schema initialized...\n";

    // Clear existing data to avoid duplicates on re-run
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
    $pdo->exec("TRUNCATE TABLE attempts;");
    $pdo->exec("TRUNCATE TABLE questions;");
    $pdo->exec("TRUNCATE TABLE exams;");
    $pdo->exec("TRUNCATE TABLE users;");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");
    echo "Cleared old table data.\n";

    // 4. Create default accounts
    echo "Creating user accounts...\n";
    
    // Passwords hashed using bcrypt
    $adminPassword = password_hash('admin123', PASSWORD_BCRYPT);
    $guruPassword = password_hash('guru123', PASSWORD_BCRYPT);
    $siswaPassword = password_hash('siswa123', PASSWORD_BCRYPT);

    // Super Admin
    $stmt = $pdo->prepare("INSERT INTO users (role, nama_lengkap, email, nomor_telepon, tanggal_lahir, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute(['super_admin', 'Administrator Utama', 'admin@sekolah.com', '08111111111', '1990-01-01', $adminPassword]);
    
    // Guru
    $stmtGuru = $pdo->prepare("INSERT INTO users (role, nama_lengkap, email, nomor_telepon, tanggal_lahir, password, nip_nik, guru_mapel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmtGuru->execute(['guru', 'Budi Santoso, S.Pd.', 'budi@sekolah.com', '081234567890', '1985-05-12', $guruPassword, '198505122010011002', 'Dasar Listrik & Instalasi Motor Listrik']);
    
    // Siswa
    $stmtSiswa = $pdo->prepare("INSERT INTO users (role, nama_lengkap, email, nomor_telepon, tanggal_lahir, password, nisn, username, kelas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmtSiswa->execute(['siswa', 'Andi Pratama', 'andi@sekolah.com', '089876543210', '2008-10-15', $siswaPassword, '99887766', 'siswa_andi', 'XII TITL 1']);

    echo "User accounts created successfully.\n";

    // 5. Create Exams
    echo "Creating exams...\n";
    $stmtExam = $pdo->prepare("INSERT INTO exams (title, subject, difficulty_level, duration_minutes) VALUES (?, ?, ?, ?)");
    
    $stmtExam->execute(['Ujian Dasar Listrik - Mudah', 'Dasar Listrik & Instalasi Motor Listrik', 'mudah', 30]);
    $examIdMudah = $pdo->lastInsertId();

    $stmtExam->execute(['Ujian Dasar Listrik - Sedang', 'Dasar Listrik & Instalasi Motor Listrik', 'sedang', 45]);
    $examIdSedang = $pdo->lastInsertId();

    $stmtExam->execute(['Ujian Dasar Listrik - Sulit', 'Dasar Listrik & Instalasi Motor Listrik', 'sulit', 60]);
    $examIdSulit = $pdo->lastInsertId();
    
    echo "Exams created successfully.\n";

    // 6. Read and insert questions from JSON
    $jsonFile = __DIR__ . '/bank_soal_CAT_listrik_SMK.json';
    if (!file_exists($jsonFile)) {
        throw new Exception("bank_soal_CAT_listrik_SMK.json not found at $jsonFile");
    }
    
    $jsonData = json_decode(file_get_contents($jsonFile), true);
    if (!$jsonData || !isset($jsonData['soal'])) {
        throw new Exception("Invalid JSON structure in $jsonFile");
    }

    echo "Importing questions into exams...\n";
    $stmtQuestion = $pdo->prepare("INSERT INTO questions (exam_id, nomor, bagian, tingkat, pertanyaan, option_a, option_b, option_c, option_d, option_e, correct_option, hint) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $countMudah = 0;
    $countSedang = 0;
    $countSulit = 0;

    foreach ($jsonData['soal'] as $item) {
        $examId = null;
        if ($item['tingkat'] === 'mudah') {
            $examId = $examIdMudah;
            $countMudah++;
        } elseif ($item['tingkat'] === 'sedang') {
            $examId = $examIdSedang;
            $countSedang++;
        } elseif ($item['tingkat'] === 'sulit') {
            $examId = $examIdSulit;
            $countSulit++;
        }

        if ($examId) {
            $stmtQuestion->execute([
                $examId,
                $item['nomor'],
                $item['bagian'],
                $item['tingkat'],
                $item['pertanyaan'],
                $item['pilihan']['A'] ?? '',
                $item['pilihan']['B'] ?? '',
                $item['pilihan']['C'] ?? '',
                $item['pilihan']['D'] ?? '',
                $item['pilihan']['E'] ?? '',
                $item['jawaban'],
                $item['hint'] ?? null
            ]);
        }
    }
    echo "Imported questions: Mudah ($countMudah), Sedang ($countSedang), Sulit ($countSulit). Total: " . ($countMudah + $countSedang + $countSulit) . "\n";

    echo "=== Seeding finished successfully ===\n";

} catch (Exception $e) {
    echo "Error during seeding: " . $e->getMessage() . "\n";
}

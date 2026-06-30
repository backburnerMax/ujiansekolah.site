<?php
// api/admin.php
require_once __DIR__ . '/config/db.php';

// Ensure user is logged in as super_admin
$currentUser = checkRole(['super_admin']);

$input = getJsonInput();
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'list_users':
        $stmt = $pdo->query("SELECT id, role, nama_lengkap, email, nomor_telepon, tanggal_lahir, nip_nik, guru_mapel, nisn, username, kelas, created_at FROM users ORDER BY created_at DESC");
        $users = $stmt->fetchAll();
        sendResponse($users);
        break;

    case 'create_user':
        $role = $input['role'] ?? '';
        $nama_lengkap = $input['nama_lengkap'] ?? '';
        $email = $input['email'] ?? '';
        $nomor_telepon = $input['nomor_telepon'] ?? '';
        $tanggal_lahir = $input['tanggal_lahir'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($role) || empty($nama_lengkap) || empty($email) || empty($tanggal_lahir) || empty($password)) {
            sendResponse(["error" => "Role, Nama Lengkap, Email, Tanggal Lahir, dan Password wajib diisi."], 400);
        }

        // Check if email already exists
        $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $check->execute([$email]);
        if ($check->fetch()) {
            sendResponse(["error" => "Email sudah terdaftar."], 400);
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        if ($role === 'guru') {
            $nip_nik = $input['nip_nik'] ?? '';
            $guru_mapel = $input['guru_mapel'] ?? '';
            if (empty($guru_mapel)) {
                sendResponse(["error" => "Mata pelajaran wajib diisi untuk Guru."], 400);
            }
            $stmt = $pdo->prepare("INSERT INTO users (role, nama_lengkap, email, nomor_telepon, tanggal_lahir, password, nip_nik, guru_mapel) VALUES ('guru', ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$nama_lengkap, $email, $nomor_telepon, $tanggal_lahir, $hashedPassword, $nip_nik ?: null, $guru_mapel]);
            
        } elseif ($role === 'siswa') {
            $nisn = $input['nisn'] ?? '';
            $username = $input['username'] ?? '';
            $kelas = $input['kelas'] ?? '';
            if (empty($nisn) || empty($username) || empty($kelas)) {
                sendResponse(["error" => "NISN, Username, dan Kelas wajib diisi untuk Siswa."], 400);
            }
            
            // Check username/nisn duplicate
            $checkSiswa = $pdo->prepare("SELECT id FROM users WHERE username = ? OR nisn = ?");
            $checkSiswa->execute([$username, $nisn]);
            if ($checkSiswa->fetch()) {
                sendResponse(["error" => "Username atau NISN sudah terdaftar."], 400);
            }

            $stmt = $pdo->prepare("INSERT INTO users (role, nama_lengkap, email, nomor_telepon, tanggal_lahir, password, nisn, username, kelas) VALUES ('siswa', ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$nama_lengkap, $email, $nomor_telepon, $tanggal_lahir, $hashedPassword, $nisn, $username, $kelas]);
        } else {
            sendResponse(["error" => "Role tidak valid."], 400);
        }

        sendResponse(["message" => "Pengguna berhasil dibuat."]);
        break;

    case 'delete_user':
        $userId = $input['id'] ?? null;
        if (!$userId) {
            sendResponse(["error" => "ID pengguna diperlukan."], 400);
        }

        // Prevent admin from deleting themselves
        if ($userId == $currentUser['id']) {
            sendResponse(["error" => "Anda tidak dapat menghapus akun Anda sendiri."], 400);
        }

        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        sendResponse(["message" => "Pengguna berhasil dihapus."]);
        break;

    default:
        sendResponse(["error" => "Aksi tidak valid."], 400);
        break;
}

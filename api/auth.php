<?php
// api/auth.php
require_once __DIR__ . '/config/db.php';

$input = getJsonInput();
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'login':
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $expectedRole = $input['role'] ?? '';

        if (empty($email) || empty($password)) {
            sendResponse(["error" => "Email dan Password wajib diisi."], 400);
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            if (!empty($expectedRole) && $user['role'] !== $expectedRole) {
                $roleNames = [
                    'super_admin' => 'Admin',
                    'guru' => 'Guru',
                    'siswa' => 'Siswa'
                ];
                $actualRoleName = $roleNames[$user['role']] ?? $user['role'];
                $expectedRoleName = $roleNames[$expectedRole] ?? $expectedRole;
                sendResponse(["error" => "Akun ini terdaftar sebagai $actualRoleName. Silakan masuk melalui tab $actualRoleName."], 403);
            }

            // Remove password before saving in session
            unset($user['password']);
            $_SESSION['user'] = $user;
            sendResponse(["message" => "Login berhasil.", "user" => $user]);
        } else {
            sendResponse(["error" => "Email atau Password salah."], 401);
        }
        break;

    case 'register_siswa':
        $nisn = $input['nisn'] ?? '';
        $username = $input['username'] ?? '';
        $nama_lengkap = $input['nama_lengkap'] ?? '';
        $email = $input['email'] ?? '';
        $nomor_telepon = $input['nomor_telepon'] ?? '';
        $tanggal_lahir = $input['tanggal_lahir'] ?? '';
        $kelas = $input['kelas'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($nisn) || empty($username) || empty($nama_lengkap) || empty($email) || empty($tanggal_lahir) || empty($kelas) || empty($password)) {
            sendResponse(["error" => "Semua data wajib diisi kecuali Nomor Telepon jika tidak ada."], 400);
        }

        // Check if email already exists
        $check = $pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ? OR nisn = ?");
        $check->execute([$email, $username, $nisn]);
        if ($check->fetch()) {
            sendResponse(["error" => "Email, Username, atau NISN sudah terdaftar."], 400);
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
        $stmt = $pdo->prepare("INSERT INTO users (role, nama_lengkap, email, nomor_telepon, tanggal_lahir, password, nisn, username, kelas) VALUES ('siswa', ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$nama_lengkap, $email, $nomor_telepon, $tanggal_lahir, $hashedPassword, $nisn, $username, $kelas]);

        sendResponse(["message" => "Pendaftaran siswa berhasil! Silakan login."]);
        break;

    case 'register_guru':
        sendResponse(["error" => "Registrasi Guru tidak diperbolehkan secara mandiri. Guru hanya bisa didaftarkan oleh Super Admin."], 403);
        break;

    case 'google_auth':
        $idToken = $input['id_token'] ?? '';
        if (empty($idToken)) {
            sendResponse(["error" => "ID Token Google tidak ditemukan."], 400);
        }

        // Verify ID Token securely via Google's tokeninfo API endpoint
        $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . urlencode($idToken);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $decoded = null;
        if ($httpCode === 200 && $response) {
            $decoded = json_decode($response, true);
        }

        if (!$decoded || !isset($decoded['email'])) {
            sendResponse(["error" => "Autentikasi Google gagal atau Token tidak valid."], 401);
        }

        $email = $decoded['email'];
        $name = $decoded['name'] ?? 'Siswa Google';

        // Check if user exists
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            unset($user['password']);
            $_SESSION['user'] = $user;
            sendResponse(["status" => "login_success", "user" => $user]);
        } else {
            sendResponse([
                "status" => "register_required",
                "email" => $email,
                "nama_lengkap" => $name
            ]);
        }
        break;

    case 'session':
        if (isset($_SESSION['user'])) {
            sendResponse(["user" => $_SESSION['user']]);
        } else {
            sendResponse(["user" => null]);
        }
        break;

    case 'logout':
        session_destroy();
        sendResponse(["message" => "Logout berhasil."]);
        break;

    default:
        sendResponse(["error" => "Aksi tidak valid."], 400);
        break;
}

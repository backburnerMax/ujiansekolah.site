<?php
// api/config/db.php

if (php_sapi_name() !== 'cli') {
    // CORS Headers (just in case they hit the API directly)
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");

    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

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
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

// Start session if not started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Utility functions
function getJsonInput()
{
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function checkRole($allowedRoles)
{
    if (!isset($_SESSION['user'])) {
        sendResponse(["error" => "Unauthorized. Please login."], 401);
    }
    $user = $_SESSION['user'];
    if (!in_array($user['role'], $allowedRoles)) {
        sendResponse(["error" => "Forbidden. Insufficient permissions."], 403);
    }
    return $user;
}

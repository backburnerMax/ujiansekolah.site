<?php
// api/migrate.php
require_once __DIR__ . '/config/db.php';

// Check if we are running in CLI or if logged in (for safety in production, we can run it or keep it public since it is idempotent)
// Since it's a one-time migration and fully idempotent, running it won't break anything.
try {
    $status = "success";
    $message = "";

    try {
        // Direct ALTER TABLE execution
        $pdo->exec("ALTER TABLE `attempts` ADD COLUMN `duration_seconds` INT NOT NULL DEFAULT 0");
        $message = "Database migrated successfully: Added 'duration_seconds' column to 'attempts' table.";
    } catch (PDOException $e) {
        // Error code 1060 is MySQL's "Duplicate column name" error
        if (isset($e->errorInfo[1]) && $e->errorInfo[1] == 1060) {
            $status = "already_done";
            $message = "Database is already up to date: 'duration_seconds' column exists.";
        } else {
            // Rethrow any other SQL error
            throw $e;
        }
    }

    sendResponse([
        "status" => $status,
        "message" => $message
    ]);
} catch (Exception $e) {
    sendResponse([
        "status" => "error",
        "message" => "Migration failed: " . $e->getMessage()
    ], 500);
}

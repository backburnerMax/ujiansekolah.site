-- Database Schema for Ujian Sekolah Web App
-- CREATE DATABASE IF NOT EXISTS `ujian_sekolah`;
-- USE `ujian_sekolah`;


-- Table for Users (Super Admin, Guru, Siswa)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role` ENUM('super_admin', 'guru', 'siswa') NOT NULL,
  `nama_lengkap` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `nomor_telepon` VARCHAR(20) NOT NULL,
  `tanggal_lahir` DATE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Guru-specific columns
  `nip_nik` VARCHAR(50) DEFAULT NULL,
  `guru_mapel` VARCHAR(100) DEFAULT NULL,
  -- Siswa-specific columns
  `nisn` VARCHAR(50) DEFAULT NULL,
  `username` VARCHAR(50) UNIQUE DEFAULT NULL,
  `kelas` VARCHAR(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for Exams (linked to difficulty levels)
CREATE TABLE IF NOT EXISTS `exams` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `difficulty_level` ENUM('mudah', 'sedang', 'sulit') NOT NULL,
  `duration_minutes` INT NOT NULL DEFAULT 45,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for Multiple-Choice Questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `exam_id` INT NOT NULL,
  `nomor` INT NOT NULL,
  `bagian` VARCHAR(100) NOT NULL,
  `tingkat` VARCHAR(50) NOT NULL,
  `pertanyaan` TEXT NOT NULL,
  `option_a` TEXT NOT NULL,
  `option_b` TEXT NOT NULL,
  `option_c` TEXT NOT NULL,
  `option_d` TEXT NOT NULL,
  `option_e` TEXT NOT NULL,
  `correct_option` CHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D', 'E'
  `hint` TEXT DEFAULT NULL,
  CONSTRAINT fk_exam FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for Student Attempts & Scores
CREATE TABLE IF NOT EXISTS `attempts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT NOT NULL,
  `exam_id` INT NOT NULL,
  `score` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `total_questions` INT NOT NULL,
  `correct_answers` INT NOT NULL,
  `cheating_attempts` INT NOT NULL DEFAULT 0,
  `duration_seconds` INT NOT NULL DEFAULT 0,
  `completed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_student FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  CONSTRAINT fk_exam_attempt FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

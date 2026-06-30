-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Waktu pembuatan: 30 Jun 2026 pada 06.58
-- Versi server: 11.8.8-MariaDB-log
-- Versi PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u352605846_ujianSekolah`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `attempts`
--

CREATE TABLE `attempts` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `score` decimal(5,2) NOT NULL DEFAULT 0.00,
  `total_questions` int(11) NOT NULL,
  `correct_answers` int(11) NOT NULL,
  `cheating_attempts` int(11) NOT NULL DEFAULT 0,
  `completed_at` timestamp NULL DEFAULT current_timestamp(),
  `duration_seconds` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `attempts`
--

INSERT INTO `attempts` (`id`, `student_id`, `exam_id`, `score`, `total_questions`, `correct_answers`, `cheating_attempts`, `completed_at`, `duration_seconds`) VALUES
(1, 7, 1, 3.33, 30, 1, 0, '2026-06-27 03:31:58', 9),
(2, 8, 1, 86.67, 30, 26, 0, '2026-06-27 04:02:08', 986),
(3, 9, 1, 100.00, 30, 30, 0, '2026-06-27 08:01:24', 71),
(4, 9, 3, 53.33, 30, 16, 0, '2026-06-27 08:03:51', 37),
(5, 9, 1, 96.67, 30, 29, 0, '2026-06-27 08:09:11', 78),
(6, 9, 2, 46.67, 30, 14, 0, '2026-06-27 08:13:38', 63),
(7, 10, 1, 33.33, 30, 10, 0, '2026-06-27 08:13:52', 331),
(8, 13, 1, 93.33, 30, 28, 0, '2026-06-27 08:18:57', 471),
(9, 12, 1, 100.00, 30, 30, 1, '2026-06-27 08:19:22', 504),
(10, 13, 2, 100.00, 30, 30, 0, '2026-06-27 08:28:53', 570),
(11, 11, 1, 96.67, 30, 29, 1, '2026-06-27 08:28:55', 1147),
(12, 12, 2, 90.00, 30, 27, 0, '2026-06-27 08:34:40', 907),
(13, 11, 1, 93.33, 30, 28, 0, '2026-06-27 08:36:45', 393),
(14, 13, 3, 90.00, 30, 27, 2, '2026-06-27 08:39:11', 596),
(15, 15, 1, 100.00, 30, 30, 0, '2026-06-27 08:39:51', 751),
(16, 17, 3, 93.33, 30, 28, 0, '2026-06-27 08:50:00', 717),
(17, 12, 3, 93.33, 30, 28, 1, '2026-06-27 08:51:23', 878),
(18, 22, 3, 100.00, 30, 30, 0, '2026-06-27 08:55:36', 90),
(19, 11, 3, 83.33, 30, 25, 0, '2026-06-27 08:56:07', 1110),
(20, 19, 1, 66.67, 30, 20, 0, '2026-06-27 08:56:33', 473),
(21, 20, 1, 83.33, 30, 25, 2, '2026-06-27 08:57:01', 447),
(22, 22, 2, 100.00, 30, 30, 0, '2026-06-27 08:57:12', 79),
(23, 22, 1, 100.00, 30, 30, 0, '2026-06-27 08:59:09', 101),
(24, 17, 2, 100.00, 30, 30, 0, '2026-06-27 08:59:09', 517),
(25, 19, 2, 43.33, 30, 13, 1, '2026-06-27 09:01:01', 241),
(26, 17, 1, 100.00, 30, 30, 0, '2026-06-27 09:05:47', 376),
(27, 23, 1, 100.00, 30, 30, 0, '2026-06-27 09:07:14', 637),
(28, 19, 3, 40.00, 30, 12, 0, '2026-06-27 09:11:44', 68),
(29, 25, 1, 96.67, 30, 29, 0, '2026-06-27 09:12:32', 79),
(30, 20, 3, 33.33, 30, 10, 1, '2026-06-27 09:15:04', 1059),
(31, 20, 1, 83.33, 30, 25, 0, '2026-06-27 09:17:26', 110),
(32, 28, 1, 100.00, 30, 30, 0, '2026-06-27 09:19:55', 209),
(33, 28, 1, 100.00, 30, 30, 0, '2026-06-27 09:22:10', 96),
(34, 27, 1, 30.00, 30, 9, 1, '2026-06-27 09:24:28', 310),
(35, 23, 2, 86.67, 30, 26, 0, '2026-06-27 09:25:48', 1069),
(36, 30, 1, 80.00, 30, 24, 1, '2026-06-27 09:28:30', 672),
(37, 20, 2, 60.00, 30, 18, 0, '2026-06-27 09:29:21', 677),
(38, 31, 1, 100.00, 30, 30, 0, '2026-06-27 09:31:22', 86),
(39, 20, 1, 96.67, 30, 29, 0, '2026-06-27 09:31:24', 79),
(40, 29, 1, 96.67, 30, 29, 0, '2026-06-27 09:31:37', 784),
(41, 16, 1, 63.33, 30, 19, 0, '2026-06-27 09:31:37', 381),
(42, 31, 2, 100.00, 30, 30, 0, '2026-06-27 09:35:40', 252),
(43, 31, 3, 100.00, 30, 30, 0, '2026-06-27 09:38:08', 142),
(44, 30, 2, 80.00, 30, 24, 0, '2026-06-27 09:40:07', 687),
(45, 30, 3, 30.00, 30, 9, 0, '2026-06-27 09:43:00', 163),
(46, 14, 1, 50.00, 30, 15, 0, '2026-06-27 09:48:12', 206),
(47, 29, 2, 96.67, 30, 29, 0, '2026-06-27 09:54:38', 782),
(48, 32, 1, 0.00, 30, 0, 3, '2026-06-27 09:56:59', 352),
(49, 33, 1, 96.67, 30, 29, 0, '2026-06-27 10:01:43', 695),
(50, 35, 1, 83.33, 30, 25, 0, '2026-06-27 10:02:41', 418),
(51, 15, 1, 96.67, 30, 29, 1, '2026-06-27 10:04:31', 717),
(52, 34, 2, 80.00, 30, 24, 0, '2026-06-27 10:18:33', 492),
(53, 37, 1, 100.00, 30, 30, 0, '2026-06-27 10:18:42', 89),
(54, 37, 2, 100.00, 30, 30, 0, '2026-06-27 10:21:07', 76),
(55, 15, 2, 76.67, 30, 23, 0, '2026-06-27 10:22:20', 1015),
(56, 37, 3, 100.00, 30, 30, 0, '2026-06-27 10:22:30', 65),
(57, 29, 3, 90.00, 30, 27, 0, '2026-06-27 10:25:06', 1175),
(58, 39, 1, 26.67, 30, 8, 0, '2026-06-27 10:25:21', 424),
(59, 36, 1, 93.33, 30, 28, 0, '2026-06-27 10:26:17', 1338),
(60, 36, 2, 0.00, 30, 0, 3, '2026-06-27 10:29:22', 104),
(61, 40, 1, 36.67, 30, 11, 0, '2026-06-27 10:31:18', 332),
(62, 15, 3, 40.00, 30, 12, 0, '2026-06-27 10:34:33', 647),
(63, 39, 1, 96.67, 30, 29, 0, '2026-06-27 10:36:55', 489),
(64, 14, 2, 0.00, 30, 0, 3, '2026-06-27 10:47:26', 73),
(65, 43, 1, 96.67, 30, 29, 0, '2026-06-27 10:50:09', 182),
(66, 42, 1, 76.67, 30, 23, 0, '2026-06-27 10:51:00', 447),
(67, 42, 1, 86.67, 30, 26, 1, '2026-06-27 10:56:30', 291),
(68, 36, 2, 93.33, 30, 28, 0, '2026-06-27 11:07:44', 2245),
(69, 42, 2, 50.00, 30, 15, 0, '2026-06-27 11:09:08', 708),
(70, 46, 3, 93.33, 30, 28, 1, '2026-06-27 11:20:34', 586),
(71, 46, 2, 96.67, 30, 29, 0, '2026-06-27 11:30:50', 472),
(72, 46, 1, 100.00, 30, 30, 0, '2026-06-27 11:37:24', 353),
(73, 51, 1, 0.00, 30, 0, 3, '2026-06-27 11:41:15', 65),
(74, 52, 1, 30.00, 30, 9, 2, '2026-06-27 11:46:07', 249),
(75, 49, 1, 63.33, 30, 19, 1, '2026-06-27 11:48:41', 973),
(76, 51, 1, 43.33, 30, 13, 0, '2026-06-27 11:54:51', 807),
(77, 14, 2, 53.33, 30, 16, 0, '2026-06-27 11:56:18', 487),
(78, 48, 2, 96.67, 30, 29, 0, '2026-06-27 11:57:16', 524),
(79, 36, 3, 86.67, 30, 26, 0, '2026-06-27 12:02:17', 2848),
(80, 50, 3, 30.00, 30, 9, 1, '2026-06-27 12:02:38', 1430),
(81, 48, 3, 93.33, 30, 28, 0, '2026-06-27 12:06:33', 533),
(82, 53, 1, 83.33, 30, 25, 0, '2026-06-27 12:08:58', 1232),
(83, 56, 1, 0.00, 30, 0, 3, '2026-06-27 12:12:04', 296),
(84, 56, 1, 0.00, 30, 0, 3, '2026-06-27 12:12:58', 10),
(85, 56, 1, 96.67, 30, 29, 1, '2026-06-27 12:18:20', 165),
(86, 54, 1, 96.67, 30, 29, 1, '2026-06-27 12:18:45', 885),
(87, 58, 1, 0.00, 30, 0, 3, '2026-06-27 12:26:28', 54),
(88, 48, 1, 100.00, 30, 30, 0, '2026-06-27 12:26:36', 545),
(89, 49, 2, 80.00, 30, 24, 0, '2026-06-27 12:27:25', 1066),
(90, 58, 1, 70.00, 30, 21, 2, '2026-06-27 12:37:05', 617),
(91, 53, 2, 86.67, 30, 26, 0, '2026-06-27 13:03:55', 1454),
(92, 61, 1, 0.00, 30, 0, 3, '2026-06-27 13:07:38', 70),
(93, 59, 1, 90.00, 30, 27, 0, '2026-06-27 13:10:49', 1095),
(94, 62, 1, 100.00, 30, 30, 0, '2026-06-27 13:11:51', 90),
(95, 62, 2, 100.00, 30, 30, 0, '2026-06-27 13:14:49', 94),
(96, 62, 3, 0.00, 30, 0, 3, '2026-06-27 13:15:43', 48),
(97, 64, 1, 0.00, 30, 0, 3, '2026-06-27 13:22:27', 93),
(98, 66, 1, 100.00, 30, 30, 0, '2026-06-27 13:28:30', 76),
(99, 63, 1, 96.67, 30, 29, 1, '2026-06-27 13:28:49', 1097),
(100, 61, 1, 0.00, 30, 0, 3, '2026-06-27 13:29:49', 1261),
(101, 66, 2, 100.00, 30, 30, 0, '2026-06-27 13:30:49', 82),
(102, 66, 3, 100.00, 30, 30, 0, '2026-06-27 13:33:07', 86),
(103, 65, 1, 100.00, 30, 30, 0, '2026-06-27 13:33:23', 570),
(104, 53, 3, 93.33, 30, 28, 0, '2026-06-27 13:33:59', 1363),
(105, 67, 1, 0.00, 30, 0, 3, '2026-06-27 13:39:39', 12),
(106, 65, 2, 93.33, 30, 28, 0, '2026-06-27 13:41:33', 458),
(107, 59, 2, 86.67, 30, 26, 0, '2026-06-27 13:45:27', 1473),
(108, 65, 3, 93.33, 30, 28, 0, '2026-06-27 13:50:32', 512),
(109, 52, 2, 23.33, 30, 7, 0, '2026-06-27 13:52:04', 41),
(110, 52, 3, 20.00, 30, 6, 0, '2026-06-27 13:54:29', 61),
(111, 63, 2, 80.00, 30, 24, 0, '2026-06-27 13:55:51', 1532),
(112, 59, 3, 83.33, 30, 25, 1, '2026-06-27 14:08:02', 1307),
(113, 68, 1, 0.00, 30, 0, 3, '2026-06-27 14:10:11', 350),
(114, 63, 3, 90.00, 30, 27, 0, '2026-06-27 14:15:49', 980),
(115, 68, 1, 73.33, 30, 22, 0, '2026-06-27 14:23:26', 662),
(116, 68, 2, 36.67, 30, 11, 0, '2026-06-27 14:59:10', 2066),
(117, 69, 1, 90.00, 30, 27, 2, '2026-06-27 15:53:29', 614),
(118, 70, 1, 76.67, 30, 23, 2, '2026-06-27 16:03:18', 626),
(119, 73, 2, 96.67, 30, 29, 0, '2026-06-27 22:59:31', 727),
(120, 57, 1, 70.00, 30, 21, 0, '2026-06-28 00:25:08', 322),
(121, 75, 1, 93.33, 30, 28, 2, '2026-06-28 00:55:14', 673),
(122, 76, 1, 0.00, 30, 0, 3, '2026-06-28 05:26:57', 660),
(123, 57, 2, 60.00, 30, 18, 0, '2026-06-28 09:48:23', 290),
(124, 77, 1, 100.00, 30, 30, 0, '2026-06-28 14:32:47', 612),
(125, 77, 1, 96.67, 30, 29, 2, '2026-06-28 14:40:57', 440),
(126, 77, 2, 100.00, 30, 30, 0, '2026-06-28 14:50:10', 505),
(127, 77, 3, 93.33, 30, 28, 0, '2026-06-28 14:59:33', 550),
(128, 77, 3, 100.00, 30, 30, 0, '2026-06-28 15:11:41', 631),
(129, 73, 1, 93.33, 30, 28, 0, '2026-06-29 04:03:38', 317),
(130, 73, 1, 93.33, 30, 28, 2, '2026-06-29 04:09:26', 295),
(131, 73, 3, 93.33, 30, 28, 0, '2026-06-29 04:14:40', 288),
(132, 79, 1, 90.00, 30, 27, 0, '2026-06-29 12:21:02', 782),
(133, 79, 2, 96.67, 30, 29, 1, '2026-06-29 12:52:54', 1311),
(134, 79, 3, 86.67, 30, 26, 1, '2026-06-29 13:20:13', 1617);

-- --------------------------------------------------------

--
-- Struktur dari tabel `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `difficulty_level` enum('mudah','sedang','sulit') NOT NULL,
  `duration_minutes` int(11) NOT NULL DEFAULT 45,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `exams`
--

INSERT INTO `exams` (`id`, `title`, `subject`, `difficulty_level`, `duration_minutes`, `created_at`) VALUES
(1, 'Ujian Dasar Listrik - Mudah', 'Dasar Listrik & Instalasi Motor Listrik', 'mudah', 30, '2026-06-27 01:58:45'),
(2, 'Ujian Dasar Listrik - Sedang', 'Dasar Listrik & Instalasi Motor Listrik', 'sedang', 45, '2026-06-27 01:58:45'),
(3, 'Ujian Dasar Listrik - Sulit', 'Dasar Listrik & Instalasi Motor Listrik', 'sulit', 60, '2026-06-27 01:58:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `nomor` int(11) NOT NULL,
  `bagian` varchar(100) NOT NULL,
  `tingkat` varchar(50) NOT NULL,
  `pertanyaan` text NOT NULL,
  `option_a` text NOT NULL,
  `option_b` text NOT NULL,
  `option_c` text NOT NULL,
  `option_d` text NOT NULL,
  `option_e` text NOT NULL,
  `correct_option` char(1) NOT NULL,
  `hint` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `questions`
--

INSERT INTO `questions` (`id`, `exam_id`, `nomor`, `bagian`, `tingkat`, `pertanyaan`, `option_a`, `option_b`, `option_c`, `option_d`, `option_e`, `correct_option`, `hint`) VALUES
(1, 1, 1, 'Dasar Listrik', 'mudah', 'Berapakah arus listrik yang mengalir pada hambatan 10 Ohm jika diberi tegangan 220 Volt?', '22 A', '2,2 A', '0,45 A', '220 A', '2200 A', 'A', 'Gunakan Hukum Ohm: I = V / R.'),
(2, 1, 2, 'Dasar Listrik', 'mudah', 'Satuan internasional untuk mengukur daya listrik aktif adalah...', 'Volt', 'Ampere', 'Ohm', 'Watt', 'Farad', 'D', 'Daya aktif diukur dalam Watt, sedangkan Volt untuk tegangan.'),
(3, 1, 3, 'Dasar Listrik', 'mudah', 'Komponen yang berfungsi untuk membatasi arus dan memutus rangkaian saat terjadi hubung singkat adalah...', 'Sakelar', 'MCB', 'Kapasitor', 'Transformator', 'Kontaktor', 'B', 'MCB melindungi instalasi dari arus lebih dan hubung singkat.'),
(4, 1, 4, 'Dasar Listrik', 'mudah', 'Alat ukur yang digunakan untuk mengetahui nilai tahanan atau hambatan listrik adalah...', 'Voltmeter', 'Amperemeter', 'Ohmmeter', 'Wattmeter', 'Tachometer', 'C', 'Ohm adalah satuan hambatan, maka alatnya adalah Ohmmeter.'),
(5, 1, 5, 'Dasar Listrik', 'mudah', 'Menurut hukum Kirchhoff I, jumlah arus yang masuk ke suatu titik percabangan sama dengan...', 'Nol', 'Jumlah arus yang keluar', 'Dua kali arus keluar', 'Setengah arus keluar', 'Tak terhingga', 'B', 'Hukum Kirchhoff I menyatakan I_masuk = I_keluar.'),
(6, 1, 6, 'Dasar Listrik', 'mudah', 'Bahan yang sangat mudah menghantarkan arus listrik disebut dengan...', 'Isolator', 'Semikonduktor', 'Konduktor', 'Resistor', 'Kapasitor', 'C', 'Konduktor memiliki banyak elektron bebas sehingga mudah menghantarkan listrik.'),
(7, 1, 7, 'Dasar Listrik', 'mudah', 'Warna isolasi kabel tanah menurut PUIL untuk menandakan kabel netral (N) adalah...', 'Merah', 'Kuning', 'Hitam', 'Biru', 'Hijau-Kuning', 'D', 'Berdasarkan PUIL standar terbaru, warna biru digunakan untuk Netral.'),
(8, 1, 8, 'Dasar Listrik', 'mudah', 'Alat yang digunakan untuk mengukur tegangan listrik pada suatu rangkaian adalah...', 'Amperemeter', 'Voltmeter', 'Ohmmeter', 'Frekuensimeter', 'Megger', 'B', 'Tegangan diukur dengan Voltmeter yang dipasang paralel.'),
(9, 1, 9, 'Dasar Listrik', 'mudah', 'Formulasi matematis yang tepat untuk menyatakan Hukum Ohm adalah...', 'P = V x I', 'V = I x R', 'R = V x I', 'I = V x R', 'W = P x t', 'B', 'Hukum Ohm menyatakan besar tegangan berbanding lurus dengan arus dan hambatan.'),
(10, 1, 10, 'Dasar Listrik', 'mudah', 'Tiga buah hambatan masing-masing 4 Ohm dirangkai secara seri. Hambatan totalnya adalah...', '1,33 Ohm', '4 Ohm', '8 Ohm', '12 Ohm', '16 Ohm', 'D', 'Pada rangkaian seri, R_total = R1 + R2 + R3.'),
(11, 1, 11, 'Dasar Listrik', 'mudah', 'Jika sebuah lampu bertuliskan 220V/100W, maka 100W menunjukan nilai dari...', 'Tegangan', 'Arus', 'Hambatan', 'Daya listrik', 'Energi', 'D', 'W atau Watt adalah satuan dari daya listrik.'),
(12, 1, 12, 'Dasar Listrik', 'mudah', 'Jenis arus listrik yang arah alirannya selalu berubah-ubah secara periodik dinamakan...', 'Arus searah (DC)', 'Arus bolak-balik (AC)', 'Arus konstan', 'Arus induksi', 'Arus statis', 'B', 'AC (Alternating Current) memiliki arah dan nilai yang berubah terhadap waktu.'),
(13, 1, 13, 'Dasar Listrik', 'mudah', 'Simbol huruf \'I\' dalam bidang ketenagalistrikan digunakan untuk melambangkan...', 'Impedansi', 'Intensitas', 'Arus listrik', 'Induktansi', 'Isolasi', 'C', 'Huruf I berasal dari kata \'Intensity\' yang melambangkan Kuat Arus.'),
(14, 1, 14, 'Dasar Listrik', 'mudah', 'Baterai dan aki merupakan contoh sumber tegangan listrik jenis...', 'AC', 'DC', '3-fasa', 'Induksi', 'Transformasi', 'B', 'Baterai menghasilkan arus searah atau Direct Current (DC).'),
(15, 1, 15, 'Dasar Listrik', 'mudah', 'Komponen listrik yang berfungsi menyimpan muatan listrik dalam bentuk medan listrik adalah...', 'Resistor', 'Induktor', 'Kapasitor', 'Dioda', 'Transistor', 'C', 'Kapasitor atau kondensator bertugas menyimpan muatan listrik.'),
(16, 2, 16, 'Dasar Listrik', 'sedang', 'Tiga buah resistor 6 Ohm, 12 Ohm, dan 4 Ohm dirangkai paralel. Hambatan penggantinya adalah...', '2 Ohm', '4 Ohm', '6 Ohm', '22 Ohm', '12 Ohm', 'A', 'Gunakan rumus 1/Rp = 1/R1 + 1/R2 + 1/R3.'),
(17, 2, 17, 'Dasar Listrik', 'sedang', 'Sebuah setrika listrik 440 Watt dihubungkan ke sumber tegangan 220 Volt. Kuat arus yang mengalir adalah...', '0,5 A', '1 A', '2 A', '4 A', '5 A', 'C', 'Gunakan rumus daya: I = P / V.'),
(18, 2, 18, 'Dasar Listrik', 'sedang', 'Sebuah motor listrik fasa tunggal memiliki daya 1 HP (746 Watt) dengan efisiensi 80%. Daya masukannya adalah...', '596,8 Watt', '746 Watt', '932,5 Watt', '1000 Watt', '800 Watt', 'C', 'Daya masukan = Daya keluaran / Efisiensi.'),
(19, 2, 19, 'Dasar Listrik', 'sedang', 'Kapasitor berukuran 10 microFarad dan 20 microFarad dirangkai paralel. Kapasitas totalnya bernilai...', '6,67 microFarad', '10 microFarad', '15 microFarad', '30 microFarad', '200 microFarad', 'D', 'Kapasitor paralel dijumlahkan langsung: C_total = C1 + C2.'),
(20, 2, 20, 'Dasar Listrik', 'sedang', 'Sebuah rumah menyalakan 5 lampu masing-masing 20 Watt selama 10 jam sehari. Energi yang dikonsumsi per hari adalah...', '1 kWh', '2 kWh', '10 kWh', '100 kWh', '5 kWh', 'A', 'Energi = Total Watt x Jam = (5 x 20) x 10 = 1000 Wh = 1 kWh.'),
(21, 2, 21, 'Dasar Listrik', 'sedang', 'Sebuah transformator step-down memiliki kumparan primer 1000 lilitan dan sekunder 200 lilitan. Jika V_primer 220V, V_sekunder adalah...', '1100 V', '44 V', '22 V', '11 V', '55 V', 'B', 'Gunakan rumus trafo: Vs = (Ns / Np) x Vp.'),
(22, 2, 22, 'Dasar Listrik', 'sedang', 'Dua buah hambatan identik R jika dirangkai seri menghasilkan 40 Ohm. Jika dipasang paralel hambatannya menjadi...', '5 Ohm', '10 Ohm', '20 Ohm', '40 Ohm', '80 Ohm', 'B', 'R seri = 2R = 40 maka R=20. R paralel = R/2 = 10 Ohm.'),
(23, 2, 23, 'Dasar Listrik', 'sedang', 'Berapakah frekuensi suatu sistem listrik jika satu gelombang penuh diselesaikan dalam waktu 0,02 detik?', '25 Hz', '50 Hz', '60 Hz', '100 Hz', '200 Hz', 'B', 'Frekuensi f = 1 / T = 1 / 0,02 = 50 Hz.'),
(24, 2, 24, 'Dasar Listrik', 'sedang', 'Nilai impedansi total dari rangkaian seri R=3 Ohm dan X_L=4 Ohm adalah...', '1 Ohm', '5 Ohm', '7 Ohm', '12 Ohm', '25 Ohm', 'B', 'Z = akar(R^2 + X_L^2) = akar(3^2 + 4^2) = 5 Ohm.'),
(25, 2, 25, 'Dasar Listrik', 'sedang', 'Penghantar tembaga memiliki hambatan jenis 0,017. Jika panjang kabel 100m dan luas penampang 2mm2, hambatannya adalah...', '0,85 Ohm', '1,7 Ohm', '0,085 Ohm', '0,17 Ohm', '8,5 Ohm', 'A', 'R = (rho x l) / A = (0,017 x 100) / 2 = 0,85 Ohm.'),
(26, 2, 26, 'Dasar Listrik', 'sedang', 'Faktor daya (cos phi) didefinisikan sebagai rasio antara...', 'Daya semu dan daya aktif', 'Daya aktif dan daya reaktif', 'Daya aktif dan daya semu', 'Daya reaktif dan daya semu', 'Tegangan dan arus', 'C', 'Cos phi = Daya Aktif (W) / Daya Semu (VA).'),
(27, 2, 27, 'Dasar Listrik', 'sedang', 'Alat Megger (Megaohmmeter) digunakan pada instalasi listrik untuk menguji kualitas dari...', 'Koneksi pentanahan', 'Tahanan isolasi kabel', 'Kontinuitas sakelar', 'Kapasitas beban', 'Drop tegangan', 'B', 'Megger mengukur tahanan isolasi dengan tegangan tinggi searah.'),
(28, 2, 28, 'Dasar Listrik', 'sedang', 'Sebuah beban menyerap daya aktif 800 Watt dan daya semu 1000 VA. Nilai faktor dayanya adalah...', '0,6', '0,7', '0,8', '0,9', '1,0', 'C', 'Cos phi = P / S = 800 / 1000 = 0,8.'),
(29, 2, 29, 'Dasar Listrik', 'sedang', 'Pada sistem 3-fasa star (wye), hubungan antara tegangan fasa-ke-fasa (V_L) dan fasa-ke-netral (V_ph) adalah...', 'V_L = V_ph', 'V_L = akar(2) x V_ph', 'V_L = akar(3) x V_ph', 'V_L = V_ph / akar(3)', 'V_L = 3 x V_ph', 'C', 'Pada hubungan Star, tegangan line adalah akar 3 kali tegangan fasa.'),
(30, 2, 30, 'Dasar Listrik', 'sedang', 'Beban induktif murni pada rangkaian AC menyebabkan kondisi arus listrik...', 'Mendahului tegangan (leading)', 'Tertinggal dari tegangan (lagging)', 'Sefasa dengan tegangan', 'Berlawanan fasa sebesar 180 derajat', 'Bernilai nol', 'B', 'Sifat induktor menyebabkan arus tertinggal (lagging) terhadap tegangan.'),
(31, 3, 31, 'Dasar Listrik', 'sulit', 'Beban 3-fasa menyerap daya aktif 5,5 kW pada tegangan 380 V dengan cos phi 0,85. Arus salurannya adalah...', '8,45 A', '9,83 A', '14,6 A', '17,0 A', '5,5 A', 'B', 'I = P / (akar(3) x V x cos phi) = 5500 / (1,732 x 380 x 0,85) = 9,83 A.'),
(32, 3, 32, 'Dasar Listrik', 'sulit', 'Sebuah pabrik memiliki beban 100 kVA dengan cos phi awal 0,6 lagging. Berapa daya reaktif QC untuk menaikkan cos phi menjadi 1,0?', '60 kVAR', '80 kVAR', '100 kVAR', '40 kVAR', '50 kVAR', 'B', 'P = S x cos phi = 60 kW. Q = S x sin phi = 80 kVAR. Untuk cos phi 1, Q_akhir=0, maka QC=80 kVAR.'),
(33, 3, 33, 'Dasar Listrik', 'sulit', 'Kabel sepanjang 200m mengalirkan arus 30A. Tahanan kabel 0,1 Ohm/100m. Berapa besar jatuh tegangan pada kabel?', '3 V', '6 V', '12 V', '24 V', '60 V', 'C', 'R_total = 2 x 200/100 x 0,1 = 0,4 Ohm (pergi-pulang). V_drop = I x R = 30 x 0,4 = 12 V.'),
(34, 3, 34, 'Dasar Listrik', 'sulit', 'Sebuah motor 3-fasa beroperasi dengan efisiensi 85% dan menghasilkan output daya mekanik 15 kW. Daya semu jika cos phi 0,8 adalah...', '17,6 kVA', '22,0 kVA', '15,0 kVA', '18,75 kVA', '25,5 kVA', 'B', 'P_in = 15 kW / 0,85 = 17,64 kW. S = P_in / 0,8 = 22,05 kVA.'),
(35, 3, 35, 'Dasar Listrik', 'sulit', 'Rangkaian RLC seri memiliki R=30 Ohm, X_L=80 Ohm, dan X_C=40 Ohm dihubungkan ke 200V. Daya aktif total rangkaian adalah...', '400 Watt', '480 Watt', '800 Watt', '1000 Watt', '1200 Watt', 'B', 'Z = akar(30^2 + (80-40)^2) = 50 Ohm. I = 200/50 = 4A. P = I^2 x R = 16 x 30 = 480 Watt.'),
(36, 3, 36, 'Dasar Listrik', 'sulit', 'Pada pengukuran daya 3-fasa menggunakan metode dua wattmeter, didapatkan W1 = 3000W dan W2 = 1000W. Daya total sistem adalah...', '2000 W', '4000 W', '3500 W', '1500 W', '5000 W', 'B', 'Daya total pada metode 2 wattmeter adalah penjumlahan keduanya: P = W1 + W2 = 4000 W.'),
(37, 3, 37, 'Dasar Listrik', 'sulit', 'Sebuah generator sinkron 3-fasa hubungan Star menghasilkan tegangan fasa 220V. Berapakah daya maksimum yang dapat dialirkan jika arus maksimum 50A pada beban resistif murni?', '11 kW', '22 kW', '33 kW', '38 kW', '57 kW', 'C', 'P = 3 x V_ph x I_ph x cos phi = 3 x 220 x 50 x 1 = 33000 Watt = 33 kW.'),
(38, 3, 38, 'Dasar Listrik', 'sulit', 'Suatu instalasi industri memiliki drop tegangan maksimum yang diizinkan sebesar 5%. Jika tegangan nominal 380V, berapakah batas tegangan terendah di ujung saluran?', '370 V', '361 V', '355 V', '342 V', '375 V', 'B', 'Batas bawah = 380 - (5% x 380) = 380 - 19 = 361 V.'),
(39, 3, 39, 'Dasar Listrik', 'sulit', 'Inti besi sebuah transformator dilaminasi tipis dengan tujuan utama untuk mengurangi rugi daya akibat...', 'Arus eddy (eddy current)', 'Histeresis', 'Tahanan tembaga', 'Fluks bocor', 'Efek kulit (skin effect)', 'A', 'Laminasi pada inti besi meningkatkan tahanan jalur arus pusar/eddy sehingga menekan rugi daya.'),
(40, 3, 40, 'Dasar Listrik', 'sulit', 'Sebuah kumparan memiliki induktansi 0,1 H dihubungkan pada frekuensi 50 Hz. Berapakah nilai reaktansi induktifnya?', '3,14 Ohm', '31,4 Ohm', '314 Ohm', '0,314 Ohm', '62,8 Ohm', 'B', 'X_L = 2 x pi x f x L = 2 x 3,14 x 50 x 0,1 = 31,4 Ohm.'),
(41, 3, 41, 'Dasar Listrik', 'sulit', 'Bila frekuensi suplai AC diturunkan menjadi setengahnya pada rangkaian yang dominan induktif, maka arus akan...', 'Menjadi setengah semula', 'Menjadi dua kali lipat', 'Tetap sama', 'Menjadi seperempat semula', 'Menjadi empat kali lipat', 'B', 'X_L berbanding lurus dengan f. Jika f turun setengah, X_L turun setengah, sehingga arus I = V/X_L naik 2 kali lipat.'),
(42, 3, 42, 'Dasar Listrik', 'sulit', 'Sebuah sistem kelistrikan memiliki nilai gelombang tegangan maksimum 311 Volt. Tegangan efektif (RMS) yang terbaca oleh alat ukur sebesar...', '110 V', '220 V', '311 V', '380 V', '440 V', 'B', 'V_rms = V_max / akar(2) = 311 / 1,414 = 220 Volt.'),
(43, 3, 43, 'Dasar Listrik', 'sulit', 'Suatu beban 1 fasa menarik arus 10A pada tegangan 220V dengan sudut fasa tertinggal 60 derajat. Daya aktif beban adalah...', '1100 Watt', '2200 Watt', '1905 Watt', '550 Watt', '880 Watt', 'A', 'P = V x I x cos(60) = 220 x 10 x 0,5 = 1100 Watt.'),
(44, 3, 44, 'Dasar Listrik', 'sulit', 'Sebuah kapasitor dipasang paralel pada beban motor industri bertujuan untuk...', 'Menurunkan arus start', 'Menaikkan efisiensi mekanik motor', 'Memperbaiki faktor daya instalasi', 'Meningkatkan kecepatan motor', 'Membatasi jatuh tegangan fasa', 'C', 'Kapasitor mensuplai daya reaktif kapasitif untuk mengompensasi beban induktif (memperbaiki cos phi).'),
(45, 3, 45, 'Dasar Listrik', 'sulit', 'Rangkaian resonansi seri terjadi ketika komponen reaktansi induktif (XL) dan reaktansi kapasitif (XC) memenuhi syarat...', 'XL > XC', 'XL < XC', 'XL = XC', 'XL = 0', 'XC = 0', 'C', 'Resonansi dicapai saat XL sama dengan XC sehingga impedansi bernilai minimum dan murni resistif.'),
(46, 1, 46, 'Instalasi Motor Listrik', 'mudah', 'Komponen kendali motor listrik yang berfungsi sebagai pengaman terhadap beban lebih berbasis panas adalah...', 'MCB', 'TOR (Thermal Overload Relay)', 'Magnetic Contactor', 'Push Button NC', 'NFB', 'B', 'TOR mengamankan motor dari beban lebih berdasarkan panas bimetal.'),
(47, 1, 47, 'Instalasi Motor Listrik', 'mudah', 'Alat kendali mekanis berupa tombol yang akan kembali ke posisi semula setelah dilepas dinamakan...', 'Sakelar toggle', 'Push button', 'Cam switch', 'Limit switch', 'Time Delay Relay', 'B', 'Push button bekerja sesaat (momentary) dan kembali ke posisi semula karena pegas.'),
(48, 1, 48, 'Instalasi Motor Listrik', 'mudah', 'Bagian dari kontaktor magnet yang berfungsi sebagai penarik kontak-kontak mekanis ketika dialiri listrik adalah...', 'Kontak utama', 'Kontak bantu', 'Kumparan/Coil', 'Inti besi tetap', 'Pegas pengembali', 'C', 'Coil yang dialiri listrik menimbulkan medan magnet untuk menarik jangkar kontak.'),
(49, 1, 49, 'Instalasi Motor Listrik', 'mudah', 'Motor listrik yang bekerja berdasarkan prinsip induksi medan magnet berputar pada stator adalah...', 'Motor DC seri', 'Motor universal', 'Motor induksi AC', 'Motor stepper', 'Motor servo', 'C', 'Motor induksi AC memanfaatkan medan putar stator untuk menginduksi rotor.'),
(50, 1, 50, 'Instalasi Motor Listrik', 'mudah', 'Simbol kontak bantu kontaktor magnet yang dalam keadaan normal sebelum bekerja bernilai terbuka disebut...', 'NC (Normally Closed)', 'NO (Normally Open)', 'COM (Common)', 'Overload', 'Timer', 'B', 'NO atau Normally Open berarti terbuka saat tidak bertegangan.'),
(51, 1, 51, 'Instalasi Motor Listrik', 'mudah', 'Alat yang digunakan untuk membalik arah putaran motor listrik 3-fasa secara manual tanpa kontaktor adalah...', 'Push Button', 'Thermal Overload', 'Drum Switch / Cam Switch', 'MCB', 'Kapasitor running', 'C', 'Drum/Cam switch tipe khusus dirancang untuk mengubah urutan fasa secara manual.'),
(52, 1, 52, 'Instalasi Motor Listrik', 'mudah', 'Jumlah terminal keluaran kumparan pada kotak terminal motor induksi 3-fasa standar yang siap dihubungkan star/delta adalah...', '3 terminal', '4 terminal', '6 terminal', '9 terminal', '12 terminal', 'C', 'Ada 6 terminal utama yang merepresentasikan ujung-ujung dari 3 kumparan (U1, V1, W1, U2, V2, W2).'),
(53, 1, 53, 'Instalasi Motor Listrik', 'mudah', 'Komponen penunda waktu otomatis yang digunakan pada perpindahan rangkaian Star ke Delta adalah...', 'TOR', 'MCB', 'TDR (Time Delay Relay)', 'Push Button', 'Limit Switch', 'C', 'TDR atau Timer berfungsi mengatur perpindahan waktu otomatis antar kontaktor.'),
(54, 1, 54, 'Instalasi Motor Listrik', 'mudah', 'Jenis motor listrik fasa tunggal yang memanfaatkan kapasitor hanya pada saat awal start dinamakan...', 'Motor kapasitor start', 'Motor kapasitor run', 'Motor shaded pole', 'Motor universal', 'Motor sinkron', 'A', 'Motor jenis ini memutuskan sakelar sentrifugal setelah motor berputar mencapai 75% kecepatan.'),
(55, 1, 55, 'Instalasi Motor Listrik', 'mudah', 'Komponen kendali yang mendeteksi batas gerakan mekanis suatu benda pada mesin industri adalah...', 'Proximity switch', 'Limit switch', 'Float switch', 'Pressure switch', 'Thermostat', 'B', 'Limit switch memutus/menghubungkan arus berdasarkan sentuhan fisik batas gerakan mekanis.'),
(56, 1, 56, 'Instalasi Motor Listrik', 'mudah', 'Tujuan utama dipasangnya lampu indikator warna merah pada panel kendali motor biasanya untuk menandakan...', 'Motor sedang beroperasi normal', 'Sistem mengalami trip/gangguan', 'Tegangan masuk siap', 'Motor dalam posisi berhenti', 'Rangkaian masuk mode Delta', 'B', 'Secara konvensi panel, warna merah/kuning sering dipakai sebagai indikator trip atau alarm bahaya.'),
(57, 1, 57, 'Instalasi Motor Listrik', 'mudah', 'Alat perlindungan motor listrik terhadap kehilangan salah satu fasa pada sistem 3-fasa dinamakan...', 'MCB 3 fasa', 'Thermal Overload Relay', 'Phase Failure Relay (PFR)', 'Under Voltage Relay', 'ELCB', 'C', 'PFR mengawasi keseimbangan dan kelengkapan fasa pasokan listrik.'),
(58, 1, 58, 'Instalasi Motor Listrik', 'mudah', 'Jenis pengasutan motor yang menghubungkan motor langsung ke tegangan nominal jala-jala secara penuh disebut...', 'Star-Delta', 'Autotransformator', 'Soft starter', 'Direct On Line (DOL)', 'Variable Speed Drive', 'D', 'DOL (Direct On Line) memberikan tegangan penuh langsung saat motor start.'),
(59, 1, 59, 'Instalasi Motor Listrik', 'mudah', 'Untuk mengubah arah putaran motor induksi 3-fasa menjadi berlawanan arah, tindakan yang harus dilakukan adalah...', 'Menukar posisi dua fasa masukan', 'Menukar ketiga fasa bersamaan', 'Membalik polaritas kabel netral', 'Menambah nilai kapasitor', 'Menurunkan arus start', 'A', 'Menukar dua fasa (misal R dengan S) akan membalikkan arah medan magnet putar stator.'),
(60, 1, 60, 'Instalasi Motor Listrik', 'mudah', 'Papan nama (nameplate) pada motor listrik digunakan untuk mengetahui informasi mengenai...', 'Tanggal pembuatan saja', 'Spesifikasi teknis dan rating motor', 'Lokasi pemasangan instalasi', 'Nama operator mesin', 'Harga komponen motor', 'B', 'Nameplate berisi data mutlak seperti tegangan, daya, arus, cos phi, kecepatan, dan sambungan kumparan.'),
(61, 2, 61, 'Instalasi Motor Listrik', 'sedang', 'Pada rangkaian kendali Forward-Reverse, komponen untuk mencegah kedua kontaktor aktif bersamaan adalah...', 'Kontak Interlocking menggunakan NC kontaktor lawan', 'Kontak Self-Holding menggunakan NO kontaktor sendiri', 'Memasang dua MCB secara seri', 'Menggunakan Push Button NO saja', 'Menghubungkan paralel koil', 'A', 'Interlocking menggunakan kontak NC lawan mencegah bentrokan arus hubung singkat antar fasa.'),
(62, 2, 62, 'Instalasi Motor Listrik', 'sedang', 'Arus nominal motor 3-fasa adalah 10A. Berapakah setting arus yang tepat pada komponen TOR?', '5 A', '10 A', '15 A', '20 A', '25 A', 'B', 'Setting TOR disesuaikan mendekati atau sama dengan arus nominal motor (100%-110% dari I_nominal) untuk perlindungan efektif.'),
(63, 2, 63, 'Instalasi Motor Listrik', 'sedang', 'Rangkaian pengunci (self holding) pada kontaktor magnet memanfaatkan kontak bantu yang dipasang paralel dengan...', 'Push Button STOP', 'Push Button START', 'Koil Kontaktor', 'Kontak TOR', 'MCB Utama', 'B', 'Kontak NO bantu dipasang paralel dengan PB START agar arus tetap mengalir saat PB dilepas.'),
(64, 2, 64, 'Instalasi Motor Listrik', 'sedang', 'Sebuah motor induksi 3-fasa memiliki 4 kutub beroperasi pada frekuensi 50 Hz. Kecepatan sinkron motor tersebut sebesar...', '750 rpm', '1000 rpm', '1500 rpm', '3000 rpm', '1200 rpm', 'C', 'Ns = (120 x f) / P = (120 x 50) / 4 = 1500 rpm.'),
(65, 2, 65, 'Instalasi Motor Listrik', 'sedang', 'Bila motor 3-fasa tertulis rating tegangan 220V/380V dihubungkan ke jala-jala 3-fasa 380V, maka kumparan motor harus dihubung secara...', 'Star (Bintang)', 'Delta (Segitiga)', 'Open-Delta', 'Seri', 'Paralel', 'A', 'Rating 220V/380V artinya tegangan maksimum per kumparan adalah 220V. Pada jala 380V, koneksi Star menuntut tegangan fasa 220V.'),
(66, 2, 66, 'Instalasi Motor Listrik', 'sedang', 'Pada pengasutan Star-Delta, saat posisi Star besarnya arus start motor akan turun menjadi...', 'Sepertiga arus DOL', 'Setengah arus DOL', 'Dua pertiga arus DOL', 'Sama dengan arus DOL', 'Seperempat arus DOL', 'A', 'Koneksi Star menurunkan tegangan jala sebesar akar 3, berakibat arus start terpangkas menjadi 1/3 kali arus DOL.'),
(67, 2, 67, 'Instalasi Motor Listrik', 'sedang', 'Lampu indikator overload pada panel kendali motor dihubungkan melalui kontak nomor berapa pada TOR?', '95 - 96 (NC)', '97 - 98 (NO)', '13 - 14 (NO)', '21 - 22 (NC)', 'A1 - A2', 'B', 'Kontak 97-98 adalah kontak NO yang akan menutup (mengalirkan listrik ke lampu alarm) saat TOR trip.'),
(68, 2, 68, 'Instalasi Motor Listrik', 'sedang', 'Komponen elektronik yang digunakan untuk mengatur kecepatan motor induksi AC dengan mengubah nilai frekuensi adalah...', 'Soft Starter', 'Thermal Overload', 'Inverter / VSD', 'Kapasitor Bank', 'TDR', 'C', 'VSD (Variable Speed Drive) atau Inverter mengontrol kecepatan dengan mengubah frekuensi dan tegangan.'),
(69, 2, 69, 'Instalasi Motor Listrik', 'sedang', 'Berapakah besar slip pada motor jika kecepatan sinkron stator 1500 rpm dan kecepatan rotor terukur 1440 rpm?', '2%', '4%', '5%', '6%', '10%', 'B', 'Slip = (Ns - Nr) / Ns = (1500 - 1440) / 1500 = 60 / 1500 = 0,04 atau 4%.'),
(70, 2, 70, 'Instalasi Motor Listrik', 'sedang', 'Mengapa instalasi motor listrik industri diwajibkan memasang sistem grounding (pentanahan) pada bodi motor?', 'Menghemat konsumsi daya aktif', 'Mencegah bahaya tegangan sentuh akibat kebocoran arus', 'Meningkatkan torsi start motor', 'Menjaga kestabilan frekuensi jala', 'Mencegah trip pada MCB saat start', 'B', 'Grounding mengalirkan arus bocor bodi langsung ke bumi agar tidak menyengat manusia yang menyentuhnya.'),
(71, 2, 71, 'Instalasi Motor Listrik', 'sedang', 'Pada diagram rangkaian kendali motor DOL, komponen Push Button STOP dipasang secara...', 'Seri terhadap seluruh rangkaian kendali', 'Paralel terhadap Push Button START', 'Paralel terhadap koil kontaktor', 'Seri terhadap kontak utama MCB', 'Paralel terhadap kontak bantu NO', 'A', 'PB STOP berjenis NC dipasang seri di awal rangkaian agar dapat memutuskan seluruh aliran arus kendali saat ditekan.'),
(72, 2, 72, 'Instalasi Motor Listrik', 'sedang', 'Perbedaan mendasar antara kontak utama dan kontak bantu pada sebuah kontaktor magnit terletak pada...', 'Bentuk fisiknya saja', 'Kapasitas hantar arus (KHA) logam kontaknya', 'Tegangan kerja koil penggerak', 'Jumlah lubang sekrup terminal', 'Bahan isolasi bodi kontaktor', 'B', 'Kontak utama memiliki KHA besar untuk dialiri arus beban motor, sedangkan kontak bantu memiliki KHA kecil khusus arus kendali.'),
(73, 2, 73, 'Instalasi Motor Listrik', 'sedang', 'Fungsi utama dari sakelar sentrifugal pada motor induksi fasa tunggal jenis kapasitor start adalah untuk...', 'Memutus kapasitor start setelah motor berputar mendekati kecepatan penuh', 'Membatasi arus start agar tidak memicu trip MCB', 'Membalik arah putaran motor secara otomatis', 'Melindungi motor dari panas akibat beban lebih', 'Mengatur kecepatan motor agar konstan', 'A', 'Sakelar sentrifugal membuka secara mekanis akibat gaya putar untuk melepaskan kumparan bantu beserta kapasitor start.'),
(74, 2, 74, 'Instalasi Motor Listrik', 'sedang', 'Alat ukur yang paling praktis digunakan untuk memantau besaran arus beban total pada kabel motor tanpa memutus kabel adalah...', 'Multitester digital', 'Megger meter', 'Tang Ampere (Clamp Meter)', 'Wattmeter analog', 'Tachometer', 'C', 'Clamp meter memanfaatkan prinsip trafo arus dengan menjepitkan rahang alat ukur pada sekeliling inti konduktor.'),
(75, 2, 75, 'Instalasi Motor Listrik', 'sedang', 'Sebuah motor listrik 3-fasa menarik daya 7,5 kW. Jika dipasang MCB sebagai pengaman cabang tunggal, rating minimal KHA MCB sebesar...', '2 A', '4 A', '6 A', '16 A', '25 A', 'D', 'Arus nominal I sekitar 15A. Rating pengaman dipilih di atas I nominal motor, maka 16A adalah rating standar terdekat yang aman.'),
(76, 3, 76, 'Instalasi Motor Listrik', 'sulit', 'Saat pengujian Star-Delta otomatis, motor menyala posisi Star namun MCB trip saat pindah ke Delta. Masalahnya adalah...', 'Setting timer terlalu cepat', 'Kontak bantu NC Delta rusak terbuka', 'Salah pengkabelan kumparan terhubung singkat saat Delta', 'Tegangan PLN drop', 'Setting arus TOR terlalu rendah', 'C', 'Salah urutan kabel pada grup terminal pengubah (koneksi Delta) memicu hubung singkat fasa ke fasa saat kontaktor Delta aktif.'),
(77, 3, 77, 'Instalasi Motor Listrik', 'sulit', 'Motor induksi 3-fasa mengalami panas berlebih yang tidak wajar setelah beroperasi 15 menit. Hasil pengukuran arus fasa menunjukkan R=12A, S=12A, T=2A. Kondisi ini indikasi...', 'Beban mekanik terlalu berat', 'Terjadi kehilangan salah satu fasa (single phasing)', 'Tegangan jala-jala terlalu tinggi', 'Kapasitor bank meledak', 'Rotor mengalami slip total', 'B', 'Arus fasa T drop drastis menandakan hilangnya fasa tersebut akibat putus sikring/kabel, membuat fasa R dan S menanggung beban berat hingga panas.'),
(78, 3, 78, 'Instalasi Motor Listrik', 'sulit', 'Rangkaian kendali motor berurutan otomatis (Sequential) menggunakan 2 kontaktor. Kontaktor 2 tidak bisa aktif sebelum kontaktor 1 bekerja. Logika pemasangannya adalah...', 'Kontak NO kontaktor 1 diseri dengan koil kontaktor 2', 'Kontak NC kontaktor 1 diseri dengan koil kontaktor 2', 'Kontak NO kontaktor 2 diparalel dengan koil kontaktor 1', 'Kedua koil kontaktor dihubungkan secara paralel', 'Kontak NO kontaktor 1 diparalel dengan PB START 2', 'A', 'Dengan menseri kontak NO kontaktor 1 ke jalur koil 2, maka koil 2 mustahil mendapat arus sebelum kontaktor 1 menutup kontak NO-nya.'),
(79, 3, 79, 'Instalasi Motor Listrik', 'sulit', 'Sebuah motor induksi 3-fasa 4 kutub, f=50Hz, memiliki kecepatan rotor 1440 rpm. Berapakah frekuensi arus yang terjadi pada rotor?', '2 Hz', '50 Hz', '0 Hz', '48 Hz', '100 Hz', 'A', 'Ns = 1500. Slip s = (1500-1440)/1500 = 0,04. Frekuensi rotor f_r = s x f = 0,04 x 50 = 2 Hz.'),
(80, 3, 80, 'Instalasi Motor Listrik', 'sulit', 'Sebuah sistem konveyor industri menggunakan pengereman dinamis (dynamic braking) pada motor AC-nya. Prinsip kerja pengereman ini adalah...', 'Membalik urutan dua fasa secara tiba-tiba', 'Menginjeksikan arus searah (DC) ke kumparan stator setelah AC diputus', 'Menekan poros motor dengan kampas rem mekanis', 'Menghubung singkat seluruh terminal kumparan motor', 'Menurunkan frekuensi inverter secara perlahan', 'B', 'Injeksi arus DC menciptakan medan magnet stasioner yang memaksa rotor sangkar langsung berhenti berputar.'),
(81, 3, 81, 'Instalasi Motor Listrik', 'sulit', 'Mengapa pengasutan sistem Star-Delta tidak cocok diterapkan pada motor induksi 3-fasa yang memiliki nameplate rating tegangan 220V (koneksi Delta) / 127V (koneksi Star) pada jaringan PLN 3-fasa 380V?', 'Motor akan berputar terlalu cepat hingga terbakar', 'Tegangan kerja kumparan motor akan melebihi batas isolasinya', 'Torsi start motor menjadi terlalu besar', 'Timer tidak akan mampu memindahkan kontak', 'Arus start akan bernilai nol', 'B', 'Motor tersebut hanya boleh menerima tegangan fasa 220V (Delta). Jika diberi jala 380V, kumparan akan mengalami kerusakan isolasi total/terbakar.'),
(82, 3, 82, 'Instalasi Motor Listrik', 'sulit', 'Saat mengecek sebuah panel pompa listrik, ditemukan bahwa kontaktor magnet mengalami suara bergetar keras (humming) saat diaktifkan. Kerusakan komponen internal yang paling mungkin terjadi adalah...', 'Koil terbakar sebagian', 'Cincin pembagi fasa (shading coil) pada inti besi retak/putus', 'Kontak utama aus dan berkarat', 'Pegas pengembali terlalu lembek', 'Tegangan kendali terlalu tinggi', 'B', 'Cincin tembaga (shading coil) berfungsi menghasilkan pergeseran fluks magnet agar tarikan konstan. Jika retak/putus, gaya tarik magnet akan berfluktuasi menghasilkan getaran hebat/bising.'),
(83, 3, 83, 'Instalasi Motor Listrik', 'sulit', 'Sebuah sistem kendali cerdas menggunakan VSD untuk menggerakkan motor mixer industri. Ketika sistem dijalankan pada frekuensi 25 Hz (setengah dari frekuensi nominal 50 Hz), bagaimanakah kondisi torsi dan kecepatan motor?', 'Kecepatan konstan, torsi turun setengah', 'Kecepatan turun setengah, torsi tetap konstan', 'Kecepatan dan torsi keduanya turun setengah', 'Kecepatan turun setengah, torsi naik dua kali lipat', 'Motor berhenti dan terkunci', 'B', 'VSD menjaga rasio V/f konstan. Menurunkan frekuensi menjadi 25 Hz akan menurunkan kecepatan motor setengahnya, namun torsi kerja nominalnya tetap terjaga konstan.'),
(84, 3, 84, 'Instalasi Motor Listrik', 'sulit', 'Pada pengujian tahanan isolasi kumparan motor induksi 3-fasa menggunakan Megger dengan tegangan injeksi 500V DC, nilai minimum tahanan isolasi yang dinyatakan aman menurut standar umum/PUIL adalah...', '0,5 MegaOhm', '1 MegaOhm', '5 MegaOhm', '10 MegaOhm', '100 MegaOhm', 'A', 'Standar PUIL menetapkan batas minimum tahanan isolasi adalah 1000 Ohm per 1 Volt tegangan kerja, sehingga untuk sistem 220/380V minimal berkisar 0,5 MegaOhm (atau aturan praktis 1 MegaOhm).'),
(85, 3, 85, 'Instalasi Motor Listrik', 'sulit', 'Dalam instalasi motor listrik industri, manakah kombinasi urutan proteksi dan kontrol yang benar dipasang dari arah sumber daya menuju beban motor?', 'MCB -> Kontaktor -> TOR -> Motor', 'MCB -> TOR -> Kontaktor -> Motor', 'TOR -> MCB -> Kontaktor -> Motor', 'Kontaktor -> MCB -> TOR -> Motor', 'MCB -> Motor -> TOR -> Kontaktor', 'A', 'Urutan standar pengkabelan daya: Proteksi hubung singkat (MCB) -> Sakelar magnetis (Kontaktor) -> Proteksi beban lebih (TOR) -> Beban akhir (Motor).'),
(86, 3, 86, 'Instalasi Motor Listrik', 'sulit', 'Pada sistem pengereman motor jenis Plugging (Pengereman Balik), komponen apakah yang wajib dipasang pada poros motor untuk memutus arus agar motor tidak berputar ke arah sebaliknya saat berhenti?', 'Limit Switch', 'Proximity Sensor', 'Zero Speed Switch', 'Thermal Overload Relay', 'Time Delay Relay', 'C', 'Zero Speed Switch mendeteksi putaran poros mendekati nol untuk segera membuka rangkaian kendali kontaktor pengereman sebelum motor berputar balik.'),
(87, 3, 87, 'Instalasi Motor Listrik', 'sulit', 'Sebuah motor induksi 3-fasa memiliki nameplate dengan kode kelas isolasi F. Kelas isolasi ini menyatakan bahwa kumparan motor sanggup menahan suhu operasi maksimum sebesar...', '105 derajat Celcius', '120 derajat Celcius', '130 derajat Celcius', '155 derajat Celcius', '180 derajat Celcius', 'D', 'Kelas isolasi F dirancang untuk ketahanan suhu operasi batas maksimum sebesar 155 derajat Celcius.'),
(88, 3, 88, 'Instalasi Motor Listrik', 'sulit', 'Saat merancang sistem kendali motor untuk keperluan kran angkat (Hoist/Crane), kontak bantu apa yang harus diintegrasikan dengan rem elektromagnetik (Brake) agar rem terlepas tepat saat motor diberi energi?', 'Dipasang paralel terhadap sakelar utama panel', 'Dihubungkan melalui kontak NO kontaktor jalan menuju koil rem mekanis', 'Dihubungkan lewat kontak NC TOR sebagai indikator utama', 'Diseri langsung dengan tombol EMERGENCY STOP', 'Dipasang bebas tanpa terikat kontaktor utama', 'B', 'Rem mekanis hoist bertipe spring-applied (mengerem saat mati). Koil rem harus mendapat pasokan listrik (NO menutup) secara simultan bersamaan dengan kontaktor utama motor agar rem terlepas.'),
(89, 3, 89, 'Instalasi Motor Listrik', 'sulit', 'Sebuah pabrik mengalami masalah di mana motor induksi sering terbakar akibat fluktuasi tegangan jala-jala yang sering turun drastis (under voltage). Komponen kendali proteksi tambahan apakah yang paling ideal dipasang pada panel?', 'Over Current Relay', 'Under Voltage Relay (UVR) atau Voltage Supervisory Relay', 'Lightning Arrester', 'Ground Fault Detector', 'Kapasitor Bank otomatis', 'B', 'UVR memantau penurunan tegangan di luar batas toleransi dan akan memerintahkan sistem kendali memutus kontaktor utama guna melindungi kumparan motor dari lonjakan arus akibat low voltage.'),
(90, 3, 90, 'Instalasi Motor Listrik', 'sulit', 'Bila sebuah motor induksi 3-fasa dijalankan tanpa beban sama sekali (no-load test), berapakah perkiraan nilai faktor daya (cos phi) dari motor tersebut dibandingkan saat diberi beban penuh?', 'Jauh lebih rendah (mendekati 0,1 - 0,2)', 'Sama saja (tetap sekitar 0,8)', 'Jauh lebih tinggi (mendekati 1,0)', 'Bernilai negatif karena bersifat kapasitif', 'Bernilai nol murni', 'A', 'Tanpa beban mekanis, motor hanya menyerap arus magnetisasi yang murni bersifat induktif, berakibat pada faktor daya yang sangat rendah (buruk) sebelum dibebani kerja mekanis.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` enum('super_admin','guru','siswa') NOT NULL,
  `nama_lengkap` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nomor_telepon` varchar(20) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `nip_nik` varchar(50) DEFAULT NULL,
  `guru_mapel` varchar(100) DEFAULT NULL,
  `nisn` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `kelas` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `role`, `nama_lengkap`, `email`, `nomor_telepon`, `tanggal_lahir`, `password`, `created_at`, `nip_nik`, `guru_mapel`, `nisn`, `username`, `kelas`) VALUES
(1, 'super_admin', 'Administrator Utama', 'admin@sekolah.com', '08111111111', '1990-01-01', '$2y$10$m75GQLhWWrUehGIwkBftBelrhH7j7EIRAYzP2w2dsHoVtf1fy3Egq', '2026-06-27 01:58:45', NULL, NULL, NULL, NULL, NULL),
(2, 'guru', 'Budi Santoso, S.Pd.', 'budi@sekolah.com', '081234567890', '1985-05-12', '$2y$10$CwZUZD0ttFwPGGCdOWqWiOyPZMIRyBiwpjHuVCL8rH16aCnyZN6qu', '2026-06-27 01:58:45', '198505122010011002', 'Dasar Listrik & Instalasi Motor Listrik', NULL, NULL, NULL),
(3, 'siswa', 'Andi Pratama', 'andi@sekolah.com', '089876543210', '2008-10-15', '$2y$10$Y5XQfb4bBGNjmqo9UIgPUel.EAyeWDAxPiLKCb94gDuUn2lgfXNmq', '2026-06-27 01:58:45', NULL, NULL, '99887766', 'siswa_andi', 'XII TITL 1'),
(5, 'siswa', 'Zaskia Azzahra', 'zaskiaazzahra639@gmail.com', '087870202213', '2010-07-31', '$2y$10$WhoDHGm5tzbUqQW4c8of1.7AROQdZrjtoP5PzgT/jtPKAheupgoCK', '2026-06-27 03:12:26', NULL, NULL, '0101194622', 'Zaskia azzahra', 'XI.liskap 2'),
(6, 'guru', 'Gita Yulianti', 'gitayulianti@smkn5batam.sch.id', '081234567891', '2026-06-03', '$2y$10$4RCIqcpGDpBWu3qaFZKOGu2sUTzhWinV57Aa3pfq4Vi3FCop4TDkq', '2026-06-27 03:24:02', '123456567876432', 'dasar dasar ketenagalistrikan', NULL, NULL, NULL),
(7, 'siswa', 'tes', 'tes@gmail.com', '1234567', '2026-06-30', '$2y$10$Ecseq6hXbWQtZeI3WZTcseKgyQ6p6r8jtiYVYpeCR34uV/umHO8jm', '2026-06-27 03:30:05', NULL, NULL, '123456787965432', 'tes', 'tes'),
(8, 'siswa', 'peter junius', 'juniuspeter0@gmail.com', '0895410601435', '2009-11-02', '$2y$10$duSRZcmXeJE3sMpjDOLd0ef4i80o32/wUU8HC7wU0NySCtfoh.S06', '2026-06-27 03:45:21', NULL, NULL, '0092300392', 'Junius Peter ', 'X TITL 1'),
(9, 'siswa', 'Ridho Al-Hamzah ', '19ridhohamzah@gmail.com', '081968438889', '2007-12-21', '$2y$10$mcweGxcTJL2BNQy05Qp7N./TeNiFbUS0xacZg8YiGukY3vTNPBlHW', '2026-06-27 07:59:45', NULL, NULL, '0076561920', 'Ridho', 'XI TELK'),
(10, 'siswa', 'Clara Anggraini Panjaitan ', 'clarapanjaitan67@gmail.com', '081224433590', '2009-07-05', '$2y$10$wgOAADEdIskWG8V/GyL.ruyz6L431pH3nGw2Q1vYzvavZjGcbzek.', '2026-06-27 08:08:05', NULL, NULL, '0098608923', 'Clara', 'XII TITL 2'),
(11, 'siswa', 'Muhamad Dedi', 'dedi48179@gmail.com', '081918683227', '2009-04-16', '$2y$10$CNQN/EaNe8EW10AtF0jtDODUMyXtptrlQCrgRuyM0gjy8URKQUyjS', '2026-06-27 08:09:15', NULL, NULL, '0098554581', 'Dedj', 'XII TITL 2'),
(12, 'siswa', 'verlitaaaqilhrezky', 'verlitarezky@gmail.com', '085819719728', '2009-03-10', '$2y$10$QG1i6XD/WQthkLCErrXTY.f0x/uks6NxXgwtXNpjlbyiZCDlc2xLm', '2026-06-27 08:10:28', NULL, NULL, '0092787202', 'verlitarezky', 'X TITL '),
(13, 'siswa', 'Ainur Rahmii', 'rahmiiainur@gmail.com', '', '2009-03-10', '$2y$10$I46MnPjJzTm8P6AIj7CYvOHEToBY0RLcKYxzupAQ86y33u3dn6ggS', '2026-06-27 08:10:51', NULL, NULL, '0092871980', 'ainurahmi maulidda', 'XII TITL 2'),
(14, 'siswa', 'DAVID AL MUZAKI', 'sastudy7@gmail.com', '081266213690', '2008-11-04', '$2y$10$JPvyhF2w26N4h0sq6ddQGOfT6oY2QRhpnrrW8cYVr2TOOEOTuf1tq', '2026-06-27 08:19:55', NULL, NULL, '0083867048', 'DAVID ', 'XII TITL 2'),
(15, 'siswa', 'Firman Nisawulan', 'firmannisawulan@gmail.com', '', '2009-01-28', '$2y$10$cDmLRrgeOBO5ApMTnl63Mel4q53EepNQBnU5rE8Is1ddSqk8Spnni', '2026-06-27 08:26:26', NULL, NULL, '0092331998', 'maant00k', 'X11 TITL2'),
(16, 'siswa', 'Mega', 'eziega903@gmail.com', '083875439019', '2008-06-27', '$2y$10$6h3f.5F77H0F5GqY1gU7gOmasmnWuXzzow4Pwy1vUY4One4p4ELSK', '2026-06-27 08:34:39', NULL, NULL, '0084665741', 'Mega', 'XII TITL2'),
(17, 'siswa', 'Shella Kirani', 'shellakirani2601@gmail.com', '085809839546', '2008-02-26', '$2y$10$0vMKUdRkM/Vdg3paolr8juKAbj12vHx9KMwKY8HygF3aUpWRzPc4.', '2026-06-27 08:37:46', NULL, NULL, '0089953168', 'Shella', 'XII TITL 2'),
(18, 'siswa', 'Satria Shifano Riansyah', 'satriashifanoriansyah@gmail.com', '085730654414', '2009-06-14', '$2y$10$si/Es26wwgKMersu4fCeGe4IrgxZaRROKi99jTBqm8TXSQkVouCd2', '2026-06-27 08:40:51', NULL, NULL, '0094717192', 'Satria Shifano Riansyah', 'XI TITL 3'),
(19, 'siswa', 'Julia Trisnawati', 'trisnawatijulia08@gmail.com', '083176632046', '2008-09-05', '$2y$10$K/rsxTk7ge3fc5Y9Ut5FHeHBXFMmU2rb9lf3jcMlGCEFomD0lmzye', '2026-06-27 08:47:46', NULL, NULL, '0089481570', 'julia trisnawati ', 'XII TITL'),
(20, 'siswa', 'Raja Ahmad Haikal', 'hkal9289@gmail.com', '083181428847', '2008-11-04', '$2y$10$zFOUQ6MQL23OHtnx9h/sRu/xa9FGO8KqAqKwblNMYiLk6AalaEArW', '2026-06-27 08:49:00', NULL, NULL, '1371040411080001', 'SMKN5PDG_RAJA', 'XII TITL 2'),
(21, 'siswa', 'Dessandi Bagus', 'bdessandi@gmail.com', '', '2009-12-13', '$2y$10$aEkRwLu6pevKpfmBG/B97Oef3.bd6WtGvzLwIagVk2b4Y5iCXldiG', '2026-06-27 08:52:01', NULL, NULL, '0095005814', 'Artha', 'X-TITL 3'),
(22, 'siswa', 'Yogi Pangga', 'panggayogi@gmail.com', '085763547394', '2009-06-07', '$2y$10$wO5hvHlMyEahX.JTK6tp9e9kNpfgFDw0ZhJ2yvZp/pdrUsDMHhqTW', '2026-06-27 08:53:49', NULL, NULL, '0099521358', 'yogipangga ', 'X LISKAP 2 '),
(23, 'siswa', 'akhmal', 'akhmalkhasyinasrullahhh@gmail.com', '085755139598', '2009-07-09', '$2y$10$/zEt0SksGT91iRvNHpYkqeQFBTgPhJGUTqlQ0NhjVhiz085VRSyQK', '2026-06-27 08:54:37', NULL, NULL, '0092314984', 'Akhmal', 'XI TITL 3'),
(24, 'siswa', 'Kristiyan Dwi Fernando', 'kristiyanfernando@gmail.com', '081231862076', '2008-08-11', '$2y$10$MR089nVqab.RP/ViCWOwQ.WihWAPwif.QsvYaOcj5bnrmUr5mycUu', '2026-06-27 09:01:22', NULL, NULL, '0083349633', 'Fernando', 'XII TITL 3'),
(25, 'siswa', 'Natasya Nuramelia', 'natasyanatasya909@gmail.com', '0895359613447', '2008-05-08', '$2y$10$82PRBFGFQSyYLPBcRHSrK.JH08GyLk/3Heh5k2RIRZxtmDyc5BHo6', '2026-06-27 09:11:03', NULL, NULL, '0084582079', 'tasya', 'XII TITL 2'),
(26, 'siswa', 'REYHAN JULIANO MAHMUDI', 'julmalesin@gmail.com', '08212153313', '2008-07-16', '$2y$10$CFDKJ1hmbcHVGFpSNArdse6IPyRX304FbpG3keoBywmwpgWC2W6mG', '2026-06-27 09:12:08', NULL, NULL, '23975', 'JOELL', 'XII TITL 2'),
(27, 'siswa', 'car x drift', 'carx65159@gmail.com', '082122762856', '2009-03-29', '$2y$10$NQ5.Fg3X/QWxIrNEjnf4EOvUn.3U5vUnmbcZofCkq7qlYzuuvGPVy', '2026-06-27 09:12:59', NULL, NULL, '0092798160', 'Hiskia', 'XI TITIL 2'),
(28, 'siswa', 'Alan abdika zawaly', 'alanabdikazawaly@gmail.com', '087781936261', '2008-08-23', '$2y$10$7esifWwelMZGVfL8a/mF8.JCb46zT1NcUcsVLI0LI8wN1idy5vWGW', '2026-06-27 09:16:02', NULL, NULL, '3088682195', 'Alan', 'XII TITL 1'),
(29, 'siswa', 'Hadit Atmajaya16', 'haditatmajaya16@gmail.com', '', '2008-12-16', '$2y$10$IvYWQQLYu69bP0pY.NUBwuUmJjEESOqd5X9g3VV7k4JiA9gT71eWG', '2026-06-27 09:16:11', NULL, NULL, '0086652038', 'Hadit', 'Xl TITL 4 '),
(30, 'siswa', 'Jihan nuraeni', 'jnuraini99@gmail.com', '082287425732', '2008-10-16', '$2y$10$Sq7/BYsnjmo4osEvwBXNVuAyDFyAf5N8tfyCe04MqAQvXKvRWzYqe', '2026-06-27 09:16:30', NULL, NULL, '0083699518', 'Jihan ', '12 TITL 2 '),
(31, 'siswa', 'OP NASSER HADES', 'nasser.hades04@gmail.com', '081266818542', '2009-02-04', '$2y$10$FY4QRW5Mt2IP2PqeJWuCWOnQvB9WHf2L1pMsb88zNWaBkp39AQC.G', '2026-06-27 09:29:37', NULL, NULL, '0091488963', 'Nasser Al Najar Hidayat ', 'X TITL 2'),
(32, 'siswa', 'RIZKI PUTRA ', 'rizputra2901@gmail.com', '087775884133', '2009-01-29', '$2y$10$Q/j0uenvM31vIlmD8XXRcOpO1RhN7CLdp7VtACyadmMvaQNhOguoO', '2026-06-27 09:49:17', NULL, NULL, '0092841077', 'RIZKI PUTRA', 'XI TITL 2'),
(33, 'siswa', 'Christina Oktavia Pelni', 'christnaoktviapelni@gmail.com', '082176474494', '2008-10-05', '$2y$10$v8/LoUAdt6O8dRT8juuBBuZ1sR2KTgo3xZSmC3GtbRINtM/ls.WOy', '2026-06-27 09:49:43', NULL, NULL, '0087232402', 'Christina Oktavia Pelni', 'XII TITL ll'),
(34, 'siswa', 'maernayu naura', 'maernayu93@gmail.com', '089529926610', '2008-11-29', '$2y$10$oh5m.K0PHtJ2AM/IG0Aqzu.3p6sqKkTVy6QtPrqp04S7TVtwVZGHy', '2026-06-27 09:53:11', NULL, NULL, '0087740790', 'maernayu ', 'Xll TITL 2'),
(35, 'siswa', 'Sella ', 'sellakurniawati6@gmail.com', '083879053106', '2026-06-27', '$2y$10$XAVcFmIce.XmR5UkMrYl2uTS06Zh5RiFQH6Y1LKZS12h8su6Xrxaa', '2026-06-27 09:54:32', NULL, NULL, '-', 'Sella ', 'XII'),
(36, 'siswa', 'Muhammad Hafiz', 'mhafizrahman05@gmail.com', '083150553337', '2009-10-15', '$2y$10$RNS2/Y8XZlpDDIVjfir9mekMosXQMcSXhIsdxzWyR/rpzlPVU.3Pu', '2026-06-27 10:03:07', NULL, NULL, '10310780', 'Muhammad Hafiz Rahman ', 'XI TITL 2'),
(37, 'siswa', 'Ahsin Kama Ahsanta', 'ahsink642@gmail.com', '089601672235', '2008-11-21', '$2y$10$p3pyv72hKU2bfCfXZPBN0OdiEX3Sts0XCsTPrL.oksvwlwCJkY5Am', '2026-06-27 10:16:28', NULL, NULL, '0089671178', 'ahsin ahsanta', 'XII TITL 2 '),
(38, 'siswa', 'Zani Ricardo', 'zaniricardo3@gmail.com', '085296672996', '2008-04-15', '$2y$10$B4hejxeTaPWmCKR9MOun/OMwHn685KehQG.Zl6njplidr.QK3tpBG', '2026-06-27 10:16:33', NULL, NULL, '0085186693', 'jani', 'XII TPTU'),
(39, 'siswa', 'Muhammad alfath', 'muhamadalfa626@gmail.com', '08136759426', '2008-10-20', '$2y$10$xHpPrwAvBaOETWLwxsBYp.SBilk1/IrKOygQZHxbX6z.an648YJbO', '2026-06-27 10:17:33', NULL, NULL, '0088161814', 'Alfat', 'XII TITL 2'),
(40, 'siswa', 'Nabila Atika Alrafa', 'nabilaatikaalrafa08@gmail.com', '', '2009-08-03', '$2y$10$JN6vQS3StaQ3Pz1FtBk71.Cqlv.KcqUrtEIrxeoXBEHeKn/iWqi/q', '2026-06-27 10:25:18', NULL, NULL, '3090288234', 'Nabila', 'XII TITL 2'),
(41, 'siswa', 'Muhammad indra Gunawan ', 'mindrasetiawan58@gmail.com', '0882-7930-7497', '2009-10-21', '$2y$10$BObw1L0soHixOMtmoaRS7O1XJj1hG0g8oSDTIuwh3wfNdH5cJkJcS', '2026-06-27 10:40:49', NULL, NULL, '0096725587', 'Indra ', 'XII TITL'),
(42, 'siswa', 'Rusdi hamdani', 'rh5826026@gmail.com', '083192565561', '2008-10-10', '$2y$10$zREI50AMA3DgSRh2iRGPFuARhLI.A8Ibkbr6yjdeDH75GFR86uwOe', '2026-06-27 10:43:02', NULL, NULL, '0085097239', 'Rusdi ', 'XII TITL 1'),
(43, 'siswa', 'Delvin Neo Gaisan', 'delvinneogaisan@gmail.com', '082172849842', '2009-02-19', '$2y$10$leYrWYOvbcnMgfcH9FqwHeQFohUT1s5ep5YKYcMOGdy4CycPRvN72', '2026-06-27 10:46:57', NULL, NULL, '3090893432', 'Delvin Neo Gaisan', 'XII TITL 2'),
(44, 'siswa', 'Aura Putri', 'auradwiputri16@gmail.com', '081266487985', '2008-04-16', '$2y$10$vlXn9G0gZUFKhHBaqzDBee6By/AQqO0vWaNobe.GtyR1DVLuqj5O.', '2026-06-27 10:50:26', NULL, NULL, '0088219700', 'AURA', 'XII TITL 2'),
(45, 'siswa', 'Rifqi Zahran', 'rifqizahran2010@gmail.com', '085856972471', '2010-01-18', '$2y$10$TZsnm2038mox0hJZVWdRaerqwbLgxAHMB4vQq4bCyJz94RHQqzDqG', '2026-06-27 11:04:07', NULL, NULL, '0102086427', 'Rifqi ', 'X TITL3'),
(46, 'siswa', 'Refaldy Azief', 'refaldyazief4@gmail.com', '082287360266', '2010-04-14', '$2y$10$S1LdMfB9/31WEo3g/AbNHOCfY9K5/ctuMeUOXXzMQOAezBjYRAkUm', '2026-06-27 11:08:44', NULL, NULL, '0106391180', 'ReFaldy.A', 'X TITL 3'),
(47, 'siswa', 'ikhsan ananta', 'ikhsanta7@gmail.com', '085974181015', '2010-03-29', '$2y$10$CHh6vzrrSArPCWnahwN.guQljcjyYg9rPlnzH.eMPKrRvAfEoxa2K', '2026-06-27 11:12:15', NULL, NULL, '0108066892', 'ikhsan', 'X TITL 3'),
(48, 'siswa', 'Jogi sappriel Hutagalung', 'sibujingbabi@gmail.com', '083140084246', '2009-04-27', '$2y$10$JyfiiM7W1oAZ/WI48j9zu.Wg5EwPZtdtUC78ZbnpiN3uhMgH5J2xG', '2026-06-27 11:29:02', NULL, NULL, '0095035988', 'Jogi', 'Xll-TAV'),
(49, 'siswa', 'Banu putra Syafa\'at', 'banuputrasyafaat@gmail.com', '082127800643', '2009-05-05', '$2y$10$aYs6/t31if17f0rgB/M/F.6gUYKEmT5UrZHV.EUzn0IvCjBYcSNOi', '2026-06-27 11:31:40', NULL, NULL, '0094079138', 'banuputrasyafaat', 'XI TITL 3'),
(50, 'siswa', 'Harold serdi', 'haroldserdi34@gmail.com', '081361340102', '2009-10-28', '$2y$10$aeTE.Vqj6ZdDq3MQxShA5uiITflF/hxEHpyO1X7sFMWcF46urkVYW', '2026-06-27 11:37:02', NULL, NULL, '0093026673', 'Harold', 'XII TAV'),
(51, 'siswa', 'Fitri Asifa Hutagalung', 'fitrihtg9@gmail.com', '083845434082', '2010-10-10', '$2y$10$N2ojp6j6e53tq2ZYPkQ9wucQ/vXNIxopnSbRt3PLyV.CwQ2EWAWJ.', '2026-06-27 11:39:38', NULL, NULL, '0105895916', 'Fitri ', 'X-TAV '),
(52, 'siswa', 'Daniel Suhada ', 'danilsuhada55@gmail.com', '085664008936', '2009-09-28', '$2y$10$pPTy.ND6p5KqFuMq7ITq/.H8ogzFyIyaMd0hvcEwz7WfqkSCaHrjC', '2026-06-27 11:40:00', NULL, NULL, '24.1351', 'Daniel Suhada ', 'XI TSM 1 '),
(53, 'siswa', 'Muhammad Yafi Nasuha', 'yafinasuha09@gmail.com', '0895360704488', '2009-09-17', '$2y$10$C/OCQ0uqXYxyv78oMAO0x.flhgHknhp1BC/2VVRs3KreGXneNe5JK', '2026-06-27 11:46:20', NULL, NULL, '0091697982', 'yafi', 'XI TITL 3'),
(54, 'siswa', 'Arya Maulana Tanjung ', 'aryamaulana1234567890a@gmail.com', '085188901424', '2010-01-27', '$2y$10$9xw8knudum4UdyR2Sj8RK.yT9BMarQ5y7xhs9S05OccWUhHAxZWS6', '2026-06-27 12:02:37', NULL, NULL, '0101378705', 'Arya', 'X-TAV'),
(55, 'siswa', 'Aurel damayanti', 'xirelldmyanti@gmail.com', '082286670322', '2008-12-23', '$2y$10$yhF1TTV3b9l9Bggwla2nW.iMMKsPaXW1x/eJm.J8GEOTN2t62Lw5m', '2026-06-27 12:06:12', NULL, NULL, '0087872203', 'Aurel', 'XII TITL 2'),
(56, 'siswa', 'Ayam Hutan', 'ayamh0338@gmail.com', '085763226408', '2026-10-10', '$2y$10$oVuVybatljeKzgoGFi8WbONtLSfnL2DjENH07raDO60W/FRUVbCyO', '2026-06-27 12:06:15', NULL, NULL, '0088307055', 'Aditiya Darmansyah HSB ', '11 tsm²'),
(57, 'siswa', 'Rafa Ramadhan Pratama ', 'mastercraf999@gmail.com', '083878569841', '2009-08-28', '$2y$10$mVCv0fX6EHfnmxpQSd7Oq.bsXGExUZIiReMv/g3S96rM.03N8TaUy', '2026-06-27 12:23:49', NULL, NULL, '24.1388', 'Pratama ', '11 tsm 1'),
(58, 'siswa', 'Raihan Ramadhani', 'raihannr7529@gmail.com', '087822376146', '2009-05-07', '$2y$10$tCzxgtH6z5XRcQGRmxVnUOtilicie40si/qDP6duSu9CQ8SZBoMey', '2026-06-27 12:24:22', NULL, NULL, '0093659175', 'Raihan', 'XI TITL 3'),
(59, 'siswa', 'ALI AL IKRAM IRFAN ', 'nurnazlaainanafisa@gmail.com', '0882015483862', '2010-06-19', '$2y$10$iksobg/1HcKmw3MWD83xUeURr0QjUqy39RL0DRqP031F0/G8nxiDy', '2026-06-27 12:49:26', NULL, NULL, '1428', 'IKRAM ', 'XII TITL3'),
(60, 'siswa', 'ZULKARNAIN ZULKARNAIN', 'zulkarnain572@guru.smk.belajar.id', '081377065482', '2026-06-27', '$2y$10$dDVatWfCxA9REjkNXA6kPOC.F8IroxTBGPJ6Bp1ZP9itwV6gPtS7m', '2026-06-27 12:58:53', NULL, NULL, '3116909705', 'Zulkarnain', '12 TSM 3'),
(61, 'siswa', 'M.haris saputra', 'aaiissaputra21@gmail.com', '085284381799', '2008-10-21', '$2y$10$QAcvpVFu8N2fg3gztJnhd.XaK72HpXAFZvVn8Iisu8P4SWvAuij2O', '2026-06-27 13:03:10', NULL, NULL, '3084808442', 'Haris', 'Xl'),
(62, 'siswa', 'Airin Sari Balqis ', 'balqisairin1@gmail.com', '083843143559', '2008-11-18', '$2y$10$yr7Or1MeSzIBQHegeMy1ge7STtsCeaU.3Zd2wmEkRhu4X0/Od6Fpu', '2026-06-27 13:09:19', NULL, NULL, '0081114124', 'Airin', 'X TITL'),
(63, 'siswa', 'Muhammad Jufandra ', 'jufandra2008@gmail.com', '089523568021', '2008-12-26', '$2y$10$WVTibkHlSWW7neGdh.trQOwk9Cmri/4CyfdcWrVRpM0N0AxWyClXi', '2026-06-27 13:09:46', NULL, NULL, '0089684774', 'Andra', 'X TITL 3'),
(64, 'siswa', 'YUSUF OKTA Rizki', 'yusufokta02@gmail.com', '082392284157', '2009-10-02', '$2y$10$wAlqZzeqBBHzcgeAlx7SC.LEzOYF8U93GpfCEnEbcppK3rPjgkjBi', '2026-06-27 13:20:30', NULL, NULL, '0095412140', 'YUSUF OKTA RIZKI PRATAMA ', 'XI TITL 3'),
(65, 'siswa', 'VIERLY JOWANNAS', 'vierlyjowannas23@gmail.com', '082160552865', '2009-04-23', '$2y$10$JR63dLj6paT.Ij.2VMoUMumgO5Zm.1ErMptverqs4LP16dm728xmm', '2026-06-27 13:22:06', NULL, NULL, '1207342304090006', 'VIERLY ', 'XIITITL 3'),
(66, 'siswa', 'KARINA MELIANA', 'kareenameli@gmail.com', '082314028889', '2009-09-27', '$2y$10$qZMzVBL.ENrMmboedlxhIuA5aq5huZG4oLZqHSS5o8HD9qLnn/wte', '2026-06-27 13:26:35', NULL, NULL, '0092314779', 'KARINA', 'XI.TJK 3'),
(67, 'siswa', 'Daffaahnafi ', 'daffaahnafipro@gmail.com', '0895618525593', '2009-08-19', '$2y$10$EBy0Unr48ntPLJDrZ1cTTeUmYW2OSy3qQSuHT5IoFj5QkO3SWLrI6', '2026-06-27 13:39:08', NULL, NULL, '0095187165', 'Daffa', 'XI TITL 3'),
(68, 'siswa', 'Rizky Afghan Firza ', 'afghanfirzarizky@gmail.com', '081933580087', '2009-02-14', '$2y$10$J7FifsVXL/F56mWjiUN.B.laul2FMAp9SAWQs/KxYYXfqLPY2IuzS', '2026-06-27 14:02:50', NULL, NULL, '3091341366', 'Afghan', 'XI TITL 2'),
(69, 'siswa', 'Cahya Ibnu Hibban', 'cahyacahyaibnuhibban02@gmail.com', '081274961714', '2009-07-24', '$2y$10$u2LC0Uc37XS0fL1ZbZkVre5T6pPzk75qgadhSrnnhIDBzKjAo13Tm', '2026-06-27 15:42:29', NULL, NULL, '0091575784', 'HIBBAN', 'XI TITL 3'),
(70, 'siswa', 'Abdul Muchtar hakim', 'amuchtarhakim@gmail.com', '083136613890', '2008-05-23', '$2y$10$LgsszVsfJFwWNGWOUNYKve32l5nbLDz3lBsOP8r8lTN6y/Di63qva', '2026-06-27 15:52:16', NULL, NULL, '24.1334', 'abdul', 'Xll tsm 1'),
(71, 'siswa', 'Gita Yulianti', 'gitayuliantitarigan@gmail.com', '111111', '2026-06-24', '$2y$10$79x0xN.WVCNmNIGsvro1f.4xp3Z9DLt6Wj3P2.5qL7KvsRyKKsrdS', '2026-06-27 16:49:48', NULL, NULL, '111111', 'gitayulianti@smkn5batam.sch.id', 'xii titl 2'),
(72, 'siswa', 'Bayu irwansyah', 'bayuirwansyah293@gmail.com', '', '2026-06-11', '$2y$10$QbvUMmpp090/SztSAfUYXeM8pGY.LEHmZjebZ7q1nJp2PTRJfLjNq', '2026-06-27 19:45:12', NULL, NULL, '24015', 'bayuirwansyah293@gmail.com', '12'),
(73, 'siswa', 'FADLAN MAULANA', 'fadlanmaulana977@gmail.com', '085808596010', '2008-08-31', '$2y$10$wHHPjiaX656u/B9EQ7Ssl.PsJ/BdOI7yp4ZflVuJpBQmBhTxtq7.u', '2026-06-27 22:46:23', NULL, NULL, '24.1356', 'FADLAN', 'XII TSM 1'),
(74, 'siswa', 'Dinijuliani', 'dinijulianiprd@gmail.com', '085360633231', '2008-07-14', '$2y$10$TYPHcq2Qk5oH4JsjwYSwPO9kfbSOVSV/ggeGSccIrPzsh66P9Bq7.', '2026-06-28 00:25:39', NULL, NULL, '10414501.26', 'Dinijuliani', 'XII'),
(75, 'siswa', 'Dava Adian', 'davaadrian966@gmail.com', '085718736525', '2009-01-22', '$2y$10$E2VCcyMPS.vz6aS0EnbX/uW46sQ7Ndcavs36f1lVi/zhMBZ6XTCt6', '2026-06-28 00:43:27', NULL, NULL, '0104257229', 'Dava ', 'X TITL 3 '),
(76, 'siswa', 'Abdilah sani', 'abdilahsani181@gmail.com', '083839411592', '2008-12-09', '$2y$10$RPG4Xw932PMJR5F4m6C.ouqWS.tDIjLox9vd0lHfMz61P2Q8UrQ02', '2026-06-28 05:15:32', NULL, NULL, '24.1334 / 0085577765', 'Abdilah sani', 'XII TSM 1'),
(77, 'siswa', 'baju kaos', 'kaosbaju052@gmail.com', '083836004281', '2009-03-12', '$2y$10$rFLR9TP11bgaGxO5fThQNOA0yqch.9/HZx9gBPJHA.4.b./PK9oJa', '2026-06-28 09:13:36', NULL, NULL, '24.1342', 'AJI MAULANA ', 'XII 1'),
(78, 'siswa', 'Dimas Panji Satriyo', 'dimasss2270@gmail.com', '082152381562', '2010-01-04', '$2y$10$nSd95sRYBEWK3u5vFt5fXuAdSVc72Hjelgfy77mcu4JGR70jwTvKu', '2026-06-29 11:53:48', NULL, NULL, '0102227246', 'Dimas', 'XI TKTL C'),
(79, 'siswa', 'Noval Andika ', 'andikanoval587@gmail.com', '081372065414', '2009-11-21', '$2y$10$8RDtvnZy4fiTJVpvRIl7AeQLS6PaozAnS.lvRKtCmHhBaF75P4Fti', '2026-06-29 12:05:27', NULL, NULL, '0098870559', 'Noval', 'X TITL3 ');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `attempts`
--
ALTER TABLE `attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_student` (`student_id`),
  ADD KEY `fk_exam_attempt` (`exam_id`);

--
-- Indeks untuk tabel `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_exam` (`exam_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `attempts`
--
ALTER TABLE `attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT untuk tabel `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `attempts`
--
ALTER TABLE `attempts`
  ADD CONSTRAINT `fk_exam_attempt` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

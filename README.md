# Aplikasi Ujian Sekolah (CAT) - Dasar Listrik SMK

Aplikasi Ujian Sekolah berbasis Computer Assisted Test (CAT) adaptif yang dirancang untuk mengukur evaluasi hasil belajar siswa pada mata pelajaran Dasar Listrik SMK secara dinamis dan aman.

Aplikasi ini dikembangkan oleh **Ridho kurnia Ramadhan** sebagai bagian dari penelitian tesis/akademik.

---

## 🚀 Fitur Utama

### 1. Adaptive Difficulty Testing (CAT)
* Menyajikan soal ujian secara adaptif berdasarkan tingkat kemampuan siswa (Mudah, Sedang, Sulit).
* Algoritma penentuan tingkat kesulitan soal disesuaikan secara real-time berdasarkan performa jawaban sebelumnya.

### 2. Monitoring & Dashboard Guru
* **Statistik Real-time**: Grafik performa rata-rata siswa dan distribusi profil nilai (Baik, Cukup, Kurang).
* **Export Data Premium**: Fitur ekspor data siswa dan log ujian secara langsung ke format spreadsheet Excel asli (`.xlsx`) dengan format kolom yang rapi untuk kebutuhan analisis statistik penelitian.
* **Manajemen Bank Soal**: Kemudahan bagi guru untuk melakukan kurasi soal, menambah, atau menghapus soal sesuai tingkat kesulitan.

### 3. Anti-Cheating & Pengawasan Siswa
* **Deteksi Keluar Tab**: Sistem otomatis mencatat dan menyimpan log riwayat berapa kali siswa keluar dari tab ujian/browser (indikasi membuka tab baru/mencari jawaban).
* **Timer Ujian**: Batasan durasi waktu ujian yang dikelola langsung dari backend.

### 4. Dashboard Super Admin
* Manajemen penuh hak akses akun pengguna (Siswa, Guru, dan Admin).

---

## 🛠️ Arsitektur & Tech Stack

* **Frontend**: React.js (Vite), Tailwind CSS (Aesthetic glassmorphism UI), Lucide Icons, SheetJS (`xlsx`)
* **Backend**: PHP Native (REST API dengan PDO Connection)
* **Database**: MySQL / MariaDB

---

## 💻 Panduan Instalasi Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda (*development environment*).

### 1. Clone Repository
Langkah pertama, unduh proyek ini ke komputer lokal Anda menggunakan Git:
```bash
git clone https://github.com/backburnerMax/ujiansekolah.site.git
cd ujiansekolah.site
```

### 2. Konfigurasi Database (MySQL)
1. Aktifkan MySQL server di komputer Anda (misalnya melalui XAMPP atau Laragon).
2. Buat database baru di phpMyAdmin/MySQL client Anda dengan nama:
   ```sql
   CREATE DATABASE ujian_sekolah;
   ```
3. Jalankan skrip migrasi dan seeder untuk menginisialisasi tabel serta mengimpor data awal (soal dan user dummy):
   ```bash
   php api/migrate.php
   php seeder.php
   ```

### 3. Jalankan API Backend (PHP)
Jalankan built-in PHP development server pada port `8000` (agar sesuai dengan setelan proxy Vite):
```bash
php -S localhost:8000
```

### 4. Jalankan Tampilan Frontend (React)
Buka terminal baru di direktori root proyek ini, lalu pasang dependensi dan jalankan server pengembangannya:
```bash
# 1. Install Node.js dependencies
npm install

# 2. Jalankan development server
npm run dev
```
Buka browser Anda dan akses halaman website di: **`http://localhost:5173`**.

---

## 👤 Pembuat & Kontributor
* **Ridho kurnia Ramadhan** - *Developer Utama & Peneliti*

# Aplikasi Ujian Sekolah (CAT) - Dasar Listrik SMK

Aplikasi Ujian Sekolah berbasis Computer Assisted Test (CAT) adaptif yang dirancang untuk membantu evaluasi belajar siswa pada mata pelajaran Dasar Listrik SMK. 

Aplikasi ini dikembangkan oleh **Ridho kurnia Ramadhan**.

---

## 🚀 Fitur Utama
1. **Adaptive Testing (Ujian Adaptif)**: Soal ujian disajikan berdasarkan tingkat kesulitan (Mudah, Sedang, Sulit) untuk mengukur performa siswa secara dinamis.
2. **Dashboard Guru**: 
   * Pemantauan statistik rata-rata seluruh nilai dan distribusi profil nilai ujian siswa.
   * Log riwayat pengerjaan ujian lengkap dengan durasi pengerjaan, skor akhir, dan jumlah pelanggaran.
   * **Ekspor Data ke Excel (.xlsx)** untuk memudahkan pengumpulan data penelitian tesis.
   * Manajemen bank soal (tambah/hapus soal berdasarkan tingkat kesulitan).
3. **Dashboard Siswa**:
   * Halaman login yang aman (mendukung Google Sign-In).
   * Pilihan paket ujian yang tersedia.
   * Halaman ujian interaktif dengan pengatur waktu.
   * **Sistem Deteksi Kecurangan**: Mencatat berapa kali siswa berpindah tab browser saat ujian berlangsung.
4. **Dashboard Super Admin**: Mengelola seluruh pengguna (Siswa, Guru, Admin).

---

## 🛠️ Tech Stack
* **Frontend**: React.js, Vite, Tailwind CSS, Lucide React, SheetJS (`xlsx`)
* **Backend**: PHP (Native API dengan PDO)
* **Database**: MySQL / MariaDB

---

## 💻 Cara Menjalankan Project Secara Lokal

### 1. Database Setup
1. Buat database baru bernama `ujian_sekolah` di MySQL Anda.
2. Impor file schema database atau jalankan migrasi:
   ```bash
   php api/migrate.php
   php seeder.php
   ```

### 2. Menjalankan Backend PHP
Jalankan built-in web server PHP pada port 8000:
```bash
php -S localhost:8000
```

### 3. Menjalankan Frontend React
1. Install dependensi proyek:
   ```bash
   npm install
   ```
2. Jalankan server pengembangan Vite:
   ```bash
   npm run dev
   ```
3. Buka browser pada alamat yang tertera (biasanya `http://localhost:5173`).

---

## ✍️ Kontributor & Pembuat
* **Ridho kurnia Ramadhan** (Developer & Creator)

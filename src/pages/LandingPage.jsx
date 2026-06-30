import React from 'react'
import { Link } from 'react-router-dom'
import { Award, Shield, Timer, BarChart3, ChevronRight } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="relative min-h-[90vh]">
      {}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="animate-fade-in">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-700 text-xs font-semibold uppercase tracking-wider border border-indigo-500/20">
              Penelitian Tesis
            </span>
            <span className="text-sm font-bold text-slate-800 mt-2">
              Gita Yulianti, S.Pd
            </span>
            <span className="text-xs text-slate-500">
              Universitas Negeri Yogyakarta
            </span>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Sistem Ujian Sekolah Berbasis Web
            <span className="block mt-2 text-indigo-600">
              Computerized Adaptive Testing (CAT)
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-600 leading-relaxed">
            Implementasi computerized adaptive test untuk penilaian pembelajaran Dasar-dasar ketenagalistrikan di SMK
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="group flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all cursor-pointer text-sm shadow-sm"
            >
              Mulai Ujian Sekarang
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-300 transition-all cursor-pointer text-sm"
            >
              Registrasi Akun Baru
            </Link>
          </div>
        </div>

        {}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          {[
            { label: "Total Bank Soal", value: "90 Soal" },
            { label: "Tingkat Kesulitan", value: "3 Level" },
            { label: "Target Sasaran", value: "Siswa SMK" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 rounded-xl text-center">
              <div className="text-xl font-extrabold text-indigo-600">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Informasi test</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">CAT Dasar-dasar ketenagalistrikan di SMK</h2>
              
              <div className="mt-5 text-slate-600 space-y-4 text-xs leading-relaxed text-left">
                <p className="font-bold text-slate-900 text-sm">
                  Selamat Datang di Tes CAT Dasar-Dasar Ketenagalistrikan SMK
                </p>
                <p>
                  Selamat datang pada Tes Computer Assisted Test (CAT) Dasar-Dasar Ketenagalistrikan.
                </p>
                <p>
                  Tes ini dirancang untuk mengukur pemahaman peserta didik mengenai konsep dasar ketenagalistrikan sesuai dengan kompetensi pada jenjang Sekolah Menengah Kejuruan (SMK). Materi yang diujikan meliputi dasar kelistrikan, komponen listrik, pengukuran listrik, keselamatan kerja (K3), serta penerapan instalasi listrik dasar.
                </p>
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Petunjuk Pengerjaan</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Bacalah setiap soal dengan teliti sebelum menjawab.</li>
                    <li>Pilih satu jawaban yang paling benar.</li>
                    <li>Setiap soal hanya memiliki satu jawaban yang benar.</li>
                    <li>Waktu pengerjaan sesuai dengan batas waktu yang telah ditentukan.</li>
                    <li>Pastikan seluruh soal telah dijawab sebelum mengakhiri tes.</li>
                    <li>Setelah waktu habis, sistem akan menutup tes secara otomatis.</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Tujuan Tes</span>
                  <p>
                    Tes ini bertujuan untuk mengevaluasi tingkat penguasaan kompetensi dasar ketenagalistrikan serta membantu peserta mengetahui kemampuan yang telah dicapai.
                  </p>
                </div>
                <p className="italic text-slate-500">
                  Semoga Anda dapat mengerjakan soal dengan baik, jujur, dan penuh tanggung jawab.
                </p>
                <p className="font-bold text-indigo-600">
                  Selamat mengerjakan dan semoga sukses!
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Timer className="h-5 w-5 text-indigo-600" />,
                  title: "Real-time Countdown Timer",
                  desc: "Penghitung waktu mundur otomatis yang berjalan secara real-time untuk membatasi durasi pengerjaan setiap paket ujian siswa secara presisi."
                },
                {
                  icon: <Shield className="h-5 w-5 text-emerald-600" />,
                  title: "Keamanan Anti-Cheating",
                  desc: "Sistem keamanan ketat dengan deteksi otomatis saat siswa keluar dari mode layar penuh (fullscreen) atau membuka tab browser lain."
                },
                {
                  icon: <BarChart3 className="h-5 w-5 text-amber-600" />,
                  title: "Analisis Skor & Rata-rata",
                  desc: "Fitur kalkulasi nilai secara langsung setelah ujian selesai, lengkap dengan analisis tingkat penguasaan materi bagi setiap siswa."
                },
                {
                  icon: <Award className="h-5 w-5 text-purple-600" />,
                  title: "Klasifikasi Tingkat Soal",
                  desc: "Pengelompokan butir soal secara adaptif berdasarkan tingkat kesulitan (mudah, sedang, sulit) untuk evaluasi yang lebih akurat."
                }
              ].map((item, i) => (
                <div key={i} className="glass-card p-5 rounded-xl flex flex-col items-start bg-slate-50">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 mb-3">{item.icon}</div>
                  <h3 className="text-xs font-bold text-slate-800">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest text-center">Metode Penelitian</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-10">Desain Evaluasi Adaptif</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Klasifikasi Butir Soal",
                desc: "Penyusunan butir soal ujian ketenagalistrikan yang dikelompokkan ke dalam kategori Mudah, Sedang, dan Sulit guna mengukur taraf kompetensi kognitif peserta didik."
              },
              {
                step: "02",
                title: "Pemilihan Kemampuan Siswa",
                desc: "Siswa dapat memulai ujian dengan memilih tingkat kesulitan soal yang relevan dengan kesiapan dan target penguasaan materi mereka."
              },
              {
                step: "03",
                title: "Kalkulasi Nilai & Rata-rata",
                desc: "Hasil akhir dihitung secara transparan dan dicatat dalam basis data untuk pelaporan grafik statistik kemajuan belajar siswa."
              }
            ].map((step, i) => (
              <div key={i} className="glass-card p-5 rounded-xl relative text-left border-t-2 border-t-indigo-600/40">
                <span className="absolute top-4 right-5 text-xl font-bold text-slate-300">{step.step}</span>
                <h3 className="text-xs font-bold text-slate-850 mt-2">{step.title}</h3>
                <p className="text-[11px] text-slate-600 mt-3 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

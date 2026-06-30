import React, { useState, useEffect } from 'react'
import { Plus, Trash2, BarChart3, ListChecks, HelpCircle, BookOpen, UserCheck, AlertCircle, CheckCircle, FileSpreadsheet, Zap, Trophy, Timer, Crown } from 'lucide-react'
import * as XLSX from 'xlsx'

const DashboardGuru = () => {
  const [activeTab, setActiveTab] = useState('statistik')
  const [stats, setStats] = useState(null)
  const [scores, setScores] = useState([])
  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [questions, setQuestions] = useState([])

  const formatDuration = (seconds) => {
    if (seconds === undefined || seconds === null || seconds <= 0) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
  }
  
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingScores, setLoadingScores] = useState(true)
  const [loadingExams, setLoadingExams] = useState(true)
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [newQuestion, setNewQuestion] = useState({
    exam_id: '',
    bagian: 'Dasar Listrik',
    pertanyaan: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    option_e: '',
    correct_option: 'A',
    hint: ''
  })

  useEffect(() => {
    fetchStats()
    fetchScores()
    fetchExams()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/guru.php?action=stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingStats(false)
    }
  }

  const fetchScores = async () => {
    try {
      const res = await fetch('/api/guru.php?action=scores_list')
      if (res.ok) {
        const data = await res.json()
        setScores(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingScores(false)
    }
  }

  const fetchExams = async () => {
    try {
      const res = await fetch('/api/list_exams') 
      const dataRes = await fetch('/api/guru.php?action=list_exams')
      if (dataRes.ok) {
        const data = await dataRes.json()
        setExams(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingExams(false)
    }
  }

  const selectExamForQuestions = async (exam) => {
    setSelectedExam(exam)
    setLoadingQuestions(true)
    setNewQuestion(prev => ({ ...prev, exam_id: exam.id }))
    try {
      const res = await fetch(`/api/guru.php?action=list_questions&exam_id=${exam.id}`)
      if (res.ok) {
        const data = await res.json()
        setQuestions(data)
      }
    } catch (err) {
      setError('Gagal memuat soal.')
    } finally {
      setLoadingQuestions(false)
    }
  }

  const handleChange = (e) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value
    })
  }

  const handleAddQuestion = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/guru.php?action=create_question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(data.message)
        setNewQuestion(prev => ({
          ...prev,
          pertanyaan: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          option_e: '',
          correct_option: 'A',
          hint: ''
        }))
        if (selectedExam) selectExamForQuestions(selectedExam)
        fetchExams()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Gagal menyimpan soal.')
    }
  }

  const handleDeleteQuestion = async (id) => {
    if (!confirm('Hapus soal ini?')) return
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/guru.php?action=delete_question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(data.message)
        if (selectedExam) selectExamForQuestions(selectedExam)
        fetchExams()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Gagal menghapus soal.')
    }
  }

  const exportStudentAveragesToExcel = () => {
    if (!stats || !stats.student_averages || stats.student_averages.length === 0) {
      setError('Tidak ada data rata-rata nilai siswa untuk diekspor.');
      return;
    }
    const worksheetData = stats.student_averages.map(s => ({
      'Nama Lengkap': s.name,
      'NISN': s.nisn,
      'Kelas': s.kelas,
      'Jumlah Ujian': s.completed,
      'Skor Rata-Rata': s.avg_score
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Set column widths for optimal formatting
    worksheet['!cols'] = [
      { wch: 25 }, // Nama Lengkap
      { wch: 15 }, // NISN
      { wch: 10 }, // Kelas
      { wch: 15 }, // Jumlah Ujian
      { wch: 15 }  // Skor Rata-Rata
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rata-rata Nilai');
    XLSX.writeFile(workbook, 'rata_rata_nilai_siswa.xlsx');
  };

  const exportScoresLogToExcel = () => {
    if (!scores || scores.length === 0) {
      setError('Tidak ada data log riwayat pengerjaan untuk diekspor.');
      return;
    }
    const worksheetData = scores.map(log => ({
      'Nama Siswa': log.nama_lengkap,
      'Kelas': log.kelas,
      'Paket Ujian': log.title,
      'Kesulitan': log.difficulty_level,
      'Keluar Tab': log.cheating_attempts,
      'Durasi Pengerjaan': log.duration_seconds > 0 ? `${Math.floor(log.duration_seconds / 60)}m ${log.duration_seconds % 60}s` : 'N/A',
      'Jawaban Benar': log.correct_answers,
      'Total Soal': log.total_questions,
      'Skor Akhir': log.score,
      'Tanggal Selesai': log.completed_at
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Set column widths for optimal formatting
    worksheet['!cols'] = [
      { wch: 25 }, // Nama Siswa
      { wch: 10 }, // Kelas
      { wch: 30 }, // Paket Ujian
      { wch: 12 }, // Kesulitan
      { wch: 12 }, // Keluar Tab
      { wch: 20 }, // Durasi Pengerjaan
      { wch: 15 }, // Jawaban Benar
      { wch: 12 }, // Total Soal
      { wch: 12 }, // Skor Akhir
      { wch: 20 }  // Tanggal Selesai
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Log Riwayat Ujian');
    XLSX.writeFile(workbook, 'riwayat_pengerjaan_siswa.xlsx');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Guru</h1>
          <p className="text-xs text-slate-500 mt-1">Pantau statistik evaluasi belajar dan kelola bank soal adaptif</p>
        </div>
        
        {}
        <div className="inline-flex rounded-lg bg-slate-200 p-1 border border-slate-300">
          <button
            onClick={() => setActiveTab('statistik')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${activeTab === 'statistik' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <BarChart3 className="h-4 w-4" />
            Statistik & Nilai
          </button>
          <button
            onClick={() => setActiveTab('kelola_soal')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${activeTab === 'kelola_soal' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <HelpCircle className="h-4 w-4" />
            Kelola Bank Soal
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-600 font-medium animate-fade-in">
          <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-605 font-medium animate-fade-in">
          <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {}
      {activeTab === 'statistik' && (
        <div className="space-y-6 animate-fade-in">
          {}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {loadingStats ? '...' : (stats ? stats.overall_average : '0.00')}
                </div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Rata-rata Seluruh Nilai</div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {loadingStats ? '...' : (stats ? stats.completed_students.length : '0')}
                </div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Siswa Sudah Mengerjakan</div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 border border-purple-200 rounded-lg">
                <ListChecks className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{loadingScores ? '...' : scores.length}</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Total Ujian Selesai</div>
              </div>
            </div>
          </div>

          {}
          {!loadingStats && stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {}
              <div className="glass-card p-5 rounded-xl border border-slate-300">
                <h3 className="text-xs font-bold text-slate-500 mb-5 uppercase tracking-wider">Rata-rata Nilai Per Tingkat Kesulitan</h3>
                <div className="space-y-4">
                  {['mudah', 'sedang', 'sulit'].map((level) => {
                    const found = stats.difficulty_averages.find(d => d.difficulty.toLowerCase() === level);
                    const avg = found ? parseFloat(found.avg_score) : 0;
                    const pct = (avg / 100) * 100;

                    const barColors = {
                      mudah: 'bg-emerald-500',
                      sedang: 'bg-amber-500',
                      sulit: 'bg-rose-500'
                    };

                    return (
                      <div key={level}>
                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                          <span className="capitalize text-slate-600 font-semibold">{level}</span>
                          <span className="font-bold text-slate-800">{avg.toFixed(2)} / 100</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div 
                            className={`h-full ${barColors[level]} rounded-full transition-all`} 
                            style={{ width: `${pct || 2}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {}
              <div className="glass-card p-5 rounded-xl border border-slate-300 flex flex-col justify-between">
                <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Distribusi Profil Nilai Ujian</h3>
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-around">
                  <div className="relative h-28 w-28">
                    <svg viewBox="0 0 36 36" className="h-full w-full">
                      <path className="text-slate-100 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      
                      {(() => {
                        const total = stats.score_distribution.baik + stats.score_distribution.cukup + stats.score_distribution.kurang || 1;
                        const pctBaik = (stats.score_distribution.baik / total) * 100;
                        const pctCukup = (stats.score_distribution.cukup / total) * 100;
                        const pctKurang = (stats.score_distribution.kurang / total) * 100;
                        
                        return (
                          <>
                            <path className="text-emerald-500 stroke-current" strokeWidth="3.5" strokeDasharray={`${pctBaik}, 100`} strokeDashoffset="0" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-amber-500 stroke-current" strokeWidth="3.5" strokeDasharray={`${pctCukup}, 100`} strokeDashoffset={`-${pctBaik}`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-rose-500 stroke-current" strokeWidth="3.5" strokeDasharray={`${pctKurang}, 100`} strokeDashoffset={`-${pctBaik + pctCukup}`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          </>
                        )
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-bold text-slate-800">{stats.score_distribution.baik + stats.score_distribution.cukup + stats.score_distribution.kurang}</span>
                      <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Ujian</span>
                    </div>
                  </div>

                  {}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded bg-emerald-500"></div>
                      <span>Baik (&gt;= 80): <strong className="text-slate-800">{stats.score_distribution.baik}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded bg-amber-500"></div>
                      <span>Cukup (60 - 79): <strong className="text-slate-800">{stats.score_distribution.cukup}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded bg-rose-500"></div>
                      <span>Kurang (&lt; 60): <strong className="text-slate-800">{stats.score_distribution.kurang}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analisis Performa Terbaik & Pengerjaan Tercepat */}
          {!loadingStats && stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leaderboard Nilai Terbaik */}
              <div className="glass-card rounded-xl overflow-hidden border border-slate-300 bg-white">
                <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-amber-50/50 to-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-50 text-amber-600 border border-amber-200 rounded">
                      <Trophy className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top 5 Nilai Terbaik</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Diurutkan berdasarkan skor tertinggi & durasi tercepat</p>
                    </div>
                  </div>
                  <Crown className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                </div>
                
                {!stats.best_attempts || stats.best_attempts.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs italic">Belum ada data pengerjaan.</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {stats.best_attempts.map((item, index) => {
                      const rankColors = [
                        'bg-amber-100 text-amber-800 border-amber-300 font-extrabold', // 1st
                        'bg-slate-100 text-slate-800 border-slate-300 font-bold',     // 2nd
                        'bg-orange-50 text-orange-800 border-orange-200 font-bold',   // 3rd
                        'bg-slate-50 text-slate-600 border-slate-200',                // 4th
                        'bg-slate-50 text-slate-600 border-slate-200'                 // 5th
                      ];
                      
                      return (
                        <div key={item.id || index} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <span className={`h-6 w-6 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${rankColors[index] || rankColors[3]}`}>
                              {index + 1}
                            </span>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">{item.name}</div>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                                <span>{item.kelas}</span>
                                <span>•</span>
                                <span className="truncate max-w-[150px]">{item.title}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-right shrink-0">
                            <div className="text-right">
                              <div className="text-[10px] text-slate-450 flex items-center justify-end gap-1 font-medium">
                                <Timer className="h-3 w-3" />
                                <span>{formatDuration(item.duration_seconds)}</span>
                              </div>
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold mt-1 bg-amber-50 text-amber-700 border border-amber-200`}>
                                {item.score} / 100
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Leaderboard Pengerjaan Tercepat */}
              <div className="glass-card rounded-xl overflow-hidden border border-slate-300 bg-white">
                <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50/50 to-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded">
                      <Zap className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top 5 Pengerjaan Tercepat</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Diurutkan berdasarkan durasi pengerjaan tersingkat</p>
                    </div>
                  </div>
                  <Timer className="h-4.5 w-4.5 text-indigo-500" />
                </div>

                {!stats.fastest_attempts || stats.fastest_attempts.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs italic">Belum ada data pengerjaan tercepat.</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {stats.fastest_attempts.map((item, index) => {
                      return (
                        <div key={item.id || index} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <span className="h-6 w-6 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                              {index + 1}
                            </span>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">{item.name}</div>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                                <span>{item.kelas}</span>
                                <span>•</span>
                                <span className="truncate max-w-[150px]">{item.title}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-right shrink-0">
                            <div className="text-right">
                              <div className="text-xs font-extrabold text-indigo-650 flex items-center justify-end gap-1">
                                <Zap className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500/10" />
                                <span>{formatDuration(item.duration_seconds)}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Skor: {item.score}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {}
          <div className="glass-card rounded-xl overflow-hidden border border-slate-300">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Rata-rata Nilai Setiap Siswa</h2>
              <button
                onClick={exportStudentAveragesToExcel}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-colors cursor-pointer shadow-sm"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Ekspor Excel (.xlsx)
              </button>
            </div>
            {loadingStats ? (
              <div className="flex py-8 justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : !stats || stats.student_averages.length === 0 ? (
              <div className="py-8 text-center text-slate-500">Belum ada data nilai terkumpul.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/50 text-slate-555 font-semibold uppercase tracking-wider">
                      <th className="px-5 py-3">Nama Lengkap</th>
                      <th className="px-5 py-3">NISN</th>
                      <th className="px-5 py-3">Kelas</th>
                      <th className="px-5 py-3 text-center">Jumlah Ujian</th>
                      <th className="px-5 py-3 text-center">Skor Rata-Rata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                    {stats.student_averages.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3.5 font-bold text-slate-900">{s.name}</td>
                        <td className="px-5 py-3.5">{s.nisn}</td>
                        <td className="px-5 py-3.5">{s.kelas}</td>
                        <td className="px-5 py-3.5 text-center">{s.completed} Ujian</td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold ${s.avg_score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : s.avg_score >= 60 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                            {s.avg_score} / 100
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {}
          <div className="glass-card rounded-xl overflow-hidden border border-slate-300">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Log Riwayat Pengerjaan Siswa</h2>
              <button
                onClick={exportScoresLogToExcel}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-colors cursor-pointer shadow-sm"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Ekspor Excel (.xlsx)
              </button>
            </div>
            {loadingScores ? (
              <div className="flex py-8 justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : scores.length === 0 ? (
              <div className="py-8 text-center text-slate-400">Belum ada siswa yang melakukan ujian.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/50 text-slate-555 font-semibold uppercase tracking-wider">
                      <th className="px-5 py-3">Nama Siswa</th>
                      <th className="px-5 py-3">Kelas</th>
                      <th className="px-5 py-3">Paket Ujian</th>
                      <th className="px-5 py-3">Kesulitan</th>
                      <th className="px-5 py-3 text-center">Keluar Tab</th>
                      <th className="px-5 py-3 text-center">Durasi</th>
                      <th className="px-5 py-3 text-center">Jawaban Benar</th>
                      <th className="px-5 py-3 text-center">Skor Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                    {scores.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3.5 font-bold text-slate-900">{log.nama_lengkap}</td>
                        <td className="px-5 py-3.5">{log.kelas}</td>
                        <td className="px-5 py-3.5 font-semibold text-slate-800">{log.title}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${log.difficulty_level === 'mudah' ? 'bg-emerald-50 text-emerald-700' : log.difficulty_level === 'sedang' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                            {log.difficulty_level}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {log.cheating_attempts > 0 ? (
                            <span className="inline-flex px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full font-bold text-[9px]">
                              {log.cheating_attempts}x keluar tab
                            </span>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-center font-semibold text-slate-600">{formatDuration(log.duration_seconds)}</td>
                        <td className="px-5 py-3.5 text-center">{log.correct_answers} / {log.total_questions}</td>
                        <td className="px-5 py-3.5 text-center font-bold text-slate-900">{log.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {activeTab === 'kelola_soal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-in">
          {}
          <div className="glass-card rounded-xl p-5 border border-slate-300 lg:col-span-1 h-fit bg-white">
            <h3 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider">Daftar Paket Ujian</h3>
            {loadingExams ? (
              <div className="flex py-8 justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : exams.length === 0 ? (
              <div className="text-slate-450 py-4 text-center">Belum ada paket ujian.</div>
            ) : (
              <div className="space-y-2">
                {exams.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => selectExamForQuestions(exam)}
                    className={`w-full p-3 rounded-lg text-left border transition-all cursor-pointer ${selectedExam && selectedExam.id === exam.id ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200 hover:border-slate-350'}`}
                  >
                    <div className="font-bold text-slate-800 text-xs leading-tight">{exam.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{exam.subject}</div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${exam.difficulty_level === 'mudah' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : exam.difficulty_level === 'sedang' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                        {exam.difficulty_level}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">{exam.question_count} Soal ({exam.duration_minutes} Mnt)</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {}
          <div className="lg:col-span-2 space-y-5">
            {!selectedExam ? (
              <div className="glass-card rounded-xl p-12 text-center text-slate-400 border border-slate-300 bg-white">
                <HelpCircle className="h-10 w-10 text-slate-350 mx-auto mb-3" />
                Silakan pilih paket ujian di sebelah kiri untuk melihat dan menginput bank soal.
              </div>
            ) : (
              <>
                {}
                <div className="glass-card rounded-xl p-5 border border-slate-300 bg-white">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Plus className="h-4 w-4 text-indigo-600" />
                    Input Soal Baru pada: <span className="text-indigo-600 font-extrabold">{selectedExam.title}</span>
                  </h3>
                  <form onSubmit={handleAddQuestion} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Sub-Topik / Bagian</label>
                      <select
                        name="bagian"
                        value={newQuestion.bagian}
                        onChange={handleChange}
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                      >
                        <option value="Dasar Listrik">Dasar Listrik</option>
                        <option value="Instalasi Motor Listrik">Instalasi Motor Listrik</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Pertanyaan Soal</label>
                      <textarea
                        name="pertanyaan"
                        required
                        rows="3"
                        value={newQuestion.pertanyaan}
                        onChange={handleChange}
                        placeholder="Ketik pertanyaan di sini..."
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none resize-y"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['a', 'b', 'c', 'd', 'e'].map((letter) => (
                        <div key={letter}>
                          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Pilihan {letter.toUpperCase()}</label>
                          <input
                            type="text"
                            name={`option_${letter}`}
                            required
                            value={newQuestion[`option_${letter}`]}
                            onChange={handleChange}
                            placeholder={`Isi pilihan ${letter.toUpperCase()}`}
                            className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                          />
                        </div>
                      ))}

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Jawaban Benar</label>
                        <select
                          name="correct_option"
                          value={newQuestion.correct_option}
                          onChange={handleChange}
                          className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none font-bold text-indigo-600"
                        >
                          <option value="A">Pilihan A</option>
                          <option value="B">Pilihan B</option>
                          <option value="C">Pilihan C</option>
                          <option value="D">Pilihan D</option>
                          <option value="E">Pilihan E</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Hint / Kunci Penyelesaian (Tesis) (Opsional)</label>
                      <input
                        type="text"
                        name="hint"
                        value={newQuestion.hint}
                        onChange={handleChange}
                        placeholder="Hint penjelasan rumus ohm..."
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                      >
                        Simpan Pertanyaan
                      </button>
                    </div>
                  </form>
                </div>

                {}
                <div className="glass-card rounded-xl p-5 border border-slate-300 bg-white">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Daftar Soal ({questions.length} Soal)</h3>
                  {loadingQuestions ? (
                    <div className="flex py-8 justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
                    </div>
                  ) : questions.length === 0 ? (
                    <div className="text-slate-450 py-4 text-center">Belum ada butir soal pada paket ujian ini.</div>
                  ) : (
                    <div className="space-y-4">
                      {questions.map((q) => (
                        <div key={q.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="absolute top-3 right-3 p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded transition-colors cursor-pointer"
                            title="Hapus Soal"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] px-1.5 py-0.5 bg-indigo-100 text-indigo-700 border border-indigo-200 rounded font-bold uppercase tracking-wider">No. {q.nomor}</span>
                            <span className="text-[8px] px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded font-medium">{q.bagian}</span>
                          </div>

                          <p className="text-xs font-semibold text-slate-800 leading-relaxed pr-8">{q.pertanyaan}</p>

                          <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                              const key = `option_${letter.toLowerCase()}`;
                              const isCorrect = q.correct_option === letter;
                              return (
                                <div key={letter} className={`p-2.5 rounded-lg border flex items-center gap-2 ${isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold' : 'bg-white border-slate-200 text-slate-500'}`}>
                                  <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center font-bold text-[9px] ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-450'}`}>
                                    {letter}
                                  </span>
                                  <span>{q[key]}</span>
                                </div>
                              );
                            })}
                          </div>

                          {q.hint && (
                            <div className="mt-3 text-[11px] bg-indigo-50/50 p-2.5 rounded border border-indigo-100 text-indigo-700 flex items-start gap-2">
                              <HelpCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold block text-[9px] uppercase text-indigo-600 tracking-wider">Hint / Solusi:</span>
                                {q.hint}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardGuru

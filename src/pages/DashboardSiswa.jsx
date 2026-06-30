import React, { useState, useEffect, useRef, useContext } from 'react'
import { GraduationCap, Timer, HelpCircle, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import { AuthContext } from '../App'

const DashboardSiswa = () => {
  const { setIsTakingTest } = useContext(AuthContext)
  const [exams, setExams] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [activeExam, setActiveExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [cheats, setCheats] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [testActive, setTestActive] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [autoSubmitReason, setAutoSubmitReason] = useState(null)

  const [result, setResult] = useState(null)
  
  const timerRef = useRef(null)
  const testActiveRef = useRef(false)
  const cheatsRef = useRef(0)
  const lastInfractionTimeRef = useRef(0)
  const startTimeRef = useRef(0)

  useEffect(() => {
    setIsTakingTest(testActive)
    return () => setIsTakingTest(false)
  }, [testActive, setIsTakingTest])

  useEffect(() => {
    fetchExams()
    fetchHistory()
  }, [])

  const fetchExams = async () => {
    try {
      const res = await fetch('/api/siswa.php?action=list_exams')
      if (res.ok) {
        const data = await res.json()
        setExams(data)
      }
    } catch (err) {
      setError('Gagal memuat daftar ujian.')
    } finally {
      setLoading(false)
    }
  }

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/siswa.php?action=history')
      if (res.ok) {
        const data = await res.json()
        setHistory(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!testActive) return

    const handleVisibilityChange = () => {
      if (document.hidden && testActiveRef.current) {
        handleCheatingInfraction()
      }
    }

    const handleBlur = () => {
      if (testActiveRef.current) {
        handleCheatingInfraction()
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && testActiveRef.current) {
        handleCheatingInfraction()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [testActive])

  const handleCheatingInfraction = () => {
    if (!testActiveRef.current) return
    
    const now = Date.now()
    if (now - lastInfractionTimeRef.current < 2000) {
      return 
    }
    lastInfractionTimeRef.current = now

    const newCheats = cheatsRef.current + 1
    cheatsRef.current = newCheats
    setCheats(newCheats)
    
    if (newCheats >= 3) {
      testActiveRef.current = false
      setTestActive(false)
      setShowWarningModal(false)
      setAutoSubmitReason('cheating')
      submitExam(newCheats)
    } else {
      setShowWarningModal(true)
    }
  }

  useEffect(() => {
    if (!testActive || timeLeft <= 0) {
      if (testActive && timeLeft === 0) {
        testActiveRef.current = false
        setTestActive(false)
        setAutoSubmitReason('timeout')
        submitExam(cheatsRef.current)
      }
      return
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timerRef.current)
  }, [testActive, timeLeft])

  const startExam = async (exam) => {
    setError('')
    setAnswers({})
    setCheats(0)
    cheatsRef.current = 0
    lastInfractionTimeRef.current = 0
    setResult(null)
    setAutoSubmitReason(null)
    startTimeRef.current = Date.now()
    
    try {
      const res = await fetch(`/api/siswa.php?action=get_exam_questions&exam_id=${exam.id}`)
      if (res.ok) {
        const data = await res.json()
        setQuestions(data.questions)
        setActiveExam(data.exam)
        setCurrentIdx(0)
        setTimeLeft(data.exam.duration_minutes * 60)
        setTestActive(true)
        testActiveRef.current = true

        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen()
          }
        } catch (fErr) {
          console.log("Fullscreen request rejected", fErr)
        }
      } else {
        const data = await res.json()
        alert(data.error || 'Gagal memuat pertanyaan.')
      }
    } catch (err) {
      alert('Gagal menghubungi API server.')
    }
  }

  const submitExam = async (finalCheats = cheatsRef.current) => {
    testActiveRef.current = false
    setTestActive(false)
    if (timerRef.current) clearTimeout(timerRef.current)

    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen()
      } catch (err) {
        console.log("Exit fullscreen rejected", err)
      }
    }

    setLoading(true)

    const elapsedSeconds = startTimeRef.current > 0 ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0;
    const durationSeconds = Math.min(activeExam.duration_minutes * 60, elapsedSeconds);

    try {
      const res = await fetch('/api/siswa.php?action=submit_exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam_id: activeExam.id,
          answers: answers,
          cheating_attempts: finalCheats,
          duration_seconds: durationSeconds
        })
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
        fetchExams()
        fetchHistory()
      } else {
        alert(data.error || 'Terjadi kesalahan saat mengirim jawaban.')
        setActiveExam(null)
      }
    } catch (err) {
      alert('Koneksi terputus saat men-submit jawaban.')
      setActiveExam(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectOption = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {}
      {!testActive && !result && (
        <div className="space-y-8 animate-fade-in">
          {}
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-indigo-600 animate-pulse" />
              Portal Ujian Siswa
            </h1>
            <p className="text-xs text-slate-500 mt-1">Silakan pilih subtes atau paket ujian berdasarkan tingkat kesulitan untuk memulai</p>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-600 font-medium">
              <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {}
          <div>
            <h2 className="text-sm font-bold text-slate-800 mb-5 uppercase tracking-wider">Paket Ujian Tersedia</h2>
            {loading ? (
              <div className="flex py-12 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : exams.length === 0 ? (
              <div className="text-slate-400 text-center py-8 glass-card rounded-xl">Belum ada paket ujian yang dirilis oleh Guru.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {['mudah', 'sedang', 'sulit'].map((level) => {
                  const levelExams = exams.filter(e => e.difficulty_level === level);
                  
                  const headerStyles = {
                    mudah: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                    sedang: 'bg-amber-50 border-amber-200 text-amber-700',
                    sulit: 'bg-rose-50 border-rose-200 text-rose-700'
                  };

                  return (
                    <div key={level} className="space-y-3">
                      <div className={`p-2.5 rounded-lg border text-center font-bold uppercase text-[10px] tracking-wider ${headerStyles[level]}`}>
                        Tingkat Kesulitan: {level}
                      </div>

                      {levelExams.length === 0 ? (
                        <div className="text-xs text-slate-400 text-center py-4 italic">Tidak ada ujian</div>
                      ) : (
                        levelExams.map((exam) => (
                          <div key={exam.id} className="glass-card p-4 rounded-xl border border-slate-300 flex flex-col justify-between h-40 bg-white">
                            <div>
                              <h3 className="font-bold text-slate-800 text-xs leading-snug">{exam.title}</h3>
                              <p className="text-[10px] text-slate-500 mt-1">{exam.subject}</p>
                            </div>
                            
                            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 border-t border-slate-200 pt-2">
                              <span>{exam.question_count} Soal</span>
                              <span>{exam.duration_minutes} Menit</span>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between gap-2">
                              {exam.attempt_count > 0 ? (
                                <div className="text-[9px] text-slate-500 font-medium">
                                  Terbaik: <strong className="text-indigo-600">{exam.highest_score}</strong> ({exam.attempt_count}x)
                                </div>
                              ) : (
                                <div className="text-[9px] text-slate-450 italic">Belum dikerjakan</div>
                              )}
                              <button
                                onClick={() => startExam(exam)}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-xs transition-colors cursor-pointer shadow-sm"
                              >
                                Mulai
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {}
          <div className="glass-card rounded-xl overflow-hidden border border-slate-300">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Riwayat Ujian Anda</h2>
            </div>
            {history.length === 0 ? (
              <div className="py-8 text-center text-slate-450 text-xs">Anda belum menyelesaikan ujian apapun.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/50 text-slate-500 font-semibold uppercase tracking-wider">
                      <th className="px-5 py-3">Judul Ujian</th>
                      <th className="px-5 py-3">Kesulitan</th>
                      <th className="px-5 py-3 text-center">Keluar Tab</th>
                      <th className="px-5 py-3 text-center">Benar / Total</th>
                      <th className="px-5 py-3 text-center">Skor Ujian</th>
                      <th className="px-5 py-3">Tanggal Selesai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                    {history.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3 font-semibold text-slate-800">{h.title}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${h.difficulty_level === 'mudah' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : h.difficulty_level === 'sedang' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                            {h.difficulty_level}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-center">
                          {h.cheating_attempts > 0 ? (
                            <span className="text-rose-600 font-bold">{h.cheating_attempts}x</span>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-center">{h.correct_answers} / {h.total_questions}</td>
                        <td className="px-5 py-3 text-center font-bold text-slate-900">{h.score}</td>
                        <td className="px-5 py-3 text-slate-450">{new Date(h.completed_at).toLocaleString('id-ID')}</td>
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
      {testActive && activeExam && questions.length > 0 && (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-between py-6 px-4 animate-fade-in select-none">
          {}
          <div className="glass-card p-4 rounded-xl border border-slate-300 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white shadow-sm">
            <div>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded uppercase tracking-wider">{activeExam.difficulty_level}</span>
              <h2 className="text-sm font-bold text-slate-800 mt-1">{activeExam.title}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs font-semibold">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                <span>Pelanggaran Keluar: <strong className="text-rose-600 font-extrabold">{cheats} / 3</strong></span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 border border-indigo-500 text-white rounded font-mono text-sm font-bold shadow-sm">
                <Timer className="h-4 w-4 animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start flex-1 mb-5">
            {}
            <div className="lg:col-span-3 glass-card rounded-xl p-6 border border-slate-300 bg-white">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-5 text-[10px] text-slate-500">
                <span className="font-bold uppercase text-indigo-600">Soal Nomor {currentIdx + 1} dari {questions.length}</span>
                <span>Subtopik: {questions[currentIdx].bagian}</span>
              </div>

              <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed mb-6">
                {questions[currentIdx].pertanyaan}
              </p>

              {}
              <div className="space-y-2.5">
                {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                  const key = `option_${letter.toLowerCase()}`;
                  const isSelected = answers[questions[currentIdx].id] === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => handleSelectOption(questions[currentIdx].id, letter)}
                      className={`w-full p-3 rounded-lg text-left border flex items-center gap-3 transition-all cursor-pointer text-xs ${isSelected ? 'bg-indigo-50 border-indigo-400 text-indigo-700 font-semibold shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span className={`h-5.5 w-5.5 rounded-full flex items-center justify-center font-bold text-[10px] ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {letter}
                      </span>
                      <span>{questions[currentIdx][key]}</span>
                    </button>
                  );
                })}
              </div>

              {}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-200">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 disabled:opacity-30 disabled:hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Sebelumnya
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded cursor-pointer"
                  >
                    Selanjutnya
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (confirm("Apakah Anda sudah yakin dengan semua jawaban Anda dan ingin mengakhiri ujian?")) {
                        submitExam(cheats)
                      }
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded transition-colors cursor-pointer shadow-sm"
                  >
                    Selesai Ujian
                  </button>
                )}
              </div>
            </div>

            {}
            <div className="glass-card rounded-xl p-5 border border-slate-300 bg-white">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Navigasi Soal</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, idx) => {
                  const answered = !!answers[q.id];
                  const active = idx === currentIdx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-8 w-full rounded text-[10px] font-bold flex items-center justify-center border transition-all cursor-pointer ${
                        active ? 'bg-indigo-600 border-indigo-500 text-white' :
                        answered ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-xs' :
                        'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-5 pt-3 border-t border-slate-200 text-[9px] text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded bg-indigo-600"></div>
                  <span>Sedang Dibuka</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded bg-indigo-50 border border-indigo-200"></div>
                  <span>Sudah Dijawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded bg-slate-50 border border-slate-200"></div>
                  <span>Belum Dijawab</span>
                </div>
              </div>
            </div>
          </div>

          {}
          {showWarningModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className="glass-card max-w-sm rounded-xl p-6 border border-rose-300 text-center animate-fade-in bg-white shadow-lg">
                <AlertTriangle className="h-10 w-10 text-rose-500 mx-auto mb-3 animate-bounce" />
                <h3 className="text-base font-bold text-rose-600">Peringatan Kecurangan!</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Anda terdeteksi keluar dari halaman ujian (membuka tab lain/aplikasi lain/keluar layar penuh).
                </p>
                <div className="mt-3 p-2 bg-rose-50 text-rose-700 border border-rose-200 rounded text-xs font-semibold">
                  Jumlah Pelanggaran: {cheats} / 3
                </div>
                <button
                  onClick={async () => {
                    setShowWarningModal(false)
                    if (!document.fullscreenElement) {
                      try {
                        await document.documentElement.requestFullscreen()
                      } catch (err) {
                        console.log(err)
                      }
                    }
                  }}
                  className="mt-5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Kembali ke Ujian (Fokus Layar)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {}
      {result && activeExam && (
        <div className="space-y-6 animate-fade-in">
          {}
          <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                Ujian Selesai!
              </h1>
              <p className="text-xs text-slate-500 mt-1">Berikut adalah rekapitulasi nilai dan ulasan soal pengerjaan Anda</p>
            </div>
            
            <button
              onClick={() => {
                setResult(null)
                setActiveExam(null)
                setQuestions([])
              }}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-300 transition-colors cursor-pointer text-xs"
            >
              Kembali ke Dashboard
            </button>
          </div>

          {result.cheating_attempts >= 3 && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
              <span>Ujian ini diserahkan secara otomatis oleh sistem karena Anda terdeteksi melanggar peraturan keluar dari halaman ujian sebanyak 3 kali.</span>
            </div>
          )}

          {}
          <div className="glass-card rounded-xl p-6 border border-slate-300 bg-white grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0">
              <div className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mb-2">Nilai Ujian</div>
              <div className="h-24 w-24 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                <span className="text-2xl font-extrabold text-indigo-600">{result.score}</span>
              </div>
              <span className="text-[9px] text-slate-500 mt-2 font-semibold uppercase">{activeExam.difficulty_level} Level</span>
            </div>

            <div className="md:col-span-3 space-y-3.5">
              <h3 className="font-bold text-slate-900 text-sm">{activeExam.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluasi adaptif selesai. Analisis data menunjukkan sebaran jawaban benar dan tingkat penyimpangan fokus tab browser Anda sebagai berikut.
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-sm font-bold text-slate-800">{result.correct_answers} / {result.total_questions}</div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-wider mt-0.5">Jawaban Benar</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-sm font-bold text-slate-800">{result.total_questions - result.correct_answers} / {result.total_questions}</div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-wider mt-0.5">Jawaban Salah</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className={`text-sm font-bold ${result.cheating_attempts > 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                    {result.cheating_attempts}x
                  </div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-wider mt-0.5">Keluar Tab</div>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Ulasan Soal & Jawaban</h2>
            {result.review.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-xl border ${item.is_correct ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${item.is_correct ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}`}>
                    No. {item.nomor} — {item.is_correct ? 'Benar' : 'Salah'}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-800 leading-relaxed mb-3">{item.pertanyaan}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {['a', 'b', 'c', 'd', 'e'].map((letter) => {
                    const optionLetter = letter.toUpperCase();
                    const key = `option_${letter}`;
                    const isSelected = item.selected === optionLetter;
                    const isCorrectOption = item.correct_option === optionLetter;

                    let borderStyle = 'border-slate-200 bg-white text-slate-600';
                    if (isCorrectOption) {
                      borderStyle = 'border-emerald-300 bg-emerald-50 text-emerald-700 font-bold';
                    } else if (isSelected && !isCorrectOption) {
                      borderStyle = 'border-rose-300 bg-rose-50 text-rose-700 font-bold';
                    }

                    return (
                      <div key={letter} className={`p-2.5 rounded border flex items-center gap-2 ${borderStyle}`}>
                        <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center font-bold text-[9px] ${
                          isCorrectOption ? 'bg-emerald-500 text-white' :
                          isSelected ? 'bg-rose-500 text-white' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {optionLetter}
                        </span>
                        <span>{item[key]}</span>
                      </div>
                    );
                  })}
                </div>

                {item.hint && (
                  <div className="mt-3.5 text-[11px] bg-indigo-50/50 p-3 rounded border border-indigo-100 text-indigo-700 flex items-start gap-2">
                    <HelpCircle className="h-4.5 w-4.5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[9px] uppercase text-indigo-600 tracking-wider">Penjelasan / Rumus:</span>
                      {item.hint}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {}
      {autoSubmitReason && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="max-w-sm w-full rounded-xl p-6 border border-slate-300 text-center animate-fade-in bg-white shadow-lg">
            <AlertTriangle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {autoSubmitReason === 'cheating' ? 'Ujian Diserahkan Otomatis' : 'Waktu Ujian Habis'}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {autoSubmitReason === 'cheating' 
                ? 'Ujian Anda diserahkan secara otomatis karena Anda terdeteksi keluar dari layar ujian sebanyak 3 kali.'
                : 'Waktu ujian telah habis! Hasil pengerjaan Anda telah dikirim secara otomatis ke server.'}
            </p>
            <button
              onClick={() => setAutoSubmitReason(null)}
              className="mt-5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-xs transition-colors cursor-pointer shadow-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardSiswa

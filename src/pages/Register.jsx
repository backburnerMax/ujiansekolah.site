import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { GraduationCap, AlertCircle, CheckCircle, Info } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  
  const googleData = location.state?.googleData || null

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    nama_lengkap: googleData?.nama_lengkap || '',
    email: googleData?.email || '',
    nomor_telepon: '',
    tanggal_lahir: '',
    password: '',
    nisn: '',
    username: '',
    kelas: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth.php?action=register_siswa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(data.message || 'Pendaftaran siswa berhasil!')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(data.error || 'Gagal melakukan pendaftaran.')
      }
    } catch (err) {
      setError('Tidak dapat terhubung ke server API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center px-4 py-12 bg-slate-100/55">
      <div className="glass-card w-full max-w-2xl rounded-xl p-8 shadow-sm bg-white">
        <div className="text-center mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 mb-3">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Registrasi Akun Siswa</h2>
          <p className="mt-2 text-xs text-slate-500">Silakan lengkapi data diri Anda untuk membuat akun peserta ujian</p>
        </div>

        {}
        {googleData && (
          <div className="mb-5 flex items-start gap-2.5 rounded-lg bg-indigo-50 border border-indigo-100 p-3 text-xs text-indigo-700 font-medium">
            <Info className="h-4.5 w-4.5 shrink-0 text-indigo-600" />
            <div>
              <span className="font-bold">Terhubung dengan Google:</span> Anda sedang mendaftarkan akun baru menggunakan email Google <strong className="underline">{googleData.email}</strong>. Nama dan Email telah dikunci demi keamanan.
            </div>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-600 font-medium">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-600 font-medium">
            <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">NISN (Nomor Induk Siswa)</label>
              <input
                type="text"
                name="nisn"
                required
                value={formData.nisn}
                onChange={handleChange}
                placeholder="NISN Anda"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Nama Pengguna (Username)</label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Nama Lengkap</label>
              <input
                type="text"
                name="nama_lengkap"
                required
                disabled={!!googleData}
                value={formData.nama_lengkap}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                className={`mt-1.5 block w-full rounded-lg border p-2 text-sm focus:outline-none ${!!googleData ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed font-medium' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500 focus:bg-white'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Alamat Email</label>
              <input
                type="email"
                name="email"
                required
                disabled={!!googleData}
                value={formData.email}
                onChange={handleChange}
                placeholder="email@sekolah.com"
                className={`mt-1.5 block w-full rounded-lg border p-2 text-sm focus:outline-none ${!!googleData ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed font-medium' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500 focus:bg-white'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Nomor Telepon</label>
              <input
                type="tel"
                name="nomor_telepon"
                value={formData.nomor_telepon}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                required
                value={formData.tanggal_lahir}
                onChange={handleChange}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Kelas</label>
              <input
                type="text"
                name="kelas"
                required
                value={formData.kelas}
                onChange={handleChange}
                placeholder="Contoh: XII TITL 1"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                {googleData ? 'Kata Sandi Sistem (Password)' : 'Kata Sandi (Password)'}
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
          >
            {loading ? 'Sedang Mendaftarkan...' : 'Selesaikan Registrasi Akun'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 font-medium">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register

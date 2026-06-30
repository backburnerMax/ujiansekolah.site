import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import { KeyRound, Mail, AlertCircle } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeRole, setActiveRole] = useState('siswa')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, login } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  
  useEffect(() => {
    if (activeRole === 'siswa' && typeof google !== 'undefined') {
      const timer = setTimeout(() => {
        const btnElem = document.getElementById("googleSignInButton")
        if (btnElem) {
          try {
            google.accounts.id.initialize({
              client_id: "327615006645-hmcr2en3nqp6v2jj8592svut9119gubr.apps.googleusercontent.com", 
              callback: handleGoogleCredentialResponse,
              auto_select: false
            })

            google.accounts.id.renderButton(
              btnElem,
              { 
                theme: "outline", 
                size: "large", 
                width: "380",
                text: "signin_with",
                shape: "rectangular"
              }
            )
          } catch (err) {
            console.error("Google Auth initialization error", err)
          }
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [activeRole])

  const handleGoogleCredentialResponse = async (response) => {
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth.php?action=google_auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: response.credential })
      })
      const data = await res.json()

      if (res.ok) {
        if (data.status === 'login_success') {
          login(data.user)
          navigate('/dashboard')
        } else if (data.status === 'register_required') {
          
          navigate('/register', { 
            state: { 
              googleData: { 
                email: data.email, 
                nama_lengkap: data.nama_lengkap 
              } 
            } 
          })
        }
      } else {
        setError(data.error || 'Autentikasi Google gagal.')
      }
    } catch (err) {
      setError('Gagal menghubungi server untuk verifikasi Google.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: activeRole })
      })
      const data = await res.json()

      if (res.ok) {
        login(data.user)
        navigate('/dashboard')
      } else {
        setError(data.error || 'Terjadi kesalahan saat masuk.')
      }
    } catch (err) {
      setError('Tidak dapat terhubung ke server API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-12 bg-slate-100/55">
      <div className="glass-card w-full max-w-md rounded-xl p-8 shadow-sm bg-white">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center mb-4">
            <img src="/logoUny.png" alt="UNY Logo" className="h-16 w-16 object-contain" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Selamat Datang Kembali</h2>
          <p className="mt-2 text-xs text-slate-500">Silakan masuk untuk mengakses ujian dan dashboard Anda</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex border-b border-slate-200 mt-6 mb-2">
          <button
            type="button"
            onClick={() => {
              setActiveRole('siswa')
              setError('')
            }}
            className={`flex-1 pb-2.5 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeRole === 'siswa'
                ? 'border-indigo-600 text-indigo-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Siswa
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('guru')
              setError('')
            }}
            className={`flex-1 pb-2.5 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeRole === 'guru'
                ? 'border-indigo-600 text-indigo-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Guru
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('super_admin')
              setError('')
            }}
            className={`flex-1 pb-2.5 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeRole === 'super_admin'
                ? 'border-indigo-600 text-indigo-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Admin
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-600 font-medium">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 font-sans">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {activeRole === 'super_admin' ? 'Email Administrator' : activeRole === 'guru' ? 'Email Guru' : 'Email Siswa'}
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  activeRole === 'super_admin'
                    ? 'admin@sekolah.com'
                    : activeRole === 'guru'
                    ? 'budi@sekolah.com'
                    : 'andi@sekolah.com'
                }
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3.5 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Kata Sandi</label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <KeyRound className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3.5 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
          >
            {loading ? 'Memproses...' : 'Masuk ke Sistem'}
          </button>
        </form>

        {activeRole === 'siswa' && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-450 font-semibold">Atau</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div id="googleSignInButton" className="w-full flex justify-center"></div>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500 font-medium">
              Belum punya akun?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Daftar di sini
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Login

import React, { createContext, useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn, LogOut, User, LayoutDashboard, Home, ShieldAlert } from 'lucide-react'


import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardSuperAdmin from './pages/DashboardSuperAdmin'
import DashboardGuru from './pages/DashboardGuru'
import DashboardSiswa from './pages/DashboardSiswa'


export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isTakingTest, setIsTakingTest] = useState(false)

  useEffect(() => {
    fetch('/api/auth.php?action=session')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await fetch('/api/auth.php?action=logout')
      setUser(null)
      window.location.href = '/'
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isTakingTest, setIsTakingTest }}>
      {children}
    </AuthContext.Provider>
  )
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }
  if (!user) {
    return <NavigateToLogin />
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <ShieldAlert className="h-14 w-14 text-rose-600 mb-3 animate-bounce" />
        <h1 className="text-2xl font-bold text-slate-900">Akses Ditolak</h1>
        <p className="text-slate-600 mt-2 max-w-md text-sm">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <Link to="/dashboard" className="mt-5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-semibold text-sm">
          Kembali ke Dashboard
        </Link>
      </div>
    )
  }
  return children
}

const NavigateToLogin = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/login')
  }, [navigate])
  return null
}

const DashboardRouter = () => {
  const { user } = useContext(AuthContext)
  if (user.role === 'super_admin') {
    return <DashboardSuperAdmin />
  } else if (user.role === 'guru') {
    return <DashboardGuru />
  } else {
    return <DashboardSiswa />
  }
}


const Navbar = () => {
  const { user, logout, isTakingTest } = useContext(AuthContext)
  const location = useLocation()

  if (isTakingTest) return null

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass-card sticky top-0 z-40 w-full border-b border-slate-200 px-4 py-3 md:px-8 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logoUny.png" alt="UNY Logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            CAT Ujian Sekolah
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/"
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
              isActive('/')
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Beranda</span>
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  isActive('/dashboard')
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="h-4 w-px bg-slate-300"></div>
              
              <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <User className="h-3.5 w-3.5 text-indigo-600" />
                <span className="max-w-[100px] truncate font-semibold">{user.nama_lengkap}</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-bold uppercase tracking-wider">
                  {user.role === 'super_admin' ? 'Admin' : user.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg border border-rose-200 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  isActive('/login')
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                }`}
              >
                <LogIn className="h-3.5 w-3.5" />
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all border border-indigo-700"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-auto">
            <div className="mx-auto max-w-7xl px-4">
              <p>© {new Date().getFullYear()} CAT Ujian Sekolah. Tesis Pendidikan oleh Gita Yulianti, S.Pd.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

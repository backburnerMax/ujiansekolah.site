import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Users, GraduationCap, BookOpen, AlertCircle, CheckCircle, UserPlus } from 'lucide-react'

const DashboardSuperAdmin = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const [newUser, setNewUser] = useState({
    role: 'siswa',
    nama_lengkap: '',
    email: '',
    nomor_telepon: '',
    tanggal_lahir: '',
    password: 'password123',
    nisn: '',
    username: '',
    kelas: '',
    nip_nik: '',
    guru_mapel: 'Dasar Listrik & Instalasi Motor Listrik'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin.php?action=list_users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      } else {
        setError('Gagal mengambil data pengguna.')
      }
    } catch (err) {
      setError('Error koneksi database backend.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak bisa dibatalkan.')) return

    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/admin.php?action=delete_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(data.message)
        fetchUsers()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Gagal menghapus pengguna.')
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/admin.php?action=create_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(data.message)
        setShowAddForm(false)
        setNewUser({
          role: 'siswa',
          nama_lengkap: '',
          email: '',
          nomor_telepon: '',
          tanggal_lahir: '',
          password: 'password123',
          nisn: '',
          username: '',
          kelas: '',
          nip_nik: '',
          guru_mapel: 'Dasar Listrik & Instalasi Motor Listrik'
        })
        fetchUsers()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Gagal membuat pengguna baru.')
    }
  }

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const totalUsers = users.length
  const totalTeachers = users.filter(u => u.role === 'guru').length
  const totalStudents = users.filter(u => u.role === 'siswa').length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Super Admin Panel</h1>
          <p className="text-xs text-slate-500 mt-1">Kelola data guru, siswa, dan administrasi sistem ujian sekolah</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-sm shadow-sm"
        >
          <UserPlus className="h-4 w-4" />
          Tambah Pengguna Baru
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-600 font-medium">
          <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-600 font-medium">
          <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="glass-card p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{totalUsers}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Pengguna</div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{totalTeachers}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Guru</div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 border border-purple-200 rounded-lg">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{totalStudents}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Siswa</div>
          </div>
        </div>
      </div>

      {}
      {showAddForm && (
        <div className="glass-card rounded-xl p-6 border border-slate-350 mb-8 animate-fade-in">
          <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-indigo-600" />
            Form Tambah Guru / Siswa
          </h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Peran (Role)</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                >
                  <option value="siswa">Siswa</option>
                  <option value="guru">Guru</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama_lengkap"
                  required
                  value={newUser.nama_lengkap}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Alamat Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={newUser.email}
                  onChange={handleChange}
                  placeholder="email@sekolah.com"
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Nomor Telepon</label>
                <input
                  type="text"
                  name="nomor_telepon"
                  value={newUser.nomor_telepon}
                  onChange={handleChange}
                  placeholder="08xxxxxxxx"
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  required
                  value={newUser.tanggal_lahir}
                  onChange={handleChange}
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Kata Sandi Default</label>
                <input
                  type="text"
                  name="password"
                  required
                  value={newUser.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>

              {newUser.role === 'siswa' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">NISN</label>
                    <input
                      type="text"
                      name="nisn"
                      required
                      value={newUser.nisn}
                      onChange={handleChange}
                      placeholder="NISN"
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Username</label>
                    <input
                      type="text"
                      name="username"
                      required
                      value={newUser.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Kelas</label>
                    <input
                      type="text"
                      name="kelas"
                      required
                      value={newUser.kelas}
                      onChange={handleChange}
                      placeholder="Contoh: XII TITL 1"
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>
                </>
              )}

              {newUser.role === 'guru' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">NIP / NIK (Opsional)</label>
                    <input
                      type="text"
                      name="nip_nik"
                      value={newUser.nip_nik}
                      onChange={handleChange}
                      placeholder="NIP / NIK"
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-555 uppercase tracking-wider">Mata Pelajaran</label>
                    <input
                      type="text"
                      name="guru_mapel"
                      required
                      value={newUser.guru_mapel}
                      onChange={handleChange}
                      placeholder="Mata Pelajaran"
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Simpan Akun
              </button>
            </div>
          </form>
        </div>
      )}

      {}
      <div className="glass-card rounded-xl overflow-hidden border border-slate-300">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Daftar Pengguna Sistem</h2>
        </div>
        
        {loading ? (
          <div className="flex py-12 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-slate-400">Belum ada pengguna terdaftar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/60 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="px-6 py-3.5">Nama Lengkap</th>
                  <th className="px-6 py-3.5">Peran (Role)</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5">Informasi Identitas</th>
                  <th className="px-6 py-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-slate-900">{u.nama_lengkap}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                        u.role === 'super_admin' ? 'bg-red-50 text-red-700 border border-red-200' :
                        u.role === 'guru' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {u.role === 'super_admin' ? 'Admin' : u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{u.email}</td>
                    <td className="px-6 py-4 space-y-0.5 text-slate-500">
                      {u.role === 'siswa' && (
                        <>
                          <div><span className="font-semibold text-slate-400">NISN:</span> {u.nisn}</div>
                          <div><span className="font-semibold text-slate-400">User:</span> {u.username}</div>
                          <div><span className="font-semibold text-slate-400">Kelas:</span> {u.kelas}</div>
                        </>
                      )}
                      {u.role === 'guru' && (
                        <>
                          <div><span className="font-semibold text-slate-400">NIP/NIK:</span> {u.nip_nik || '-'}</div>
                          <div><span className="font-semibold text-slate-400">Mapel:</span> {u.guru_mapel}</div>
                        </>
                      )}
                      {u.role === 'super_admin' && (
                        <span className="italic text-slate-400">Akses Pengawas Sistem</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {u.role !== 'super_admin' ? (
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 text-rose-600 rounded transition-all cursor-pointer"
                          title="Hapus Akun"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">Terkunci</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardSuperAdmin

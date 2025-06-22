"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem('login', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('role', data.role);
        if (data.userId) localStorage.setItem('userId', data.userId);
      }
      if (data.role === 'admin') {
        router.push('/admin');
      } else if (data.role === 'dosen') {
        router.push('/dosen');
      } else {
        router.push('/');
      }
    } else {
      setError("Username atau password salah");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: regUsername, password: regPassword })
    });
    if (res.ok) {
      const data = await res.json();
      setRegSuccess("Pendaftaran berhasil! Silakan login.");
      setShowRegister(false);
      setUsername(regUsername);
      setRegUsername("");
      setRegPassword("");
      if (typeof window !== 'undefined') {
        localStorage.setItem('login', 'true');
        localStorage.setItem('username', regUsername);
        localStorage.setItem('role', data.role || 'peserta');
        if (data.userId) localStorage.setItem('userId', data.userId);
      }
      if (data.role === 'admin') {
        router.push('/admin');
      } else if (data.role === 'dosen') {
        router.push('/dosen');
      } else {
        router.push('/soal');
      }
    } else {
      const data = await res.json();
      setRegError(data.error || "Gagal mendaftar");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-md z-10">
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 mb-6 shadow text-blue-800 text-sm flex flex-col gap-1 animate-fadeIn">
            <div className="font-semibold mb-1 text-blue-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25v-.75z" /></svg>
              <span>Login Sebagai:</span>
            </div>
            <div><span className="font-bold">Admin</span>: <span className="font-mono">Admin</span> / <span className="font-mono">123</span></div>
            <div><span className="font-bold">Dosen</span>: <span className="font-mono">Dosen1</span> / <span className="font-mono">123</span></div>
            <div><span className="font-bold">Peserta</span>: <span className="text-gray-700">Silakan daftar/register akun baru</span></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-5 border border-blue-100 relative animate-fadeIn">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight flex items-center justify-center gap-2">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14.25c-3.25 0-6.5-1.458-8.25-2.25a.75.75 0 0 1 0-1.35C5.5 9.458 8.75 8 12 8s6.5 1.458 8.25 2.25a.75.75 0 0 1 0 1.35C18.5 12.792 15.25 14.25 12 14.25z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v4.5m0 0c-2.25 0-4.5-.75-6-2.25m6 2.25c2.25 0 4.5-.75 6-2.25" /></svg>
            Login Peserta Ujian
          </h2>
          <input
            type="text"
            placeholder="Username"
            className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 placeholder:text-blue-400 text-blue-700 font-medium shadow-sm transition"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 placeholder:text-blue-400 text-blue-700 font-medium shadow-sm transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm text-center animate-shake">{error}</div>}
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg py-2 font-bold hover:from-blue-700 hover:to-blue-600 shadow-md transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12h-9m6-3 3 3-3 3" /></svg>
            Login
          </button>
          <button type="button" className="text-blue-600 hover:underline text-sm mt-2 transition" onClick={() => setShowRegister(true)}>Belum punya akun? <span className="font-semibold">Daftar</span></button>
          {regSuccess && <div className="text-green-600 text-sm text-center animate-fadeIn">{regSuccess}</div>}
        </form>
        {showRegister && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-10 animate-fadeIn">
            <form onSubmit={handleRegister} className="bg-white/95 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-5 border border-blue-100 relative animate-fadeIn">
              <button type="button" className="absolute top-3 right-4 text-2xl text-blue-700 hover:text-red-500 transition" onClick={() => setShowRegister(false)} aria-label="Tutup">&times;</button>
              <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight flex items-center justify-center gap-2">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14.25c-3.25 0-6.5-1.458-8.25-2.25a.75.75 0 0 1 0-1.35C5.5 9.458 8.75 8 12 8s6.5 1.458 8.25 2.25a.75.75 0 0 1 0 1.35C18.5 12.792 15.25 14.25 12 14.25z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v4.5m0 0c-2.25 0-4.5-.75-6-2.25m6 2.25c2.25 0 4.5-.75 6-2.25" /></svg>
                Daftar Akun Peserta
              </h2>
              <input
                type="text"
                placeholder="Username"
                className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 placeholder:text-blue-400 text-blue-700 font-medium shadow-sm transition"
                value={regUsername}
                onChange={e => setRegUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 placeholder:text-blue-400 text-blue-700 font-medium shadow-sm transition"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
              />
              {regError && <div className="text-red-500 text-sm text-center animate-shake">{regError}</div>}
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg py-2 font-bold hover:from-blue-700 hover:to-blue-600 shadow-md transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 15V18.75A2.25 2.25 0 0010.5 21h6a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0016.5 3h-6A2.25 2.25 0 008.25 5.25V9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H6m3-3-3 3 3 3" /></svg>
                Daftar
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

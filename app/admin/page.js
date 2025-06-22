"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-2">
        <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative overflow-hidden animate-slideup border border-blue-100">
          <div className="absolute -top-10 right-10 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute -bottom-10 left-10 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="flex items-center gap-3 mb-4 animate-fadein">
            <span className="inline-block w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-md">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M7 17c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="10" r="3" stroke="#2563eb" strokeWidth="1.5"/></svg>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center drop-shadow">Dashboard Admin</h1>
          </div>
          <p className="mb-6 text-gray-700 text-center text-lg animate-fadein delay-100">
            Selamat datang, <span className="font-semibold text-blue-700">Admin</span>!<br />
            Kelola user, soal, dan pantau statistik ujian dengan mudah dan efisien.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-6 animate-fadein delay-200">
            <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center border border-blue-100 hover:scale-105 transition-transform">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-2"><rect x="4" y="6" width="16" height="12" rx="2" fill="#dbeafe"/><path d="M8 10h8M8 14h5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <div className="font-semibold text-blue-700 mb-1">Kelola User</div>
              <div className="text-xs text-gray-500 text-center">Manajemen data peserta & dosen.</div>
            </div>
            <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center border border-green-100 hover:scale-105 transition-transform">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-2"><rect x="4" y="6" width="16" height="12" rx="2" fill="#bbf7d0"/><path d="M8 10h8M8 14h5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <div className="font-semibold text-green-700 mb-1">Bank Soal</div>
              <div className="text-xs text-gray-500 text-center">Buat, edit, dan hapus soal ujian.</div>
            </div>
            <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center border border-blue-100 hover:scale-105 transition-transform">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-2"><circle cx="12" cy="12" r="10" fill="#dbeafe"/><path d="M8 15l4-4 4 4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <div className="font-semibold text-blue-700 mb-1">Statistik Ujian</div>
              <div className="text-xs text-gray-500 text-center">Lihat hasil dan statistik seluruh peserta.</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideup {
          0% { opacity: 0; transform: translateY(60px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadein { animation: fadein 1s cubic-bezier(.4,0,.2,1) both; }
        .animate-slideup { animation: slideup 1.2s cubic-bezier(.4,0,.2,1) both; }
        .animate-pulse { animation: pulse 2.5s infinite alternate; }
        @keyframes pulse { 0% { opacity: 0.4; } 100% { opacity: 0.8; } }
      `}</style>
    </div>
  );
}

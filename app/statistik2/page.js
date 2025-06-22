"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function StatistikAdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch('/api/jawaban?role=admin');
      const all = await res.json();
      setData(all);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center py-10 px-2">
        <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center relative overflow-hidden animate-slideup border border-blue-100">
          <div className="absolute -top-10 right-10 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute -bottom-10 left-10 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-4 text-center drop-shadow animate-fadein">Statistik Peserta (Admin)</h1>
          {loading ? <div className="text-blue-500 text-center">Memuat statistik...</div> : (
            <>
              <div className="mb-4 font-semibold text-blue-700 text-lg animate-fadein delay-100">Daftar Peserta yang Telah Mengerjakan Soal</div>
              <div className="overflow-x-auto animate-fadein delay-200 w-full">
                <table className="min-w-[600px] w-full text-xs sm:text-sm border rounded-xl overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700">
                      <th className="px-2 sm:px-3 py-2 border">No</th>
                      <th className="px-2 sm:px-3 py-2 border">User ID</th>
                      <th className="px-2 sm:px-3 py-2 border">Username</th>
                      <th className="px-2 sm:px-3 py-2 border">Waktu Pengerjaan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((j, i) => {
                      const waktu = j.waktuSelesai ? (new Date(j.waktuSelesai)).toLocaleString() : '-';
                      const userId = j.user && j.user._id ? j.user._id : (j.userId || '-');
                      const username = j.user && j.user.username ? j.user.username : (j.username || '-');
                      return (
                        <tr key={i} className="border-b hover:bg-blue-50 transition-colors">
                          <td className="px-2 sm:px-3 py-2 border text-center font-semibold text-blue-700">{i+1}</td>
                          <td className="px-2 sm:px-3 py-2 border text-center text-blue-800 font-mono break-all">{userId}</td>
                          <td className="px-2 sm:px-3 py-2 border text-center text-blue-700 font-bold">{username}</td>
                          <td className="px-2 sm:px-3 py-2 border text-center text-xs text-gray-600">{waktu}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {data.length === 0 && <div className="text-gray-400 mt-4">Belum ada data peserta yang mengerjakan soal.</div>}
            </>
          )}
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

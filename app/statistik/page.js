"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Fungsi utilitas untuk parsing value MongoDB agar bisa dibaca di frontend
function parseMongoValue(val) {
  if (val && typeof val === 'object') {
    if ('$numberInt' in val) return parseInt(val['$numberInt'], 10);
    if ('$numberLong' in val) return parseInt(val['$numberLong'], 10);
    if ('$date' in val && val['$date'] && '$numberLong' in val['$date']) {
      return new Date(parseInt(val['$date']['$numberLong'], 10));
    }
    if ('$oid' in val) return val['$oid'];
    // Untuk array of object (misal jawaban)
    if (Array.isArray(val)) return val.map(parseMongoValue);
  }
  return val;
}

export default function StatistikPage() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem('userId'));
      setUsername(localStorage.getItem('username'));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!username) return;
      localStorage.setItem('statistik_username', username); // simpan username statistik
      const res = await fetch(`/api/jawaban?role=peserta&username=${username}`);
      const all = await res.json();
      setData(all);
      setLoading(false);
    }
    if (username) fetchData();
  }, [username]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-2">
        <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative overflow-hidden animate-slideup border border-blue-100">
          <div className="absolute -top-10 right-10 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute -bottom-10 left-10 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-4 text-center drop-shadow animate-fadein">Statistik Ujian Anda</h1>
          {loading ? <div className="text-blue-500 text-center">Memuat statistik...</div> : (
            <>
              <div className="mb-4 font-semibold flex items-center justify-between w-full animate-fadein delay-100">
                <span className="text-blue-700">Statistik Ujian Pribadi</span>
                {userId && (
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-semibold">🆔 {userId}</span>
                )}
              </div>
              <ul className="text-left text-sm mb-4 w-full animate-fadein delay-200">
                {data.map((j, i) => {
                  const skor = parseMongoValue(j.skor);
                  const waktu = parseMongoValue(j.waktuSelesai);
                  const jawabanArr = Array.isArray(j.jawaban) ? j.jawaban.map(parseMongoValue) : [];
                  return (
                    <li key={i} className="mb-4 border-b pb-3 last:border-b-0 last:pb-0 bg-blue-50/60 rounded-xl px-4 py-3 shadow-sm hover:scale-[1.01] transition-transform">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="font-semibold text-blue-700">Ujian #{i+1}</span>
                        <span className="text-xs text-gray-500">{waktu instanceof Date ? waktu.toLocaleString() : waktu}</span>
                      </div>
                      <div className="mt-2 mb-1">Skor: <span className="font-bold text-blue-700 text-lg">{skor}</span></div>
                      {jawabanArr.length > 0 && (
                        <div className="bg-gray-50 rounded p-2 text-xs text-left mt-2">
                          <div className="font-semibold mb-1 text-gray-700">Jawaban Anda:</div>
                          <ol className="list-decimal list-inside ml-4">
                            {jawabanArr.map((ans, idx) => (
                              <li key={idx} className="mb-0.5 inline-block mr-2 px-2 py-0.5 rounded-lg bg-blue-100 text-blue-700 font-mono font-semibold shadow-sm">{typeof ans === 'number' ? String.fromCharCode(65+ans) : ans}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              {data.length === 0 && <div className="text-gray-400 mt-4">Belum ada data statistik.</div>}
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

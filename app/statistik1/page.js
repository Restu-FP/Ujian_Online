"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

// Fungsi utilitas untuk parsing value MongoDB agar bisa dibaca di frontend
function parseMongoValue(val) {
  if (val && typeof val === 'object') {
    if ('$numberInt' in val) return parseInt(val['$numberInt'], 10);
    if ('$numberLong' in val) return parseInt(val['$numberLong'], 10);
    if ('$date' in val && val['$date'] && '$numberLong' in val['$date']) {
      return new Date(parseInt(val['$date']['$numberLong'], 10));
    }
    if ('$oid' in val) return val['$oid'];
    if (Array.isArray(val)) return val.map(parseMongoValue);
  }
  return val;
}

export default function StatistikSemuaPage() {
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
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-2">
        <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative overflow-hidden animate-slideup">
          <div className="absolute -top-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute -bottom-10 left-10 w-32 h-32 bg-green-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-4 text-center drop-shadow animate-fadein">Statistik Semua Peserta</h1>
          {loading ? <div className="text-blue-500 text-center">Memuat statistik...</div> : (
            <>
              <div className="mb-4 font-semibold text-blue-700 text-lg animate-fadein delay-100">Daftar Statistik Ujian Seluruh Peserta</div>
              <div className="overflow-x-auto animate-fadein delay-200">
                <table className="min-w-full text-xs md:text-sm border rounded-xl overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700">
                      <th className="px-3 py-2 border">No</th>
                      <th className="px-3 py-2 border">Username</th>
                      <th className="px-3 py-2 border">Skor</th>
                      <th className="px-3 py-2 border">Waktu</th>
                      <th className="px-3 py-2 border">Jawaban</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((j, i) => {
                      const skor = parseMongoValue(j.skor);
                      const waktu = parseMongoValue(j.waktuSelesai);
                      const jawabanArr = Array.isArray(j.jawaban) ? j.jawaban.map(parseMongoValue) : [];
                      const kunciArr = Array.isArray(j.kunci) ? j.kunci.map(parseMongoValue) : (j.kunci ? j.kunci : []);
                      return (
                        <tr key={i} className="border-b hover:bg-blue-50 transition-colors">
                          <td className="px-3 py-2 border text-center font-semibold text-blue-700">{i+1}</td>
                          <td className="px-3 py-2 border text-blue-800 font-bold">{
                            j.user && typeof j.user === 'object' && j.user.username ? j.user.username :
                            (j.username ? j.username :
                              (j.user && typeof j.user === 'string' ? j.user : '-')
                            )
                          }</td>
                          <td className="px-3 py-2 border text-center font-bold text-green-700">{skor}</td>
                          <td className="px-3 py-2 border text-xs text-gray-600">{waktu instanceof Date ? waktu.toLocaleString() : waktu}</td>
                          <td className="px-3 py-2 border">
                            <ol className="list-decimal list-inside">
                              {jawabanArr.map((ans, idx) => {
                                let benar = false;
                                const ansNum = typeof ans === 'number' ? ans : parseInt(ans, 10);
                                const kunciNum = typeof kunciArr[idx] === 'number' ? kunciArr[idx] : parseInt(kunciArr[idx], 10);
                                if (kunciArr && typeof kunciArr[idx] !== 'undefined') {
                                  benar = ansNum === kunciNum;
                                }
                                return (
                                  <li key={idx} className={`inline-block mr-2 px-2 py-0.5 rounded-lg ${benar ? 'bg-green-100 text-green-700 font-bold' : 'bg-red-100 text-red-600 font-semibold'}`}>
                                    {typeof ansNum === 'number' && !isNaN(ansNum) ? String.fromCharCode(65+ansNum) : ans}
                                  </li>
                                );
                              })}
                            </ol>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
        .animate-fadein {
          animation: fadein 1s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-slideup {
          animation: slideup 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-pulse {
          animation: pulse 2.5s infinite alternate;
        }
        @keyframes pulse {
          0% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

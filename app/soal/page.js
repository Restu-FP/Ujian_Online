'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

export default function SoalPage() {
  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState({});
  const [timer, setTimer] = useState(100); // 100 detik = 1 menit 40 detik
  const [showResult, setShowResult] = useState(false);
  const [skor, setSkor] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mulai, setMulai] = useState(false);
  const [showSiap, setShowSiap] = useState(true);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Cek login sederhana (bisa diganti dengan session/jwt)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('username');
      if (!localStorage.getItem('login') || !user) {
        router.push('/login');
        return;
      }
      setUsername(user);
    }
    fetch('/api/soal').then(res => res.json()).then(data => {
      // Acak soal dan ambil hanya 10 soal
      const shuffled = data.sort(() => Math.random() - 0.5).slice(0, 10);
      setSoal(shuffled);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!mulai) return;
    if (timer <= 0 && soal.length > 0 && !showResult) handleSubmit();
    if (!showResult && mulai) {
      const t = setInterval(() => setTimer(s => s - 1), 1000);
      return () => clearInterval(t);
    }
  }, [timer, mulai]);

  function handleChange(idx, val) {
    setJawaban({ ...jawaban, [idx]: val });
  }

  async function handleSubmit() {
    if (!username) {
      alert('Username tidak ditemukan. Silakan login ulang.');
      return;
    }
    let benar = 0;
    soal.forEach((s, i) => {
      if (parseInt(jawaban[i]) === s.jawaban) benar++;
    });
    setSkor(benar);
    setShowResult(true);
    // Kirim data ke statistik (API jawaban)
    await fetch('/api/jawaban', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jawaban: Object.values(jawaban),
        skor: benar,
        waktuSelesai: new Date(),
        username: username // pastikan username terisi
      })
    });
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center animate-slideup border border-blue-100">
          <div className="animate-pulse w-16 h-16 rounded-full bg-blue-200 mb-4" />
          <span className="text-blue-700 font-bold text-lg">Memuat soal...</span>
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

  if (showSiap) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center animate-slideup border border-blue-100">
          <div className="animate-pulse w-16 h-16 rounded-full bg-blue-200 mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Siap untuk Memulai Ujian?</h2>
          <p className="mb-4 text-gray-700">Pastikan Anda sudah siap. Setelah dimulai, waktu akan berjalan otomatis.</p>
          <button onClick={() => { setMulai(true); setShowSiap(false); }} className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-8 py-2 font-semibold hover:from-blue-700 hover:to-blue-600 transition-colors shadow">Saya Siap</button>
        </div>
      </main>
      <Footer />
    </div>
  );

  if (showResult) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center animate-slideup border border-blue-100">
          <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center mb-4 animate-pulse">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M8 15l4-4 4 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Hasil Ujian</h2>
          <div className="text-lg mb-2">Skor Anda: <span className="font-bold text-blue-600">{skor} / {soal.length}</span></div>
          <button onClick={() => router.push('/statistik')} className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-8 py-2 font-semibold hover:from-blue-700 hover:to-blue-600 transition-colors shadow">Lihat Statistik</button>
        </div>
      </main>
      <Footer />
    </div>
  );

  if (timer <= 0) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center animate-slideup border border-blue-100">
          <div className="w-16 h-16 rounded-full bg-red-200 flex items-center justify-center mb-4 animate-pulse">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fecaca"/><path d="M8 15l4-4 4 4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-red-600">Waktu Habis!</h2>
          <button onClick={handleSubmit} className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-8 py-2 font-semibold hover:from-blue-700 hover:to-blue-600 transition-colors shadow">Lihat Hasil</button>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-2xl w-full animate-slideup border border-blue-100">
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-blue-700">Sisa Waktu:</span>
            <span className="font-mono text-lg bg-blue-100 px-3 py-1 rounded text-blue-700 shadow-inner">{Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}</span>
          </div>
          <div className="mb-4 text-right">
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-semibold">👤 {username}</span>
          </div>
          {soal.map((s, i) => (
            <div key={i} className="mb-8 border-b pb-6 last:border-b-0 last:pb-0">
              <div className="font-semibold mb-2 text-blue-800 text-lg flex items-center gap-2"><span className="inline-block bg-blue-200 text-blue-700 rounded-full px-2 py-0.5 text-xs font-bold">{i+1}</span> {s.pertanyaan}</div>
              {s.gambar && <img src={s.gambar} alt="gambar soal" className="rounded shadow mb-2 max-h-48 mx-auto border border-blue-100" />}
              <div className="flex flex-col gap-2 mt-2">
                {s.pilihan.map((p, j) => (
                  <label key={j} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border-2 transition-all ${jawaban[i] === j ? 'border-blue-500 bg-blue-50 shadow' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name={`soal-${i}`}
                      checked={jawaban[i] === j}
                      onChange={() => handleChange(i, j)}
                      className="accent-blue-600"
                    />
                    <span className="font-medium">{p}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg py-2 font-semibold hover:from-blue-700 hover:to-blue-600 transition-colors shadow">Kirim Jawaban</button>
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

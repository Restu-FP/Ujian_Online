'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function KelolaSoalPage() {
  const [soalList, setSoalList] = useState([]);
  const [form, setForm] = useState({ pertanyaan: '', pilihan: ['', '', '', ''], jawaban: 0, gambar: '' });
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSoal();
  }, []);

  async function fetchSoal() {
    setLoading(true);
    const res = await fetch('/api/soal');
    const data = await res.json();
    setSoalList(data);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePilihanChange(idx, val) {
    const pilihan = [...form.pilihan];
    pilihan[idx] = val;
    setForm({ ...form, pilihan });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setForm({ ...form, gambar: ev.target.result });
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.pertanyaan || form.pilihan.some(p => !p)) return alert('Lengkapi semua field!');
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/soal?id=${editId}` : '/api/soal';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ pertanyaan: '', pilihan: ['', '', '', ''], jawaban: 0, gambar: '' });
    setEditId(null);
    setPreview('');
    fetchSoal();
  }

  function handleEdit(soal) {
    setForm({
      pertanyaan: soal.pertanyaan,
      pilihan: soal.pilihan,
      jawaban: soal.jawaban,
      gambar: soal.gambar || ''
    });
    setPreview(soal.gambar || '');
    setEditId(soal._id);
  }

  async function handleDelete(id) {
    if (!confirm('Hapus soal ini?')) return;
    await fetch(`/api/soal?id=${id}`, { method: 'DELETE' });
    fetchSoal();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 flex-col items-center py-10 px-2">
        <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative overflow-hidden animate-slideup mb-10 border border-blue-100">
          <div className="absolute -top-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute -bottom-10 left-10 w-32 h-32 bg-green-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow animate-fadein">{editId ? 'Edit' : 'Tambah'} Soal Pilihan Ganda</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full animate-fadein delay-100">
            <input name="pertanyaan" value={form.pertanyaan} onChange={handleChange} placeholder="Pertanyaan" className="border-2 border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition-all" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {form.pilihan.map((p, i) => (
                <input key={i} value={p} onChange={e => handlePilihanChange(i, e.target.value)} placeholder={`Pilihan ${String.fromCharCode(65+i)}`} className="border-2 border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 transition-all" required />
              ))}
            </div>
            <div>
              <label className="block mb-1 font-semibold text-blue-700">Jawaban Benar</label>
              <select name="jawaban" value={form.jawaban} onChange={handleChange} className="border-2 border-blue-100 rounded-lg px-4 py-2">
                {form.pilihan.map((p, i) => (
                  <option key={i} value={i}>{String.fromCharCode(65+i)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-blue-700">Gambar (opsional)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {preview && <img src={preview} alt="Preview" className="mt-2 max-h-40 rounded shadow border border-blue-100" />}
            </div>
            <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg py-2 font-semibold hover:from-blue-700 hover:to-blue-600 transition-colors shadow">{editId ? 'Update' : 'Tambah'} Soal</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ pertanyaan: '', pilihan: ['', '', '', ''], jawaban: 0, gambar: '' }); setPreview(''); }} className="text-sm text-gray-500 underline">Batal Edit</button>}
          </form>
        </div>
        <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-10 animate-slideup border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-4 text-center drop-shadow">Daftar Soal</h2>
          {loading ? <div className="text-center text-blue-500">Memuat...</div> : soalList.length === 0 ? <div className="text-center text-gray-400">Belum ada soal.</div> : (
            <ul className="space-y-6">
              {soalList.map((s, idx) => (
                <li key={s._id || idx} className="border-b border-blue-100 pb-6 last:border-b-0 last:pb-0 bg-blue-50/40 rounded-xl px-4 py-3 shadow-sm hover:scale-[1.01] transition-transform">
                  <div className="font-semibold mb-1 text-blue-800 text-lg flex items-center gap-2"><span className="inline-block bg-blue-200 text-blue-700 rounded-full px-2 py-0.5 text-xs font-bold">{idx+1}</span> {s.pertanyaan}</div>
                  {s.gambar && <img src={s.gambar} alt="gambar soal" className="max-h-32 mb-2 rounded border border-blue-100" />}
                  <ol className="list-decimal list-inside ml-4 mb-1">
                    {s.pilihan.map((p, i) => (
                      <li key={i} className={i === s.jawaban ? 'font-bold text-blue-600' : ''}>{p}</li>
                    ))}
                  </ol>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEdit(s)} className="px-4 py-1 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 text-sm font-semibold shadow">Edit</button>
                    <button onClick={() => handleDelete(s._id)} className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm font-semibold shadow">Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
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

"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function BankSoalPage() {
  const [soal, setSoal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ pertanyaan: "", pilihan: ["", "", "", ""], jawaban: 0 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSoal();
  }, []);

  async function fetchSoal() {
    setLoading(true);
    const res = await fetch("/api/soal");
    const data = await res.json();
    setSoal(data);
    setLoading(false);
  }

  function handleFormChange(e, idx) {
    if (typeof idx === "number") {
      const newPilihan = [...form.pilihan];
      newPilihan[idx] = e.target.value;
      setForm({ ...form, pilihan: newPilihan });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  function handleJawabanChange(e) {
    setForm({ ...form, jawaban: parseInt(e.target.value, 10) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.pertanyaan || form.pilihan.some(p => !p)) return alert("Lengkapi semua field!");
    if (editId) {
      await fetch(`/api/soal?id=${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } else {
      await fetch("/api/soal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }
    setForm({ pertanyaan: "", pilihan: ["", "", "", ""], jawaban: 0 });
    setEditId(null);
    fetchSoal();
  }

  function handleEdit(s) {
    setForm({ pertanyaan: s.pertanyaan, pilihan: s.pilihan, jawaban: s.jawaban });
    setEditId(s._id);
  }

  async function handleDelete(id) {
    if (!confirm("Yakin hapus soal ini?")) return;
    await fetch(`/api/soal?id=${id}`, { method: "DELETE" });
    fetchSoal();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center py-6 px-1 sm:py-12 sm:px-2">
        <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl p-3 sm:p-10 flex flex-col items-center relative overflow-hidden animate-slideup border border-blue-100">
          <div className="absolute -top-10 right-2 sm:right-10 w-16 sm:w-24 h-16 sm:h-24 bg-blue-200 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute -bottom-10 left-2 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 bg-green-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 mb-4 text-center drop-shadow animate-fadein">Bank Soal (Admin)</h1>
          <form onSubmit={handleSubmit} className="mb-8 text-left w-full animate-fadein delay-100">
            <div className="mb-4">
              <label className="block font-semibold text-blue-700 mb-1">Pertanyaan</label>
              <input name="pertanyaan" value={form.pertanyaan} onChange={handleFormChange} className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition-all text-sm sm:text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[0,1,2,3].map(i => (
                <div className="mb-2" key={i}>
                  <label className="block">Pilihan {String.fromCharCode(65+i)}</label>
                  <input value={form.pilihan[i]} onChange={e => handleFormChange(e, i)} className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 transition-all text-sm sm:text-base" />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-blue-700 mb-1">Jawaban Benar</label>
              <select value={form.jawaban} onChange={handleJawabanChange} className="border-2 border-blue-100 rounded-lg px-4 py-2 text-sm sm:text-base">
                {[0,1,2,3].map(i => (
                  <option value={i} key={i}>{String.fromCharCode(65+i)}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-6 py-2 font-semibold hover:from-blue-700 hover:to-blue-600 transition-colors shadow text-sm sm:text-base">{editId ? "Update" : "Tambah"} Soal</button>
              {editId && <button type="button" onClick={()=>{setForm({pertanyaan:"",pilihan:["","","",""],jawaban:0});setEditId(null);}} className="bg-gray-400 text-white rounded-lg px-4 py-2 font-semibold hover:bg-gray-500 transition-colors text-sm sm:text-base">Batal</button>}
            </div>
          </form>
          <div className="overflow-x-auto w-full animate-fadein delay-200">
            <table className="min-w-[600px] w-full text-xs sm:text-sm border rounded-xl overflow-hidden shadow">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700">
                  <th className="px-2 sm:px-3 py-2 border">No</th>
                  <th className="px-2 sm:px-3 py-2 border">Pertanyaan</th>
                  <th className="px-2 sm:px-3 py-2 border">Pilihan</th>
                  <th className="px-2 sm:px-3 py-2 border">Jawaban</th>
                  <th className="px-2 sm:px-3 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan={5} className="text-center py-4 text-blue-500">Memuat...</td></tr> : soal.map((s, i) => (
                  <tr key={s._id} className="border-b hover:bg-blue-50 transition-colors">
                    <td className="px-2 sm:px-3 py-2 border text-center font-semibold text-blue-700">{i+1}</td>
                    <td className="px-2 sm:px-3 py-2 border text-left text-blue-800 font-bold break-words max-w-[180px] sm:max-w-xs">{s.pertanyaan}</td>
                    <td className="px-2 sm:px-3 py-2 border text-left">
                      <ol className="list-decimal list-inside">
                        {s.pilihan.map((p, idx) => <li key={idx} className={idx === s.jawaban ? 'font-bold text-blue-600' : ''}>{String.fromCharCode(65+idx)}. {p}</li>)}
                      </ol>
                    </td>
                    <td className="px-2 sm:px-3 py-2 border text-center font-bold text-green-700">{String.fromCharCode(65+s.jawaban)}</td>
                    <td className="px-2 sm:px-3 py-2 border text-center">
                      <button onClick={()=>handleEdit(s)} className="group inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-full px-3 py-1 mr-2 font-semibold hover:bg-yellow-200 hover:text-yellow-900 shadow transition-all duration-150 text-xs sm:text-sm">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="inline-block group-hover:scale-110 transition-transform"><path d="M4 21h4.586a1 1 0 0 0 .707-.293l9.414-9.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 15.707A1 1 0 0 0 4 16.414V21z" stroke="#eab308" strokeWidth="1.5"/><path d="M14.5 7.5l2 2" stroke="#eab308" strokeWidth="1.5"/></svg>
                        Edit
                      </button>
                      <button onClick={()=>handleDelete(s._id)} className="group inline-flex items-center gap-1 bg-red-100 text-red-700 border border-red-300 rounded-full px-3 py-1 font-semibold hover:bg-red-200 hover:text-red-900 shadow transition-all duration-150 text-xs sm:text-sm">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="inline-block group-hover:scale-110 transition-transform"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" stroke="#ef4444" strokeWidth="1.5"/><path d="M9 10v6M15 10v6M4 7h16M10 4h4a1 1 0 0 1 1 1v2H9V5a1 1 0 0 1 1-1z" stroke="#ef4444" strokeWidth="1.5"/></svg>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

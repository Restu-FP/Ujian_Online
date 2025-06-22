"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadein">
      <Navbar />
      <main className="flex flex-col flex-1 items-center justify-center gap-8 py-12 px-4">
        <div className="w-full max-w-3xl bg-white/80 rounded-3xl shadow-2xl p-12 flex flex-col items-center relative overflow-hidden animate-slideup">
          <div className="absolute -top-10 right-8 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="absolute -bottom-10 left-8 w-32 h-32 bg-blue-300 rounded-full blur-2xl opacity-50 animate-pulse" />
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-700 mb-4 text-center drop-shadow animate-fadein">
            Simulasi Ujian CPNS Online
          </h1>
          <p className="text-base sm:text-lg text-gray-700 text-center max-w-xl mb-6 animate-fadein delay-100">
            Platform modern untuk latihan soal CPNS secara online, mudah, dan responsif.
          </p>
          <ol className="list-decimal list-inside text-base sm:text-lg text-gray-800 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-6 shadow max-w-md w-full animate-fadein delay-200">
            <li className="mb-2">Soal Pilihan Ganda & Gambar</li>
            <li className="mb-2">Timer Ujian</li>
            <li className="mb-2">Statistik Hasil Ujian</li>
          </ol>
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
        @media (max-width: 640px) {
          .max-w-2xl { padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}

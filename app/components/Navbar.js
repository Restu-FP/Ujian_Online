"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('username') || "");
      setRole(localStorage.getItem('role') || null);
      // Scroll event for shadow
      const onScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('login');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      window.location.href = "/login";
    }
  }

  function closeMenu() { setOpen(false); }

  return (
    <nav className={`max-w-screen-xl mx-auto w-full flex items-center justify-between py-3 px-4 sm:px-8 bg-white ${scrolled ? 'shadow-md' : ''} sticky top-0 z-30 transition-all duration-300`}> 
      <div className="flex items-center gap-2">
        <span className="inline-block w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {/* Heroicon AcademicCap */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25c-3.25 0-6.5-1.458-8.25-2.25a.75.75 0 0 1 0-1.35C5.5 9.458 8.75 8 12 8s6.5 1.458 8.25 2.25a.75.75 0 0 1 0 1.35C18.5 12.792 15.25 14.25 12 14.25z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v4.5m0 0c-2.25 0-4.5-.75-6-2.25m6 2.25c2.25 0 4.5-.75 6-2.25" />
          </svg>
        </span>
        <span className="font-bold text-lg text-blue-700 tracking-tight select-none">Simulasi CPNS</span>
      </div>
      {/* Hamburger */}
      <button className="sm:hidden flex flex-col justify-center items-center w-9 h-9 rounded hover:bg-blue-50/40 transition group" onClick={() => setOpen(o => !o)} aria-label="Menu">
        {/* Heroicon Bars3 */}
        <svg className={`w-6 h-6 text-blue-700 transition-all duration-300 ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Menu */}
      <div className={`fixed sm:static top-0 right-0 h-full sm:h-auto w-4/5 max-w-xs sm:w-auto bg-white shadow-xl sm:shadow-none z-40 flex flex-col sm:flex-row gap-0 sm:gap-3 items-start sm:items-center p-7 sm:p-0 transition-all duration-500 ${open ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'} sm:relative rounded-l-2xl sm:rounded-none`} style={{maxWidth:'100vw'}}>
        <button className="sm:hidden absolute top-4 right-4 text-2xl text-blue-700 hover:text-red-500 transition" onClick={closeMenu} aria-label="Tutup Menu">
          {/* Heroicon XMark */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Link href="/" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
          {/* Heroicon Home */}
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-7 9 7M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
          Beranda
        </Link>
        {role === 'admin' && (
          <>
            <Link href="/admin" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon Squares2x2 */}
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" /></svg>
              Dashboard
            </Link>
            <Link href="/banksoal" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon ClipboardDocumentList */}
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3.28a2 2 0 003.44 0H17a2 2 0 012 2v11a2 2 0 01-2 2z" /></svg>
              Bank Soal
            </Link>
            <Link href="/statistik2" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon ChartBar */}
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6" /></svg>
              Statistik
            </Link>
          </>
        )}
        {role === 'dosen' && (
          <>
            <Link href="/dosen" className="hover:text-green-700 transition-colors font-medium px-2 py-2 rounded hover:bg-green-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon Squares2x2 */}
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" /></svg>
              Dashboard
            </Link>
            <Link href="/kelolasoal" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon ClipboardDocumentList */}
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3.28a2 2 0 003.44 0H17a2 2 0 012 2v11a2 2 0 01-2 2z" /></svg>
              Kelola Soal
            </Link>
            <Link href="/statistik1" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon ChartBar */}
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6" /></svg>
              Statistik
            </Link>
          </>
        )}
        {role === 'peserta' && (
          <>
            <Link href="/soal" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon PencilSquare */}
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.212l-4 1 1-4 12.362-12.725z" /></svg>
              Mulai Ujian
            </Link>
            <Link href="/statistik" className="hover:text-blue-700 transition-colors font-medium px-2 py-2 rounded hover:bg-blue-50 w-full sm:w-auto text-base flex items-center gap-2" onClick={closeMenu}>
              {/* Heroicon ChartBar */}
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6" /></svg>
              Statistik
            </Link>
          </>
        )}
        {username && (
          <span className="hidden sm:flex items-center text-xs text-gray-600 ml-2 gap-1">
            {/* Heroicon UserCircle */}
            <svg className="w-5 h-5 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25v-.75z" /></svg>
            <span className="font-semibold">{username}</span>
            {role && (
              <span className={
                role === 'admin' ? 'text-blue-700 font-semibold' :
                role === 'dosen' ? 'text-green-700 font-semibold' :
                'text-gray-700 font-semibold'
              }> [{role.charAt(0).toUpperCase() + role.slice(1)}]</span>
            )}
          </span>
        )}
        {username ? (
          <button onClick={() => { handleLogout(); closeMenu(); }} className="ml-0 sm:ml-2 px-4 py-1.5 rounded bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 text-xs shadow-md transition-all w-full sm:w-auto mt-2 sm:mt-0 font-semibold tracking-wide active:scale-95 flex items-center gap-2">
            {/* Heroicon ArrowRightOnRectangle */}
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12h-9m6-3 3 3-3 3" /></svg>
            Logout
          </button>
        ) : (
          <Link href="/login" onClick={closeMenu} className="ml-0 sm:ml-2 px-4 py-1.5 rounded bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 text-xs shadow-md transition-all w-full sm:w-auto mt-2 sm:mt-0 font-semibold tracking-wide active:scale-95 flex items-center gap-2">
            {/* Heroicon ArrowLeftOnRectangle */}
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 15V18.75A2.25 2.25 0 0010.5 21h6a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0016.5 3h-6A2.25 2.25 0 008.25 5.25V9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H6m3-3-3 3 3 3" /></svg>
            Login
          </Link>
        )}
      </div>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/20 z-30 sm:hidden transition-opacity duration-300" onClick={closeMenu}></div>}
    </nav>
  );
}

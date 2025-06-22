export default function Footer() {
  return (
    <footer className="w-full py-5 px-8 bg-gradient-to-r from-blue-50 via-white to-green-50 dark:bg-neutral-900 text-center text-xs text-gray-600 border-t mt-12 relative flex flex-col items-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <img src="/globe.svg" alt="Globe" className="w-5 h-5 inline-block opacity-80" />
        <span className="font-semibold text-blue-700 tracking-wide">Simulasi CPNS Online</span>
      </div>
      <div className="text-[11px] text-gray-500 mb-1">&copy; {new Date().getFullYear()} Dibuat dengan <span className="text-pink-500">&#10084;&#65039;</span> untuk pembelajaran & pengembangan diri.</div>
      <div className="flex gap-3 justify-center mt-1">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors underline underline-offset-2">GitHub</a>
        <a href="https://bkn.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors underline underline-offset-2">BKN</a>
        <a href="https://cpns.bkn.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors underline underline-offset-2">CPNS Info</a>
      </div>
      <div className="absolute right-6 bottom-2 opacity-20 pointer-events-none select-none text-[10px]">v1.0.2025</div>
    </footer>
  );
}

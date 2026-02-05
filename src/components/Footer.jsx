import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-black border-t-[4px] border-slate-900 pt-14 pb-8 font-sans antialiased text-white relative overflow-hidden">
      
      {/* Decorative System Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00c2e0] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* BRAND ARCHITECTURE - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-4">
                {/* White Logo Card - Essential for transparent logo visibility */}
                <div className="bg-white p-2.5 border-[3px] border-[#00c2e0] shadow-[5px_5px_0px_0px_rgba(0,194,224,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all duration-200">
                  <img src={logo} alt="Hirely Logo" className="h-8 w-auto object-contain" />
                </div>
                <div>
                  <div className="font-black text-2xl leading-none uppercase italic tracking-tighter text-white">HIRELY</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00c2e0] mt-1">CORE.PLATFORM</div>
                </div>
              </div>
            </Link>
            <p className="text-slate-500 font-bold text-xs uppercase leading-relaxed tracking-tight max-w-sm">
              An enterprise-grade application management system built to provide structured workflows and absolute status transparency for modern hiring.
            </p>
          </div>

          {/* NAVIGATION NODES - 3 Columns */}
          <div className="lg:col-span-3 border-l-0 lg:border-l-[2px] border-slate-900 lg:pl-10">
            <h4 className="text-[#ffde59] font-black text-[11px] uppercase tracking-[0.3em] mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Jobs', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-all font-black text-[10px] uppercase flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#00c2e0] group-hover:scale-150 transition-transform"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONNECTIVITY - 4 Columns */}
          <div className="lg:col-span-4 bg-slate-900/30 border-[3px] border-slate-800 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="text-[#b4f481] font-black text-[11px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">Direct Support</h4>
            <div className="space-y-5">
              <a href="mailto:admin@hirely.com" className="flex items-center gap-4 group">
                <div className="bg-black p-2 border-2 border-[#b4f481] shadow-[3px_3px_0px_0px_rgba(180,244,129,1)] group-hover:bg-[#b4f481] group-hover:text-black transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <span className="text-slate-200 font-black text-xs lowercase">admin@hirely.com</span>
              </a>
              
              <div className="flex items-center gap-4 group">
                <div className="bg-black p-2 border-2 border-slate-700 shadow-[3px_3px_0px_0px_rgba(50,50,50,1)]">
                   <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Pune, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS BAR */}
        <div className="border-t-[3px] border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.4em]">
            © 2026 HIRELY.PRO — ARCHITECTED FOR SCALE
          </p>
          <div className="flex gap-8">
            <span className="text-slate-800 text-[9px] font-black uppercase tracking-tighter">BUILD: v2.5.0_LATEST</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
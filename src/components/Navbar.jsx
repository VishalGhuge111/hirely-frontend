import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  // Close menus on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (mobileMenuOpen && mobileRef.current && !mobileRef.current.contains(e.target) && !e.target.closest('.mobile-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/#services" },
    { name: "Jobs", path: "/jobs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-[1000] font-sans antialiased w-full">
      {/* MAIN NAVBAR */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 border-b-[2px] border-black h-[74px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          
          {/* LOGO - Adjusted to a refined smaller size */}
          <Link to="/" className="flex items-center">
            <div className="bg-white px-2.5 py-1.5 border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:scale-95">
              <img src={logo} alt="Logo" className="h-6 md:h-6.5 object-contain" />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-3 flex-1 justify-center px-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-black text-[10px] px-5 py-2 border-[1.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="bg-white px-4 py-2 border-[1.5px] border-black font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50 transition-all">
                  Login
                </Link>
                <Link to="/register" className="bg-[#b4f481] px-4 py-2 border-[1.5px] border-black font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#a1e66c] transition-all">
                  Join
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="bg-white min-w-fit px-4 py-2 border-[1.5px] border-black flex items-center gap-3 font-black text-[11px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                >
                  <div className="w-6 h-6 bg-cyan-100 rounded-full border-[1.2px] border-black flex items-center justify-center overflow-hidden shrink-0">
                    <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                  </div>
                  <span className="hidden sm:inline tracking-tighter whitespace-nowrap">{user.name}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${profileMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border-[1.5px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <Link onClick={() => setProfileMenuOpen(false)} to="/profile" className="flex gap-3 items-center px-4 py-3 font-black text-[10px] uppercase hover:bg-blue-50 border-b-[1px] border-slate-100 transition-colors">
                      <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                         <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0113 0"/></svg>
                      </div>
                      My Profile
                    </Link>
                    <Link onClick={() => setProfileMenuOpen(false)} to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="flex gap-3 items-center px-4 py-3 font-black text-[10px] uppercase hover:bg-yellow-50 border-b-[1px] border-slate-100 transition-colors">
                      <div className="w-5 h-5 rounded bg-yellow-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>
                      </div>
                      {user.role === "admin" ? "Admin Panel" : "Applications"}
                    </Link>
                    <button onClick={handleLogout} className="flex gap-3 items-center w-full px-4 py-3 font-black text-[10px] uppercase text-rose-600 hover:bg-rose-50 transition-colors text-left">
                      <div className="w-5 h-5 rounded bg-rose-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
                      </div>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden mobile-toggle bg-yellow-400 p-2 border-[1.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:scale-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <>
          <div onClick={() => setMobileMenuOpen(false)} className="lg:hidden fixed inset-0 bg-black/10 z-[998]" />
          
          <div ref={mobileRef} className="lg:hidden absolute top-[74px] inset-x-0 bg-white border-b-[3px] border-black z-[999] shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-6 space-y-2">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  onClick={() => setMobileMenuOpen(false)} 
                  to={item.path} 
                  className="block px-4 py-3 font-black text-xs uppercase border-[1.5px] border-black bg-[#f8fafc] active:bg-cyan-50"
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Link onClick={() => setMobileMenuOpen(false)} to="/login" className="text-center py-3 bg-white border-[1.5px] border-black font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Login</Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/register" className="text-center py-3 bg-[#b4f481] border-[1.5px] border-black font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Join</Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
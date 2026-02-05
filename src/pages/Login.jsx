import { useContext, useState, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* h-screen + overflow-hidden locks the scroll. z-40 ensures it stays above footer but below navbar */
    <div className="fixed inset-0 top-[70px] bg-[#f0f7ff] flex items-center justify-center px-4 overflow-hidden z-40">
      
      {/* Container - Laptop Width (max-w-2xl), Boxy Corners */}
      <div className="w-full max-w-md lg:max-w-2xl bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 rounded-none relative">
        
        {/* Boxy Tag */}
        <div className="absolute -top-4 -right-2 bg-[#b4f481] border-[3px] border-black px-5 py-1.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          SECURE LOGIN
        </div>

        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase text-black italic leading-none">
            WELCOME <span className="text-[#00a8cc]">BACK</span>
          </h2>
          <p className="mt-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
            Sign in to continue
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-rose-50 border-[2px] border-black text-rose-700 text-[10px] font-black uppercase flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span>×</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="ENTER EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3.5 bg-white border-[3px] border-black outline-none font-bold text-slate-700 text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] focus:bg-[#daebff] rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3.5 bg-white border-[3px] border-black outline-none font-bold text-slate-700 text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] focus:bg-[#daebff] rounded-none"
            />
          </div>

          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00c2e0] hover:bg-cyan-500 disabled:bg-slate-200 text-black font-black py-4 px-4 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-[0.2em] rounded-none"
            >
              {loading ? "AUTHENTICATING..." : "LOGIN TO ACCOUNT"}
            </button>

            <div className="text-center">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#00a8cc] hover:underline underline-offset-4 ml-1">
                  SIGN UP HERE
                </Link>
              </p>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
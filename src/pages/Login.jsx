import { useContext, useState } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();          // ⛔ prevent refresh
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);           // ✅ only now user is set
      navigate("/");             // ✅ redirect only on success
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
      // ✅ inputs stay exactly as user typed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 top-[70px] bg-[#f0f7ff] flex items-center justify-center px-4 overflow-hidden z-40">
      <div className="w-full max-w-md lg:max-w-2xl bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 relative">

        <div className="absolute -top-4 -right-2 bg-[#b4f481] border-[3px] border-black px-5 py-1.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          SECURE LOGIN
        </div>

        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-black uppercase italic">
            WELCOME <span className="text-[#00a8cc]">BACK</span>
          </h2>
          <p className="mt-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Sign in to continue
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-rose-50 border-[2px] border-black text-rose-700 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            × {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3.5 border-[3px] border-black font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3.5 border-[3px] border-black font-bold"
            />
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-[10px] font-black uppercase tracking-widest text-[#00a8cc] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00c2e0] border-[3px] border-black py-4 font-black uppercase text-xs shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN TO ACCOUNT"}
          </button>

          <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#00a8cc] hover:underline">
              SIGN UP
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
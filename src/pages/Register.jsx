import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", formData);

      // ✅ Redirect to OTP verification
      navigate("/verify-email", {
        state: { email: formData.email },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 top-[70px] bg-[#f0f7ff] flex items-center justify-center px-4 overflow-hidden z-40">
      <div className="w-full max-w-md lg:max-w-2xl bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 rounded-none relative">

        <div className="absolute -top-4 -right-2 bg-[#ffde59] border-[3px] border-black px-5 py-1.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          NEW ACCOUNT
        </div>

        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase text-black italic leading-none">
            JOIN <span className="text-[#00a8cc]">US</span>
          </h2>
          <p className="mt-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
            Create your profile to start applying
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-rose-50 border-[2px] border-black text-rose-700 text-[10px] font-black uppercase flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span>×</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3.5 bg-white border-[3px] border-black outline-none font-bold text-slate-700 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="NAME@EXAMPLE.COM"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3.5 bg-white border-[3px] border-black outline-none font-bold text-slate-700 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Create Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3.5 bg-white border-[3px] border-black outline-none font-bold text-slate-700 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b4f481] border-[3px] border-black py-4 font-black uppercase text-xs"
          >
            {loading ? "CREATING PROFILE..." : "CREATE MY ACCOUNT"}
          </button>

          <div className="text-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              Already have an account?
              <Link to="/login" className="text-[#00a8cc] ml-1 underline">
                LOGIN HERE
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
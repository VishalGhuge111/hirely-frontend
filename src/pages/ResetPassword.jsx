import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        email,
        otp: otp.join(""),
        password,
      });

      setSuccess("Password changed successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 top-[70px] bg-[#f0f7ff] flex items-center justify-center px-4 z-40">
      <div className="w-full max-w-md bg-white border-2 border-black p-6 md:p-8
        shadow-none md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">

        <h2 className="text-3xl font-black uppercase italic mb-2">
          Reset Password
        </h2>

        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">
          OTP sent to {email}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border-2 border-black text-rose-700 text-[10px] font-black uppercase">
            × {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-[#b4f481] border-2 border-black text-[10px] font-black uppercase">
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* OTP INPUTS */}
          <div className="grid grid-cols-6 gap-2 max-w-xs mx-auto">
  {otp.map((digit, i) => (
    <input
      key={i}
      id={`otp-${i}`}
      type="text"
      maxLength="1"
      value={digit}
      onChange={(e) => handleOtpChange(e.target.value, i)}
      className="
        w-full h-12
        text-center text-lg font-black
        border border-black
        outline-none
      "
    />
  ))}
</div>

          {/* NEW PASSWORD */}
          <input
            type="password"
            placeholder="NEW PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-black font-black outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00c2e0] disabled:bg-slate-200
              border-2 border-black py-4 font-black uppercase text-xs
              md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              active:shadow-none transition-all"
          >
            {loading ? "RESETTING..." : "RESET PASSWORD"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
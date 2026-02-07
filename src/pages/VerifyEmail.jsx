import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputsRef = useRef([]);

  if (!email) {
    navigate("/register");
    return null;
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/verify-email", {
        email,
        otp: otp.join(""),
      });

      setSuccess("Email verified successfully. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setResending(true);

    try {
      await api.post("/auth/resend-otp", { email });
      setSuccess("New OTP sent to your email");
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 top-[70px] bg-[#f0f7ff] flex items-center justify-center px-4 z-40">
      <div className="w-full max-w-md bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 relative">

        <div className="absolute -top-4 -right-2 bg-[#00c2e0] border-[3px] border-black px-5 py-1.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          VERIFY EMAIL
        </div>

        <h2 className="text-2xl sm:text-3xl font-black uppercase italic mb-2">
          OTP Verification
        </h2>

        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6 break-all">
          Code sent to {email}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border-[2px] border-black text-rose-700 text-[10px] font-black uppercase">
            × {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-[#b4f481] border-[2px] border-black text-[10px] font-black uppercase">
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          {/* OTP INPUTS */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                className="
                  w-10 h-12 sm:w-12 sm:h-14
                  text-center text-lg sm:text-xl font-black
                  border-[2px] sm:border-[3px] border-black
                  outline-none
                  sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                  focus:shadow-none focus:translate-x-[1px] focus:translate-y-[1px]
                "
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b4f481] hover:bg-[#a3e370] disabled:bg-slate-200 border-[3px] border-black py-4 font-black uppercase text-xs shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            {loading ? "VERIFYING..." : "VERIFY OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-[10px] font-black uppercase tracking-widest text-[#00a8cc] hover:underline disabled:text-slate-400"
          >
            {resending ? "RESENDING OTP..." : "RESEND OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
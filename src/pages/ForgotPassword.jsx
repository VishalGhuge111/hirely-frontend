import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/forgot-password", { email });
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 top-[70px] bg-[#f0f7ff] flex items-center justify-center px-4 z-40">
      <div className="w-full max-w-md bg-white border-[3px] border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black uppercase italic mb-4">
          Forgot Password
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border-[2px] border-black text-[10px] font-black uppercase">
            × {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="ENTER REGISTERED EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-4 border-[3px] border-black font-bold outline-none"
          />

          <button
            disabled={loading}
            className="w-full bg-[#00c2e0] border-[3px] border-black py-4 font-black uppercase text-xs shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {loading ? "SENDING OTP..." : "SEND OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Profile() {
  const { user, logout, token, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    linkedin: user?.linkedin || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || "",
      mobile: user.mobile || "",
      linkedin: user.linkedin || "",
    });
  }
}, [user]);

  if (!user) return null;

  const handleSave = async () => {
  setSaving(true);
  setMessage({ text: "", type: "" });

  try {
    const res = await api.put(
      "/auth/profile",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ✅ STORE BACKEND RESPONSE DIRECTLY
    updateUser(res.data);

    setMessage({ text: "Profile updated successfully!", type: "success" });
    setEditMode(false);
  } catch (error) {
    setMessage({
      text: error.response?.data?.message || "Failed to update profile",
      type: "error",
    });
  } finally {
    setSaving(false);
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  }
};

  // --- NEW DELETE LOGIC ---
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "ARE YOU ABSOLUTELY SURE? This action is permanent and your data will be wiped from our database forever."
    );

    if (confirmed) {
      try {
        await api.delete("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Account deleted successfully.");
        logout();
        navigate("/register");
      } catch (error) {
        setMessage({ text: "Failed to delete account. Try again.", type: "error" });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] pb-20 font-sans antialiased text-slate-900">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 border-b-[3px] border-black py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tighter leading-none">
                  {user.name}
                </h1>
                <p className="text-black/70 font-bold text-sm uppercase mt-2 tracking-widest">
                  Account Setting & Management
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="bg-white hover:bg-slate-50 text-black font-black text-xs uppercase px-6 py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all w-fit"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8">
        {message.text && (
          <div className={`mb-6 p-4 border-[3px] border-black font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            message.type === "success" ? "bg-[#b4f481]" : "bg-rose-100"
          }`}>
            {message.type === "success" ? "✓ " : "× "} {message.text}
          </div>
        )}

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* LEFT SIDE: Information Card */}
          <div className="lg:col-span-2">
            <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 h-full">
              <div className="flex items-center justify-between mb-8 border-b-[3px] border-black pb-4">
                <h3 className="text-xl font-black uppercase italic tracking-tight">Basic Information</h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`text-[10px] font-black uppercase px-4 py-2 border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all ${
                    editMode ? "bg-slate-100" : "bg-[#ffde59]"
                  }`}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {editMode ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border-[3px] border-black font-bold focus:bg-white outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border-[3px] border-black font-bold focus:bg-white outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">LinkedIn Profile</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border-[3px] border-black font-bold focus:bg-white outline-none"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-[#b4f481] border-[3px] border-black py-4 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  >
                    {saving ? "Updating..." : "Save Changes"}
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400">Full Name</p>
                    <p className="text-lg font-black uppercase leading-none">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400">Email Address</p>
                    <p className="text-lg font-black lowercase leading-none">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400">Mobile Number</p>
                    <p className="text-lg font-black leading-none">{user.mobile || "— Not Set —"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400">LinkedIn Profile</p>
                    <p className="text-lg font-black leading-none truncate">
                        {user.linkedin ? <a href={user.linkedin} target="_blank" className="text-cyan-600 underline">Link ↗</a> : "— Not Set —"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400">Account Role</p>
                    <span className="inline-block px-3 py-1 bg-cyan-100 border-[2px] border-black text-[10px] font-black uppercase mt-1">
                      {user.role}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Sidebar / Session & Danger Zone */}
          <div className="flex flex-col gap-8">
            <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex-grow">
               <h4 className="font-black uppercase text-xs mb-4 border-b-2 border-slate-100 pb-2">Session</h4>
               <button
                  onClick={handleLogout}
                  className="w-full bg-white hover:bg-slate-50 border-[3px] border-black py-3 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Log Out
                </button>
            </div>

            <div className="bg-rose-50 border-[3px] border-rose-500 shadow-[8px_8px_0px_0px_#f43f5e] p-6 flex-grow">
               <h4 className="font-black uppercase text-xs text-rose-600 mb-2">Danger Zone</h4>
               <p className="text-[10px] font-bold text-rose-400 uppercase leading-tight mb-4">Permanent deletion.</p>
               <button
                  onClick={handleDeleteAccount}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white border-[3px] border-black py-3 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  Terminate Account
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
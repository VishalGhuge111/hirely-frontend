import { useState } from "react";
import api from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ text: "", type: "" });

    try {
      // Assuming a contact endpoint exists
      await api.post("/contact", formData);
      setStatus({ text: "Message sent successfully!", type: "success" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ text: "Failed to send message. Please try again.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ text: "", type: "" }), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] pb-16 font-sans antialiased text-slate-900">
      
      {/* COMPACT HEADER AREA */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 border-b-[4px] border-black py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter leading-none">
            GET IN <span className="text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">TOUCH</span>
          </h1>
          <p className="text-black font-bold text-[10px] md:text-xs uppercase mt-3 tracking-[0.3em] opacity-90">
            Support, Partnerships, and Inquiries
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        
        {status.text && (
          <div className={`mb-6 p-4 border-[3px] border-black font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            status.type === "success" ? "bg-[#b4f481]" : "bg-rose-100"
          }`}>
            {status.type === "success" ? "✓ " : "× "} {status.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CONTACT INFO CARDS */}
          <div className="space-y-4">
            <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Email Us</p>
              <p className="text-lg font-black lowercase break-all">admin@hirely.com</p>
            </div>

            <div className="bg-[#ffde59] border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-black uppercase text-black/50 tracking-widest mb-1">Call Support</p>
              <p className="text-lg font-black">+91 9999999999</p>
            </div>

            <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Office Location</p>
              <p className="text-lg font-black uppercase leading-tight">Pune, Maharashtra, India</p>
            </div>
          </div>

          {/* MESSAGE FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10">
              <h2 className="text-2xl font-black uppercase italic tracking-tight mb-8 border-b-[3px] border-black pb-4">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="YOUR NAME"
                      className="w-full px-4 py-3 bg-slate-50 border-[3px] border-black font-bold focus:bg-white outline-none rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="EMAIL@EXAMPLE.COM"
                      className="w-full px-4 py-3 bg-slate-50 border-[3px] border-black font-bold focus:bg-white outline-none rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="HOW CAN WE HELP?"
                    className="w-full px-4 py-3 bg-slate-50 border-[3px] border-black font-bold focus:bg-white outline-none rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Your Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="DESCRIBE YOUR INQUIRY..."
                    className="w-full px-4 py-3 bg-slate-50 border-[3px] border-black font-bold focus:bg-white outline-none rounded-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00c2e0] hover:bg-cyan-500 border-[3px] border-black py-4 font-black uppercase text-xs shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  {loading ? "SENDING..." : "DISPATCH MESSAGE"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
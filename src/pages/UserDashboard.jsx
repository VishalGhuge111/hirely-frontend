import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function UserDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    fetchApplications();
  }, [token]);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApps(res.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Selected": return "bg-[#b4f481] text-black border-black";
      case "Rejected": return "bg-rose-500 text-white border-black";
      case "Shortlisted": return "bg-[#ffde59] text-black border-black";
      default: return "bg-[#daebff] text-black border-black";
    }
  };

  const filteredApps = filter === "all" 
    ? apps 
    : apps.filter(app => app.status === filter);

  const stats = [
    { label: "Total Apps", value: apps.length, color: "bg-white" },
    { label: "Selected", value: apps.filter(a => a.status === "Selected").length, color: "bg-[#b4f481]" },
    { label: "Shortlisted", value: apps.filter(a => a.status === "Shortlisted").length, color: "bg-[#ffde59]" },
    { label: "Rejected", value: apps.filter(a => a.status === "Rejected").length, color: "bg-rose-500 text-white" },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center font-black uppercase tracking-tighter">
      Scanning Database...
    </div>
  );

  return (
    <div className="bg-[#f0f7ff] min-h-screen py-10 px-4 font-sans antialiased text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none italic">
            MY <span className="text-[#00a8cc]">APPLICATIONS</span>
          </h1>
          <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase mt-3 tracking-[0.3em]">
            Real-time status of your career opportunities
          </p>
        </div>

        {/* Stats Grid - Boxy Neo-Brutalism Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} border-[3px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
              <p className="font-black text-[10px] uppercase tracking-widest opacity-70">{stat.label}</p>
              <h3 className="text-3xl md:text-4xl font-black mt-1 leading-none">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Filter Bar - Boxy Push Buttons */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {["all", "Applied", "Shortlisted", "Selected", "Rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 border-[3px] border-black font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === f 
                ? "bg-[#00c2e0] shadow-none translate-x-[2px] translate-y-[2px]" 
                : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="bg-white border-[3px] border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black text-xl uppercase italic mb-6">No {filter !== "all" ? filter : ""} Submissions Found</p>
            <Link to="/jobs" className="bg-[#ffde59] border-[3px] border-black px-8 py-3 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              Browse Openings
            </Link>
          </div>
        ) : (
          <div className="bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b-[3px] border-black">
                    <th className="py-4 px-6 font-black text-xs uppercase tracking-widest">Job Details</th>
                    <th className="py-4 px-6 font-black text-xs uppercase tracking-widest hidden md:table-cell">Location</th>
                    <th className="py-4 px-6 font-black text-xs uppercase tracking-widest">Status</th>
                    <th className="py-4 px-6 font-black text-xs uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-[2px] divide-slate-100">
                  {filteredApps.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-5 px-6">
                        <p className="font-black text-black uppercase text-sm leading-tight">{app.jobId.title}</p>
                        <p className="text-[#00a8cc] font-black text-[11px] uppercase mt-0.5">{app.jobId.company}</p>
                      </td>
                      <td className="py-5 px-6 hidden md:table-cell font-bold text-xs text-slate-500 uppercase tracking-tight">
                        {app.jobId.location}
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-3 py-1 border-[2px] text-[10px] font-black uppercase tracking-tighter ${getStatusStyle(app.status)} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <Link
                          to={`/jobs/${app.jobId._id}`}
                          className="text-black font-black text-[10px] uppercase underline decoration-2 decoration-[#00c2e0] underline-offset-4 hover:text-[#00a8cc]"
                        >
                          View Full Opening
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
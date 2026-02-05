import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Home() {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setLatestJobs(res.data.slice(0, 4));
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans antialiased text-slate-900 overflow-x-hidden">
      
      {/* HERO SECTION - Full height for Laptops only */}
      <section className="bg-gradient-to-r from-cyan-400 to-cyan-500 border-b-[4px] border-black lg:min-h-[calc(100vh-70px)] flex items-center py-16 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-block bg-[#b4f481] border-[3px] border-black px-4 py-1 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
                System Live & Active
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-black mb-6 leading-[0.85] uppercase italic tracking-tighter">
                JOB & INTERNSHIP <br />
                <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">MANAGEMENT</span>
              </h1>

              <p className="text-base md:text-xl text-black font-bold mb-10 max-w-2xl leading-relaxed uppercase tracking-tight opacity-90">
                A simple, centralized platform built to help admins manage openings and let candidates track their applications in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link
                  to={user ? "/jobs" : "/login"}
                  className="bg-[#ffde59] hover:bg-yellow-500 text-black font-black px-12 py-5 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-sm tracking-widest"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* Right Graphic - Dashboard Preview */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white border-[4px] border-black p-8 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] rotate-2 group hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-8 border-b-2 border-slate-100 pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-400 border-2 border-black"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffde59] border-2 border-black"></div>
                      <div className="w-3 h-3 rounded-full bg-[#b4f481] border-2 border-black"></div>
                    </div>
                    <span className="font-black text-[8px] uppercase tracking-widest text-slate-400">ADMIN_DASHBOARD</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00c2e0] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                      <div className="space-y-2 flex-1 pt-1">
                        <div className="h-3 w-full bg-slate-100 border-[2px] border-black"></div>
                        <div className="h-3 w-1/2 bg-slate-100 border-[2px] border-black"></div>
                      </div>
                    </div>
                    <div className="h-20 w-full bg-slate-50 border-[3px] border-black border-dashed flex items-center justify-center font-black text-slate-300 text-[10px]">
                      PROCESS_FLOW_STABLE
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#00c2e0] border-[4px] border-black px-6 py-3 font-black text-white uppercase italic shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-3">
                  HIRELY.SYS
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="py-20 md:py-32 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter leading-none mb-4">
              What you can do
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
              System Core Capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Job Listings", desc: "Admins can create and manage every detail of job or internship postings.", color: "bg-[#daebff]" },
              { title: "Review Desk", desc: "Admins can quickly view and organize all incoming candidate applications.", color: "bg-[#b4f481]" },
              { title: "Live Status", desc: "Update application stages instantly—from applied to selected.", color: "bg-[#ffde59]" },
              { title: "Control Panel", desc: "A centralized admin dashboard to keep all listings and data in check.", color: "bg-[#00c2e0]" },
              { title: "My Dashboard", desc: "Users have their own space to track the status of every application.", color: "bg-[#daebff]" },
              { title: "Access Control", desc: "Smart role-based security ensures separate tools for admins and users.", color: "bg-[#ffde59]" },
            ].map((feature, idx) => (
              <div key={idx} className={`${feature.color} border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all`}>
                <h3 className="text-2xl font-black text-black mb-4 uppercase italic leading-none">{feature.title}</h3>
                <p className="text-black font-bold text-xs uppercase tracking-tight opacity-80 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW LOGIC */}
      <section className="bg-gradient-to-r from-cyan-400 to-cyan-500 border-y-[4px] border-black py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-black mb-8 uppercase italic leading-[0.9] tracking-tighter">
            THE SIMPLE <br /> WORKFLOW
          </h2>
          <p className="text-base md:text-xl text-black font-bold max-w-3xl mx-auto mb-12 leading-relaxed uppercase tracking-tight">
            Managing jobs shouldn't be complicated. Admins handle the pipeline while users get clear, automatic status updates. It's that simple.
          </p>
          <Link to="/about" className="bg-white hover:bg-slate-50 text-black font-black px-12 py-4 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-widest">
            Learn More
          </Link>
        </div>
      </section>

      {/* LATEST JOBS */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
               <h2 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter leading-none">Latest Openings</h2>
               <p className="text-slate-400 font-bold text-xs uppercase mt-3 tracking-[0.3em]">New database entries</p>
            </div>
            <Link to="/jobs" className="text-black font-black uppercase text-xs border-b-[3px] border-[#00c2e0] pb-1 hover:text-[#00c2e0] transition-colors">
              Full Job Index →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20 font-black uppercase tracking-widest text-slate-200">Updating...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestJobs.map((job) => (
                <Link key={job._id} to={`/jobs/${job._id}`} className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex flex-col group">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-[#ffde59] border-[3px] border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black">
                         {job.company.charAt(0)}
                      </div>
                      <span className={`text-[9px] font-black px-3 py-1 border-[2px] border-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${job.type === "Internship" ? "bg-[#daebff]" : "bg-[#b4f481]"}`}>
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-black mb-1 uppercase tracking-tighter leading-tight group-hover:text-[#00a8cc] line-clamp-1">{job.title}</h3>
                    <p className="text-[10px] text-[#00a8cc] font-black mb-4 uppercase tracking-widest">{job.company}</p>
                    <p className="text-slate-600 text-[11px] line-clamp-2 mb-6 font-medium leading-relaxed">{stripHtml(job.description)}</p>
                    <div className="flex items-center justify-between pt-4 border-t-[2px] border-slate-100 mt-auto uppercase font-black text-[9px]">
                      <span>Check Opening</span>
                      {job.isActive && <span className="bg-[#b4f481] border-[2px] border-black px-2 py-0.5">Active</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION - Light theme with underlined highlight */}
      <section className="bg-[#f0f7ff] border-t-[4px] border-black py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-[#ffde59] border-[2px] border-black px-4 py-1 text-[10px] font-black uppercase mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Setup Complete?
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-black mb-8 uppercase italic tracking-tighter leading-[0.9]">
            START USING <br /> 
            <span className="relative inline-block">
              HIRELY TODAY
              <div className="absolute -bottom-2 left-0 w-full h-[6px] md:h-[10px] bg-[#00c2e0] -rotate-1 -z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
            </span>
          </h2>
          <p className="text-sm md:text-lg text-slate-500 font-bold mb-12 max-w-2xl mx-auto uppercase tracking-tight">
            Create an account or login to begin managing jobs and applications in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to={user ? "/dashboard" : "/register"} className="bg-[#00c2e0] hover:bg-[#00a8cc] text-black font-black px-12 py-5 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-widest">
              {user ? "Go to Dashboard" : "Sign Up"}
            </Link>
            <Link to="/contact" className="bg-white hover:bg-slate-50 text-black font-black px-12 py-5 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-widest">
              Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
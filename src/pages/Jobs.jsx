import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
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

  const filteredJobs =
    filter === "all"
      ? jobs
      : jobs.filter((job) => job.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center font-black uppercase tracking-tighter">
        Loading opportunities...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header - Responsive text sizes to prevent mobile overflow */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl sm:text-5xl font-black text-black mb-2 leading-tight uppercase italic tracking-tighter">
            ALL OPPORTUNITIES
          </h1>
          <p className="text-black font-bold text-sm sm:text-lg uppercase tracking-tight opacity-80">
            Discover {jobs.length} amazing jobs and internships
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Boxy Filter Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 md:px-6 md:py-3 font-black border-[3px] border-black text-[10px] md:text-xs transition-all uppercase ${
              filter === "all"
                ? "bg-[#00c2e0] text-black shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50"
            }`}
          >
            ALL JOBS
          </button>

          <button
            onClick={() => setFilter("Full-time")}
            className={`px-4 py-2 md:px-6 md:py-3 font-black border-[3px] border-black text-[10px] md:text-xs transition-all uppercase ${
              filter === "Full-time"
                ? "bg-[#b4f481] text-black shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50"
            }`}
          >
            FULL-TIME
          </button>

          <button
            onClick={() => setFilter("Internship")}
            className={`px-4 py-2 md:px-6 md:py-3 font-black border-[3px] border-black text-[10px] md:text-xs transition-all uppercase ${
              filter === "Internship"
                ? "bg-[#ffde59] text-black shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50"
            }`}
          >
            INTERNSHIPS
          </button>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
             <p className="text-black font-black text-xl uppercase italic">No opportunities available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredJobs.map((job) => (
              <Link
                key={job._id}
                to={`/jobs/${job._id}`}
                className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 overflow-hidden flex flex-col group"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    {/* Company Initial Box */}
                    <div className="w-10 h-10 bg-[#ffde59] border-[3px] border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                       <span className="font-black text-lg uppercase">{job.company.charAt(0)}</span>
                    </div>

                    {/* Category Tag */}
                    <span className={`text-[9px] font-black px-3 py-1 border-[2px] border-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                        job.type === "Internship" ? "bg-[#daebff]" : "bg-[#b4f481]"
                    }`}>
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-black mb-1 uppercase tracking-tighter leading-tight group-hover:text-[#00a8cc] transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs text-[#00a8cc] font-black mb-3 uppercase tracking-widest">
                    {job.company}
                  </p>

                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] mb-4 font-black uppercase">
                    <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {job.location}
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                    {stripHtml(job.description)}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t-[2px] border-slate-100 mt-auto">
                    <span className="text-[10px] text-black font-black uppercase tracking-widest group-hover:underline decoration-2 decoration-[#00a8cc] underline-offset-4">
                      View Details →
                    </span>

                    {/* ACTIVE TAG (Restored to earlier style) */}
                    {job.isActive && (
                      <span className="bg-[#b4f481] border-[2px] border-black px-2 py-0.5 text-[9px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
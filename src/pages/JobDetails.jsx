  import { useParams, useNavigate } from "react-router-dom";
  import { useEffect, useState, useContext } from "react";
  import api from "../services/api";
  import { AuthContext } from "../context/AuthContext";

  function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [resumeLink, setResumeLink] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [hasApplied, setHasApplied] = useState(false);
    const [application, setApplication] = useState(null);
    const { token, user } = useContext(AuthContext);

    useEffect(() => {
      const fetchJobData = async () => {
        try {
          const res = await api.get(`/jobs/${id}`);
          setJob(res.data);

          if (user && token) {
            await checkApplicationStatus();
          }
        } catch {
          setError("Failed to load job details");
        } finally {
          setLoading(false);
        }
      };
      fetchJobData();
    }, [id, user, token]);

    const checkApplicationStatus = async () => {
      try {
        const appRes = await api.get(`/applications/job/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (appRes.data) {
          setHasApplied(true);
          setApplication(appRes.data);
          return true;
        }
      } catch {
        setHasApplied(false);
        return false;
      }
    };

    const handleApplyClick = () => {
      if (!user) {
        navigate("/login");
        return;
      }
      setShowApplyForm(true);
    };

    const handleApply = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setSubmitting(true);

      try {
        await api.post(
          `/applications/${id}`,
          { resumeLink },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Application submitted successfully");
        setHasApplied(true);
        setShowApplyForm(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center font-black uppercase tracking-tighter">
          Loading...
        </div>
      );
    }

    if (!job) {
      return (
        <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center font-black">
          Job Not Found
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#f0f7ff] py-10 px-4 font-sans antialiased text-slate-900">
        <div className="max-w-4xl mx-auto">

          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-1 text-[#00a8cc] font-black text-xs uppercase tracking-tighter mb-6 hover:underline"
          >
            ← BACK TO JOBS
          </button>

          <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden">

            {/* Header */}
            <div className="p-8 border-b-[3px] border-black">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-black uppercase mb-1">{job.title}</h1>
                  <h2 className="text-[#00a8cc] font-black text-xl uppercase">{job.company}</h2>
                  <p className="text-slate-500 font-bold text-xs uppercase mt-2 tracking-widest">
                    {job.location}
                  </p>
                </div>
                <div className="bg-[#b4f481] border-[3px] border-black px-4 py-1 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {job.type || "Job"}
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <section>
                <h3 className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
                  Description
                </h3>
                <div
                  className="prose prose-slate max-w-none font-medium text-slate-800 leading-relaxed rich-content"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </section>

              <section>
                <h3 className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
                  Requirements
                </h3>
                <div
                  className="prose prose-slate max-w-none font-medium text-slate-800 leading-relaxed rich-content"
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
                />
              </section>

              <div className="h-[2px] bg-slate-100 w-full mt-8"></div>

              {/* Action Area */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">

                {!showApplyForm && (
                  <div className="flex flex-wrap gap-4 items-center">
                    {hasApplied ? (
                      <div className="bg-slate-200 border-[3px] border-black px-6 py-3 font-black text-xs uppercase opacity-70 cursor-not-allowed">
                        Already Applied
                      </div>
                    ) : (
                      <button
                        onClick={handleApplyClick}
                        disabled={!job.isActive}
                        className="bg-[#00c2e0] border-[3px] border-black px-10 py-3 font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
                      >
                        {job.isActive ? "Apply For Job" : "Applications Closed"}
                      </button>
                    )}
                  </div>
                )}

                {showApplyForm && !hasApplied && (
                  <form
                    onSubmit={handleApply}
                    className="w-full space-y-4 bg-slate-50 p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <h4 className="font-black text-xs uppercase tracking-widest italic text-cyan-600">
                      Enter your public resume link:
                    </h4>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="url"
                        required
                        value={resumeLink}
                        onChange={(e) => setResumeLink(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="flex-1 border-[3px] border-black p-3 font-bold outline-none focus:bg-white"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-[#b4f481] border-[3px] border-black px-8 py-3 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        {submitting ? "Processing..." : "Confirm Submission"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="px-4 font-black text-[10px] uppercase text-slate-400 hover:text-black"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {!showApplyForm && (
                  <div className="bg-white border-[2px] border-slate-200 px-4 py-2 rounded-lg font-black text-[10px] uppercase text-slate-400 tracking-widest">
                    Ref ID: {id.slice(-6)}
                  </div>
                )}
              </div>

              {success && (
                <p className="text-emerald-600 font-black text-xs uppercase mt-4">
                  ● {success}
                </p>
              )}
              {error && (
                <p className="text-rose-600 font-black text-xs uppercase mt-4">
                  × {error}
                </p>
              )}
            </div>
          </div>
        </div>

        <style>{`
          .rich-content ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
          .rich-content li { margin-bottom: 0.5rem; font-weight: 600; font-size: 0.95rem; }
          .rich-content p { margin-bottom: 1rem; font-size: 0.95rem; }
        `}</style>
      </div>
    );
  }

  export default JobDetails;
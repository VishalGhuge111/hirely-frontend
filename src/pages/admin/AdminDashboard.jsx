import { useEffect, useState, useContext, useRef } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const descRef = useRef(null);
  const reqRef = useRef(null);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Separate states for active formatting highlighting
  const [activeDescFormats, setActiveDescFormats] = useState([]);
  const [activeReqFormats, setActiveReqFormats] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    type: "Full-time",
    requirements: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchJobs(), fetchApplications()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  const fetchApplications = async () => {
    const res = await api.get("/applications/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setApplications(res.data);
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.post("/jobs", {
        ...formData,
        description: descRef.current.innerHTML,
        requirements: reqRef.current.innerHTML
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormData({
        title: "", company: "", description: "", location: "", type: "Full-time", requirements: ""
      });

      descRef.current.innerHTML = "";
      reqRef.current.innerHTML = "";
      setShowModal(false);
      await fetchJobs();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to check formatting for a specific editor
  const checkFormats = (setter) => {
    const formats = [];
    if (document.queryCommandState("bold")) formats.push("bold");
    if (document.queryCommandState("italic")) formats.push("italic");
    if (document.queryCommandState("underline")) formats.push("underline");
    if (document.queryCommandState("insertUnorderedList")) formats.push("unordered");
    if (document.queryCommandState("insertOrderedList")) formats.push("ordered");
    setter(formats);
  };

  const format = (cmd, setter, value = null) => {
    document.execCommand(cmd, false, value);
    checkFormats(setter);
  };

  // Reusable Toolbar Component
  const EditorToolbar = ({ activeList, setter }) => (
    <div className="flex items-center gap-1 bg-white border-t-2 border-x-2 border-gray-300 rounded-t-lg p-2 px-3 space-x-2">
      <select 
        onChange={(e) => format('formatBlock', setter, e.target.value)}
        className="text-sm border-none bg-transparent font-semibold focus:outline-none cursor-pointer"
      >
        <option value="p">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
      </select>
      
      <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

      <button 
        type="button" 
        onClick={() => format("bold", setter)} 
        className={`p-1 rounded font-bold w-8 text-lg border transition-colors ${activeList.includes("bold") ? "bg-yellow-400 border-black" : "border-transparent hover:bg-gray-100"}`}
      >B</button>
      <button 
        type="button" 
        onClick={() => format("italic", setter)} 
        className={`p-1 rounded italic w-8 text-lg text-serif border transition-colors ${activeList.includes("italic") ? "bg-yellow-400 border-black" : "border-transparent hover:bg-gray-100"}`}
      >I</button>
      <button 
        type="button" 
        onClick={() => format("underline", setter)} 
        className={`p-1 rounded underline w-8 text-lg border transition-colors ${activeList.includes("underline") ? "bg-yellow-400 border-black" : "border-transparent hover:bg-gray-100"}`}
      >U</button>
      
      <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

      <button 
        type="button" 
        onClick={() => format("insertOrderedList", setter)} 
        className={`p-1 rounded w-8 text-lg border transition-colors ${activeList.includes("ordered") ? "bg-yellow-400 border-black" : "border-transparent hover:bg-gray-100"}`}
      >1.</button>
      <button 
        type="button" 
        onClick={() => format("insertUnorderedList", setter)} 
        className={`p-1 rounded w-8 text-lg border transition-colors ${activeList.includes("unordered") ? "bg-yellow-400 border-black" : "border-transparent hover:bg-gray-100"}`}
      >•</button>
      
      <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

      <button type="button" onClick={() => { format("removeFormat", setter); setter([]); }} className="p-1 hover:bg-red-50 rounded text-lg"><u>T</u>ₓ</button>
    </div>
  );

  const stats = [
    { label: "Total Jobs", value: jobs.length },
    { label: "Total Applications", value: applications.length },
    { label: "Selected", value: applications.filter(a => a.status === "Selected").length },
    { label: "Rejected", value: applications.filter(a => a.status === "Rejected").length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-bold">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-2xl border-3 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl md:text-5xl font-black text-black">ADMIN DASHBOARD</h1>
          <p className="text-gray-800 mt-2 font-semibold text-lg">Manage jobs and applications effectively</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative bg-white rounded-2xl border-3 border-black shadow-lg p-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-black rounded-t-2xl"></div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm font-bold uppercase">{stat.label}</p>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
                </div>
              </div>
              <h3 className="text-5xl font-black mt-4 text-cyan-600">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Jobs Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-black">JOBS</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-3 px-6 rounded-lg border-2 border-black transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
            >+ ADD JOB</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} onClick={() => navigate(`/admin/jobs/${job._id}`)} className="bg-white rounded-2xl border border-black/40 shadow-lg p-6 hover:shadow-xl cursor-pointer transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-black text-black flex-1">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-black border-2 border-black ${job.isActive ? "bg-lime-300" : "bg-gray-200"}`}>{job.isActive ? "ACTIVE" : "CLOSED"}</span>
                </div>
                <p className="text-cyan-600 font-black text-sm mb-2">{job.company}</p>
                <p className="text-gray-700 font-semibold text-sm mb-4">{job.location}</p>
                <div className="pt-4 border-t-2 border-gray-200">
                  <span className="text-gray-700 font-bold text-sm">
                    {applications.filter(a => a.jobId && a.jobId._id === job._id).length} applications
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Job Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col border-4 border-black">
              
              <div className="sticky top-0 bg-cyan-400 px-8 py-6 flex items-center justify-between border-b-4 border-black z-10">
                <h2 className="text-2xl font-black text-black uppercase">Create New Job</h2>
                <button onClick={() => setShowModal(false)} className="bg-white border-2 border-black w-8 h-8 rounded flex items-center justify-center font-black hover:bg-gray-100 transition-colors">✕</button>
              </div>

              <div className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg font-bold text-red-700 uppercase text-xs tracking-wider">
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleAddJob} className="space-y-6">
                  <div>
                    <label className="block text-black font-black mb-1 uppercase text-xs">Job Title</label>
                    <input type="text" placeholder="e.g., Senior React Developer" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black font-black mb-1 uppercase text-xs">Company</label>
                      <input type="text" placeholder="e.g., Tech Corp" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold" />
                    </div>
                    <div>
                      <label className="block text-black font-black mb-1 uppercase text-xs">Location</label>
                      <input type="text" placeholder="e.g., Remote" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-black font-black mb-1 uppercase text-xs">Job Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold appearance-none bg-white">
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className="block text-black font-black mb-1 uppercase text-xs">Job Description</label>
                    <EditorToolbar activeList={activeDescFormats} setter={setActiveDescFormats} />
                    <div
                      ref={descRef}
                      contentEditable
                      onKeyUp={() => checkFormats(setActiveDescFormats)}
                      onMouseUp={() => checkFormats(setActiveDescFormats)}
                      className="w-full min-h-[150px] border-2 border-gray-300 rounded-b-lg p-4 font-medium focus:outline-none focus:border-cyan-500 bg-white overflow-auto resize-y"
                      data-placeholder="Write update details..."
                    ></div>
                  </div>

                  {/* REQUIREMENTS */}
                  <div>
                    <label className="block text-black font-black mb-1 uppercase text-xs">Requirements</label>
                    <EditorToolbar activeList={activeReqFormats} setter={setActiveReqFormats} />
                    <div
                      ref={reqRef}
                      contentEditable
                      onKeyUp={() => checkFormats(setActiveReqFormats)}
                      onMouseUp={() => checkFormats(setActiveReqFormats)}
                      className="w-full min-h-[150px] border-2 border-gray-300 rounded-b-lg p-4 font-medium focus:outline-none focus:border-cyan-500 bg-white overflow-auto resize-y"
                      data-placeholder="Enter job requirements..."
                    ></div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
                    <button type="submit" disabled={submitting} className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-black font-black py-4 rounded-lg border-2 border-black transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
                      {submitting ? "CREATING..." : "CREATE JOB"}
                    </button>
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-black py-4 rounded-lg border-2 border-gray-400 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">CANCEL</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
          cursor: text;
        }
        [contenteditable] ul { list-style-type: disc; padding-left: 24px; margin-top: 10px; }
        [contenteditable] ol { list-style-type: decimal; padding-left: 24px; margin-top: 10px; }
        [contenteditable] { line-height: 1.6; }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
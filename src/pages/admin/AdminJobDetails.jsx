import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function AdminJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const descRef = useRef(null);
  const reqRef = useRef(null);

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Separate states for active formatting highlighting
  const [activeDescFormats, setActiveDescFormats] = useState([]);
  const [activeReqFormats, setActiveReqFormats] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      await Promise.all([fetchJob(), fetchApplications()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJob = async () => {
    const res = await api.get(`/jobs/${id}`);
    setJob(res.data);
    setEditData(res.data);
  };

  const fetchApplications = async () => {
    const res = await api.get("/applications/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const filtered = res.data.filter(
      (a) => a.jobId && (a.jobId._id === id || a.jobId === id)
    );
    setApplications(filtered);
  };

  const toggleApplications = async (state) => {
    try {
      await api.put(
        `/jobs/${id}`,
        { isActive: state },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(state ? "Applications Reopened" : "Applications Closed");
      fetchJob();
      setTimeout(() => setMessage(""), 2500);
    } catch {
      setMessage("Action failed");
    }
  };

  const saveJobChanges = async () => {
    setSaving(true);
    try {
      await api.put(
        `/jobs/${id}`,
        {
          ...editData,
          description: descRef.current.innerHTML,
          requirements: reqRef.current.innerHTML
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditMode(false);
      fetchJob();
      setMessage("Update successful");
      setTimeout(() => setMessage(""), 2500);
    } catch {
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteJob = async () => {
    if (!window.confirm("Delete this job permanently?")) return;
    try {
      await api.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/admin/dashboard");
    } catch {
      setMessage("Delete failed");
    }
  };

  const updateStatus = async (appId, status) => {
    await api.patch(
      `/applications/${appId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchApplications();
  };

  // Professional Editor Logic
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

  const EditorToolbar = ({ activeList, setter }) => (
    <div className="flex items-center gap-1 bg-white border-t-2 border-x-2 border-gray-300 rounded-t-lg p-2 px-3 space-x-2 mt-2">
      <select 
        onChange={(e) => format('formatBlock', setter, e.target.value)}
        className="text-sm border-none bg-transparent font-semibold focus:outline-none cursor-pointer"
      >
        <option value="p">Normal</option>
        <option value="h2">Heading</option>
      </select>
      <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
      <button type="button" onClick={() => format("bold", setter)} className={`p-1 rounded font-bold w-8 border ${activeList.includes("bold") ? "bg-yellow-400 border-black shadow-sm" : "border-transparent hover:bg-gray-100"}`}>B</button>
      <button type="button" onClick={() => format("italic", setter)} className={`p-1 rounded italic w-8 border ${activeList.includes("italic") ? "bg-yellow-400 border-black shadow-sm" : "border-transparent hover:bg-gray-100"}`}>I</button>
      <button type="button" onClick={() => format("underline", setter)} className={`p-1 rounded underline w-8 border ${activeList.includes("underline") ? "bg-yellow-400 border-black shadow-sm" : "border-transparent hover:bg-gray-100"}`}>U</button>
      <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
      <button type="button" onClick={() => format("insertOrderedList", setter)} className={`p-1 rounded w-8 border ${activeList.includes("ordered") ? "bg-yellow-400 border-black shadow-sm" : "border-transparent hover:bg-gray-100"}`}>1.</button>
      <button type="button" onClick={() => format("insertUnorderedList", setter)} className={`p-1 rounded w-8 border ${activeList.includes("unordered") ? "bg-yellow-400 border-black shadow-sm" : "border-transparent hover:bg-gray-100"}`}>•</button>
      <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
      <button type="button" onClick={() => { format("removeFormat", setter); setter([]); }} className="p-1 hover:bg-red-50 rounded text-lg"><u>T</u>ₓ</button>
    </div>
  );

  const badge = (status) => {
    if (status === "Selected") return "bg-emerald-100 text-emerald-700 font-bold border border-emerald-200";
    if (status === "Rejected") return "bg-red-100 text-red-700 font-bold border border-red-200";
    if (status === "Shortlisted") return "bg-blue-100 text-blue-700 font-bold border border-blue-200";
    return "bg-gray-100 text-gray-700 font-bold border border-gray-200";
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;
  if (!job) return <div className="min-h-screen flex items-center justify-center font-bold">Job not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("/admin/dashboard")} className="text-cyan-600 font-black mb-5 hover:underline flex items-center gap-1 uppercase text-sm">
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl border-3 border-black shadow-lg p-8 mb-8 overflow-hidden">
          {!editMode ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-black text-black tracking-tight">{job.title}</h1>
                  <p className="text-cyan-600 font-black text-lg mt-1 tracking-wide uppercase">{job.company}</p>
                  <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-widest">{job.location}</p>
                </div>
                <span className={`px-4 py-2 rounded-lg border-2 border-black font-black uppercase text-xs tracking-wider ${job.isActive ? "bg-lime-300 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "bg-gray-200 text-gray-600"}`}>
                  {job.isActive ? "Active" : "Closed"}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</h3>
                  <div className="prose max-w-none text-gray-800 font-medium" dangerouslySetInnerHTML={{ __html: job.description }} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Requirements</h3>
                  <div className="prose max-w-none text-gray-800 font-medium" dangerouslySetInnerHTML={{ __html: job.requirements }} />
                </div>
              </div>

              {message && (
                <div className="bg-lime-100 border-2 border-black p-4 mt-6 font-bold flex items-center gap-2">
                  <span className="text-lime-600">✓</span> {message}
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t-2 border-gray-100">
                <button onClick={() => { setEditMode(true); setTimeout(() => { descRef.current.innerHTML = job.description || ""; reqRef.current.innerHTML = job.requirements || ""; }, 0); }} className="bg-cyan-500 text-black font-black px-6 py-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all uppercase text-sm tracking-widest">
                  Edit Job
                </button>
                {job.isActive ? (
                  <button onClick={() => toggleApplications(false)} className="bg-yellow-400 text-black font-black px-6 py-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all uppercase text-sm tracking-widest">
                    Stop Applications
                  </button>
                ) : (
                  <button onClick={() => toggleApplications(true)} className="bg-lime-400 text-black font-black px-6 py-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all uppercase text-sm tracking-widest">
                    Reopen
                  </button>
                )}
                <button onClick={deleteJob} className="bg-white text-red-600 font-black px-6 py-3 rounded-lg border-2 border-red-600 hover:bg-red-50 transition-all uppercase text-sm tracking-widest ml-auto">
                  Delete Job
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Title</label>
                  <input className="input-field" value={editData.title} onChange={(e)=>setEditData({...editData,title:e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Company</label>
                    <input className="input-field" value={editData.company} onChange={(e)=>setEditData({...editData,company:e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Location</label>
                    <input className="input-field" value={editData.location} onChange={(e)=>setEditData({...editData,location:e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                  <EditorToolbar activeList={activeDescFormats} setter={setActiveDescFormats} />
                  <div ref={descRef} contentEditable onKeyUp={() => checkFormats(setActiveDescFormats)} onMouseUp={() => checkFormats(setActiveDescFormats)} className="editor-field" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Requirements</label>
                  <EditorToolbar activeList={activeReqFormats} setter={setActiveReqFormats} />
                  <div ref={reqRef} contentEditable onKeyUp={() => checkFormats(setActiveReqFormats)} onMouseUp={() => checkFormats(setActiveReqFormats)} className="editor-field" />
                </div>
              </div>
              <div className="flex gap-4 pt-6 border-t-2">
                <button disabled={saving} onClick={saveJobChanges} className="bg-cyan-500 text-black px-8 py-3 font-black border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 uppercase tracking-widest">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={() => setEditMode(false)} className="bg-gray-100 text-gray-600 px-8 py-3 font-black border-2 border-gray-300 rounded-lg uppercase tracking-widest">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border-3 border-black shadow-lg p-8">
          <h2 className="text-2xl font-black text-black tracking-tight mb-8 underline decoration-cyan-400 decoration-4">
            CANDIDATE APPLICATIONS ({applications.length})
          </h2>
          {applications.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-bold uppercase tracking-widest">No applications found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Candidate</th>
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Resume</th>
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Status Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {applications.map(app => (
                    <tr key={app._id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-5">
                        <p className="font-black text-black">{app.userId?.name}</p>
                        <p className="text-xs font-bold text-gray-500">{app.userId?.email}</p>
                      </td>
                      <td className="py-5">
                        <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-cyan-600 font-black text-xs uppercase tracking-tighter hover:underline">View PDF ↗</a>
                      </td>
                      <td className="py-5">
                        <select
                          value={app.status}
                          onChange={(e)=>updateStatus(app._id,e.target.value)}
                          className={`px-4 py-2 rounded-lg font-black text-xs cursor-pointer outline-none transition-all ${badge(app.status)} shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]`}
                        >
                          <option>Applied</option>
                          <option>Shortlisted</option>
                          <option>Selected</option>
                          <option>Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 14px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-weight: 600;
          outline-color: #06b6d4;
          background: #fdfdfd;
        }
        .editor-field {
          width: 100%;
          min-height: 180px;
          border: 2px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 12px 12px;
          padding: 16px;
          background: white;
          outline-color: #06b6d4;
          font-weight: 500;
          line-height: 1.6;
          resize: vertical;
          overflow: auto;
        }
        .editor-field ul { list-style-type: disc; padding-left: 20px; }
        .editor-field ol { list-style-type: decimal; padding-left: 20px; }
        .prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0; }
        .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0; }
        .prose h2 { font-size: 1.25rem; font-weight: 800; margin: 1.5rem 0 0.5rem; }
      `}</style>
    </div>
  );
}

export default AdminJobDetails;
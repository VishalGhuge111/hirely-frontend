import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans antialiased text-slate-900">
      
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 border-b-[4px] border-black py-10 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block bg-[#b4f481] text-black font-black px-4 py-1.5 md:px-6 md:py-2 border-[3px] border-black mb-6 md:mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-[10px] md:text-xs tracking-widest">
            System Overview
          </div>
          <h1 className="text-3xl md:text-7xl font-black text-black mb-4 md:mb-6 max-w-4xl mx-auto uppercase italic tracking-tighter leading-none">
            Job & Internship <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] md:drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">Management System</span>
          </h1>
          <p className="text-sm md:text-xl text-black font-bold max-w-3xl mx-auto opacity-90 uppercase tracking-tight px-2">
            Hirely is a centralized platform designed to simplify job postings and track applications through a structured, transparent workflow.
          </p>
        </div>
      </div>

      {/* PRODUCT STORY SECTION */}
      <section className="py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic border-b-[4px] border-[#00c2e0] w-fit pb-2">
                The Product Story
              </h2>
              <p className="text-slate-700 font-bold text-base md:text-lg leading-relaxed">
                Hirely was built to solve a common challenge: the disorganized management of job and internship applications.
              </p>
              <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
                Many small organizations and platforms struggle to track candidates and update statuses efficiently. Hirely provides a streamlined environment where admins post opportunities and users track progress.
              </p>
              <div className="bg-[#ffde59] border-[3px] border-black px-4 py-2 inline-block font-black uppercase text-[10px] md:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Simple • Organized • Efficient
              </div>
            </div>

            {/* Workflow Graphic - Fixed for Mobile */}
            <div className="bg-white border-[3px] md:border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center space-y-4">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#00c2e0]"></div>
              </div>
              <div className="text-center py-6 md:py-10">
                <div className="text-3xl md:text-5xl font-black text-black mb-1 md:mb-2 uppercase italic tracking-tighter">Workflow</div>
                <div className="text-xs md:text-lg font-bold text-slate-500 uppercase tracking-[0.2em]">Structured Hiring</div>
              </div>
              <div className="w-full flex justify-between gap-2">
                <div className="h-8 md:h-10 w-full bg-[#b4f481] border-[2px] border-black"></div>
                <div className="h-8 md:h-10 w-full bg-[#daebff] border-[2px] border-black"></div>
                <div className="h-8 md:h-10 w-full bg-[#ffde59] border-[2px] border-black"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN PRINCIPLES */}
      <section className="py-12 md:py-24 bg-white border-y-[4px] border-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic mb-3">Design Principles</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">The logic behind the Hirely Architecture</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Simplicity",
                description: "We focus on building intuitive, easy-to-use workflows that remove technical friction for users.",
                color: "bg-cyan-50"
              },
              {
                title: "Reliability",
                description: "The system is engineered to be stable, providing a predictable experience for application handling.",
                color: "bg-lime-50"
              },
              {
                title: "Transparency",
                description: "A clear status tracking system ensures users are always aware of their current application stage.",
                color: "bg-yellow-50"
              }
            ].map((value, idx) => (
              <div key={idx} className={`${value.color} border-[3px] border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                <h3 className="text-xl md:text-2xl font-black text-black mb-3 md:mb-4 uppercase italic tracking-tight">{value.title}</h3>
                <p className="text-slate-700 font-bold text-xs md:text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES - Responsive Grid Fix */}
      <section className="py-12 md:py-24 bg-[#f0f7ff]">
        <div className="max-w-6xl mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-3 md:gap-4">
                {[
                  "Job Posting", "Status Tracking", 
                  "Role Access", "User Dashboard",
                  "Admin Panel", "Real-time Updates"
                ].map(item => (
                  <div key={item} className="bg-white border-[2px] border-black p-3 md:p-4 font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-center">
                    {item}
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic leading-none">What Hirely <span className="text-[#00a8cc]">Provides</span></h2>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Centralized Job & Internship Posting",
                    "End-to-end Application Lifecycle Tracking",
                    "Role-Based Access Control (Admin & User)",
                    "Structured Status Workflow (Applied → Selected)"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 font-bold text-slate-700 text-sm md:text-base">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-[#b4f481] border-[2px] border-black mt-0.5 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 bg-white border-t-[4px] border-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6 uppercase italic tracking-tighter">Explore Available Jobs</h2>
          <p className="text-lg text-slate-500 font-bold mb-10 uppercase tracking-tight">Browse current job and internship openings and apply easily through your dashboard.</p>
          <Link to="/jobs" className="inline-block bg-[#00c2e0] text-black font-black px-12 py-4 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase text-sm tracking-widest">
            VIEW JOBS
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
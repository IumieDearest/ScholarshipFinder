import Sidebar from "../../components/Students/Sidebar";

const trackingSteps = [
  { label: "Application Submitted", date: "May 12, 2026 • 09:45 AM", done: true },
  { label: "Documents Verified",    date: "May 15, 2026 • 02:20 PM", done: true },
  { label: "Processing in IPO",     date: "Review in progress by International Programs Office", done: false, current: true },
  { label: "Final Decision",        date: "Estimated Completion: May 25, 2026", done: false },
];

const stats = [
  { value: "12", label: "ACTIVE APPS" },
  { value: "05", label: "DOCUMENTS" },
  { value: "03", label: "PENDING TASK" },
  { value: "08", label: "DAYS LEFT" },
];

export default function StudentDashboard() {
  return (
    // Added h-screen and overflow-hidden to prevent body scroll
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* Added md:ml-64 for sidebar spacing and overflow-hidden for internal scroll */}
      <main className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden">
        {/* Scrollable Content Container - Added to match reference */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {/* Page heading */}
          <div className="mb-7">
            <h1 className="text-3xl font-extrabold text-gray-900">Student Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your applications and academic profile.</p>
          </div>

          {/* Top row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

            {/* Profile Completion */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 text-base">Profile Completion</h2>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  75% Complete
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }} />
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Complete your{" "}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">extracurriculars</span>
                {" "}and{" "}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">volunteer hours</span>
                {" "}to reach 100%.
              </p>

              {/* Section progress bars */}
              <div className="flex gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-blue-600" />
                <div className="flex-1 h-1.5 rounded-full bg-blue-400" />
                <div className="flex-1 h-1.5 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-800 text-base mb-4">Eligibility Criteria</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Current GPA
                  </label>
                  <input
                    type="text"
                    defaultValue="3.85"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Field of Study
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Business</option>
                    <option>Medicine</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Current Location
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    defaultValue="Salinas Drive, Lahug, Cebu City"
                    className="flex-1 text-sm text-gray-800 focus:outline-none"
                  />
                </div>
              </div>
              <button className="w-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold tracking-widest uppercase py-3 rounded-lg transition-colors">
                Update Information
              </button>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

            {/* Application Tracking */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-800 text-base">Application Tracking</h2>
                <div className="flex items-center gap-1.5 text-xs text-blue-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Ref: APP-2026-X92
                </div>
              </div>

              <div className="space-y-0">
                {trackingSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Dot + line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.done
                          ? "bg-green-500"
                          : step.current
                          ? "bg-blue-700"
                          : "bg-gray-200"
                      }`}>
                        {step.done ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : step.current ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-0.5 flex-1 my-1 ${step.done ? "bg-blue-600" : "bg-gray-200"}`} style={{ minHeight: "28px" }} />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pb-5">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${step.done || step.current ? "text-gray-800" : "text-gray-400"}`}>
                          {step.label}
                        </p>
                        {step.current && (
                          <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">
                            CURRENT STATUS
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Center */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-800 text-base mb-4">Document Center</h2>

              {/* Upload zone */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-center mb-4 cursor-pointer hover:border-blue-400 transition-colors group">
                <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 transition-colors mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-xs text-gray-400">Click to upload new file</p>
              </div>

              {/* Uploaded files */}
              <div className="space-y-2 mb-4">
                {[
                  { name: "Transcript_v2.pdf", date: "MAY 14, 2026 • 2.4 MB", type: "pdf" },
                  { name: "Passport_Scan.jpg", date: "MAY 12, 2026 • 1.1 MB", type: "img" },
                ].map((file) => (
                  <div key={file.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${file.type === "pdf" ? "bg-blue-100" : "bg-teal-100"}`}>
                      <svg className={`w-4 h-4 ${file.type === "pdf" ? "text-blue-600" : "text-teal-600"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{file.date}</p>
                    </div>
                    <button className="text-gray-300 hover:text-red-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div className="flex gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                <span className="text-yellow-500 text-sm font-bold flex-shrink-0">!</span>
                <p className="text-xs text-blue-600">
                  Please ensure all documents are clear and in PDF format for faster processing.
                </p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
                <p className="text-3xl font-extrabold text-blue-600">{s.value}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// src/pages/student/Documents.jsx
//
// "Document Repository" page (Image 3).
// IMPORTS Sidebar for shared navigation.

import Sidebar from "../../components/Students/Sidebar";

const academicDocs = [
  { name: "Transcript_v1.pdf", type: "ACADEMIC TRANSCRIPT (TOR)", icon: "pdf" },
  { name: "Final_Report_C...", type: "REPORT CARD", icon: "pdf" },
  { name: "HighSchool_Di...", type: "DIPLOMA", icon: "doc" },
];

export default function Documents() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col">

        <div className="flex-1 p-6 md:p-8">

          {/* Page heading */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Document Repository</h1>
              <p className="text-gray-500 text-sm mt-1">Manage and secure your academic and personal credentials.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download All
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Bulk Upload
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left — document sections */}
            <div className="lg:col-span-2 space-y-5">

              {/* Academic */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                      </svg>
                    </div>
                    <h2 className="font-bold text-gray-800">Academic</h2>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    3/3 UPLOADED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {academicDocs.map((doc) => (
                    <div key={doc.name} className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.icon === "pdf" ? "bg-blue-100" : "bg-blue-50"}`}>
                        {doc.icon === "pdf" ? (
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-400 truncate">{doc.type}</p>
                      </div>
                    </div>
                  ))}

                  {/* Upload slot */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors group">
                    <svg className="w-6 h-6 text-gray-300 group-hover:text-blue-400 mb-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Upload New File</p>
                  </div>
                </div>
              </div>

              {/* Identity & Financial row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Identity */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="font-bold text-gray-800">Identity</h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700 flex-1">Valid ID</span>
                      <span className="text-xs text-gray-400">PDF, 1.2MB</span>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:border-blue-300 transition-colors group">
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Upload Birth Cert</span>
                    </div>
                  </div>
                </div>

                {/* Financial */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="font-bold text-gray-800">Financial</h2>
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-blue-300 transition-colors group">
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-400 mb-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Upload ITR / Case Study</p>
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-2">Required for need-based programs</p>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">

              {/* Data Privacy Compliance */}
              <div className="bg-gray-900 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-bold">Data Privacy Compliance</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  ScholarchipFinder adheres strictly to the{" "}
                  <span className="text-white font-semibold">Data Privacy Act of 2012</span>.
                  Your documents are encrypted and stored in a secure institutional vault.
                </p>
                <div className="space-y-2 mb-4">
                  {["AES-256 Encryption at rest", "Authorized Access Only"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-gray-700 mb-3" />
                <button className="text-xs text-blue-400 hover:underline font-semibold uppercase tracking-wide">
                  Read Privacy Policy
                </button>
              </div>

              {/* Supporting */}
              <div className="bg-blue-600 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">✨</span>
                  <h3 className="font-bold">Supporting</h3>
                </div>
                <p className="text-sm text-blue-200 mb-4">
                  Showcase your strengths with your portfolio and personal essay.
                </p>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                    Upload Essay
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button className="w-full flex items-center justify-between bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                    Portfolio Link
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between text-xs text-gray-400 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-green-200 border-2 border-white" />
              </div>
              <span className="uppercase tracking-wide">Last verified by Academic Board on Oct 12, 2023</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Environment
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
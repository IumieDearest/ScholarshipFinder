import Sidebar from "../../components/Students/Sidebar";
import { useState } from "react";

const academicDocs = [
  { id: 1, name: "Transcript_v1.pdf", type: "ACADEMIC TRANSCRIPT (TOR)", size: "2.4 MB", uploadDate: "Oct 12, 2023", status: "Verified" },
  { id: 2, name: "Final_Report_Card.pdf", type: "REPORT CARD", size: "1.8 MB", uploadDate: "Oct 10, 2023", status: "Verified" },
  { id: 3, name: "HighSchool_Diploma.pdf", type: "DIPLOMA", size: "3.1 MB", uploadDate: "Oct 08, 2023", status: "Verified" },
];

const identityDocs = [
  { id: 4, name: "Valid_ID.pdf", type: "VALID ID", size: "1.2 MB", uploadDate: "Oct 05, 2023", status: "Verified" },
];

const financialDocs = [
  { id: 5, name: "ITR_2022.pdf", type: "INCOME TAX RETURN", size: "2.7 MB", uploadDate: "Oct 03, 2023", status: "Pending Review" },
];

export default function Documents() {
  const [selectedDocs, setSelectedDocs] = useState([]);

  const toggleSelectDoc = (id) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const allIds = [...academicDocs, ...identityDocs, ...financialDocs].map((d) => d.id);
    setSelectedDocs(selectedDocs.length === allIds.length ? [] : allIds);
  };

  const renderDocumentTable = (docs, title, icon, bgColor) => (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className={`${bgColor} px-6 py-4 flex items-center gap-3`}>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
        <h2 className="font-bold text-gray-800">{title}</h2>
        <span className="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
          {docs.length}/{docs.length} UPLOADED
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={docs.length > 0 && selectedDocs.length === docs.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Document Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Size</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={() => toggleSelectDoc(doc.id)}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{doc.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadDate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    doc.status === "Verified"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${doc.status === "Verified" ? "bg-green-600" : "bg-yellow-600"}`} />
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Document Row */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-center">
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Document
        </button>
      </div>
    </div>
  );

  return (
    // Added h-screen and overflow-hidden to prevent body scroll
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* Changed md:ml-64 to md:ml-56 to match the Student Sidebar width */}
      <main className="flex-1 md:ml-56 flex flex-col h-full overflow-hidden">
        {/* Scrollable Content Container - Added to match reference */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
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

          {/* Document Tables */}
          <div className="space-y-6">
            {/* Academic Documents Table */}
            {renderDocumentTable(
              academicDocs,
              "Academic Documents",
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
              </svg>,
              "bg-blue-100"
            )}

            {/* Identity Documents Table */}
            {renderDocumentTable(
              identityDocs,
              "Identity Documents",
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>,
              "bg-green-100"
            )}

            {/* Financial Documents Table */}
            {renderDocumentTable(
              financialDocs,
              "Financial Documents",
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>,
              "bg-emerald-100"
            )}
          </div>

          {/* Data Privacy Compliance Section */}
          <div className="mt-8 bg-gray-900 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0110 1.944 11.954 11.954 0 0117.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="font-bold">Data Privacy Compliance</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Glaux adheres strictly to the <span className="text-white font-semibold">Data Privacy Act of 2012</span>. Your documents are encrypted and stored in a secure institutional vault.
            </p>
            <div className="space-y-2">
              {["AES-256 Encryption at rest", "Authorized Access Only", "Regular Security Audits"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
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

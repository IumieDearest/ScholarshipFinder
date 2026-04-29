import { useState } from "react";
import ProviderSidebar from "../../components/Providers/ProviderSidebar";

export default function ProviderApplicantQueue() {
  const [filterStatus, setFilterStatus] = useState("Needs Action");

  // Mock data for applicants
  const applicants = [
    { id: 1, name: "Elena Rodriguez", studentId: "2025-001", institution: "University of Santo Tomas", scholarshipType: "STEM EXCELLENCE", submissionDate: "May 01, 2026", status: "Under Review" },
    { id: 2, name: "Marcus Chen", studentId: "2025-002", institution: "Ateneo de Manila University", scholarshipType: "FINANCIAL AID", submissionDate: "April 28, 2026", status: "Awarded" },
    { id: 3, name: "Sophia Lim", studentId: "2025-003", institution: "De La Salle University", scholarshipType: "ARTS & CULTURE", submissionDate: "Sep 25, 2026", status: "Pending Documents" },
    { id: 4, name: "Jordan Bautista", studentId: "2025-004", institution: "UP Diliman", scholarshipType: "STEM EXCELLENCE", submissionDate: "April 22, 2026", status: "Under Review" }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Under Review": return "bg-blue-100 text-blue-700";
      case "Awarded": return "bg-green-100 text-green-700";
      case "Pending Documents": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ProviderSidebar />

      <main className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden">
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-12">
            
            {/* Header */}
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Applicant Queue</h2>
              <p className="text-gray-500 flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                Managing active scholarship applications for the 2025-2026 cycle.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">1,284</p>
                <p className="text-xs text-green-600 font-bold">↑ +12%</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Under Review</p>
                <p className="text-3xl font-bold text-blue-600 mb-3">452</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Awarded</p>
                <p className="text-3xl font-bold text-green-600 mb-1">86</p>
                <p className="text-xs text-gray-500 font-medium">6.7% Rate</p>
              </div>
              <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-100">
                <p className="text-sm font-bold mb-1 opacity-80">Next Review</p>
                <p className="text-xl font-bold">Oct 15, 2024</p>
              </div>
            </div>

            {/* Queue Management Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Queue Management</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">Export CSV</button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-50">Filter</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50/30">
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Institution</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {applicants.map((applicant) => (
                      <tr key={applicant.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                              {applicant.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{applicant.name}</p>
                              <p className="text-[10px] text-gray-400 font-medium">{applicant.studentId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{applicant.institution}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm font-medium">{applicant.scholarshipType}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusBadgeColor(applicant.status)}`}>
                            {applicant.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-wider transition-colors">View Profile</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

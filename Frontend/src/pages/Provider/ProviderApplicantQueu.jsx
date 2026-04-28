import { useState } from "react";

export default function ProviderApplicantQueue() {
  const [activeTab, setActiveTab] = useState("Provider Verification");
  const [filterStatus, setFilterStatus] = useState("Needs Action");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for applicants
  const applicants = [
    {
      id: 1,
      name: "Elena Rodriguez",
      studentId: "2024-001",
      institution: "University of Santo Tomas",
      scholarshipType: "STEM EXCELLENCE",
      submissionDate: "Oct 01, 2023",
      status: "Under Review",
      statusColor: "blue"
    },
    {
      id: 2,
      name: "Marcus Chen",
      studentId: "2024-002",
      institution: "Ateneo de Manila University",
      scholarshipType: "FINANCIAL AID",
      submissionDate: "Sep 28, 2023",
      status: "Awarded",
      statusColor: "green"
    },
    {
      id: 3,
      name: "Sophia Lim",
      studentId: "2024-003",
      institution: "De La Salle University",
      scholarshipType: "ARTS & CULTURE",
      submissionDate: "Sep 25, 2023",
      status: "Pending Documents",
      statusColor: "gray"
    },
    {
      id: 4,
      name: "Jordan Bautista",
      studentId: "2024-004",
      institution: "UP Diliman",
      scholarshipType: "STEM EXCELLENCE",
      submissionDate: "Sep 22, 2023",
      status: "Under Review",
      statusColor: "blue"
    }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-700";
      case "Awarded":
        return "bg-green-100 text-green-700";
      case "Pending Documents":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getScholarshipBadgeColor = (type) => {
    switch (type) {
      case "STEM EXCELLENCE":
        return "bg-blue-100 text-blue-700";
      case "FINANCIAL AID":
        return "bg-green-100 text-green-700";
      case "ARTS & CULTURE":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex-1 ml-56 bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PROVIDER PORTAL</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search applicants..."
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold">
                P
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200">
            {["User Accounts", "System Logs", "Provider Verification", "Global Settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Applicant Queue</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
            Managing active scholarship applications for the 2024-2025 cycle.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Applicants */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Applicants</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">1,284</p>
            <p className="text-sm text-green-600 font-medium">↑ +12% from last week</p>
          </div>

          {/* Under Review */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Under Review</p>
            <p className="text-3xl font-bold text-blue-600 mb-3">452</p>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: "35%" }}></div>
            </div>
          </div>

          {/* Awarded */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Awarded</p>
            <p className="text-3xl font-bold text-green-600 mb-2">86</p>
            <p className="text-sm text-gray-600">6.7% Acceptance rate</p>
          </div>

          {/* Next Review Cycle */}
          <div className="bg-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-lg font-semibold mb-1">Next Review Cycle</p>
            <p className="text-blue-100">October 15, 2024</p>
          </div>
        </div>

        {/* Queue Management */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Queue Management</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <button
                  onClick={() => setFilterStatus("Needs Action")}
                  className={`text-sm font-medium ${filterStatus === "Needs Action" ? "text-blue-600" : "text-gray-600"}`}
                >
                  Needs Action
                </button>
              </div>
              <button className="text-sm text-gray-600 hover:text-gray-900">Paused</button>
              <button className="ml-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Institution</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Scholarship Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Submission Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {applicant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{applicant.name}</p>
                          <p className="text-xs text-gray-500">{applicant.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{applicant.institution}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getScholarshipBadgeColor(applicant.scholarshipType)}`}>
                        {applicant.scholarshipType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{applicant.submissionDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${applicant.statusColor === "blue" ? "bg-blue-600" : applicant.statusColor === "green" ? "bg-green-600" : "bg-gray-400"}`}></div>
                        <span className={`text-sm font-medium ${getStatusBadgeColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1-10 of 1,284 applicants</p>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-semibold">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-700 font-semibold">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-700 font-semibold">3</button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-8 bg-gray-900 text-white rounded-lg p-6 flex items-start gap-4">
          <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Compliance and Privacy Notice</h3>
            <p className="text-sm text-gray-300">
              This portal and all data processed within are strictly governed by the Data Privacy Act of 2012. Providers are prohibited from sharing applicant information with third parties without explicit consent. Ensure all physical and digital records are handled according to institutional security protocols.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">SECURITY RATING</p>
            <p className="text-lg font-semibold flex items-center gap-1">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              ISO 27001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
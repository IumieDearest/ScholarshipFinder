import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ProviderSidebar from "../../components/Providers/ProviderSidebar";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("applicant-queue");

  const stats = [
    {
      label: "Total Active Applicants",
      value: "1,284",
      change: "+12% from last week",
      icon: "👥"
    },
    {
      label: "Pending Review",
      value: "452",
      change: "8.7% Acceptance rate",
      icon: "⏳"
    },
    {
      label: "Approved",
      value: "86",
      change: "Next Review Cycle",
      icon: "✅"
    }
  ];

  const applicantQueue = [
    {
      id: 1,
      name: "Rosita Reyes",
      institution: "University of Santo Tomas",
      scholarship: "STEM Excellence",
      submittedDate: "Oct 01, 2023",
      status: "Under Review",
      action: "View Profile"
    },
    {
      id: 2,
      name: "Marcus Chan",
      institution: "Ateneo de Manila University",
      scholarship: "Financial Aid",
      submittedDate: "Sep 28, 2023",
      status: "Awarded",
      action: "View Profile"
    },
    {
      id: 3,
      name: "Sophia Lim",
      institution: "De La Salle University",
      scholarship: "Arts & Culture",
      submittedDate: "Sep 25, 2023",
      status: "Pending Documents",
      action: "View Profile"
    },
    {
      id: 4,
      name: "Jordan Reyes",
      institution: "UP Diliman",
      scholarship: "STEM Excellence",
      submittedDate: "Sep 27, 2023",
      status: "Under Review",
      action: "View Profile"
    }
  ];

  const activeScholarships = [
    {
      id: 1,
      title: "STEM Innovation Grant",
      status: "ACTIVE",
      engagement: "HIGH ENGAGEMENT",
      applicants: 428,
      deadline: "Nov 15, 2024"
    },
    {
      id: 2,
      title: "Leadership Fellowship",
      status: "ACTIVE",
      engagement: "HIGH ENGAGEMENT",
      applicants: 1104,
      deadline: "Nov 02, 2024"
    },
    {
      id: 3,
      title: "Global Arts Residency",
      status: "ACTIVE",
      engagement: "PAUSED",
      applicants: 89,
      deadline: "Dec 12, 2024"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-700";
      case "Awarded":
        return "bg-green-100 text-green-700";
      case "Pending Documents":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    // Added h-screen and overflow-hidden to prevent body scroll
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ProviderSidebar />

      {/* Added md:ml-64 for sidebar spacing and overflow-hidden for internal scroll */}
      <main className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ScholarshipFinder</h1>
              <p className="text-sm text-gray-600">ADMIN PORTAL</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-red-700 transition-colors">
                {user?.name?.charAt(0) || "P"}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200">
            {["User Accounts", "System Logs", "Provider Verification", "Global Settings"].map((tab) => (
              <button
                key={tab}
                className={`pb-3 px-1 font-medium text-sm transition-colors ${
                  activeTab === tab.toLowerCase().replace(" ", "-")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(" ", "-"))}
              >
                {tab}
              </button>
            ))}
            <div className="flex-1 flex items-center justify-end">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Container - Added to match reference */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{stat.icon}</div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Queue Management Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applicant Queue */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-lg">Applicant Queue</h2>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">Filter</button>
                  <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">Export CSV</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Institution</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Scholarship Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Submitted Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicantQueue.map((applicant) => (
                      <tr key={applicant.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                              {applicant.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{applicant.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{applicant.institution}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{applicant.scholarship}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{applicant.submittedDate}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(applicant.status)}`}>
                            {applicant.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            {applicant.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">Showing 1-4 of 1,284 applications</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">←</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">→</button>
                </div>
              </div>
            </div>

            {/* Active Scholarships */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-bold text-gray-900 text-lg">Active Scholarships</h2>
              </div>
              <div className="p-6 space-y-6">
                {activeScholarships.map((scholarship) => (
                  <div key={scholarship.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{scholarship.status}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{scholarship.engagement}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-4">{scholarship.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-600 font-medium">{scholarship.applicants} Applicants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600 font-medium">{scholarship.deadline}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors">View All Scholarships</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

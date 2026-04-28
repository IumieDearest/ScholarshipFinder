import { useState } from "react";

export default function ProviderActiveScholarships() {
  const [activeTab, setActiveTab] = useState("Provider Verification");
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      category: "STEM & TECH",
      title: "STEM Innovation Grant",
      description: "Funding for undergraduate students pursuing breakthrough research in robotic...",
      isActive: true,
      applicants: 428,
      applicantsChange: "+12%",
      deadline: "Oct 15, 2024",
      categoryColor: "blue"
    },
    {
      id: 2,
      category: "LEADERSHIP",
      title: "Leadership Fellowship",
      description: "Awarding students with proven records of community service and organizational...",
      isActive: true,
      applicants: 1104,
      applicantsChange: "+8%",
      deadline: "Nov 02, 2024",
      categoryColor: "green"
    },
    {
      id: 3,
      category: "ARTS & HUMANITIES",
      title: "Global Arts Residency",
      description: "A specialized funding program for MFA students focusing on intercultural dialogue...",
      isActive: false,
      applicants: 89,
      applicantsChange: null,
      deadline: "Dec 12, 2024",
      categoryColor: "purple"
    },
    {
      id: 4,
      category: "GENERAL",
      title: "Resume Posting",
      description: "Career development opportunity for scholars",
      isActive: false,
      applicants: null,
      applicantsChange: null,
      deadline: null,
      categoryColor: "gray"
    }
  ]);

  const getCategoryColor = (category, isActive) => {
    if (!isActive) return "bg-gray-100 text-gray-700";
    switch (category) {
      case "STEM & TECH":
        return "bg-blue-100 text-blue-700";
      case "LEADERSHIP":
        return "bg-green-100 text-green-700";
      case "ARTS & HUMANITIES":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const toggleScholarshipStatus = (id) => {
    setScholarships(scholarships.map(s =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
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
                  placeholder="Search scholarships..."
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
        <div className="flex items-start justify-between mb-8">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Scholarships</h2>
            <p className="text-gray-600 max-w-2xl">
              Manage your current funding opportunities, monitor applicant engagement, and adjust visibility across the global scholar network.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Data
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Scholarship
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Scholarships Grid */}
          <div className="col-span-2 space-y-6">
            {scholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(scholarship.category, scholarship.isActive)}`}>
                      {scholarship.category}
                    </span>
                    <button
                      onClick={() => toggleScholarshipStatus(scholarship.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        scholarship.isActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          scholarship.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      {scholarship.isActive ? "ACTIVE" : "PAUSED"}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 11-4 0 2 2 0 014 0zM10 12a2 2 0 11-4 0 2 2 0 014 0zM10 18a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{scholarship.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  {scholarship.applicants !== null && (
                    <>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Applicants</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold text-gray-900">{scholarship.applicants}</p>
                          <p className="text-sm text-green-600 font-medium">{scholarship.applicantsChange}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Deadline</p>
                        <p className="text-lg font-semibold text-gray-900">{scholarship.deadline}</p>
                      </div>
                    </>
                  )}
                  <div className="text-right">
                    <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Opportunity */}
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer">
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Create New Opportunity</h3>
              <p className="text-gray-600 text-sm">Ready to support a new generation of scholars?</p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Live Engagement */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Live Engagement</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">12 New Applications</p>
                    <p className="text-xs text-gray-500">Last 2 hours across all active grants</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Deadline Warning</p>
                    <p className="text-xs text-gray-500">STEM Grant expires in 4 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Portal Update</p>
                    <p className="text-xs text-gray-500">Security patch applied successfully</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-blue-600 font-semibold text-sm hover:text-blue-700">
                VIEW FULL LOGS
              </button>
            </div>

            {/* Application Funnel */}
            <div className="bg-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4">Application Funnel</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">In Review</span>
                    <span className="text-sm font-bold">82%</span>
                  </div>
                  <div className="w-full bg-blue-500 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Interview Stage</span>
                    <span className="text-sm font-bold">15%</span>
                  </div>
                  <div className="w-full bg-blue-500 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Awarded</span>
                    <span className="text-sm font-bold">3%</span>
                  </div>
                  <div className="w-full bg-blue-500 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: "3%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Boost Visibility */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Boost Visibility</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Promote your 'STEM Innovation Grant' to reach 10x more targeted students in technical fields.
              </p>
              <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Enable Spotlight
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
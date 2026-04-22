import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProviderSidebar from "../../components/Provider/ProviderSidebar";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Active Scholarships",
      value: "12",
      icon: "📚",
      color: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      label: "Total Applicants",
      value: "342",
      icon: "👥",
      color: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      label: "Pending Review",
      value: "28",
      icon: "⏳",
      color: "bg-yellow-100",
      textColor: "text-yellow-600"
    },
    {
      label: "Accepted",
      value: "156",
      icon: "✅",
      color: "bg-emerald-100",
      textColor: "text-emerald-600"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: "Maria Santos",
      scholarship: "Tech Scholarship 2024",
      status: "Pending",
      submittedDate: "Apr 20, 2024"
    },
    {
      id: 2,
      studentName: "Juan Dela Cruz",
      scholarship: "Leadership Grant",
      status: "Under Review",
      submittedDate: "Apr 19, 2024"
    },
    {
      id: 3,
      studentName: "Ana Reyes",
      scholarship: "STEM Excellence",
      status: "Accepted",
      submittedDate: "Apr 18, 2024"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />

      <main className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Provider Portal</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your scholarships and applications</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
              P
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.color} ${stat.textColor}`}>
                    +12%
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => navigate("/provider/scholarships")}
              className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Post New Scholarship</h3>
              <p className="text-sm text-gray-600">Create and publish a new scholarship opportunity</p>
            </button>

            <button
              onClick={() => navigate("/provider/applicants")}
              className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Review Applicants</h3>
              <p className="text-sm text-gray-600">View and manage scholarship applications</p>
            </button>

            <button
              onClick={() => navigate("/provider/verification")}
              className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Verification Center</h3>
              <p className="text-sm text-gray-600">Verify student credentials and documents</p>
            </button>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Recent Applications</h2>
              <button
                onClick={() => navigate("/provider/applicants")}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Scholarship</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Submitted</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{app.studentName}</td>
                      <td className="px-6 py-4 text-gray-600">{app.scholarship}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          app.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                          app.status === "Under Review" ? "bg-blue-100 text-blue-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{app.submittedDate}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
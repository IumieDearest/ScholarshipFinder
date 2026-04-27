import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SchoolSidebar from "../../components/School/SchoolSidebar";

export default function SchoolDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Students Verified",
      value: "284",
      icon: "✅",
      color: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      label: "Pending Verification",
      value: "45",
      icon: "⏳",
      color: "bg-yellow-100",
      textColor: "text-yellow-600"
    },
    {
      label: "Documents Reviewed",
      value: "892",
      icon: "📄",
      color: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      label: "Verification Rate",
      value: "98%",
      icon: "📊",
      color: "bg-purple-100",
      textColor: "text-purple-600"
    }
  ];

  const recentVerifications = [
    {
      id: 1,
      studentName: "Maria Santos",
      email: "maria@student.edu.ph",
      status: "Verified",
      verifiedDate: "Apr 20, 2024"
    },
    {
      id: 2,
      studentName: "Juan Dela Cruz",
      email: "juan@student.edu.ph",
      status: "Pending",
      verifiedDate: "Apr 19, 2024"
    },
    {
      id: 3,
      studentName: "Ana Reyes",
      email: "ana@student.edu.ph",
      status: "Verified",
      verifiedDate: "Apr 18, 2024"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SchoolSidebar />

      <main className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">School Portal</h1>
            <p className="text-sm text-gray-600 mt-1">Manage student verification and institutional scholarships</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-green-700 transition-colors">
              S
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
                    +8%
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
              onClick={() => navigate("/school/verify-students")}
              className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Verify Students</h3>
              <p className="text-sm text-gray-600">Review and verify student credentials</p>
            </button>

            <button
              onClick={() => navigate("/school/scholarships")}
              className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Manage Scholarships</h3>
              <p className="text-sm text-gray-600">Create and manage institutional scholarships</p>
            </button>

            <button
              onClick={() => navigate("/school/analytics")}
              className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">View Analytics</h3>
              <p className="text-sm text-gray-600">Track verification and scholarship metrics</p>
            </button>
          </div>

          {/* Recent Verifications */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Recent Verifications</h2>
              <button
                onClick={() => navigate("/school/verify-students")}
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                View All →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVerifications.map((verification) => (
                    <tr key={verification.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{verification.studentName}</td>
                      <td className="px-6 py-4 text-gray-600">{verification.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          verification.status === "Verified" ? "bg-green-100 text-green-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {verification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{verification.verifiedDate}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm">View</button>
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
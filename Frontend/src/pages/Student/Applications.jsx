// src/pages/student/Applications.jsx
//
// "Manage Your Journey" applications page (Image 2).
// IMPORTS Sidebar for shared navigation.

import Sidebar from "../../components/Students/Sidebar";

const activeApps = [
    {
        id: "APP-9921",
        title: "Global Excellence Merit Scholarship",
        date: "Oct 12, 2023",
        status: "PENDING REVIEW",
        statusColor: "bg-yellow-100 text-yellow-700",
        icon: "🎓",
        iconBg: "bg-blue-50",
    },
    {
        id: "APP-8472",
        title: "STEM Innovation Research Grant",
        date: "Sep 28, 2023",
        status: "APPROVED",
        statusColor: "bg-green-100 text-green-700",
        icon: "🧪",
        iconBg: "bg-green-50",
    },
    {
        id: "APP-1033",
        title: "Community Leadership Fellowship",
        date: "Nov 04, 2023",
        status: "DRAFTING",
        statusColor: "bg-purple-100 text-purple-700",
        icon: "🌐",
        iconBg: "bg-purple-50",
    },
];

const history = [
    { name: "Undergraduate Arts Grant", date: "Aug 15, 2022", status: "DENIED", action: "APPEAL" },
    { name: "First-Year Orientation Award", date: "Jun 10, 2022", status: "COMPLETED", action: "download" },
];

export default function Applications() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 flex flex-col">

                <div className="flex-1 p-6 md:p-8">

                    {/* Page heading */}
                    <div className="flex items-start justify-between mb-7">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">Manage Your Journey</h1>
                            <p className="text-gray-500 text-sm mt-1 max-w-lg">
                                View and track the status of your scholarship applications. Ensure all required documentation is submitted to avoid delays in processing.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Application
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                        {/* Left column */}
                        <div className="lg:col-span-2 space-y-5">

                            {/* Active Submissions */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h2 className="font-bold text-gray-800">Active Submissions</h2>
                                    </div>
                                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                                        3 ONGOING
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {activeApps.map((app) => (
                                        <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${app.iconBg}`}>
                                                {app.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 text-sm truncate">{app.title}</p>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="text-xs text-gray-400">📅 {app.date}</span>
                                                    <span className="text-xs text-gray-400">· ID: {app.id}</span>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${app.statusColor}`}>
                                                {app.status}
                                            </span>
                                            <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>

                                <button className="mt-4 text-xs font-semibold text-blue-600 hover:underline uppercase tracking-wide">
                                    View All Active Submissions
                                </button>
                            </div>

                            {/* Application History */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="font-bold text-gray-800 mb-4">Application History</h2>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                                            <th className="text-left pb-2 font-semibold">Scholarship</th>
                                            <th className="text-left pb-2 font-semibold">Date</th>
                                            <th className="text-left pb-2 font-semibold">Status</th>
                                            <th className="pb-2" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((h, i) => (
                                            <tr key={i} className="border-b border-gray-50 last:border-0">
                                                <td className="py-3 font-medium text-gray-700">{h.name}</td>
                                                <td className="py-3 text-gray-400">{h.date}</td>
                                                <td className="py-3">
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${h.status === "DENIED" ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"
                                                        }`}>
                                                        {h.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-right">
                                                    {h.action === "APPEAL" ? (
                                                        <button className="text-xs font-semibold text-blue-600 hover:underline">APPEAL</button>
                                                    ) : (
                                                        <button className="text-gray-400 hover:text-gray-600">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-4">

                            {/* Scholarship Success Rate */}
                            <div className="bg-blue-700 rounded-2xl p-5 text-white">
                                <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">
                                    Scholarship Success Rate
                                </p>
                                <p className="text-5xl font-extrabold mb-2">67%</p>
                                <div className="w-full bg-blue-500 rounded-full h-2 mb-4">
                                    <div className="bg-white h-2 rounded-full" style={{ width: "67%" }} />
                                </div>
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-blue-200">Awarded Funds</span>
                                        <span className="font-bold">$12,400.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-200">Pending Potential</span>
                                        <span className="font-bold">$5,000.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy & Compliance */}
                            <div className="bg-gray-900 rounded-2xl p-5 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <h3 className="font-bold text-sm">Privacy & Compliance</h3>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                    Your data is secured in accordance with the{" "}
                                    <span className="text-white font-semibold">Data Privacy Act of 2012</span>. We only use your information for scholarship processing and verification purposes.
                                </p>
                                <button className="text-xs text-blue-400 hover:underline font-semibold uppercase tracking-wide">
                                    Read Policy
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
                        <p className="font-semibold tracking-widest uppercase mb-1">Official Portal of ScholarchipFinder Educational Trust</p>
                        <p className="max-w-2xl mx-auto leading-relaxed">
                            This system complies with the <span className="font-semibold text-gray-600">Data Privacy Act of 2012 (RA 10173)</span> and international security standards. All information provided in the application process is treated with strict confidentiality.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
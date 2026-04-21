// src/pages/student/Eligibility.jsx
//
// "Manage Your Eligibility" page (Image 4).
// IMPORTS Sidebar for shared navigation.

import { useState } from "react";
import Sidebar from "../../components/Students/Sidebar";

const incomeOptions = [
  "Below $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "Above $100,000",
];

export default function Eligibility() {
  const [yearLevel, setYearLevel] = useState("3rd");
  const [income, setIncome] = useState("Below $25,000");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col">

        <div className="flex-1 p-6 md:p-8">

          {/* Page heading */}
          <div className="mb-7">
            <h1 className="text-3xl font-extrabold text-gray-900">Manage Your Eligibility</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">
              Ensure your profile is up-to-date to unlock more scholarship opportunities. All information is processed securely under the Data Privacy Act.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left — forms */}
            <div className="lg:col-span-2 space-y-5">

              {/* Verification Status */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Verification Status</h2>
                  </div>
                  <span className="text-xs font-bold bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    85% COMPLETE
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }} />
                </div>
                <p className="text-sm text-gray-500">
                  Complete the{" "}
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Special Categories</span>
                  {" "}section to reach 100% eligibility score.
                </p>
              </div>

              {/* Academic Standing */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-gray-800">Academic Standing</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Metropolitan University of Technolog"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      Current Degree Program
                    </label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>B.S. Computer Science</option>
                      <option>B.S. Information Technology</option>
                      <option>B.S. Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      Cumulative GPA
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <input
                        type="text"
                        defaultValue="3.85"
                        className="flex-1 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="px-3 py-2.5 bg-gray-50 text-sm text-gray-400 border-l border-gray-200">/ 4.0</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      Year Level
                    </label>
                    <div className="flex gap-2">
                      {["1st", "2nd", "3rd", "4th"].map((yr) => (
                        <button
                          key={yr}
                          onClick={() => setYearLevel(yr)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            yearLevel === yr
                              ? "bg-blue-600 text-white"
                              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Status */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-gray-800">Financial Status</h2>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Annual Family Income Bracket
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {incomeOptions.map((opt) => (
                      <label
                        key={opt}
                        onClick={() => setIncome(opt)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                          income === opt
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          income === opt ? "border-blue-600" : "border-gray-300"
                        }`}>
                          {income === opt && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Your income bracket determines your eligibility for "Need-Based" grants.
                  </p>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">

              {/* Verify & Save */}
              <div className="bg-blue-700 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-bold text-sm uppercase tracking-wide">Verify & Save</h3>
                </div>
                <p className="text-sm text-blue-200 leading-relaxed mb-5">
                  By clicking the button below, you confirm that all provided information is truthful and verifiable through official documentation.
                </p>
                <button className="w-full bg-white text-blue-700 font-bold text-xs tracking-widest uppercase py-3 rounded-xl hover:bg-blue-50 transition-colors">
                  Verify Eligibility
                </button>
              </div>

              {/* Data Privacy Act */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Data Privacy Act</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  ScholarshipFinder strictly adheres to the{" "}
                  <span className="font-semibold text-gray-800">Data Privacy Act of 2012</span>. We process your sensitive personal information solely for the purpose of scholarship qualification and grant allocation.
                </p>
                <div className="space-y-1.5">
                  <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium">
                    Privacy Policy
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium">
                    Terms of Consent
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Available For You */}
              <div className="bg-gray-900 rounded-2xl p-5 text-white">
                <h3 className="font-bold text-sm mb-1">Available For You</h3>
                <p className="text-xs text-gray-400">Based on your current eligibility profile</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
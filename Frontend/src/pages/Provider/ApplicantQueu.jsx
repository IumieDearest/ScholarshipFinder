import { useState } from "react";
import ProviderSidebar from "../../components/Provider/ProviderSidebar";

export default function ApplicantQueue() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const applicants = [
    {
      id: 1,
      studentName: "Maria Santos",
      email: "maria@university.edu.ph",
      scholarship: "Tech Scholarship 2024",
      gpa: "3.8",
      status: "Pending",
      submittedDate: "Apr 20, 2024",
      avatar: "MS"
    },
    {
      id: 2,
      studentName: "Juan Dela Cruz",
      email: "juan@university.edu.ph",
      scholarship: "Leadership Grant",
      gpa: "3.6",
      status: "Under Review",
      submittedDate: "Apr 19, 2024",
      avatar: "JD"
    },
    {
      id: 3,
      studentName: "Ana Reyes",
      email: "ana@university.edu.ph",
      scholarship: "STEM Excellence",
      gpa: "3.9",
      status: "Accepted",
      submittedDate: "Apr 18, 2024",
      avatar: "AR"
    },
    {
      id: 4,
      studentName: "Carlos Mendoza",
      email: "carlos@university.edu.ph",
      scholarship: "Tech Scholarship 2024",
      gpa: "3.4",
      status: "Rejected",
      submittedDate: "Apr 17, 2024",
      avatar: "CM"
    },
    {
      id: 5,
      studentName: "Rosa Garcia",
      email: "rosa@university.edu.ph",
      scholarship: "Leadership Grant",
      gpa: "3.7",
      status: "Pending",
      submittedDate: "Apr 21, 2024",
      avatar: "RG"
    }
  ];

  const filteredApplicants = selectedStatus === "All" 
    ? applicants 
    : applicants.filter(app => app.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Under Review":
        return "bg-blue-100 text-blue-700";
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Applicant Queue</h1>
          <p className="text-sm text-gray-600 mt-1">Review and manage scholarship applications</p>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {["All", "Pending", "Under Review", "Accepted", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Applicants Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Applicants List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-bold text-gray-900">
                    {selectedStatus === "All" ? "All Applications" : `${selectedStatus} Applications`}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{filteredApplicants.length} applications</p>
                </div>

                <div className="divide-y divide-gray-100">
                  {filteredApplicants.map((applicant) => (
                    <button
                      key={applicant.id}
                      onClick={() => setSelectedApplicant(applicant)}
                      className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedApplicant?.id === applicant.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold flex-shrink-0">
                          {applicant.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900">{applicant.studentName}</h3>
                          <p className="text-sm text-gray-600 truncate">{applicant.email}</p>
                          <p className="text-xs text-gray-500 mt-1">{applicant.scholarship}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(applicant.status)}`}>
                            {applicant.status}
                          </span>
                          <span className="text-xs text-gray-500">{applicant.submittedDate}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Applicant Details */}
            {selectedApplicant && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-8">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                  <h3 className="font-bold text-gray-900">Application Details</h3>
                </div>

                <div className="p-6 space-y-6">
                  
                  {/* Student Info */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Student Information</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium text-gray-900">{selectedApplicant.studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{selectedApplicant.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">GPA</p>
                        <p className="font-medium text-gray-900">{selectedApplicant.gpa}</p>
                      </div>
                    </div>
                  </div>

                  {/* Application Info */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Application</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Scholarship</p>
                        <p className="font-medium text-gray-900">{selectedApplicant.scholarship}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(selectedApplicant.status)}`}>
                          {selectedApplicant.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p className="font-medium text-gray-900">{selectedApplicant.submittedDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedApplicant.status === "Pending" && (
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors">
                        Accept Application
                      </button>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors">
                        Reject Application
                      </button>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
                        Request More Info
                      </button>
                    </div>
                  )}

                  {selectedApplicant.status === "Under Review" && (
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors">
                        Accept Application
                      </button>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors">
                        Reject Application
                      </button>
                    </div>
                  )}

                  {/* View Documents */}
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Documents
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
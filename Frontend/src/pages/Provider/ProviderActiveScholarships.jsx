import { useState, useEffect } from "react";
import AddScholarshipModal from "../../components/Providers/AddScholarshipModal"; 
import ProviderSidebar from "../../components/Providers/ProviderSidebar";

export default function ProviderActiveScholarships() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      category: "STEM & TECH",
      title: "STEM Innovation Grant",
      description: "Funding for undergraduate students pursuing breakthrough research in robotics...",
      isActive: true,
      applicants: 428,
      maxApplicants: 500,      
      deadline: "2024-10-15",  
      applicantsChange: "+12%",
      categoryColor: "blue"
    },
    {
      id: 2,
      category: "LEADERSHIP",
      title: "Leadership Fellowship",
      description: "Awarding students with proven records of community service...",
      isActive: true,
      applicants: 1104,
      maxApplicants: 1500,
      deadline: "2024-11-02",
      applicantsChange: "+8%",
      categoryColor: "green"
    }
  ]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let updated = false;
    const newScholarships = scholarships.map(scholarship => {
      if (!scholarship.isActive) return scholarship;
      const deadlineDate = new Date(scholarship.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      if (deadlineDate < today || scholarship.applicants >= scholarship.maxApplicants) {
        updated = true;
        return { ...scholarship, isActive: false };
      }
      return scholarship;
    });
    if (updated) setScholarships(newScholarships);
  }, [scholarships]);

  const addScholarship = (newScholarship) => {
    const newId = Math.max(...scholarships.map(s => s.id), 0) + 1;
    setScholarships([...scholarships, { ...newScholarship, id: newId, isActive: true, applicants: 0, applicantsChange: "0%" }]);
    setShowAddModal(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ProviderSidebar />

      <main className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden">
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-12">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Scholarships</h2>
                <p className="text-gray-500 text-sm max-w-2xl">Manage your current funding opportunities and track applicant engagement in real-time.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post New Scholarship
                </button>
              </div>
            </div>

            {/* Scholarships Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {scholarships.map((scholarship) => (
                <div key={scholarship.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {scholarship.category}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${scholarship.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{scholarship.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1">{scholarship.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Applicants</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold text-gray-900">{scholarship.applicants}</p>
                        <p className="text-xs text-green-600 font-bold">{scholarship.applicantsChange}</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(scholarship.applicants / scholarship.maxApplicants) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Deadline</p>
                      <p className="text-sm font-bold text-gray-900">{formatDate(scholarship.deadline)}</p>
                      <button className="mt-2 text-blue-600 font-bold text-xs uppercase tracking-wider hover:text-blue-700 transition-colors">Edit Details</button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Create New Card */}
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center group hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Create New Opportunity</h3>
                <p className="text-xs text-gray-400">Ready to support a new generation?</p>
              </button>
            </div>
          </div>
        </div>
      </main>

      <AddScholarshipModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSave={addScholarship} />
    </div>
  );
}
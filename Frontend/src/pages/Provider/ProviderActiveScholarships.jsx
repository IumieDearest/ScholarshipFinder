import { useState, useEffect } from "react";
import AddScholarshipModal from "../../components/Providers/AddScholarshipModal"; 
import ProviderSidebar from "../../components/Providers/ProviderSidebar";

export default function ProviderActiveScholarships() {
  const [activeTab, setActiveTab] = useState("Provider Verification");
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
    },
    // ... other scholarships with maxApplicants and proper deadline format
  ]);

  // Auto-disable logic
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let updated = false;
    const newScholarships = scholarships.map(scholarship => {
      if (!scholarship.isActive) return scholarship;

      const deadlineDate = new Date(scholarship.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      const isDeadlinePassed = deadlineDate < today;
      const isLimitReached = scholarship.applicants >= scholarship.maxApplicants;

      if (isDeadlinePassed || isLimitReached) {
        updated = true;
        return { ...scholarship, isActive: false };
      }
      return scholarship;
    });

    if (updated) {
      setScholarships(newScholarships);
      // Optional: Show a toast notification
      console.log("Some scholarships were automatically deactivated");
    }
  }, [scholarships]); // re-run when scholarships change

  // Toggle manually (if admin wants to override)
  const toggleScholarshipStatus = (id) => {
    setScholarships(scholarships.map(s =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  // Add new scholarship
  const addScholarship = (newScholarship) => {
    const newId = Math.max(...scholarships.map(s => s.id), 0) + 1;
    setScholarships([...scholarships, { ...newScholarship, id: newId, isActive: true, applicants: 0, applicantsChange: "0%" }]);
    setShowAddModal(false);
  };

  // Helper to format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Scholarships</h2>
          <p className="text-gray-600 max-w-2xl">Manage your current funding opportunities...</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800">Export Data</button>
          <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Scholarship
          </button>
        </div>
      </div>

      {/* Scholarships grid - update deadline display and show limit progress */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white rounded-lg border border-gray-200 p-6">
              {/* ... badge, title, description same */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Applicants</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">{scholarship.applicants}</p>
                    <p className="text-sm text-green-600 font-medium">{scholarship.applicantsChange}</p>
                  </div>
                  {/* Progress bar to limit */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(scholarship.applicants / scholarship.maxApplicants) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Max {scholarship.maxApplicants} applicants</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Deadline</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(scholarship.deadline)}</p>
                  {new Date(scholarship.deadline) < new Date() && <p className="text-xs text-red-500">Past due</p>}
                </div>
                <div className="text-right">
                  <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">Edit Details</button>
                </div>
              </div>
            </div>
          ))}
          {/* Create new card */}
          <div onClick={() => setShowAddModal(true)} className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-400">
            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Create New Opportunity</h3>
            <p className="text-gray-600 text-sm">Ready to support a new generation of scholars?</p>
          </div>
        </div>

        {/* Right sidebar - Live Engagement, etc. */}
        {/* ... keep as is ... */}
      </div>

      {/* Add Scholarship Modal */}
      <AddScholarshipModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSave={addScholarship} />
    </div>
  );
}
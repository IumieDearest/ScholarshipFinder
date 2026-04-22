// One-time survey to personalize scholarship recommendations

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScholarshipSurvey({ onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    academicLevel: "",
    fieldOfStudy: "",
    gpa: "",
    financialNeed: "",
    ethnicity: "",
    location: "",
    specialization: [],
    workExperience: "",
    leadership: false,
    volunteer: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Save survey data to localStorage or send to backend
    localStorage.setItem("scholarshipPreferences", JSON.stringify(formData));
    localStorage.setItem("surveyCompleted", "true");
    
    if (onComplete) {
      onComplete(formData);
    }
    
    // Close survey or redirect
    navigate("/feed");
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 border-b border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Personalize Your Scholarships</h1>
            <button
              onClick={() => navigate("/feed")}
              className="text-blue-100 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-blue-500 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-blue-100 mt-2">Step {step} of 4</p>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Step 1: Academic Background */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Academic Background</h2>
                <p className="text-gray-600 text-sm">Help us understand your current academic level</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Current Academic Level</label>
                <div className="space-y-2">
                  {["High School", "Undergraduate", "Graduate", "Postgraduate"].map((level) => (
                    <label key={level} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="academicLevel"
                        value={level}
                        checked={formData.academicLevel === level}
                        onChange={(e) => handleInputChange("academicLevel", e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Field of Study</label>
                <select
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a field...</option>
                  <option value="STEM">STEM (Science, Technology, Engineering, Math)</option>
                  <option value="Business">Business & Economics</option>
                  <option value="Arts">Arts & Humanities</option>
                  <option value="Social">Social Sciences</option>
                  <option value="Health">Health & Medicine</option>
                  <option value="Law">Law</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Current GPA / Academic Performance</label>
                <select
                  value={formData.gpa}
                  onChange={(e) => handleInputChange("gpa", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select GPA range...</option>
                  <option value="3.8-4.0">3.8 - 4.0 (Excellent)</option>
                  <option value="3.5-3.7">3.5 - 3.7 (Very Good)</option>
                  <option value="3.0-3.4">3.0 - 3.4 (Good)</option>
                  <option value="2.5-2.9">2.5 - 2.9 (Satisfactory)</option>
                  <option value="Below 2.5">Below 2.5</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Financial & Demographic */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Financial & Demographic Information</h2>
                <p className="text-gray-600 text-sm">This helps us find scholarships that match your profile</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Financial Need</label>
                <div className="space-y-2">
                  {["High", "Moderate", "Low", "Prefer not to say"].map((need) => (
                    <label key={need} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="financialNeed"
                        value={need}
                        checked={formData.financialNeed === need}
                        onChange={(e) => handleInputChange("financialNeed", e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium text-gray-700">{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Ethnicity / Cultural Background (Optional)</label>
                <select
                  value={formData.ethnicity}
                  onChange={(e) => handleInputChange("ethnicity", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select or skip...</option>
                  <option value="Filipino">Filipino</option>
                  <option value="Asian">Asian</option>
                  <option value="Hispanic">Hispanic</option>
                  <option value="African">African</option>
                  <option value="European">European</option>
                  <option value="Middle Eastern">Middle Eastern</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Study Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select location...</option>
                  <option value="Philippines">Philippines (Local)</option>
                  <option value="Asia">Asia</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Any">Any Location</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Interests & Specializations */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Interests & Specializations</h2>
                <p className="text-gray-600 text-sm">Select areas you're interested in (choose at least one)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Areas of Interest</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Technology & Innovation",
                    "Sustainability",
                    "Healthcare",
                    "Education",
                    "Social Impact",
                    "Entrepreneurship",
                    "Arts & Culture",
                    "Sports",
                  ].map((area) => (
                    <label key={area} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.specialization.includes(area)}
                        onChange={() => handleCheckboxChange("specialization", area)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Work Experience</label>
                <select
                  value={formData.workExperience}
                  onChange={(e) => handleInputChange("workExperience", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select experience level...</option>
                  <option value="None">No work experience</option>
                  <option value="Part-time">Part-time work</option>
                  <option value="Internship">Internship experience</option>
                  <option value="Full-time">Full-time work</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.leadership}
                    onChange={(e) => handleInputChange("leadership", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Leadership experience or roles</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.volunteer}
                    onChange={(e) => handleInputChange("volunteer", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Volunteer or community service</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Review Your Preferences</h2>
                <p className="text-gray-600 text-sm">We'll use this to personalize your scholarship recommendations</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Academic Level</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{formData.academicLevel || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Field of Study</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{formData.fieldOfStudy || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">GPA Range</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{formData.gpa || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Financial Need</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{formData.financialNeed || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Preferred Location</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{formData.location || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Areas of Interest</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {formData.specialization.length > 0 ? formData.specialization.join(", ") : "Not selected"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-900">You're all set!</p>
                  <p className="text-xs text-green-700 mt-1">We'll now show you personalized scholarship recommendations based on your profile.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Navigation */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/feed")}
              className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Skip
            </button>
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
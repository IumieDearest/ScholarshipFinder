import { useState } from "react";

export default function AddScholarshipModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "STEM & TECH",
    description: "",
    maxApplicants: 100,
    deadline: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Post New Scholarship</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
              <option>STEM & TECH</option>
              <option>LEADERSHIP</option>
              <option>ARTS & HUMANITIES</option>
              <option>GENERAL</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Applicants</label>
            <input type="number" name="maxApplicants" value={formData.maxApplicants} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

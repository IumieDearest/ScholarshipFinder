import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const roles = [
  {
    id: "student",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-3.27l4 2.27 4-2.27" />
      </svg>
    ),
    title: "iStudent",
    badge: "SCHOLARSHIP SEEKER",
    description:
      "Access thousands of vetted funding opportunities. Build your academic profile, match with sponsors, and track application milestones in real-time.",
    cta: "Get Started →",
  },
  {
    id: "provider",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 4a2 2 0 100-4 2 2 0 000 4zM3 18a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
    title: "iSponsor",
    badge: "SCHOLARSHIP PROVIDER",
    description:
      "Design and launch global scholarship programs. Use advanced filtering to find high-potential candidates and manage institutional disbursement with precision.",
    cta: "Define Program →",
  },
  {
    id: "school",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "iSchool",
    badge: "VERIFIER",
    description:
      "Verify academic credentials and enrollment status for scholarship recipients. Streamline administrative overhead with automated institutional workflows.",
    cta: "Get Started →",
  },
];

export default function SelectRole() {
  const [selected, setSelected] = useState(null);
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selected) return;
    
    // Update user role in auth context
    setUser({
      ...user,
      role: selected,
    });

    // Navigate to appropriate dashboard based on role
    if (selected === "student") {
      navigate("/dashboard");
    } else if (selected === "provider") {
      navigate("/provider");
    } else if (selected === "school") {
      navigate("/school");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-lg">ScholarshipFinder</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Browse</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Partners</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Success Stories</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Resources</a>
        </div>
        <a href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Sign In
          </button>
        </a>
      </nav>

      {/* Page Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-14">

        {/* Heading */}
        <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-2">
          Orientation
        </p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Define Your Purpose</h1>
        <p className="text-gray-500 text-sm text-center max-w-md mb-10">
          Join a global ecosystem of academic excellence. Select the role that matches your
          objectives to personalize your dashboard.
        </p>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mb-10">
          {roles.map((role) => {
            const isSelected = selected === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={`text-left bg-white rounded-2xl p-6 border-2 transition-all shadow-sm hover:shadow-md ${
                  isSelected
                    ? "border-blue-600 shadow-blue-100"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {role.icon}
                </div>

                {/* Title & Badge */}
                <h2 className="text-xl font-bold text-gray-900 mb-1">{role.title}</h2>
                <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
                  {role.badge}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {role.description}
                </p>

                {/* CTA link */}
                <span
                  className={`text-sm font-semibold transition-colors ${
                    isSelected ? "text-blue-700" : "text-blue-500 hover:text-blue-700"
                  }`}
                >
                  {role.cta}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`px-10 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors ${
            selected
              ? "bg-gray-900 hover:bg-gray-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Select Role &amp; Continue
        </button>

        {/* Already have account */}
        <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Log In Here
          </a>
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-bold text-gray-700 text-sm">ScholarshipFinder</span>
        <div className="flex gap-4 text-xs text-gray-400">
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us"].map((l) => (
            <a key={l} href="#" className="hover:text-blue-600 uppercase tracking-wide">{l}</a>
          ))}
          <span>© 2026 SCHOLARSHIPFINDER · INSTITUTIONAL TRUST AND MODERN PRECISION.</span>
        </div>
      </footer>
    </div>
  );
}

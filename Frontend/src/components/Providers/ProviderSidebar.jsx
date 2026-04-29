// src/components/Providers/ProviderSidebar.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProviderSidebar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Applicant Queue", path: "/applicant-queue", icon: "👥" },
    { label: "Active Scholarships", path: "/active-scholarships", icon: "📚" },
    { label: "Verification Center", path: "/verification", icon: "✅" },
    { label: "Reports", path: "/reports", icon: "📈" }
  ];

  const getInitials = (name) => {
    if (!name) return "P";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("accountType");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("rememberedEmail");
    setUser(null);
    setSidebarOpen(false);
    setProfileMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile menu button - now green to match student style */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar – green gradient like student portal */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        
        {/* Logo section */}
        <div className="px-6 py-6 border-b border-green-700 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">ScholarshipFinder</p>
            <p className="text-xs text-green-200">PROVIDER PORTAL</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700/50 transition-colors text-left group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium flex-1">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom section – Post button + Profile */}
        <div className="border-t border-green-700 px-3 py-4 space-y-2">
          <button className="w-full bg-white text-green-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Scholarship
          </button>

          {/* User Profile (same as student style) */}
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700/50 transition-colors text-left relative group"
          >
            <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-sm">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.name || "Provider Name"}</p>
              <p className="text-xs text-green-200 truncate">{user?.email || "provider@email.com"}</p>
            </div>
            <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm font-medium">
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm font-medium border-t border-gray-200 text-red-600"
                >
                  Sign Out
                </button>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
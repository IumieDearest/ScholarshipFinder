import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProviderSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Fallback to localStorage if context is empty (e.g. on refresh)
  const userInfo = user || JSON.parse(localStorage.getItem("user") || "{}");

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { label: "Applicant Queue", path: "/applicant-queue", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { label: "Active Scholarships", path: "/active-scholarships", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { label: "Verification Center", path: "/verification", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { label: "Reports", path: "/reports", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )}
  ];

  const isActive = (path) => location.pathname === path;

  const getInitials = (name) => {
    if (!name) return "P";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 1);
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
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-40">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">SF</div>
        </button>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 p-2">
          {sidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">SF</div>
          <div>
            <p className="font-bold text-gray-900">ScholarshipFinder</p>
            <p className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">Sponsor Portal</p>
          </div>
        </div>

        {/* Navigation - Individual Scrolling */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className={isActive(item.path) ? "text-white" : "text-gray-400"}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Section - Fixed at bottom */}
        <div className="p-4 border-t border-gray-100 space-y-4 bg-white">
          <button className="w-full bg-blue-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Scholarship
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {getInitials(userInfo.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{userInfo.name || "Provider"}</p>
                <p className="text-xs text-gray-500 truncate">{userInfo.email || "provider@email.com"}</p>
              </div>
            </button>

            {profileMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">
                <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-sm text-gray-700">Settings</button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left hover:bg-red-50 text-sm text-red-600 border-t border-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  );
}
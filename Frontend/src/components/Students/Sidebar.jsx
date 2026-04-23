import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // Get user info from localStorage or context
  const userInfo = user || JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("accountType");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("rememberedEmail");

    // Clear context
    setUser(null);

    // Close menus
    setSidebarOpen(false);
    setProfileMenuOpen(false);

    // Redirect to login
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
    setProfileMenuOpen(false);
  };

  const navItems = [
    { label: "Home", path: "/feed", icon: "🏠" },
    { label: "Saved", path: "/saved", icon: "💾" },
    { label: "Applications", path: "/applications", icon: "📋" },
    { label: "Preferences", path: "/preferences", icon: "⚙️" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
        
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => navigate("/feed")}
            className="flex items-center gap-2 w-full"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
              </svg>
            </div>
            <span className="font-bold text-gray-800">Glaux</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-lg transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          
          {/* Profile Avatar - Clickable */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">
                  {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900">{userInfo.name || "User"}</p>
                <p className="text-xs text-gray-500">{userInfo.email || "user@example.com"}</p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${profileMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("/applications")}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100"
                >
                  Applications
                </button>
                <button
                  onClick={() => handleNavigation("/documents")}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100"
                >
                  Documents
                </button>
                <button
                  onClick={() => handleNavigation("/eligibility")}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100"
                >
                  Eligibility
                </button>
              </div>
            )}
          </div>

          {/* Bottom Buttons */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <button
              onClick={() => handleNavigation("/support")}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Support
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-40">
        
        {/* Logo */}
        <button
          onClick={() => navigate("/feed")}
          className="flex items-center gap-2"
        >
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
        </button>

        {/* Hamburger Menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
          />

          {/* Drawer */}
          <div
            className="fixed left-0 top-0 bottom-0 w-64 bg-white z-40 md:hidden overflow-y-auto"
            style={{
              animation: "slideInLeft 0.3s ease-out",
            }}
          >
            {/* Close Button */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="font-bold text-gray-800">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-3 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-lg transition"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Profile Section */}
            <div className="border-t border-gray-200 p-4 space-y-3">
              
              {/* Profile Avatar */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">
                    {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{userInfo.name || "User"}</p>
                  <p className="text-xs text-gray-500">{userInfo.email || "user@example.com"}</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("/applications")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Applications
                </button>
                <button
                  onClick={() => handleNavigation("/documents")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Documents
                </button>
                <button
                  onClick={() => handleNavigation("/eligibility")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Eligibility
                </button>
              </div>

              {/* Bottom Buttons */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => handleNavigation("/support")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Support
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
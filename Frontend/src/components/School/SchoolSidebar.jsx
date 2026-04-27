import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SchoolSidebar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      icon: "📊",
      path: "/dashboard",
      badge: null
    },
    {
      label: "Verify Students",
      icon: "✅",
      path: "/school/verify-students",
      badge: "45"
    },
    {
      label: "Scholarships",
      icon: "📚",
      path: "/school/scholarships",
      badge: "8"
    },
    {
      label: "Student Records",
      icon: "📋",
      path: "/school/records",
      badge: null
    },
    {
      label: "Analytics",
      icon: "📈",
      path: "/school/analytics",
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
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
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        
        {/* Logo */}
        <div className="px-6 py-6 border-b border-green-700 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">Glaux</p>
            <p className="text-xs text-green-200">School Portal</p>
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
              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-green-700 px-3 py-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-700/50 transition-colors text-left">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Settings</span>
          </button>

          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700/50 transition-colors text-left relative group"
          >
            <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-sm">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">School Name</p>
              <p className="text-xs text-green-200 truncate">school@email.edu.ph</p>
            </div>
            <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm font-medium">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm font-medium">
                  Account Settings
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm font-medium border-t border-gray-200 text-red-600">
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
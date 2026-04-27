import { useState } from "react";
import { useNavigate } from "react-router-dom";

const scholarships = [
  {
    id: 1,
    org: "Global Tech Foundation",
    orgInitials: "GT",
    orgColor: "bg-slate-700",
    title: "STEM Excellence Scholarship",
    posted: "2h ago",
    description:
      "Supporting future innovators in engineering and computer science. This merit-based award covers full tuition and a $5,000 annual stipend for research projects.",
    deadline: "June 15, 2026",
    deadlineUrgency: "urgent",
    image: null,
    imageBg: "bg-teal-500",
    saved: false,
  },
  {
    id: 2,
    org: "National Artistry Council",
    orgInitials: "NA",
    orgColor: "bg-amber-200",
    title: "Creative Arts Grant",
    posted: "5h ago",
    description:
      "A scholarship for students pursuing degrees in fine arts, digital media, or design. Requires a portfolio submission of at least 5 original works.",
    deadline: "Augutst 01, 2026",
    deadlineUrgency: "normal",
    image: null,
    imageBg: null,
    saved: false,
  },
  {
    id: 3,
    org: "Leadership Institute",
    orgInitials: "LI",
    orgColor: "bg-emerald-700",
    title: "Future Leaders Program",
    posted: "1d ago",
    description:
      "Designed for students who demonstrate exceptional community service and leadership potential within their local communities.",
    deadline: "August 20, 2026",
    deadlineUrgency: "safe",
    image: null,
    imageBg: "bg-slate-800",
    saved: false,
  },
];

const recommendedSchools = [
  { name: "Cebu Eastern College", location: "Kilat St., Pahina Central, Cebu City, Cebu", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/240px-Stanford_Cardinal_logo.svg.png" },
  { name: "University of the Philippines", location: "Gorordo Avenue, Lahug, Cebu City, Cebu", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/240px-MIT_logo.svg.png" },
  { name: "Cebu Normal University", location: "Osmeña Blvd, Cebu City, Cebu", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/ETH_Z%C3%BCrich_Logo_black.svg/240px-ETH_Z%C3%BCrich_Logo_black.svg.png" },
];

const upcomingDeadlines = [
  { title: "Women in Tech Award", timeLeft: "In 2 days", color: "text-red-500", dot: "bg-red-500" },
  { title: "Sustainability Grant", timeLeft: "In 5 days", color: "text-orange-500", dot: "bg-orange-500" },
  { title: "Global Travel Fund", timeLeft: "In 12 days", color: "text-blue-500", dot: "bg-blue-500" },
];

const navItems = [
  {
    label: "Home", active: true,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h4a1 1 0 001-1v-3h2v3a1 1 0 001 1h4a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  },
  {
    label: "Applications", active: false,
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
];

export default function StudentFeed() {
  const [cards, setCards] = useState(scholarships);
  const [activeNav, setActiveNav] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeed, setShowFeed] = useState(true);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSave = (id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, saved: !c.saved } : c))
    );
  };

  const handleAvatarClick = (path) => {
    navigate(path);
    setAvatarMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">

      {/* Top Navbar - STICKY */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        {/* Logo - Clickable on mobile to toggle feed */}
        <button
          onClick={() => setShowFeed(!showFeed)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight hidden sm:inline">ScholarshipFinder</span>
        </button>

        {/* Search - Full on desktop, icon only on mobile */}
        <div className="flex-1 max-w-lg mx-4 md:mx-8">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholarships, grants, or schools..."
              className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder:text-gray-400 hidden sm:block"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Bell */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition flex-shrink-0">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Avatar - CLICKABLE with dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              className="w-9 h-9 rounded-full bg-amber-100 border-2 border-gray-200 overflow-hidden flex items-center justify-center hover:shadow-md transition-shadow flex-shrink-0"
            >
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Avatar Dropdown Menu */}
            {avatarMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48">
                <button
                  onClick={() => handleAvatarClick("/feed")}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 text-left transition-colors border-b border-gray-100"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Feed
                </button>
                <button
                  onClick={() => handleAvatarClick("/dashboard")}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 text-left transition-colors border-b border-gray-100"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </button>
                <button
                  onClick={() => handleAvatarClick("/applications")}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 text-left transition-colors border-b border-gray-100"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Applications
                </button>
                <button
                  onClick={() => handleAvatarClick("/documents")}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 text-left transition-colors border-b border-gray-100"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  Documents
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Body - RESPONSIVE LAYOUT with INDEPENDENT SCROLLING */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr_260px] gap-6 overflow-hidden">

          {/* Left Sidebar - INDEPENDENT SCROLL */}
          <aside className="hidden md:flex flex-col overflow-y-auto space-y-2 pr-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                  activeNav === item.label
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className={activeNav === item.label ? "text-blue-600" : "text-gray-400"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}

            {/* Profile Strength */}
            <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex-shrink-0">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Your Profile Strength</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }} />
              </div>
              <p className="text-xs text-gray-500">85% Complete — Add your GPA to unlock 12 more matches.</p>
            </div>
          </aside>

          {/* Main Feed - INDEPENDENT SCROLL - RESPONSIVE VISIBILITY */}
          <main className={`overflow-y-auto space-y-4 pr-2 ${!showFeed && "hidden"} md:block`}>

            {/* Scholarship Cards */}
            {cards
              .filter((c) =>
                searchQuery === "" ||
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.org.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((card) => (
                <div key={card.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${card.orgColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {card.orgInitials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{card.title}</p>
                          <p className="text-xs text-gray-400">{card.org} · Posted {card.posted}</p>
                        </div>
                      </div>
                      <button className="text-gray-300 hover:text-gray-500 transition p-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{card.description}</p>

                    {/* Image placeholder */}
                    {card.imageBg && (
                      <div className={`w-full h-44 ${card.imageBg} rounded-xl mb-4 flex items-center justify-center`}>
                        <span className="text-white/40 text-xs uppercase tracking-widest">Scholarship Banner</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className={`text-sm font-semibold ${
                          card.deadlineUrgency === "urgent" ? "text-blue-600" :
                          card.deadlineUrgency === "normal" ? "text-blue-500" : "text-blue-400"
                        }`}>
                          Deadline: {card.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </main>

          {/* Right Sidebar - INDEPENDENT SCROLL */}
          <aside className="hidden md:flex flex-col overflow-y-auto space-y-4 pr-2">

            {/* Recommended Schools */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex-shrink-0">
              <h3 className="font-bold text-gray-800 text-sm mb-4">Recommended Schools</h3>
              <div className="space-y-3">
                {recommendedSchools.map((school) => (
                  <div key={school.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={school.img} alt={school.name} className="w-7 h-7 object-contain" onError={(e) => { e.target.style.display='none' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{school.name}</p>
                      <p className="text-xs text-gray-400">{school.location}</p>
                    </div>
                    <button className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline w-full text-center">
                View All Recommendations
              </button>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex-shrink-0">
              <h3 className="font-bold text-gray-800 text-sm mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((d) => (
                  <div key={d.title} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${d.dot} shrink-0`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{d.title}</p>
                      <p className={`text-xs font-semibold ${d.color}`}>{d.timeLeft}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer links */}
            <div className="text-xs text-gray-400 flex flex-wrap gap-x-3 gap-y-1 px-1 flex-shrink-0">
              {["Privacy", "Terms", "Advertising", "Cookies"].map((l) => (
                <a key={l} href="#" className="hover:text-blue-500 transition">{l}</a>
              ))}
              <span className="w-full">ScholarshipFinder © 2026</span>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
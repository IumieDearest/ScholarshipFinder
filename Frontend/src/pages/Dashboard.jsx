const scholarships = [
  {
    id: 1,
    title: "STEM Excellence Scholarship",
    org: "Global Tech Foundation",
    posted: "2h ago",
    description:
      "Supporting future innovators in engineering and computer science. This merit-based award covers full tuition and a $5,000 annual stipend for research projects.",
    deadline: "June 15, 2026",
    image: "https://via.placeholder.com/400x180?text=STEM+Scholarship",
  },
  {
    id: 2,
    title: "Creative Arts Grant",
    org: "National Artistry Council",
    posted: "5h ago",
    description:
      "A scholarship for students pursuing degrees in fine arts, digital media, or design. Requires a portfolio submission of at least 5 original works.",
    deadline: "August 01, 2026",
    image: null,
  },
  {
    id: 3,
    title: "Future Leaders Program",
    org: "Leadership Institute",
    posted: "18h ago",
    description:
      "Designed for students who demonstrate exceptional community service and leadership potential within their local communities.",
    deadline: "August 20, 2026",
    image: "https://via.placeholder.com/400x180?text=Community+Project",
  },
];

// Sample recommended schools
const schools = [
  { name: "Cebu Eastern College", location: "Arce St., Parian Central, Cebu City, Cebu" },
  { name: "University of the Philippines", location: "Gorordo Avenue, Lahug, Cebu City, Cebu" },
  { name: "Cebu Normal University", location: "Osmeña Blvd, Cebu City, Cebu" },
];

// Sample upcoming deadlines
const deadlines = [
  { name: "Women in Tech Award", daysLeft: "in 2 days", color: "text-red-500" },
  { name: "Sustainability Grant", daysLeft: "in 5 days", color: "text-orange-500" },
  { name: "Global Travel Fund", daysLeft: "in 12 days", color: "text-blue-500" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-blue-700 text-lg">
          🎓 ScholarshipFinder
        </div>
        <div className="flex-1 mx-8">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 gap-2 bg-gray-50 max-w-md">
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search scholarships, grants, or schools..."
              className="flex-1 outline-none text-sm bg-transparent text-gray-700"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl cursor-pointer">🔔</span>
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white cursor-pointer">
            U
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-6 gap-6">

        {/* Left Sidebar */}
        <aside className="w-44 shrink-0">
          <nav className="space-y-1 mb-6">
            {[
              { icon: "🏠", label: "Home", active: true },
              { icon: "🔖", label: "Saved" },
              { icon: "📋", label: "Applications" },
              { icon: "⚙️", label: "Preferences" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  item.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Profile Strength */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-xs text-gray-600">
            <p className="font-semibold text-gray-700 mb-2">YOUR PROFILE STRENGTH</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
            </div>
            <p>85% Complete – Add your GPA to unlock 12 more matches.</p>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 space-y-4">

          {/* Prompt Bar */}
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 text-sm text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">💬</div>
            <span>What are you looking for today?</span>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 text-sm">
            {["🎓 Full Tuition", "🌍 International", "🔧 All Filters"].map((f) => (
              <button
                key={f}
                className="border border-gray-300 rounded-full px-4 py-1.5 text-gray-600 hover:bg-gray-100 transition"
              >
                {f}
              </button>
            ))}
          </div>

          {/* Scholarship Cards */}
          {scholarships.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                    {s.org[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{s.title}</p>
                    <p className="text-xs text-gray-400">{s.org} • Posted {s.posted}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 text-lg">⋯</button>
              </div>
              <p className="text-sm text-gray-600">{s.description}</p>
              {s.image && (
                <img src={s.image} alt={s.title} className="rounded-lg w-full object-cover max-h-40" />
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">📅 Deadline: {s.deadline}</span>
                <div className="flex gap-2">
                  <button className="border border-gray-300 rounded-lg px-4 py-1.5 text-gray-600 hover:bg-gray-50 transition">
                    Save
                  </button>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-1.5 transition">
                    Visit Official Site
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="w-56 shrink-0 space-y-4">

          {/* Recommended Schools */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="font-semibold text-gray-700 text-sm mb-3">Recommended Schools</p>
            <div className="space-y-3">
              {schools.map((school) => (
                <div key={school.name} className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                    {school.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{school.name}</p>
                    <p className="text-xs text-gray-400">{school.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="text-xs text-blue-600 hover:underline mt-3 block">
              View All Recommendations
            </a>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="font-semibold text-gray-700 text-sm mb-3">Upcoming Deadlines</p>
            <div className="space-y-2">
              {deadlines.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className={`text-base ${d.color}`}>⏰</span>
                  <div>
                    <p className="text-gray-700 font-medium">{d.name}</p>
                    <p className={`${d.color}`}>{d.daysLeft}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <p className="text-xs text-gray-400 text-center">
            <a href="#" className="hover:underline">Privacy</a> ·{" "}
            <a href="#" className="hover:underline">Terms</a> ·{" "}
            <a href="#" className="hover:underline">Advertising</a> ·{" "}
            <a href="#" className="hover:underline">Cookies</a>
            <br />ScholarFinder © 2026
          </p>
        </aside>

      </div>
    </div>
  );
}
export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-blue-700 text-lg">
          🎓 ScholarshipFinder
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">Help Center</a>
          <a href="#" className="hover:text-blue-600">Program Rules</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center py-10 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your credentials to manage your scholarship applications and track your progress.
          </p>

          <div className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2">
                <span className="text-gray-400">✉️</span>
                <input
                  type="email"
                  placeholder="student@university.edu.ph"
                  className="flex-1 outline-none text-sm text-gray-700"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2">
                <span className="text-gray-400">🔒</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex-1 outline-none text-sm text-gray-700"
                />
                <span className="text-gray-400 cursor-pointer text-xs">👁</span>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" id="remember" className="accent-blue-600" />
              <label htmlFor="remember">Remember me on this device</label>
            </div>

            {/* Sign In Button */}
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg text-sm transition">
              Sign In
            </button>

            {/* Divider */}
            <div className="text-center text-xs text-gray-400 uppercase tracking-widest">
              New Student?
            </div>

            {/* Create Account Button */}
            <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg text-sm transition">
              Create Account
            </button>

            {/* Trust Badges */}
            <div className="flex justify-center gap-6 text-xs text-gray-400 pt-1">
              <span>🔒 SSL SECURED</span>
              <span>✅ IDENTITY VERIFIED</span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 Global Education Fund. All rights reserved.{" "}
            <a href="#" className="hover:underline">Privacy Policy</a>{" · "}
            <a href="#" className="hover:underline">Terms of Use</a>
          </p>

        </div>
      </div>

    </div>
  );
}
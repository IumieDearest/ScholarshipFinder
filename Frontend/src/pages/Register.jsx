import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    if (!formData.agreed) {
      setStatus("error");
      setMessage("Please agree to the Terms of Service and Privacy Policy to continue.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match. Please try again.");
      return;
    }
    if (formData.password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    setStatus("success");
    setMessage("Account created successfully! Redirecting...");
    setTimeout(() => navigate("/select-role"), 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm px-8 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-lg">ScholarshipFinder</span>
        </button>
        <div className="flex gap-6 text-sm text-gray-600">
          <button type="button" onClick={() => navigate("/browse")} className="hover:text-blue-600 transition-colors">Browse Programs</button>
          <button type="button" onClick={() => navigate("/help")} className="hover:text-blue-600 transition-colors">Help Center</button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center py-10 px-4">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl w-full max-w-5xl">

          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">

            {/* Left Panel */}
            <section className="flex flex-col justify-center gap-6 bg-gradient-to-b from-blue-700 to-blue-900 px-10 py-14 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/60 px-4 py-1.5 text-xs uppercase tracking-widest text-blue-100 w-fit border border-blue-400/30">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Official Application Portal
              </span>

              <div>
                <h1 className="text-3xl font-black tracking-tight leading-tight sm:text-4xl">
                  Start Your Academic<br />Journey Today
                </h1>
                <p className="mt-4 text-sm text-blue-100/80 leading-relaxed max-w-sm">
                  Join over 50,000 students who have secured their future through our scholarship programs. One account, hundreds of opportunities.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                  <svg className="w-5 h-5 mt-0.5 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm">Simple Application</p>
                    <p className="text-xs text-blue-100/70 mt-0.5">Apply to multiple scholarships with a single profile.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                  <svg className="w-5 h-5 mt-0.5 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm">Instant Notifications</p>
                    <p className="text-xs text-blue-100/70 mt-0.5">Get real-time updates on your application status.</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-blue-300/60 mt-2">
                🔒 Your data is encrypted and secure.
              </p>
            </section>

            {/* Right Panel — Form */}
            <section className="flex items-center justify-center px-8 py-12 sm:px-10">
              <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="mt-1 text-sm text-gray-500">Please fill in your details to get started.</p>

                <div className="mt-7 space-y-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. John Doe"
                        className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="name@university.edu.ph"
                        className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Password row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 min-w-0"
                          required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 shrink-0">
                          {showPassword ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <input
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 min-w-0"
                          required
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600 shrink-0">
                          {showConfirm ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2.5">
                    <input
                      id="terms"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 accent-blue-600 rounded"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                      I agree to the{" "}
                      <button type="button" onClick={() => navigate("/terms")} className="font-semibold text-blue-600 hover:underline">Terms of Service</button>
                      {" "}and{" "}
                      <button type="button" onClick={() => navigate("/privacy")} className="font-semibold text-blue-600 hover:underline">Privacy Policy</button>.
                    </label>
                  </div>

                  {/* Status message */}
                  {message && (
                    <div className={`rounded-xl px-4 py-3 text-sm font-medium ${status === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                      {status === "success" ? "✓ " : "⚠ "}{message}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-semibold py-3 text-sm transition-all"
                  >
                    Create My Account →
                  </button>
                </div>

                <p className="mt-5 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <button type="button" onClick={() => navigate("/login")} className="font-semibold text-blue-600 hover:underline">
                    Sign In
                  </button>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 pb-5 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          SSL Secured
        </span>
        <span>·</span>
        <button type="button" onClick={() => navigate("/privacy")} className="hover:text-gray-600 hover:underline">Privacy</button>
        <span>·</span>
        <button type="button" onClick={() => navigate("/terms")} className="hover:text-gray-600 hover:underline">Terms</button>
        <span>·</span>
        <button type="button" onClick={() => navigate("/contact")} className="hover:text-gray-600 hover:underline">Contact Support</button>
      </footer>
    </div>
  );
}
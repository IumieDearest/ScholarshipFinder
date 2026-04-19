import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setStatus("");

    if (!formData.agreed) {
      setStatus("error");
      setMessage("Please agree to the terms to continue.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("success");
    setMessage("Success! Your account has been created.");
    // Simulate navigation after success
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const navClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <nav className="bg-white/90 backdrop-blur-md shadow-sm px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-blue-700 text-lg">
          <span className="rounded-full bg-blue-100 px-3 py-1">🎓</span>
          Scholarship Portal
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-600">
          <button type="button" onClick={() => navClick("/dashboard")} className="transition hover:text-blue-700">
            Browse Programs
          </button>
          <button type="button" onClick={() => navClick("/help")} className="transition hover:text-blue-700">
            Help Center
          </button>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center py-10 px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] w-full max-w-5xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-72 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 opacity-90" />
          <div className="pointer-events-none absolute -right-20 top-10 h-44 w-44 rounded-full bg-blue-500/30 blur-2xl" />
          <div className="pointer-events-none absolute right-10 bottom-10 h-28 w-28 rounded-full bg-sky-300/30 blur-2xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
            <section className="relative z-10 flex flex-col justify-center gap-6 rounded-b-[2rem] rounded-tr-[2rem] bg-gradient-to-b from-blue-700 to-blue-800 px-10 py-12 text-white md:px-12 md:py-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-blue-100 shadow-sm">
                <span>🏛</span>
                Official Application Portal
              </span>
              <div>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Start Your Academic Journey Today
                </h1>
                <p className="mt-4 max-w-xl text-sm text-blue-100/90 sm:text-base">
                  Join over 50,000 students who have secured their future through our scholarship programs. One account, hundreds of opportunities.
                </p>
              </div>
              <div className="grid gap-4 text-sm sm:text-base">
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 shadow-sm ring-1 ring-white/10">
                  <span className="mt-1 text-xl">📄</span>
                  <div>
                    <p className="font-semibold">Simple Application</p>
                    <p className="text-blue-100/80">Apply to multiple scholarships with a single profile.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 shadow-sm ring-1 ring-white/10">
                  <span className="mt-1 text-xl">🔔</span>
                  <div>
                    <p className="font-semibold">Instant Notifications</p>
                    <p className="text-blue-100/80">Get real-time updates on your application status.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative z-10 flex items-center justify-center px-8 py-10 sm:px-10 sm:py-14">
              <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                <p className="mt-2 text-sm text-slate-500">Please fill in your details to get started.</p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <span className="text-slate-400">👤</span>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. John Doe"
                        className="w-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <span className="text-slate-400">✉️</span>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="name@university.edu"
                        className="w-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="text-slate-400">🔒</span>
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="text-slate-400">🔒</span>
                        <input
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="terms"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-blue-600 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-500">
                      I agree to the{' '}
                      <button type="button" onClick={() => navClick("/terms")} className="font-semibold text-blue-600 hover:underline">
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button type="button" onClick={() => navClick("/privacy")} className="font-semibold text-blue-600 hover:underline">
                        Privacy Policy
                      </button>.
                    </label>
                  </div>

                  {message ? (
                    <div className={`rounded-2xl px-4 py-3 text-sm ${status === "success" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {message}
                    </div>
                  ) : null}

                  <button type="submit" className="w-full rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
                    Create My Account →
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                  Already have an account?{' '}
                  <button type="button" onClick={() => navClick("/login")} className="font-semibold text-blue-600 hover:underline">
                    Sign In
                  </button>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 pb-6">
        🔒 Your data is encrypted and secure.{' '}
        <button type="button" onClick={() => navClick("/privacy")} className="text-slate-500 hover:text-slate-800 hover:underline">
          Privacy
        </button>{' '}
        ·{' '}
        <button type="button" onClick={() => navClick("/terms")} className="text-slate-500 hover:text-slate-800 hover:underline">
          Terms
        </button>{' '}
        ·{' '}
        <button type="button" onClick={() => navClick("/contact")} className="text-slate-500 hover:text-slate-800 hover:underline">
          Contact Support
        </button>
      </footer>
    </div>
  );
}

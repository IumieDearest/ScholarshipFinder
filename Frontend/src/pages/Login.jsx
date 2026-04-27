import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    if (!email || !password) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Call backend API to login
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        } ),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Success! Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accountType", data.user.accountType);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("rememberedEmail", email);
      }

      // Update context
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        accountType: data.user.accountType,
      });

      setStatus("success");
      setMessage("Login successful! Redirecting...");

      // Redirect based on account type - FIXED PATHS
      setTimeout(() => {
        if (data.user.accountType === "Student") {
          navigate("/feed");
        } else if (data.user.accountType === "School") {
          navigate("/dashboard");
        } else if (data.user.accountType === "Provider") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setStatus("error");
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (remembered === "true" && rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between">
        <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-lg">ScholarshipFinder</span>
        </button>
        <div className="flex gap-6 text-sm text-gray-600">
          <button type="button" className="hover:text-blue-600 transition-colors">Help Center</button>
          <button type="button" className="hover:text-blue-600 transition-colors">Program Rules</button>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center py-10 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Enter your credentials to manage your scholarship applications and track your progress.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu.ph"
                  className="flex-1 outline-none text-sm text-gray-700 bg-transparent placeholder:text-gray-400"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-xs text-blue-600 hover:underline">Forgot password?</button>
              </div>
              <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 outline-none text-sm text-gray-700 bg-transparent placeholder:text-gray-400"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 accent-blue-600 rounded" />
              <label htmlFor="remember">Remember me on this device</label>
            </div>

            {/* Status message */}
            {message && (
              <div className={`rounded-xl px-4 py-3 text-sm font-medium ${status === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                {status === "success" ? "✓ " : "⚠ "}{message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">New Student?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button type="button" onClick={() => navigate("/register")} className="w-full border border-gray-200 hover:bg-gray-50 active:scale-[0.98] text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-all">
              Create Account
            </button>

            <div className="flex justify-center gap-6 text-xs text-gray-400 pt-1">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                SSL SECURED
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                IDENTITY VERIFIED
              </span>
            </div>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 Global Education Fund. All rights reserved.{" "}
            <button type="button" className="hover:underline">Privacy Policy</button>
            {" · "}
            <button type="button" className="hover:underline">Terms of Use</button>
          </p>
        </div>
      </div>
    </div>
  );
}
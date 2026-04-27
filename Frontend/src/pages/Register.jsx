import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [step, setStep] = useState(1); // 1: Account Type, 2: Form
  const [accountType, setAccountType] = useState(null);
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
    setStep(2);
  };

  const handleBackToTypes = () => {
    setStep(1);
    setAccountType(null);
    setMessage("");
    setStatus("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    // Validation
    if (!formData.name.trim()) {
      setStatus("error");
      setMessage("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

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

    setLoading(true);

    try {
      // Call backend API to register
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          accountType: accountType,
        } ),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Success! Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accountType", accountType);

      // Update context
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        accountType: data.user.accountType,
      });

      setStatus("success");
      setMessage("Account created successfully! Redirecting...");

      // Redirect based on account type - FIXED PATHS
      setTimeout(() => {
        if (accountType === "Student") {
          navigate("/StudentFeed");
        } else if (accountType === "School") {
          navigate("/dashboard");
        } else if (accountType === "Provider") {
          navigate("/ProviderDashboard");
        }
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
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
        
        {/* Step 1: Account Type Selection */}
        {step === 1 && (
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Account Type</h1>
              <p className="text-gray-600 text-lg">Select the account that best fits your role</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Student Card */}
              <button
                onClick={() => handleAccountTypeSelect("Student")}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-blue-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Student</h3>
                  <p className="text-gray-600 text-sm mb-6">Find and apply for scholarships that match your profile</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Personalized recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Track applications
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Secure documents
                    </li>
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* School Card */}
              <button
                onClick={() => handleAccountTypeSelect("School")}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-green-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m5.581 0a2.5 2.5 0 110-5h-.581m0 5a2.5 2.5 0 110-5h.581m0 5H9m0 0a2.5 2.5 0 100-5m0 5v-5m0-5H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">School</h3>
                  <p className="text-gray-600 text-sm mb-6">Manage institutional scholarships and verify student credentials</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verify students
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Manage records
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      View analytics
                    </li>
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Provider Card */}
              <button
                onClick={() => handleAccountTypeSelect("Provider")}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-purple-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Provider</h3>
                  <p className="text-gray-600 text-sm mb-6">Create and manage scholarship opportunities for students</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Post scholarships
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Review applicants
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Track recipients
                    </li>
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>

            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {step === 2 && (
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              
              <button
                onClick={handleBackToTypes}
                className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Account Types
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Your {accountType} Account</h2>
              <p className="text-gray-500 text-sm mb-6">Fill in your details to get started</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Juan Dela Cruz"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">At least 8 characters</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirm ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="h-4 w-4 accent-blue-600 rounded mt-0.5 flex-shrink-0"
                  />
                  <label>
                    I agree to the{" "}
                    <button type="button" className="text-blue-600 hover:underline">Terms of Service</button>
                    {" "}and{" "}
                    <button type="button" className="text-blue-600 hover:underline">Privacy Policy</button>
                  </label>
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
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-xs text-gray-400 mt-6">
                  Already have an account?{" "}
                  <button type="button" onClick={() => navigate("/login")} className="text-blue-600 hover:underline font-medium">
                    Sign In
                  </button>
                </p>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
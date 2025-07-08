import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext2";
import { loginAdmin } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await loginAdmin({ email, password });
      localStorage.setItem("token", token);
      login(token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-emerald-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 border border-purple-400/20 -rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-amber-400/20 rotate-45"></div>
        {/* Diagonal lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M12 7v4m0 0v4m0-4h4m-4 0H8"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                JK WORKS<span className="text-blue-400">Admin</span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Design the future of architectural excellence. Access your
                administrative dashboard to manage projects and Blogs.
              </p>
            </div>
            <div className="flex justify-center space-x-4 opacity-30">
              <div className="w-3 h-12 bg-blue-400 rounded-full"></div>
              <div className="w-3 h-8 bg-purple-400 rounded-full mt-2"></div>
              <div className="w-3 h-16 bg-emerald-400 rounded-full"></div>
              <div className="w-3 h-6 bg-amber-400 rounded-full mt-3"></div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M12 7v4m0 0v4m0-4h4m-4 0H8"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Arch<span className="text-blue-400">Admin</span>
              </h1>
            </div>

            {/* Login card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-slate-400">
                  Sign in to your admin dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      placeholder="Enter user ID or email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-slate-400 text-sm">
                  Need access? Contact your{" "}
                  <a
                    href="https://www.zager.in/contactus"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    system administrator
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 text-center text-slate-500 text-sm">
              <p>© 2025 JK WORKS. Designed for excellence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

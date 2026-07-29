"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      
      // Save the token in a cookie (expires in 1 day)
      document.cookie = `admin_token=${data.access_token}; path=/; max-age=86400; SameSite=Strict`;
      
      // Redirect to the admin dashboard
      router.push("/admin");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0B1E3D] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B1E3D]">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-2">Enter your credentials to manage activities.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold text-sm sm:text-base transition-all ${
              isLoading 
                ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                : "bg-[#0B1E3D] text-white hover:bg-[#162a4d] shadow-lg"
            }`}
          >
            {isLoading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-slate-500 hover:text-[#0B1E3D] transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate auth — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    if (formData.email !== "admin@kinetiqvisuals.com" || formData.password !== "admin123") {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }
    // Redirect to admin dashboard
    window.location.href = "/admin";
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#020310] relative overflow-hidden px-5">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#0040cc]/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[350px] bg-[#0066ff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-blue-800/8 blur-[100px] rounded-full" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-logo font-normal tracking-normal leading-none text-white uppercase text-3xl md:text-4xl">
            KQ VISUALS
          </span>
          <span className="font-satoshi text-xs text-slate-500 font-light tracking-wider uppercase">
            Admin Portal
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-[#070914]/90 border border-white/5 rounded-2xl p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm flex flex-col gap-7">

          {/* Card Header */}
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading font-normal text-xl md:text-2xl text-white tracking-wide">
              Welcome back
            </h1>
            <p className="font-satoshi text-xs text-slate-500 font-light">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="font-satoshi text-xs text-slate-400 font-medium tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@kinetiqvisuals.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full bg-[#0a0d1a] border border-white/5 rounded-xl pl-11 pr-5 py-3.5 font-satoshi text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40 focus:bg-[#0d1230] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="font-satoshi text-xs text-slate-400 font-medium tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#0a0d1a] border border-white/5 rounded-xl pl-11 pr-12 py-3.5 font-satoshi text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40 focus:bg-[#0d1230] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                <span className="font-satoshi text-xs text-red-400 font-light">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0080ff] hover:bg-[#0070e6] disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-normal text-sm py-3.5 rounded-xl transition-all shadow-[0_0_24px_rgba(0,128,255,0.30)] mt-1"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/5" />
            <span className="font-satoshi text-[10px] text-slate-600 uppercase tracking-wider">Secured</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Footer note */}
          <p className="font-satoshi text-[10px] text-slate-600 text-center font-light">
            Restricted area. Authorized personnel only.
          </p>

        </div>

        {/* Back to site */}
        <a
          href="/"
          className="font-satoshi text-xs text-slate-500 hover:text-white text-center transition-colors"
        >
          ← Back to KinetiQ Visuals
        </a>

      </div>
    </main>
  );
}

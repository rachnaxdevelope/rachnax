"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEarlyAccess(true);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#fffefe", color: "#0a0a0a" }}>

      {/* ── Left panel — branding ───────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0a0a0a] p-12 relative overflow-hidden flex-shrink-0">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #7B2FE0, transparent)" }} />
        </div>

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to home
        </Link>

        {/* Main copy */}
        <div className="relative">
          <h1 className="font-display text-white leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(56px, 8vw, 88px)" }}>
            RACHNAX<span style={{ color: "#7B2FE0" }}>.</span>
          </h1>
          <p className="text-white/45 text-lg leading-relaxed max-w-xs mb-10">
            The home of India&apos;s best creative work. Where builders get recognized.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {[{ v: "10K+", l: "Creators" }, { v: "2.8K", l: "Projects" }, { v: "847", l: "Nominations" }].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl text-white">{s.v}</p>
                <p className="text-white/30 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative border-t border-white/[0.08] pt-6">
          <p className="text-white/25 text-xs leading-relaxed italic">
            &ldquo;Your work should speak louder than your resume.&rdquo;
          </p>
          <p className="text-white/15 text-xs mt-1">— Rachnax</p>
        </div>
      </div>

      {/* ── Right panel — form ──────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">

        {/* Mobile logo */}
        <div className="lg:hidden mb-10 text-center">
          <Link href="/" className="font-display text-2xl text-black">Rachnax<span style={{ color: "#7B2FE0" }}>.</span></Link>
        </div>

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-display text-4xl text-black mb-2">Welcome back.</h2>
            <p className="text-black/45 text-sm">Sign in to your Rachnax account</p>
          </div>

          {/* Early access banner */}
          {showEarlyAccess ? (
            <div className="rounded-2xl border border-[#7B2FE0]/20 bg-[#7B2FE0]/[0.05] p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#7B2FE0]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-display text-xl text-black mb-2">We&apos;re launching soon!</h3>
              <p className="text-black/50 text-sm leading-relaxed mb-5">
                Rachnax is currently in early access. Join the waitlist to be one of the first creators on the platform.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
              >
                Join the Waitlist
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                onClick={() => setShowEarlyAccess(false)}
                className="block mx-auto mt-4 text-xs text-black/30 hover:text-black/60 transition-colors"
              >
                ← Back to sign in
              </button>
            </div>
          ) : (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs text-black/50 font-medium mb-1.5 ml-0.5">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="w-full bg-white border border-black/[0.1] rounded-xl px-4 py-3.5 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/[0.06] transition-[border-color,box-shadow]"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs text-black/50 font-medium ml-0.5">Password</label>
                    <button type="button" className="text-xs text-black/40 hover:text-black/70 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="w-full bg-white border border-black/[0.1] rounded-xl px-4 py-3.5 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/[0.06] transition-[border-color,box-shadow]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl text-sm font-medium hover:bg-black/85 hover:scale-[1.01] active:scale-[0.99] transition-[transform,background-color]"
                >
                  Sign In
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-black/[0.08]" />
                <span className="text-black/30 text-xs">or</span>
                <div className="flex-1 h-px bg-black/[0.08]" />
              </div>

              {/* Google button */}
              <button
                onClick={() => setShowEarlyAccess(true)}
                className="w-full flex items-center justify-center gap-3 bg-white border border-black/[0.1] text-black py-3.5 rounded-xl text-sm font-medium hover:bg-black/[0.03] hover:border-black/20 transition-[border-color,background-color]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              {/* Sign up link */}
              <p className="text-center text-sm text-black/40 mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-black font-medium hover:text-[#7B2FE0] transition-colors">
                  Sign up free
                </Link>
              </p>

              {/* Early access note */}
              <div className="mt-8 p-4 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-start gap-3">
                <span className="text-base flex-shrink-0 mt-0.5">⚡</span>
                <div>
                  <p className="text-black/60 text-xs leading-relaxed">
                    <span className="font-medium text-black/80">Launching soon.</span>{" "}
                    Rachnax is in early access.{" "}
                    <Link href="/#contact" className="text-[#7B2FE0] hover:underline">
                      Join the waitlist →
                    </Link>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

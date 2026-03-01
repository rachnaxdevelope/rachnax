"use client";

import Link from "next/link";
import { useState } from "react";
import { addToWaitlist } from "@/lib/supabase";

const ROLES = ["Student", "Professional", "Freelancer", "Creator"];

const PERKS = [
  { icon: "⚡", title: "Early Access", desc: "Be first on the platform before public launch" },
  { icon: "🏅", title: "Founding Member Badge", desc: "Exclusive badge on your profile forever" },
  { icon: "✦", title: "Priority Features", desc: "Shape the product with direct feedback access" },
  { icon: "🤝", title: "Priority Support", desc: "Direct line to our team during onboarding" },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { error: supabaseError } = await addToWaitlist({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role || "Not specified",
      });
      if (supabaseError) {
        setError(supabaseError.message || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#fffefe", color: "#0a0a0a" }}>

      {/* ── Left panel — perks ──────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 border-r border-black/[0.07] flex-shrink-0">
        {/* Back */}
        <Link href="/" className="flex items-center gap-2 text-black/40 hover:text-black/70 transition-colors text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to home
        </Link>

        {/* Copy */}
        <div>
          <p className="text-black/35 text-xs tracking-widest uppercase font-medium mb-4">Early Access</p>
          <h2 className="font-display text-5xl text-black leading-tight mb-4">
            Join 10K+<br />creators<br /><span className="italic text-black/40">waiting to</span><br />launch.
          </h2>
          <p className="text-black/50 text-base leading-relaxed max-w-xs mb-10">
            Rachnax is launching soon. Secure your spot and get founding member benefits.
          </p>

          {/* Perks list */}
          <div className="space-y-4">
            {PERKS.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{p.icon}</span>
                <div>
                  <p className="text-sm font-medium text-black">{p.title}</p>
                  <p className="text-xs text-black/45 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar row */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["#7B2FE0", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[#fffefe]" style={{ background: c }} />
            ))}
          </div>
          <p className="text-black/40 text-xs">10,000+ creators already on the waitlist</p>
        </div>
      </div>

      {/* ── Right panel — form ──────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">

        {/* Mobile logo */}
        <div className="lg:hidden mb-10 text-center">
          <Link href="/" className="font-display text-2xl text-black">Rachnax<span style={{ color: "#7B2FE0" }}>.</span></Link>
        </div>

        <div className="w-full max-w-md">
          {submitted ? (
            /* ── Success state ── */
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-display text-3xl text-black mb-2">You&apos;re in!</h2>
              <p className="text-black/50 text-sm leading-relaxed mb-2">
                We&apos;ll reach out to <span className="text-black font-medium">{email}</span> when we launch.
              </p>
              <p className="text-black/35 text-xs mb-8">Welcome to Rachnax, {name.split(" ")[0]}. 🎉</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/explore" className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/85 transition-colors">
                  Explore Creators
                </Link>
                <Link href="/" className="inline-flex items-center justify-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-black/[0.04] transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-display text-4xl text-black mb-2">Create your account.</h2>
                <p className="text-black/45 text-sm">Join the Rachnax early access waitlist</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-xs text-black/50 font-medium mb-1.5 ml-0.5">Full name</label>
                  <input
                    type="text"
                    placeholder="Aryan Mehta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="w-full bg-white border border-black/[0.1] rounded-xl px-4 py-3.5 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/[0.06] transition-[border-color,box-shadow]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-black/50 font-medium mb-1.5 ml-0.5">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full bg-white border border-black/[0.1] rounded-xl px-4 py-3.5 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/[0.06] transition-[border-color,box-shadow]"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs text-black/50 font-medium mb-2 ml-0.5">I am a...</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-2.5 px-4 rounded-xl text-sm border transition-[border-color,background-color,color] duration-200 ${
                          role === r
                            ? "bg-black text-white border-black font-medium"
                            : "bg-white text-black/50 border-black/10 hover:border-black/25 hover:text-black/75"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {error && <p className="text-red-500 text-xs px-1">{error}</p>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl text-sm font-medium hover:bg-black/85 hover:scale-[1.01] active:scale-[0.99] transition-[transform,background-color] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <>
                      Join the Waitlist
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-black/30">No spam, ever. Unsubscribe any time.</p>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-black/[0.08]" />
                <span className="text-black/30 text-xs">or</span>
                <div className="flex-1 h-px bg-black/[0.08]" />
              </div>

              {/* Google */}
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-black/[0.1] text-black py-3.5 rounded-xl text-sm font-medium hover:bg-black/[0.03] hover:border-black/20 transition-[border-color,background-color]">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              {/* Sign in link */}
              <p className="text-center text-sm text-black/40 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-black font-medium hover:text-[#7B2FE0] transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

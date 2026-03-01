"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// ─── ANIMATION UTILITIES ────────────────────────────────────────────────────

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function fs(inView: boolean, delay = 0, dir: "up" | "left" | "right" | "none" = "up"): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)"
      : dir === "left" ? "translate3d(-20px,0,0)"
      : dir === "right" ? "translate3d(20px,0,0)"
      : "translate3d(0,20px,0)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: "opacity, transform",
  };
}

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Project = {
  id: number; title: string;
  creator: { name: string; initials: string; role: string };
  category: string; score: number;
  breakdown: { design: number; usability: number; creativity: number; content: number };
  gradient: string; accentColor: string; views: string; likes: number; tags: string[]; time: string;
};

type CreatorProfile = {
  initials: string; name: string; role: string; score: number; projects: number;
  gradient: string; accentColor: string; topProject: string; category: string;
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Design", "Development", "Motion", "Illustration", "Branding", "3D Art"];

const COTD: Project = {
  id: 1, title: "Nebula Finance Dashboard",
  creator: { name: "Aryan Mehta", initials: "AM", role: "Product Designer" },
  category: "Design", score: 9.8,
  breakdown: { design: 4.9, usability: 4.8, creativity: 5.0, content: 4.7 },
  gradient: "135deg, #3b0764 0%, #7B2FE0 55%, #1e1b4b 100%",
  accentColor: "#a78bfa", views: "24.1K", likes: 1847,
  tags: ["Dashboard", "FinTech", "Dark UI"], time: "2 hours ago",
};

const NOMINEES: Project[] = [
  {
    id: 2, title: "Rhythm — Music Visualizer",
    creator: { name: "Rohit Kumar", initials: "RK", role: "Motion Designer" },
    category: "Motion", score: 9.4,
    breakdown: { design: 4.8, usability: 4.6, creativity: 4.9, content: 4.5 },
    gradient: "135deg, #831843 0%, #e11d48 55%, #7c1d6f 100%",
    accentColor: "#fb7185", views: "18.6K", likes: 1243,
    tags: ["Motion", "Music", "WebGL"], time: "5h ago",
  },
  {
    id: 3, title: "Horizon — 3D Portfolio World",
    creator: { name: "Karan Nair", initials: "KN", role: "3D Artist" },
    category: "3D Art", score: 9.6,
    breakdown: { design: 4.9, usability: 4.7, creativity: 5.0, content: 4.8 },
    gradient: "135deg, #0c4a6e 0%, #0284c7 55%, #164e63 100%",
    accentColor: "#38bdf8", views: "31.2K", likes: 2891,
    tags: ["Three.js", "3D", "WebGL"], time: "8h ago",
  },
  {
    id: 4, title: "Bloom — Wellness App",
    creator: { name: "Meera Joshi", initials: "MJ", role: "UI/UX Designer" },
    category: "Design", score: 8.7,
    breakdown: { design: 4.6, usability: 4.5, creativity: 4.3, content: 4.4 },
    gradient: "135deg, #064e3b 0%, #059669 55%, #065f46 100%",
    accentColor: "#34d399", views: "12.4K", likes: 876,
    tags: ["Health", "Mobile", "Calm UI"], time: "1h ago",
  },
  {
    id: 5, title: "Prism Design System",
    creator: { name: "Sneha Gupta", initials: "SG", role: "Brand Designer" },
    category: "Branding", score: 9.1,
    breakdown: { design: 4.8, usability: 4.7, creativity: 4.7, content: 4.6 },
    gradient: "135deg, #78350f 0%, #d97706 55%, #92400e 100%",
    accentColor: "#fbbf24", views: "9.8K", likes: 654,
    tags: ["Design System", "Figma"], time: "3h ago",
  },
  {
    id: 6, title: "Nexus — Dev Portfolio",
    creator: { name: "Vikram Shah", initials: "VS", role: "Full Stack Dev" },
    category: "Development", score: 8.9,
    breakdown: { design: 4.5, usability: 4.8, creativity: 4.4, content: 4.6 },
    gradient: "135deg, #172554 0%, #2563eb 55%, #1e3a8a 100%",
    accentColor: "#60a5fa", views: "15.7K", likes: 1102,
    tags: ["Portfolio", "Next.js", "GSAP"], time: "6h ago",
  },
  {
    id: 7, title: "Aurora — Illustration Pack",
    creator: { name: "Priya Singh", initials: "PS", role: "Illustrator" },
    category: "Illustration", score: 9.3,
    breakdown: { design: 4.9, usability: 4.6, creativity: 4.9, content: 4.7 },
    gradient: "135deg, #500724 0%, #db2777 55%, #701a75 100%",
    accentColor: "#f472b6", views: "22.1K", likes: 1987,
    tags: ["Illustration", "Art"], time: "9h ago",
  },
  {
    id: 8, title: "Terra — Travel App",
    creator: { name: "Aarav Patel", initials: "AP", role: "Product Designer" },
    category: "Design", score: 8.8,
    breakdown: { design: 4.6, usability: 4.5, creativity: 4.5, content: 4.4 },
    gradient: "135deg, #052e16 0%, #16a34a 55%, #14532d 100%",
    accentColor: "#4ade80", views: "8.3K", likes: 543,
    tags: ["Travel", "App Design"], time: "12h ago",
  },
];

const CREATOR_PROFILES: CreatorProfile[] = [
  { initials: "AM", name: "Aryan Mehta", role: "Product Designer", score: 9.8, projects: 12, gradient: "135deg, #3b0764, #7B2FE0", accentColor: "#a78bfa", topProject: "Nebula Finance Dashboard", category: "Design" },
  { initials: "KN", name: "Karan Nair", role: "3D Artist & Dev", score: 9.6, projects: 8, gradient: "135deg, #0c4a6e, #0284c7", accentColor: "#38bdf8", topProject: "Horizon 3D Portfolio", category: "3D Art" },
  { initials: "RK", name: "Rohit Kumar", role: "Motion Designer", score: 9.4, projects: 6, gradient: "135deg, #831843, #e11d48", accentColor: "#fb7185", topProject: "Rhythm Visualizer", category: "Motion" },
  { initials: "PS", name: "Priya Singh", role: "Illustrator", score: 9.3, projects: 15, gradient: "135deg, #500724, #db2777", accentColor: "#f472b6", topProject: "Aurora Illustration Pack", category: "Illustration" },
  { initials: "SG", name: "Sneha Gupta", role: "Brand Designer", score: 9.1, projects: 9, gradient: "135deg, #78350f, #d97706", accentColor: "#fbbf24", topProject: "Prism Design System", category: "Branding" },
  { initials: "VS", name: "Vikram Shah", role: "Full Stack Dev", score: 8.9, projects: 11, gradient: "135deg, #172554, #2563eb", accentColor: "#60a5fa", topProject: "Nexus Dev Portfolio", category: "Development" },
];

const RISING_CREATORS: CreatorProfile[] = [
  { initials: "NR", name: "Nisha Reddy", role: "Interaction Designer", score: 8.4, projects: 3, gradient: "135deg, #0f172a 0%, #1e293b 50%, #334155 100%", accentColor: "#94a3b8", topProject: "Void — Dark OS Concept", category: "Design" },
  { initials: "DS", name: "Dev Sharma", role: "Frontend Developer", score: 8.6, projects: 4, gradient: "135deg, #2d1b69 0%, #5b21b6 55%, #3730a3 100%", accentColor: "#a78bfa", topProject: "Wavelength Audio App", category: "Development" },
  { initials: "RK", name: "Ria Kulkarni", role: "Brand Designer", score: 8.5, projects: 5, gradient: "135deg, #1a3a1a 0%, #4d7c0f 55%, #3f6212 100%", accentColor: "#86efac", topProject: "Gaia Brand Identity", category: "Branding" },
  { initials: "AP", name: "Anay Pillai", role: "Motion Artist", score: 8.3, projects: 2, gradient: "135deg, #431407 0%, #9a3412 55%, #7c2d12 100%", accentColor: "#fdba74", topProject: "Parallax Shorts", category: "Motion" },
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

function getScoreStyle(score: number) {
  if (score >= 9.5) return { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", label: "Exceptional" };
  if (score >= 9.0) return { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", label: "Excellent" };
  if (score >= 8.5) return { color: "#d97706", bg: "#fffbeb", border: "#fde68a", label: "Great" };
  return { color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", label: "Good" };
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function ProjectPreview({ gradient, accentColor, height = "h-44" }: { gradient: string; accentColor: string; height?: string }) {
  return (
    <div className={`relative overflow-hidden w-full ${height}`} style={{ background: `linear-gradient(${gradient})` }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 25% 30%, ${accentColor}35 0%, transparent 65%)` }} />
      <div className="absolute inset-3 bg-black/20 rounded-xl border border-white/[0.07] p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 rounded-full" style={{ background: `${accentColor}80` }} />
          <div className="h-1.5 w-10 rounded-full bg-white/15" />
          <div className="ml-auto h-3.5 w-3.5 rounded bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(3)].map((_, i) => <div key={i} className="h-7 rounded-lg bg-white/[0.07] border border-white/[0.05]" />)}
        </div>
        <div className="flex-1 space-y-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: `${accentColor}40` }} />
              <div className="h-1.5 rounded-full bg-white/10" style={{ width: `${50 + i * 17}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const s = getScoreStyle(score);
  const cls = { sm: "px-2 py-0.5 text-xs rounded-lg", md: "px-2.5 py-1 text-sm rounded-xl", lg: "px-3.5 py-2 text-lg rounded-xl" };
  return (
    <span className={`font-display font-medium inline-block ${cls[size]}`} style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
      {score.toFixed(1)}
    </span>
  );
}

function ViewMore({ href, label = "View all" }: { href: string; label?: string }) {
  return (
    <Link href={href} className="link-underline group inline-flex items-center gap-1.5 text-sm text-black/55 hover:text-black transition-colors duration-200 font-medium">
      {label}
      <svg className="group-hover:translate-x-0.5 transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function ExploreNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#fffefe]/95 backdrop-blur-xl border-b border-black/[0.07] shadow-[0_1px_16px_rgba(0,0,0,0.04)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link href="/" className="flex items-center gap-1.5 text-black/40 hover:text-black/70 transition-colors text-sm group">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <span className="text-black/10">|</span>
          <Link href="/" className="font-display text-black text-lg tracking-tight">Rachnax</Link>
          <span className="hidden md:inline text-black/35 text-xs bg-black/[0.05] border border-black/[0.07] px-2.5 py-0.5 rounded-full tracking-wide">Explore</span>
        </div>

        {/* Center nav links */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {[{ label: "Nominees", href: "#nominees" }, { label: "Spotlight", href: "#spotlight" }, { label: "Rising", href: "#rising" }].map((l) => (
            <a key={l.label} href={l.href} className="px-4 py-2 text-sm text-black/45 hover:text-black/80 rounded-xl hover:bg-black/[0.04] transition-all duration-150">
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — Login + Signup + Submit */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/login" className="hidden sm:block px-4 py-2 text-sm text-black/50 hover:text-black rounded-xl hover:bg-black/[0.04] transition-all">
            Login
          </Link>
          <Link href="/signup" className="hidden sm:flex items-center gap-1.5 border border-black/15 text-black px-4 py-2 rounded-full text-sm font-medium hover:border-black/35 hover:bg-black/[0.03] transition-all">
            Sign Up
          </Link>
          <Link href="/#contact" className="flex items-center gap-1.5 bg-black text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Submit Work
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function PageHero() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="pt-32 pb-12 px-6 border-b border-black/[0.07]">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Top metadata bar */}
        <div style={fs(inView, 0)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-black/50 text-xs tracking-widest uppercase font-medium">Live Showcase · March 2026</span>
          </div>
          <div className="hidden sm:flex items-center divide-x divide-black/[0.08]">
            {[{ label: "Projects", value: "2,847" }, { label: "Creators", value: "10.4K" }, { label: "Nominations", value: "847" }].map((s, i) => (
              <div key={i} className="px-6 first:pl-0 last:pr-0 text-right">
                <p className="font-display text-2xl text-black leading-none">{s.value}</p>
                <p className="text-black/40 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Giant headline */}
        <div style={fs(inView, 60)}>
          <h1 className="font-display text-black leading-[0.88] tracking-tight mb-7" style={{ fontSize: "clamp(64px, 13vw, 180px)" }}>
            DISCOVER<span style={{ color: "#7B2FE0" }}>.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-black/60 text-lg md:text-xl max-w-lg leading-relaxed">
              The finest creative work from India&apos;s best builders and designers — voted by the community, recognised by the world.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="#nominees" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 hover:scale-[1.02] transition-all">
                See Nominees
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <Link href="/#contact" className="inline-flex items-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-black/5 hover:border-black/30 transition-all">
                Submit Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORY TABS ───────────────────────────────────────────────────────────

function CategoryTabs({ active, setActive }: { active: string; setActive: (c: string) => void }) {
  return (
    <div className="sticky top-16 z-40 bg-[#fffefe]/95 backdrop-blur-xl border-b border-black/[0.07] px-6 py-3">
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${active === c ? "bg-black text-white font-medium" : "text-black/45 hover:text-black/75 hover:bg-black/[0.05]"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── COTD — Creator of the Day  ───────────────────────────────────────────────
// Inspired by Google Labs featured card + AWWWARDS SOTD + vibiz.ai

function COTDSection() {
  const [ref, inView] = useInView(0.05);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(1847);
  const p = COTD;
  const s = getScoreStyle(p.score);

  const handleVote = () => {
    if (!voted) { setVoted(true); setVotes((v) => v + 1); }
  };

  return (
    <section className="px-6 py-14">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Label row */}
        <div style={fs(inView, 0)} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full">
              <span className="text-amber-500">✦</span>
              <span className="text-amber-600 text-xs font-medium tracking-wide uppercase">Creator of the Day</span>
            </div>
            <span className="text-black/40 text-xs">{p.time}</span>
          </div>
          <span className="text-black/30 text-xs hidden md:block">Updated daily by community votes</span>
        </div>

        {/* Main dark card */}
        <div style={fs(inView, 60)} className="rounded-3xl overflow-hidden bg-[#0c0c0f] grid grid-cols-1 lg:grid-cols-5">

          {/* LEFT — large visual preview (3 cols) */}
          <div className="lg:col-span-3 p-8 pb-0 lg:pb-8">
            <div
              className="relative w-full rounded-2xl overflow-hidden group cursor-pointer"
              style={{ height: "clamp(240px, 36vw, 420px)", background: `linear-gradient(${p.gradient})` }}
            >
              {/* Animated glow */}
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-60"
                style={{ background: `radial-gradient(circle at 40% 35%, ${p.accentColor}45 0%, transparent 60%)` }}
              />
              {/* Dashboard UI mock */}
              <div className="absolute inset-5 bg-black/30 rounded-xl border border-white/[0.08] p-5 flex flex-col gap-3 backdrop-blur-[1px]">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-20 rounded-full transition-all duration-500" style={{ background: `${p.accentColor}90` }} />
                  <div className="h-2 w-12 rounded-full bg-white/15" />
                  <div className="ml-auto flex gap-2">
                    {["#ffffff30", `${p.accentColor}80`, "#ffffff20"].map((c, i) => (
                      <div key={i} className="h-6 w-12 rounded-lg" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-1">
                  <div className="col-span-2 bg-white/[0.06] rounded-xl border border-white/[0.06] p-3 flex flex-col gap-2">
                    <div className="h-1.5 w-16 rounded-full" style={{ background: `${p.accentColor}60` }} />
                    <div className="flex-1 grid grid-cols-8 gap-1 items-end pt-2">
                      {[40, 65, 55, 80, 50, 75, 90, 60].map((h, i) => (
                        <div key={i} className="rounded-t transition-all duration-700" style={{
                          height: inView ? `${h}%` : "8%",
                          transitionDelay: `${300 + i * 60}ms`,
                          background: i === 6 ? p.accentColor : `${p.accentColor}35`
                        }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[{ v: "9.8", l: "Score" }, { v: "18K", l: "Views" }, { v: "7", l: "Offers" }].map((d, i) => (
                      <div key={i} className="flex-1 bg-white/[0.06] rounded-xl border border-white/[0.06] flex items-center justify-center">
                        <div className="text-center">
                          <p className="font-display text-lg text-white/70">{d.v}</p>
                          <p className="text-white/25 text-[10px]">{d.l}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium">
                  Preview Project ↗
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — info panel (2 cols) */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between">
            <div>
              {/* Category + Score */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-white/35 text-xs uppercase tracking-widest">{p.category}</span>
                <div className="font-display text-3xl px-4 py-2 rounded-xl" style={{ color: s.color, background: `${s.color}12`, border: `1px solid ${s.color}28` }}>
                  {p.score.toFixed(1)}
                  <span className="text-sm opacity-50 ml-1">/10</span>
                </div>
              </div>

              {/* Title + creator */}
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-3">{p.title}</h2>
              <div className="flex items-center gap-2.5 mb-7">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${p.accentColor}cc, ${p.accentColor}50)` }}>
                  {p.creator.initials[0]}
                </div>
                <span className="text-white/55 text-sm">{p.creator.name}</span>
                <span className="text-white/20">·</span>
                <span className="text-white/35 text-sm">{p.creator.role}</span>
              </div>

              {/* Animated score breakdown (animates on inView) */}
              <div className="space-y-3.5 mb-7">
                {Object.entries(p.breakdown).map(([key, val], i) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-white/30 text-xs w-16 capitalize">{key}</span>
                    <div className="flex-1 h-1 rounded-full bg-white/[0.08]">
                      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{
                        width: inView ? `${(val / 5) * 100}%` : "0%",
                        background: p.accentColor,
                        transitionDelay: `${400 + i * 100}ms`
                      }} />
                    </div>
                    <span className="text-white/40 text-xs w-4 text-right">{val}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs text-white/30 bg-white/[0.06] border border-white/[0.08] px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {/* Vote button */}
              <button
                onClick={handleVote}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  voted
                    ? "bg-green-500/15 border border-green-500/30 text-green-400 cursor-default"
                    : "bg-white/[0.07] border border-white/[0.12] text-white/60 hover:bg-white/[0.13] hover:text-white hover:border-white/25 hover:scale-[1.02]"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill={voted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                {voted ? "Voted" : "Vote"} · {votes.toLocaleString()}
              </button>

              <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 hover:scale-[1.02] transition-all">
                View Project
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NOMINEES — 3 cards, 1 row, AWWWARDS hover overlay ───────────────────────

function NomineesSection({ category }: { category: string }) {
  const [ref, inView] = useInView(0.05);

  const filtered = category === "All" ? NOMINEES : NOMINEES.filter((p) => p.category === category);
  const shown = (filtered.length >= 3 ? filtered : NOMINEES).slice(0, 3);

  return (
    <section id="nominees" className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Editorial heading */}
        <div className="border-t border-black/[0.07] pt-14">
          <div style={fs(inView, 0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-black leading-none tracking-tight" style={{ fontSize: "clamp(52px, 9vw, 128px)" }}>
                NOMINEES<span style={{ color: "#7B2FE0" }}>.</span>
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-black/55 text-sm">Vote ends in 18h 42m · {shown.length} nominations displayed</span>
              </div>
            </div>
            <ViewMore href="#" label="View all nominees" />
          </div>
        </div>

        {/* 3 cards in 1 row — AWWWARDS style interactive cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shown.map((p, i) => {
            const scoreStyle = getScoreStyle(p.score);
            return (
              <div key={p.id} style={fs(inView, 60 + i * 80, "up")}>
                <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden cursor-pointer group transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:-translate-y-1.5 hover:border-black/[0.12]">

                  {/* Image — zooms on hover, overlay appears */}
                  <div className="relative overflow-hidden" style={{ height: "clamp(200px, 22vw, 300px)" }}>
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                      <ProjectPreview gradient={p.gradient} accentColor={p.accentColor} height="h-full" />
                    </div>

                    {/* Dark hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-400 flex flex-col items-center justify-center gap-4">
                      {/* Score breakdown card — reveals on hover */}
                      <div className="opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-400 delay-75 bg-white rounded-2xl p-4 w-52">
                        <p className="text-black/40 text-xs uppercase tracking-widest mb-3 font-medium">Score Breakdown</p>
                        {Object.entries(p.breakdown).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between py-1 border-b border-black/[0.06] last:border-0">
                            <span className="text-black/55 text-xs capitalize">{key}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-1 rounded-full bg-black/[0.07]">
                                <div className="h-full rounded-full" style={{ width: `${(val / 5) * 100}%`, background: p.accentColor }} />
                              </div>
                              <span className="font-display text-sm text-black">{val}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* View button */}
                      <button className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 delay-100 flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:scale-[1.03] transition-transform">
                        View Project
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10" /></svg>
                      </button>
                    </div>

                    {/* Score badge — always visible */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="font-display text-sm px-2.5 py-1 rounded-xl shadow-md" style={{ color: scoreStyle.color, background: "rgba(255,255,255,0.96)", border: `1px solid ${scoreStyle.border}` }}>
                        {p.score.toFixed(1)}
                      </span>
                    </div>

                    {/* Nominee tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-white/80 text-[10px] tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">Nominee</span>
                    </div>

                    {/* Time */}
                    <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white/60 text-xs">{p.time}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-display text-xl text-black mb-1.5 group-hover:text-[#7B2FE0] transition-colors duration-300">{p.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${p.accentColor}cc, ${p.accentColor}60)` }}>
                        {p.creator.initials[0]}
                      </div>
                      <span className="text-black/55 text-sm">{p.creator.name}</span>
                      <span className="text-black/20">·</span>
                      <span className="text-black/40 text-sm">{p.creator.role}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[10px] text-black/40 bg-black/[0.04] border border-black/[0.06] px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                      <span className="text-black/35 text-xs">{p.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SPOTLIGHT — Premium creator rows (formerly W.CREATORS) ──────────────────

function SpotlightSection() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="spotlight" className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="border-t border-black/[0.07] pt-14">
          <div style={fs(inView, 0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-black/40 text-xs uppercase tracking-widest font-medium mb-3">Top Ranked</p>
              <h2 className="font-display text-black leading-none tracking-tight" style={{ fontSize: "clamp(52px, 9vw, 128px)" }}>
                SPOTLIGHT<span style={{ color: "#7B2FE0" }}>.</span>
              </h2>
              <p className="text-black/55 text-base mt-4 max-w-sm">
                The most accomplished creators on Rachnax, ranked by community votes and project quality.
              </p>
            </div>
            <ViewMore href="#" label="View all creators" />
          </div>
        </div>

        {/* Premium horizontal creator rows */}
        <div className="space-y-3">
          {CREATOR_PROFILES.map((c, i) => {
            const scoreStyle = getScoreStyle(c.score);
            return (
              <div key={i} style={fs(inView, 60 + i * 60, "up")}>
                <div
                  className="group flex items-center gap-5 p-5 bg-white rounded-2xl border border-black/[0.07] hover:border-black/[0.14] hover:shadow-xl cursor-pointer transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
                >
                  {/* Rank */}
                  <span className="font-display text-4xl text-black/[0.07] w-11 flex-shrink-0 select-none group-hover:text-black/[0.12] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Accent bar */}
                  <div className="w-0.5 h-14 rounded-full flex-shrink-0 transition-all duration-300 group-hover:h-16" style={{ background: c.accentColor }} />

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ring-0 group-hover:ring-2 ring-offset-2 transition-all duration-300" style={{ background: `linear-gradient(135deg, ${c.accentColor}cc, ${c.accentColor}50)` }}>
                    {c.initials.slice(0, 2)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-black group-hover:text-[#7B2FE0] transition-colors duration-250">{c.name}</h3>
                    <p className="text-black/45 text-sm">{c.role} <span className="text-black/25">·</span> {c.projects} projects</p>
                  </div>

                  {/* Top project */}
                  <div className="hidden lg:block text-right min-w-[160px]">
                    <p className="text-black/30 text-[10px] uppercase tracking-widest mb-0.5">Top Project</p>
                    <p className="text-black/60 text-sm truncate">{c.topProject}</p>
                  </div>

                  {/* Category badge */}
                  <span className="hidden md:inline text-xs text-black/35 bg-black/[0.04] border border-black/[0.06] px-3 py-1.5 rounded-full flex-shrink-0">{c.category}</span>

                  {/* Score */}
                  <ScoreBadge score={c.score} size="md" />

                  {/* Preview strip — slides in on hover */}
                  <div className="w-0 group-hover:w-20 h-12 rounded-xl overflow-hidden transition-all duration-400 ease-out flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.accentColor}80, ${c.accentColor}30)` }} />

                  {/* Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-black/40">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>

                  {/* Subtle accent glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(90deg, transparent 60%, ${c.accentColor}08 100%)` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── RISING — Dark dramatic section, bento grid ───────────────────────────────

function RisingSection() {
  const [ref, inView] = useInView(0.06);

  return (
    <section id="rising" className="bg-[#0c0c0f] py-20 px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Heading */}
        <div style={fs(inView, 0)} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest font-medium mb-3">New Talent · {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
            <h2 className="font-display text-white leading-none tracking-tight" style={{ fontSize: "clamp(52px, 9vw, 128px)" }}>
              RISING<span style={{ color: "#7B2FE0" }}>.</span>
            </h2>
          </div>
          <p style={fs(inView, 80)} className="text-white/35 text-base max-w-xs leading-relaxed hidden md:block mb-2">
            Fresh talent breaking through. Raw skill, real potential.
          </p>
        </div>

        {/* Bento grid — inspired by Google Labs */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4" style={{ gridAutoRows: "minmax(180px, 1fr)" }}>
          {RISING_CREATORS.map((c, i) => {
            const scoreStyle = getScoreStyle(c.score);
            const isFeatured = i === 0;
            return (
              <div
                key={i}
                style={{ ...fs(inView, 80 + i * 70, "up"), ...(isFeatured ? { gridColumn: "span 2", gridRow: "span 2" } : {}) }}
              >
                <div
                  className={`relative overflow-hidden cursor-pointer group rounded-2xl p-7 flex flex-col justify-between transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.01] h-full`}
                  style={{ background: `linear-gradient(${c.gradient})` }}
                >
                  {/* Radial accent glow */}
                  <div className="absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity duration-400" style={{ background: `radial-gradient(circle at 25% 25%, ${c.accentColor}35 0%, transparent 60%)` }} />

                  {/* Big ghost rank number */}
                  <span className="absolute bottom-4 right-5 font-display select-none pointer-events-none transition-all duration-500 group-hover:opacity-20" style={{ fontSize: isFeatured ? "120px" : "72px", lineHeight: 1, color: "rgba(255,255,255,0.05)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top row */}
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] px-3 py-1.5 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/60 text-[10px] uppercase tracking-widest font-medium">New</span>
                    </div>
                    <span className="font-display text-base px-3 py-1 rounded-xl" style={{ color: scoreStyle.color, background: "rgba(0,0,0,0.35)", border: `1px solid ${scoreStyle.border}40` }}>
                      {c.score.toFixed(1)}
                    </span>
                  </div>

                  {/* Creator info */}
                  <div className="relative">
                    <div className="mb-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-sm font-bold text-white mb-3" style={{ background: `${c.accentColor}40` }}>
                        {c.initials.slice(0, 2)}
                      </div>
                      <h3 className={`font-display text-white leading-tight ${isFeatured ? "text-3xl md:text-4xl" : "text-xl"}`}>{c.name}</h3>
                      <p className="text-white/50 text-sm mt-1">{c.role}</p>
                    </div>
                    <p className={`text-white/35 leading-snug ${isFeatured ? "text-sm" : "text-xs"}`}>{c.topProject}</p>

                    {/* Bottom row */}
                    <div className="mt-5 pt-4 border-t border-white/[0.1] flex items-center justify-between">
                      <span className="text-white/30 text-xs">{c.projects} project{c.projects !== 1 ? "s" : ""}</span>
                      <span className="text-white/25 text-xs bg-white/[0.07] border border-white/[0.08] px-2.5 py-0.5 rounded-full">{c.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More link */}
        <div style={fs(inView, 400)} className="mt-8 text-center">
          <Link href="#" className="link-underline group inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors duration-200 font-medium">
            Discover more rising creators
            <svg className="group-hover:translate-x-0.5 transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── SUBMIT CTA — AWWWARDS two-card bottom ───────────────────────────────────

function SubmitCTA() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="px-6 py-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="border-t border-black/[0.07] pt-14 mb-10">
          <div style={fs(inView, 0)}>
            <h2 className="font-display text-black leading-none tracking-tight" style={{ fontSize: "clamp(44px, 7vw, 108px)" }}>
              YOUR TURN<span style={{ color: "#7B2FE0" }}>.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Dark — Submit */}
          <div style={fs(inView, 80, "left")}>
            <div className="bg-[#0c0c0f] rounded-3xl p-10 flex flex-col justify-between min-h-[300px] group cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div>
                <div className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center mb-8">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </div>
                <h3 className="font-display text-3xl text-white mb-3">Submit your work<br />for recognition.</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">Every project you&apos;ve built deserves to be seen. Upload your work and get voted on by the community.</p>
              </div>
              <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-white/90 w-fit hover:scale-[1.02] transition-all">
                Submit Your Work
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>

          {/* Purple — Early Access */}
          <div style={fs(inView, 160, "right")}>
            <div className="rounded-3xl p-10 flex flex-col justify-between min-h-[300px] group cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7B2FE0 0%, #5B21B6 50%, #3730A3 100%)" }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-8">
                  <span className="text-white text-lg leading-none">✦</span>
                </div>
                <h3 className="font-display text-3xl text-white mb-3">Get early access<br />to all features.</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">Join the Rachnax waitlist and be among the first 10,000 creators on the platform at launch.</p>
              </div>
              <Link href="/#contact" className="relative mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-white/90 w-fit hover:scale-[1.02] transition-all">
                Join the Waitlist
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function ExploreFooter() {
  return (
    <footer className="border-t border-black/[0.07] px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-display text-black/40 hover:text-black/70 transition-colors">Rachnax</Link>
        <p className="text-black/25 text-xs text-center">© {new Date().getFullYear()} Rachnax · Discover the world&apos;s best creative work</p>
        <Link href="/#contact" className="link-underline text-black/35 hover:text-black/65 text-sm transition-colors">
          Join Waitlist →
        </Link>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [category, setCategory] = useState("All");
  return (
    <div className="min-h-screen" style={{ background: "#fffefe", color: "#0a0a0a" }}>
      <ExploreNav />
      <PageHero />
      <CategoryTabs active={category} setActive={setCategory} />
      <COTDSection />
      <NomineesSection category={category} />
      <SpotlightSection />
      <RisingSection />
      <SubmitCTA />
      <ExploreFooter />
    </div>
  );
}

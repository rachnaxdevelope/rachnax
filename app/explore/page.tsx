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
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function fs(
  inView: boolean,
  delay = 0,
  dir: "up" | "left" | "right" | "none" = "up"
): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translate3d(0,0,0)"
      : dir === "left"
      ? "translate3d(-32px,0,0)"
      : dir === "right"
      ? "translate3d(32px,0,0)"
      : "translate3d(0,28px,0)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: "opacity, transform",
  };
}

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Project = {
  id: number;
  title: string;
  creator: { name: string; initials: string; role: string };
  category: string;
  score: number;
  breakdown: { design: number; usability: number; creativity: number; content: number };
  gradient: string;
  accentColor: string;
  views: string;
  likes: number;
  tags: string[];
  time: string;
};

type CreatorProfile = {
  initials: string;
  name: string;
  role: string;
  score: number;
  projects: number;
  gradient: string;
  accentColor: string;
  topProject: string;
  category: string;
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Design", "Development", "Motion", "Illustration", "Branding", "3D Art"];

const COTD: Project = {
  id: 1,
  title: "Nebula Finance Dashboard",
  creator: { name: "Aryan Mehta", initials: "AM", role: "Product Designer" },
  category: "Design",
  score: 9.8,
  breakdown: { design: 4.9, usability: 4.8, creativity: 5.0, content: 4.7 },
  gradient: "135deg, #3b0764 0%, #7B2FE0 55%, #1e1b4b 100%",
  accentColor: "#a78bfa",
  views: "24.1K",
  likes: 1847,
  tags: ["Dashboard", "FinTech", "Dark UI"],
  time: "2 hours ago",
};

const NOMINEES: Project[] = [
  {
    id: 2,
    title: "Rhythm — Music Visualizer",
    creator: { name: "Rohit Kumar", initials: "RK", role: "Motion Designer" },
    category: "Motion",
    score: 9.4,
    breakdown: { design: 4.8, usability: 4.6, creativity: 4.9, content: 4.5 },
    gradient: "135deg, #831843 0%, #e11d48 55%, #7c1d6f 100%",
    accentColor: "#fb7185",
    views: "18.6K",
    likes: 1243,
    tags: ["Motion", "Music", "WebGL"],
    time: "5h ago",
  },
  {
    id: 3,
    title: "Horizon — 3D Portfolio",
    creator: { name: "Karan Nair", initials: "KN", role: "3D Artist" },
    category: "3D Art",
    score: 9.6,
    breakdown: { design: 4.9, usability: 4.7, creativity: 5.0, content: 4.8 },
    gradient: "135deg, #0c4a6e 0%, #0284c7 55%, #164e63 100%",
    accentColor: "#38bdf8",
    views: "31.2K",
    likes: 2891,
    tags: ["Three.js", "3D", "WebGL"],
    time: "8h ago",
  },
  {
    id: 4,
    title: "Bloom — Wellness App",
    creator: { name: "Meera Joshi", initials: "MJ", role: "UI/UX Designer" },
    category: "Design",
    score: 8.7,
    breakdown: { design: 4.6, usability: 4.5, creativity: 4.3, content: 4.4 },
    gradient: "135deg, #064e3b 0%, #059669 55%, #065f46 100%",
    accentColor: "#34d399",
    views: "12.4K",
    likes: 876,
    tags: ["Health", "Mobile", "Calm UI"],
    time: "1h ago",
  },
  {
    id: 5,
    title: "Prism Design System",
    creator: { name: "Sneha Gupta", initials: "SG", role: "Brand Designer" },
    category: "Branding",
    score: 9.1,
    breakdown: { design: 4.8, usability: 4.7, creativity: 4.7, content: 4.6 },
    gradient: "135deg, #78350f 0%, #d97706 55%, #92400e 100%",
    accentColor: "#fbbf24",
    views: "9.8K",
    likes: 654,
    tags: ["Design System", "Figma"],
    time: "3h ago",
  },
  {
    id: 6,
    title: "Nexus — Dev Portfolio",
    creator: { name: "Vikram Shah", initials: "VS", role: "Full Stack Dev" },
    category: "Development",
    score: 8.9,
    breakdown: { design: 4.5, usability: 4.8, creativity: 4.4, content: 4.6 },
    gradient: "135deg, #172554 0%, #2563eb 55%, #1e3a8a 100%",
    accentColor: "#60a5fa",
    views: "15.7K",
    likes: 1102,
    tags: ["Portfolio", "Next.js", "GSAP"],
    time: "6h ago",
  },
  {
    id: 7,
    title: "Aurora — Illustration Pack",
    creator: { name: "Priya Singh", initials: "PS", role: "Illustrator" },
    category: "Illustration",
    score: 9.3,
    breakdown: { design: 4.9, usability: 4.6, creativity: 4.9, content: 4.7 },
    gradient: "135deg, #500724 0%, #db2777 55%, #701a75 100%",
    accentColor: "#f472b6",
    views: "22.1K",
    likes: 1987,
    tags: ["Illustration", "Art", "Characters"],
    time: "9h ago",
  },
  {
    id: 8,
    title: "Terra — Travel Experience",
    creator: { name: "Aarav Patel", initials: "AP", role: "Product Designer" },
    category: "Design",
    score: 8.8,
    breakdown: { design: 4.6, usability: 4.5, creativity: 4.5, content: 4.4 },
    gradient: "135deg, #052e16 0%, #16a34a 55%, #14532d 100%",
    accentColor: "#4ade80",
    views: "8.3K",
    likes: 543,
    tags: ["Travel", "App Design"],
    time: "12h ago",
  },
];

const CREATOR_PROFILES: CreatorProfile[] = [
  { initials: "AM", name: "Aryan Mehta", role: "Product Designer", score: 9.8, projects: 12, gradient: "135deg, #3b0764, #7B2FE0", accentColor: "#a78bfa", topProject: "Nebula Finance", category: "Design" },
  { initials: "KN", name: "Karan Nair", role: "3D Artist & Dev", score: 9.6, projects: 8, gradient: "135deg, #0c4a6e, #0284c7", accentColor: "#38bdf8", topProject: "Horizon 3D World", category: "3D Art" },
  { initials: "RK", name: "Rohit Kumar", role: "Motion Designer", score: 9.4, projects: 6, gradient: "135deg, #831843, #e11d48", accentColor: "#fb7185", topProject: "Rhythm Visualizer", category: "Motion" },
  { initials: "PS", name: "Priya Singh", role: "Illustrator", score: 9.3, projects: 15, gradient: "135deg, #500724, #db2777", accentColor: "#f472b6", topProject: "Aurora Pack", category: "Illustration" },
  { initials: "SG", name: "Sneha Gupta", role: "Brand Designer", score: 9.1, projects: 9, gradient: "135deg, #78350f, #d97706", accentColor: "#fbbf24", topProject: "Prism System", category: "Branding" },
  { initials: "VS", name: "Vikram Shah", role: "Full Stack Dev", score: 8.9, projects: 11, gradient: "135deg, #172554, #2563eb", accentColor: "#60a5fa", topProject: "Nexus Portfolio", category: "Development" },
];

const RISING_CREATORS: CreatorProfile[] = [
  { initials: "NR", name: "Nisha Reddy", role: "Interaction Designer", score: 8.4, projects: 3, gradient: "135deg, #0f172a, #334155", accentColor: "#94a3b8", topProject: "Void OS Concept", category: "Design" },
  { initials: "DS", name: "Dev Sharma", role: "Frontend Dev", score: 8.6, projects: 4, gradient: "135deg, #2d1b69, #5b21b6", accentColor: "#a78bfa", topProject: "Wavelength Audio", category: "Development" },
  { initials: "RK2", name: "Ria Kulkarni", role: "Brand Designer", score: 8.5, projects: 5, gradient: "135deg, #1a3a1a, #4d7c0f", accentColor: "#86efac", topProject: "Gaia Brand", category: "Branding" },
  { initials: "AP2", name: "Anay Pillai", role: "Motion Artist", score: 8.3, projects: 2, gradient: "135deg, #1c1917, #78350f", accentColor: "#fdba74", topProject: "Parallax Shorts", category: "Motion" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getScoreStyle(score: number) {
  if (score >= 9.5) return { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", label: "Exceptional" };
  if (score >= 9.0) return { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", label: "Excellent" };
  if (score >= 8.5) return { color: "#d97706", bg: "#fffbeb", border: "#fde68a", label: "Great" };
  return { color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", label: "Good" };
}

// ─── PROJECT PREVIEW ─────────────────────────────────────────────────────────

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
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-7 rounded-lg bg-white/[0.07] border border-white/[0.05]" />
          ))}
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

// ─── SCORE BADGE ─────────────────────────────────────────────────────────────

function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const s = getScoreStyle(score);
  const cls = { sm: "px-2 py-0.5 text-xs rounded-lg", md: "px-2.5 py-1 text-sm rounded-xl", lg: "px-3 py-1.5 text-base rounded-xl" };
  return (
    <span className={`font-display font-medium inline-block ${cls[size]}`} style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
      {score.toFixed(1)}
    </span>
  );
}

// ─── ARROW SVG ───────────────────────────────────────────────────────────────

function ArrowRight({ size = 13, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowUpRight({ size = 13, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#fffefe]/95 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.04)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-black/35 hover:text-black/70 transition-colors text-sm group">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <span className="text-black/10 text-lg">|</span>
          <Link href="/" className="font-display text-black text-lg tracking-tight">Rachnax</Link>
          <span className="hidden md:inline text-black/30 text-xs bg-black/[0.04] border border-black/[0.06] px-2.5 py-0.5 rounded-full">Explore</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {[{ label: "Nominees", href: "#nominees" }, { label: "Creators", href: "#creators" }, { label: "Rising", href: "#rising" }].map((l) => (
            <a key={l.label} href={l.href} className="px-4 py-2 text-sm text-black/40 hover:text-black/80 rounded-xl hover:bg-black/[0.04] transition-all">
              {l.label}
            </a>
          ))}
        </div>
        <Link href="/#contact" className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98] transition-all">
          Submit Work <ArrowUpRight />
        </Link>
      </div>
    </nav>
  );
}

// ─── HERO — AWWWARDS editorial big type ──────────────────────────────────────

function PageHero() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="pt-32 pb-12 px-6 border-b border-black/[0.06]">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div style={fs(inView, 0)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-black/35 text-xs tracking-widest uppercase font-medium">Live · March 2026</span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            {[{ label: "Projects", value: "2,847" }, { label: "Creators", value: "10.4K" }, { label: "Nominations", value: "847" }].map((s, i) => (
              <div key={i} className="text-right">
                <p className="font-display text-xl text-black leading-none">{s.value}</p>
                <p className="text-black/30 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AWWWARDS-style giant headline */}
        <div style={fs(inView, 60)}>
          <h1 className="font-display text-black leading-[0.88] tracking-tight mb-6" style={{ fontSize: "clamp(64px, 13vw, 180px)" }}>
            DISCOVER<span style={{ color: "#7B2FE0" }}>.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-black/45 text-lg md:text-xl max-w-lg leading-relaxed">
              The finest creative work from India&apos;s best builders, designers, and developers — voted by the community.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="#nominees" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 hover:scale-[1.02] transition-all">
                Explore Nominees <ArrowRight />
              </a>
              <Link href="/#contact" className="inline-flex items-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-black/5 hover:border-black/30 transition-all">
                Submit Work
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile stats */}
        <div style={fs(inView, 120)} className="flex items-center gap-6 mt-8 sm:hidden">
          {[{ label: "Projects", value: "2,847" }, { label: "Creators", value: "10.4K" }, { label: "Nominations", value: "847" }].map((s, i) => (
            <div key={i}>
              <p className="font-display text-2xl text-black">{s.value}</p>
              <p className="text-black/30 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORY TABS ───────────────────────────────────────────────────────────

function CategoryTabs({ active, setActive }: { active: string; setActive: (c: string) => void }) {
  return (
    <div className="sticky top-16 z-40 bg-[#fffefe]/95 backdrop-blur-xl border-b border-black/[0.06] px-6 py-3">
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${active === c ? "bg-black text-white font-medium" : "text-black/40 hover:text-black/70 hover:bg-black/[0.05]"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── COTD SECTION — Google Labs large featured card, dark for contrast ────────

function COTDSection() {
  const [ref, inView] = useInView(0.05);
  const [hovered, setHovered] = useState(false);
  const p = COTD;
  const s = getScoreStyle(p.score);

  return (
    <section className="px-6 py-14">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Label */}
        <div style={fs(inView, 0)} className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full">
            <span className="text-amber-500 text-sm">✦</span>
            <span className="text-amber-600 text-xs font-medium tracking-wide uppercase">Creator of the Day</span>
          </div>
          <span className="text-black/25 text-xs">{p.time}</span>
        </div>

        {/* Dark featured card */}
        <div
          style={fs(inView, 60)}
          className="rounded-3xl overflow-hidden bg-[#0a0a0a] grid grid-cols-1 lg:grid-cols-5 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Left — visual preview (3 cols) */}
          <div className="lg:col-span-3 p-8">
            <div className="w-full rounded-2xl overflow-hidden" style={{ height: "clamp(220px, 35vw, 400px)", background: `linear-gradient(${p.gradient})` }}>
              <div className="w-full h-full relative">
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 25% 30%, ${p.accentColor}30 0%, transparent 60%)` }} />
                <div className="absolute inset-5 bg-black/25 rounded-xl border border-white/[0.07] p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-20 rounded-full" style={{ background: `${p.accentColor}90` }} />
                    <div className="h-2 w-12 rounded-full bg-white/15" />
                    <div className="ml-auto flex gap-1.5">
                      {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-white/20" />)}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    <div className="col-span-2 bg-white/[0.06] rounded-xl border border-white/[0.05] p-3 flex flex-col gap-2">
                      <div className="h-1.5 w-16 rounded-full" style={{ background: `${p.accentColor}60` }} />
                      <div className="flex-1 grid grid-cols-8 gap-1 items-end pt-2">
                        {[40, 65, 55, 80, 50, 75, 90, 60].map((h, i) => (
                          <div key={i} className="rounded-t-sm transition-all duration-500" style={{ height: `${hovered ? h : h * 0.7}%`, background: i === 6 ? p.accentColor : `${p.accentColor}35` }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {["9.8", "18K", "7"].map((v, i) => (
                        <div key={i} className="flex-1 bg-white/[0.06] rounded-xl border border-white/[0.05] flex items-center justify-center">
                          <div className="text-center">
                            <div className="font-display text-lg text-white/60">{v}</div>
                            <div className="text-white/25 text-[10px]">{["Score", "Views", "Offers"][i]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — info (2 cols) */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/25 text-sm">{p.category}</span>
                <div className="font-display text-2xl px-4 py-2 rounded-xl" style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                  {p.score.toFixed(1)}<span className="text-xs ml-1 opacity-60">/10</span>
                </div>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-3">{p.title}</h2>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${p.accentColor}cc, ${p.accentColor}50)` }}>
                  {p.creator.initials[0]}
                </div>
                <span className="text-white/50 text-sm">{p.creator.name}</span>
                <span className="text-white/20">·</span>
                <span className="text-white/30 text-sm">{p.creator.role}</span>
              </div>

              {/* Score breakdown */}
              <div className="space-y-3 mb-6">
                {Object.entries(p.breakdown).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-white/25 text-xs w-16 capitalize">{key}</span>
                    <div className="flex-1 h-1 rounded-full bg-white/[0.07]">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: hovered ? `${(val / 5) * 100}%` : "0%", background: p.accentColor }} />
                    </div>
                    <span className="text-white/40 text-xs w-5 text-right">{val}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs text-white/25 bg-white/[0.05] border border-white/[0.07] px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/20 text-xs">{p.views} views · {p.likes.toLocaleString()} likes</span>
              <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 hover:scale-[1.02] transition-all">
                View Project <ArrowUpRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NOMINEES SECTION — AWWWARDS nominees grid ───────────────────────────────

function NomineesSection({ category }: { category: string }) {
  const [ref, inView] = useInView(0.05);
  const filtered = category === "All" ? NOMINEES : NOMINEES.filter((p) => p.category === category);
  const shown = filtered.length > 0 ? filtered : NOMINEES;

  return (
    <section id="nominees" className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* AWWWARDS big editorial heading */}
        <div className="border-t border-black/[0.06] pt-14 mb-10">
          <div style={fs(inView, 0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="font-display text-black leading-none tracking-tight" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
              NOMINEES<span style={{ color: "#7B2FE0" }}>.</span>
            </h2>
            <div style={fs(inView, 60)} className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-black/35 text-sm">{shown.length} live · Vote ends in 18h 42m</span>
            </div>
          </div>
          <p style={fs(inView, 80)} className="text-black/40 text-sm mb-10">Projects currently up for community voting.</p>
        </div>

        {/* 4-column nominees grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shown.map((p, i) => {
            const scoreStyle = getScoreStyle(p.score);
            return (
              <div key={p.id} style={fs(inView, 60 + i * 55, "up")}>
                <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <ProjectPreview gradient={p.gradient} accentColor={p.accentColor} height="h-44" />
                    {/* Score overlay badge */}
                    <div className="absolute top-3 right-3">
                      <span className="font-display text-xs px-2 py-0.5 rounded-lg" style={{ color: scoreStyle.color, background: "rgba(255,255,255,0.95)", border: `1px solid ${scoreStyle.border}` }}>
                        {p.score.toFixed(1)}
                      </span>
                    </div>
                    {/* Time */}
                    <div className="absolute top-3 left-3">
                      <span className="text-white/60 text-[10px] bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">{p.time}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base text-black leading-tight mb-1 group-hover:text-[#7B2FE0] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-black/40 text-xs mb-3">{p.creator.name} · {p.creator.role}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[10px] text-black/35 bg-black/[0.04] border border-black/[0.05] px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                      <span className="text-black/25 text-xs flex-shrink-0">{p.views}</span>
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

// ─── W.CREATORS SECTION — AWWWARDS creator cards, dark on light ──────────────

function WCreatorsSection() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="creators" className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="border-t border-black/[0.06] pt-14 mb-10">
          <div style={fs(inView, 0)}>
            <h2 className="font-display text-black leading-none tracking-tight mb-4" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
              W.CREATORS<span style={{ color: "#7B2FE0" }}>.</span>
            </h2>
            <p className="text-black/40 text-sm max-w-md">
              Top-rated creators on Rachnax — ranked by community votes, project quality, and innovation.
            </p>
          </div>
        </div>

        {/* Dark creator cards — AWWWARDS W.CREATORS style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CREATOR_PROFILES.map((c, i) => {
            const scoreStyle = getScoreStyle(c.score);
            return (
              <div key={i} style={fs(inView, 60 + i * 65, "up")}>
                <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.18)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  {/* Color strip preview */}
                  <div className="h-24 w-full relative overflow-hidden" style={{ background: `linear-gradient(${c.gradient})` }}>
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 40%, ${c.accentColor}30 0%, transparent 60%)` }} />
                    {/* Rank */}
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                      <span className="font-display text-white/60 text-xs">{i + 1}</span>
                    </div>
                    {/* Score */}
                    <div className="absolute top-3 right-3 font-display text-sm px-2.5 py-1 rounded-lg" style={{ color: scoreStyle.color, background: "#0a0a0a", border: `1px solid ${scoreStyle.border}` }}>
                      {c.score.toFixed(1)}
                    </div>
                    {/* Avatar overlapping the strip */}
                    <div className="absolute -bottom-5 left-5">
                      <div className="w-12 h-12 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${c.accentColor}cc, ${c.accentColor}50)` }}>
                        {c.initials.replace("2", "").slice(0, 2)}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-8 px-5 pb-5">
                    <h3 className="font-display text-lg text-white mb-0.5 group-hover:text-white">{c.name}</h3>
                    <p className="text-white/35 text-xs mb-4">{c.role}</p>
                    <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Top Project</p>
                        <p className="text-white/55 text-xs truncate max-w-[120px]">{c.topProject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Projects</p>
                        <p className="font-display text-2xl text-white">{c.projects}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/20 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full">{c.category}</span>
                      <button className="text-white/30 hover:text-white text-xs flex items-center gap-1 transition-colors">
                        View Profile <ArrowUpRight size={11} />
                      </button>
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

// ─── RISING CREATORS — Google Labs colorful cards ────────────────────────────

function RisingSection() {
  const [ref, inView] = useInView(0.08);

  return (
    <section id="rising" className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="border-t border-black/[0.06] pt-14 mb-10">
          <div style={fs(inView, 0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-black/30 text-xs uppercase tracking-widest font-medium mb-2">New Talent</p>
              <h2 className="font-display text-black leading-none tracking-tight" style={{ fontSize: "clamp(40px, 7vw, 96px)" }}>
                RISING<span style={{ color: "#7B2FE0" }}>.</span>
              </h2>
            </div>
            <p style={fs(inView, 80)} className="text-black/35 text-sm max-w-xs text-right hidden md:block mb-2">
              New creators making their mark. Fresh work, raw talent.
            </p>
          </div>
        </div>

        {/* Google Labs style — colorful cards with white text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RISING_CREATORS.map((c, i) => {
            const scoreStyle = getScoreStyle(c.score);
            return (
              <div
                key={i}
                style={fs(inView, 60 + i * 80, "up")}
              >
                <div
                  className="rounded-2xl p-6 cursor-pointer group overflow-hidden relative min-h-[220px] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
                  style={{ background: `linear-gradient(${c.gradient})` }}
                >
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 20% 20%, ${c.accentColor}25 0%, transparent 60%)` }} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-10">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-white/20" style={{ background: `${c.accentColor}40` }}>
                        {c.initials.replace("2", "").slice(0, 2)}
                      </div>
                      <span className="text-sm font-display px-2.5 py-1 rounded-lg bg-black/25 border border-white/10" style={{ color: scoreStyle.color }}>
                        {c.score.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-white leading-tight mb-1">{c.name}</h3>
                    <p className="text-white/50 text-xs mb-2">{c.role}</p>
                    <p className="text-white/30 text-xs">{c.topProject}</p>
                  </div>
                  <div className="relative flex items-center justify-between mt-4 pt-4 border-t border-white/[0.1]">
                    <span className="text-white/30 text-xs">{c.projects} projects</span>
                    <span className="text-white/25 text-xs bg-white/10 px-2 py-0.5 rounded-full">{c.category}</span>
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

// ─── SUBMIT CTA — AWWWARDS two-card bottom ───────────────────────────────────

function SubmitCTA() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="border-t border-black/[0.06] pt-14 mb-8">
          <div style={fs(inView, 0)}>
            <h2 className="font-display text-black leading-none tracking-tight mb-6" style={{ fontSize: "clamp(40px, 7vw, 100px)" }}>
              YOUR TURN<span style={{ color: "#7B2FE0" }}>.</span>
            </h2>
          </div>
        </div>

        {/* Two-card CTA — AWWWARDS bottom style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 — Dark "Submit" */}
          <div style={fs(inView, 80, "left")}>
            <div className="bg-[#0a0a0a] rounded-3xl p-10 flex flex-col justify-between min-h-[280px] group cursor-pointer hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-8">
                  <ArrowUpRight color="white" size={18} />
                </div>
                <h3 className="font-display text-3xl text-white mb-3">Submit your work<br />for recognition.</h3>
                <p className="text-white/35 text-sm leading-relaxed max-w-xs">Every project you&apos;ve built deserves to be seen. Upload your work and let the community judge.</p>
              </div>
              <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-white/90 w-fit hover:scale-[1.02] transition-all">
                Submit Your Work <ArrowRight />
              </Link>
            </div>
          </div>

          {/* Card 2 — Purple "Early Access" */}
          <div style={fs(inView, 160, "right")}>
            <div
              className="rounded-3xl p-10 flex flex-col justify-between min-h-[280px] group cursor-pointer hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #7B2FE0 0%, #5B21B6 50%, #3730A3 100%)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-8">
                  <span className="text-white text-lg">✦</span>
                </div>
                <h3 className="font-display text-3xl text-white mb-3">Get early access<br />to all features.</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">Join the Rachnax waitlist and be among the first 10,000 creators on the platform.</p>
              </div>
              <Link href="/#contact" className="relative mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-white/90 w-fit hover:scale-[1.02] transition-all">
                Join the Waitlist <ArrowRight />
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
    <footer className="border-t border-black/[0.06] px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-display text-black/35 hover:text-black/70 transition-colors">Rachnax</Link>
        <p className="text-black/20 text-xs text-center">© {new Date().getFullYear()} Rachnax · Discover the world&apos;s best creative work</p>
        <Link href="/#contact" className="text-black/30 hover:text-black/60 text-sm transition-colors flex items-center gap-1">
          Join Waitlist <ArrowRight size={12} />
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
      <WCreatorsSection />
      <RisingSection />
      <SubmitCTA />
      <ExploreFooter />
    </div>
  );
}

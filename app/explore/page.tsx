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

// ─── TYPES ──────────────────────────────────────────────────────────────────

type Breakdown = {
  design: number;
  usability: number;
  creativity: number;
  content: number;
};

type Creator = {
  name: string;
  initials: string;
  role: string;
};

type Project = {
  id: number;
  title: string;
  creator: Creator;
  category: string;
  score: number;
  breakdown: Breakdown;
  gradient: string;
  accentColor: string;
  views: string;
  likes: number;
  tags: string[];
  badge: "cotd" | "nominee" | null;
  time: string;
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Design",
  "Development",
  "Motion",
  "Illustration",
  "Branding",
  "3D Art",
];

const FEATURED: Project[] = [
  {
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
    badge: "cotd",
    time: "2 hours ago",
  },
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
    badge: "nominee",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Horizon — 3D Portfolio World",
    creator: { name: "Karan Nair", initials: "KN", role: "3D Artist & Developer" },
    category: "3D Art",
    score: 9.6,
    breakdown: { design: 4.9, usability: 4.7, creativity: 5.0, content: 4.8 },
    gradient: "135deg, #0c4a6e 0%, #0284c7 55%, #164e63 100%",
    accentColor: "#38bdf8",
    views: "31.2K",
    likes: 2891,
    tags: ["Three.js", "3D", "WebGL"],
    badge: "nominee",
    time: "8 hours ago",
  },
];

const NOMINATIONS: Project[] = [
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
    badge: null,
    time: "1 hour ago",
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
    tags: ["Design System", "Branding", "Figma"],
    badge: null,
    time: "3 hours ago",
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
    badge: null,
    time: "6 hours ago",
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
    badge: null,
    time: "9 hours ago",
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
    tags: ["Travel", "App Design", "Maps"],
    badge: null,
    time: "12 hours ago",
  },
];

const RISING: Project[] = [
  {
    id: 9,
    title: "Void — Dark OS Concept",
    creator: { name: "Nisha Reddy", initials: "NR", role: "Interaction Designer" },
    category: "Design",
    score: 8.4,
    breakdown: { design: 4.5, usability: 4.2, creativity: 4.6, content: 4.1 },
    gradient: "135deg, #0f172a 0%, #334155 55%, #1e293b 100%",
    accentColor: "#94a3b8",
    views: "6.2K",
    likes: 412,
    tags: ["OS Design", "Dark", "Concept"],
    badge: null,
    time: "1 day ago",
  },
  {
    id: 10,
    title: "Wavelength — Audio App",
    creator: { name: "Dev Sharma", initials: "DS", role: "Frontend Developer" },
    category: "Development",
    score: 8.6,
    breakdown: { design: 4.4, usability: 4.5, creativity: 4.4, content: 4.3 },
    gradient: "135deg, #2d1b69 0%, #5b21b6 55%, #3730a3 100%",
    accentColor: "#a78bfa",
    views: "7.1K",
    likes: 489,
    tags: ["Audio", "React", "Web API"],
    badge: null,
    time: "2 days ago",
  },
  {
    id: 11,
    title: "Gaia — Nature Brand Identity",
    creator: { name: "Ria Kulkarni", initials: "RK", role: "Brand Designer" },
    category: "Branding",
    score: 8.5,
    breakdown: { design: 4.5, usability: 4.2, creativity: 4.5, content: 4.3 },
    gradient: "135deg, #1a3a1a 0%, #4d7c0f 55%, #3f6212 100%",
    accentColor: "#86efac",
    views: "5.4K",
    likes: 367,
    tags: ["Brand", "Nature", "Logo"],
    badge: null,
    time: "2 days ago",
  },
];

const LEADERBOARD = [
  { rank: 1, name: "Karan Nair", role: "3D Artist", score: 9.6, projects: 8, initials: "KN", accentColor: "#38bdf8" },
  { rank: 2, name: "Aryan Mehta", role: "Product Designer", score: 9.8, projects: 12, initials: "AM", accentColor: "#a78bfa" },
  { rank: 3, name: "Priya Singh", role: "Illustrator", score: 9.3, projects: 15, initials: "PS", accentColor: "#f472b6" },
  { rank: 4, name: "Sneha Gupta", role: "Brand Designer", score: 9.1, projects: 9, initials: "SG", accentColor: "#fbbf24" },
  { rank: 5, name: "Rohit Kumar", role: "Motion Designer", score: 9.4, projects: 6, initials: "RK", accentColor: "#fb7185" },
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

function getScoreStyle(score: number) {
  if (score >= 9.5) return { color: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.22)" };
  if (score >= 9.0) return { color: "#22C55E", bg: "rgba(34,197,94,0.10)", border: "rgba(34,197,94,0.22)" };
  if (score >= 8.5) return { color: "#EAB308", bg: "rgba(234,179,8,0.10)", border: "rgba(234,179,8,0.22)" };
  return { color: "#F59E0B", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.22)" };
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function ProjectPreview({
  gradient,
  accentColor,
  height = "h-52",
}: {
  gradient: string;
  accentColor: string;
  height?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${height} w-full flex-shrink-0`}
      style={{ background: `linear-gradient(${gradient})` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 25% 35%, ${accentColor}30 0%, transparent 65%)`,
        }}
      />
      {/* Simulated UI skeleton */}
      <div className="absolute inset-3 bg-black/25 rounded-lg backdrop-blur-[2px] border border-white/[0.06] p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 rounded-full" style={{ background: `${accentColor}70` }} />
          <div className="h-1.5 w-10 rounded-full bg-white/10" />
          <div className="ml-auto h-4 w-4 rounded bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-7 rounded-lg bg-white/[0.06] border border-white/[0.05]" />
          ))}
        </div>
        <div className="flex-1 space-y-1.5 mt-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded flex-shrink-0"
                style={{ background: `${accentColor}35` }}
              />
              <div
                className="h-1.5 rounded-full bg-white/10"
                style={{ width: `${55 + i * 18}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ score, large = false }: { score: number; large?: boolean }) {
  const s = getScoreStyle(score);
  return (
    <div
      className={`rounded-xl font-display flex flex-col items-center justify-center flex-shrink-0 ${
        large ? "w-16 h-16 text-xl" : "w-11 h-11 text-base"
      }`}
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
    >
      <span className="leading-none">{score.toFixed(1)}</span>
      <span
        className="leading-none mt-0.5"
        style={{ fontSize: "9px", opacity: 0.6, fontFamily: "inherit" }}
      >
        /10
      </span>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function ExploreNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090f]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Back + Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors text-sm group"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <span className="text-white/10 text-lg">|</span>
          <Link href="/" className="font-display text-white text-lg tracking-tight">
            Rachnax
          </Link>
          <span className="hidden md:inline text-white/15 text-xs bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">
            Explore
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Nominees", href: "#nominees" },
            { label: "Rising", href: "#rising" },
            { label: "Leaderboard", href: "#leaderboard" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-4 py-2 text-sm text-white/35 hover:text-white/80 rounded-lg hover:bg-white/5 transition-all duration-150"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/#contact"
          className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Submit Work
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

// ─── PAGE HERO ───────────────────────────────────────────────────────────────

function PageHero() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(123,47,224,0.18) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-4xl mx-auto relative">
        {/* Live pill */}
        <div
          style={fs(inView, 0)}
          className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full text-xs text-white/40 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Live Showcase · Updated daily · March 2026
        </div>

        <h1
          style={fs(inView, 80)}
          className="font-display text-6xl md:text-8xl text-white leading-[0.9] tracking-tight mb-7"
        >
          Where great work
          <br />
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7B2FE0, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            gets recognized.
          </span>
        </h1>

        <p
          style={fs(inView, 160)}
          className="text-white/35 text-lg max-w-xl mx-auto leading-relaxed mb-14"
        >
          Every day, Rachnax surfaces the finest projects from students,
          designers, and builders — voted by the community.
        </p>

        {/* Live stats */}
        <div
          style={fs(inView, 240)}
          className="flex items-center justify-center gap-10 md:gap-16"
        >
          {[
            { label: "Projects Submitted", value: "2,847" },
            { label: "Creators", value: "10,451" },
            { label: "Live Nominations", value: "847" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl text-white mb-1">{s.value}</p>
              <p className="text-white/25 text-xs tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORY TABS ───────────────────────────────────────────────────────────

function CategoryTabs({
  active,
  setActive,
}: {
  active: string;
  setActive: (c: string) => void;
}) {
  return (
    <div className="sticky top-16 z-40 bg-[#09090f]/90 backdrop-blur-xl border-b border-white/[0.05] px-6 py-3">
      <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                active === c
                  ? "bg-white text-black font-medium shadow-sm"
                  : "text-white/35 hover:text-white/65 hover:bg-white/[0.05]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── COTD CARD ───────────────────────────────────────────────────────────────

function COTDCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden cursor-pointer h-full transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? `0 24px 64px ${project.accentColor}22, inset 0 0 0 1px ${project.accentColor}25`
          : "none",
      }}
    >
      {/* COTD badge row */}
      <div className="px-6 pt-5 pb-4 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-amber-400/[0.08] border border-amber-400/[0.18] px-3 py-1 rounded-full">
          <span className="text-amber-400 text-xs">✦</span>
          <span className="text-amber-400 text-xs font-medium tracking-wide">
            Creator of the Day
          </span>
        </div>
        <span className="text-white/20 text-xs ml-auto">{project.time}</span>
      </div>

      {/* Preview image */}
      <div className="px-6">
        <ProjectPreview
          gradient={project.gradient}
          accentColor={project.accentColor}
          height="h-72"
        />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-display text-2xl text-white mb-2 leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}cc, ${project.accentColor}60)`,
                }}
              >
                {project.creator.initials[0]}
              </div>
              <span className="text-white/50 text-sm">{project.creator.name}</span>
              <span className="text-white/15">·</span>
              <span className="text-white/30 text-sm">{project.creator.role}</span>
            </div>
          </div>
          <ScoreBadge score={project.score} large />
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-4 gap-3 p-4 bg-white/[0.025] rounded-xl border border-white/[0.05] mb-5">
          {Object.entries(project.breakdown).map(([key, val]) => (
            <div key={key} className="text-center">
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1.5">
                {key.slice(0, 4)}
              </p>
              <p className="text-white/75 text-sm font-medium mb-1.5">{val}</p>
              <div className="h-0.5 rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: hovered ? `${(val / 5) * 100}%` : "0%",
                    background: project.accentColor,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tags + CTA row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs text-white/25 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
            <span className="text-white/20 text-xs">{project.views} views</span>
            <span className="text-white/20 text-xs">
              {project.likes.toLocaleString()} likes
            </span>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all">
            View Project
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NOMINEE CARD (compact stack) ────────────────────────────────────────────

function NomineeCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden cursor-pointer transition-all duration-300 group flex-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 8px 32px ${project.accentColor}18` : "none",
        borderColor: hovered ? `${project.accentColor}30` : undefined,
      }}
    >
      <ProjectPreview
        gradient={project.gradient}
        accentColor={project.accentColor}
        height="h-36"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="text-white text-sm font-medium leading-tight mb-1 group-hover:text-white transition-colors">
              {project.title}
            </h4>
            <p className="text-white/30 text-xs">{project.creator.name}</p>
          </div>
          <ScoreBadge score={project.score} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/20 text-xs">{project.views} views</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-white/25 border border-white/[0.06]">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── GRID CARD (nominations / rising) ────────────────────────────────────────

function GridCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden cursor-pointer transition-all duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 8px 30px ${project.accentColor}15` : "none",
        borderColor: hovered ? `${project.accentColor}28` : undefined,
      }}
    >
      <ProjectPreview
        gradient={project.gradient}
        accentColor={project.accentColor}
        height="h-44"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="text-white text-sm font-medium mb-1 group-hover:text-white transition-colors leading-tight">
              {project.title}
            </h4>
            <p className="text-white/30 text-xs">
              {project.creator.name} · {project.creator.role}
            </p>
          </div>
          <ScoreBadge score={project.score} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {project.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[10px] text-white/22 bg-white/[0.04] border border-white/[0.05] px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-white/20 text-xs">{project.views}</span>
        </div>
      </div>
    </div>
  );
}

// ─── FEATURED SECTION ────────────────────────────────────────────────────────

function FeaturedSection({ category }: { category: string }) {
  const [ref, inView] = useInView(0.04);

  const pool = category === "All" ? FEATURED : FEATURED.filter((p) => p.category === category);
  const cotd = pool[0] ?? FEATURED[0];
  const nominees =
    pool.length >= 3 ? pool.slice(1, 3) : [...FEATURED.slice(1, 3)];

  return (
    <section className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          style={fs(inView, 0)}
          className="flex items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-2 bg-amber-400/[0.07] border border-amber-400/[0.14] px-3.5 py-1.5 rounded-full">
            <span className="text-amber-400">✦</span>
            <span className="text-amber-400 text-sm font-medium">Featured Today</span>
          </div>
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-white/20 text-xs">March 1, 2026</span>
        </div>

        {/* Grid: COTD + Nominees */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          <div style={fs(inView, 80, "left")} className="lg:col-span-2">
            <COTDCard project={cotd} />
          </div>
          <div style={fs(inView, 160, "right")} className="flex flex-col gap-4">
            {nominees.map((p) => (
              <NomineeCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NOMINATIONS SECTION ─────────────────────────────────────────────────────

function NominationsSection({ category }: { category: string }) {
  const [ref, inView] = useInView(0.06);

  const pool =
    category === "All"
      ? NOMINATIONS
      : NOMINATIONS.filter((p) => p.category === category);
  const shown = pool.length > 0 ? pool : NOMINATIONS;

  return (
    <section id="nominees" className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div style={fs(inView, 0)} className="flex items-start justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/30 text-xs uppercase tracking-widest font-medium">
                Live Nominations
              </span>
            </div>
            <h2 className="font-display text-4xl text-white">Now accepting votes</h2>
          </div>
          <button className="flex-shrink-0 mt-2 flex items-center gap-1.5 text-sm text-white/25 hover:text-white/55 transition-colors">
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {shown.map((p, i) => (
            <div key={p.id} style={fs(inView, 60 + i * 55, "up")}>
              <GridCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RISING SECTION ──────────────────────────────────────────────────────────

function RisingSection() {
  const [ref, inView] = useInView(0.08);

  return (
    <section id="rising" className="px-6 pb-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div style={fs(inView, 0)} className="mb-10">
          <p className="text-white/25 text-xs uppercase tracking-widest font-medium mb-2">
            New &amp; Trending
          </p>
          <h2 className="font-display text-4xl text-white">Rising Creators</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RISING.map((p, i) => (
            <div key={p.id} style={fs(inView, 60 + i * 90, "up")}>
              <GridCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────

function LeaderboardSection() {
  const [ref, inView] = useInView(0.06);
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <section id="leaderboard" className="px-6 pb-24">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section label */}
        <div style={fs(inView, 0)} className="text-center mb-16">
          <p className="text-white/25 text-xs uppercase tracking-widest font-medium mb-3">
            All Time
          </p>
          <h2 className="font-display text-5xl text-white">Top Creators</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Leaderboard list — 3 cols */}
          <div className="lg:col-span-3 space-y-3">
            {LEADERBOARD.map((creator, i) => {
              const scoreStyle = getScoreStyle(creator.score);
              return (
                <div
                  key={i}
                  style={fs(inView, 80 + i * 70, "left")}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.11] hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
                >
                  {/* Rank */}
                  <div className="w-8 text-center flex-shrink-0">
                    {i < 3 ? (
                      <span className="text-xl">{medals[i]}</span>
                    ) : (
                      <span className="font-display text-lg text-white/20">{i + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${creator.accentColor}70, ${creator.accentColor}28)`,
                      border: `1px solid ${creator.accentColor}28`,
                    }}
                  >
                    {creator.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate group-hover:text-white transition-colors">
                      {creator.name}
                    </p>
                    <p className="text-white/30 text-xs truncate">
                      {creator.role} · {creator.projects} projects
                    </p>
                  </div>

                  {/* Score */}
                  <div
                    className="flex-shrink-0 text-center px-3 py-1.5 rounded-xl"
                    style={{
                      color: scoreStyle.color,
                      background: scoreStyle.bg,
                      border: `1px solid ${scoreStyle.border}`,
                    }}
                  >
                    <p className="font-display text-lg leading-none">{creator.score.toFixed(1)}</p>
                    <p className="text-[9px] opacity-55 mt-0.5">/10</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rating guide — 2 cols */}
          <div style={fs(inView, 200, "right")} className="lg:col-span-2 flex flex-col gap-5">
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex-1">
              <p className="text-white/25 text-xs uppercase tracking-widest font-medium mb-1">
                How it works
              </p>
              <h3 className="font-display text-2xl text-white mb-4">The Rating System</h3>
              <p className="text-white/30 text-sm leading-relaxed mb-6">
                Projects are scored across four dimensions by the Rachnax community in real-time.
              </p>

              <div className="space-y-3">
                {[
                  { range: "9.5–10", label: "Exceptional", desc: "Sets a new standard", color: "#10B981" },
                  { range: "9.0–9.4", label: "Excellent", desc: "Top-tier execution", color: "#22C55E" },
                  { range: "8.5–8.9", label: "Great", desc: "Strong creative direction", color: "#EAB308" },
                  { range: "8.0–8.4", label: "Good", desc: "Solid fundamentals", color: "#F59E0B" },
                ].map((tier, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]"
                  >
                    <div
                      className="text-xs font-display px-2.5 py-1 rounded-lg w-[72px] text-center flex-shrink-0"
                      style={{
                        color: tier.color,
                        background: `${tier.color}12`,
                        border: `1px solid ${tier.color}22`,
                      }}
                    >
                      {tier.range}
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-medium">{tier.label}</p>
                      <p className="text-white/25 text-xs">{tier.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-white/25 text-xs uppercase tracking-widest mb-3">
                Scored on
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Design", icon: "✦" },
                  { label: "Usability", icon: "◈" },
                  { label: "Creativity", icon: "◉" },
                  { label: "Content", icon: "◎" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-2 text-white/35 text-sm py-1.5"
                  >
                    <span className="text-white/20 text-xs">{d.icon}</span>
                    {d.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section className="px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          style={{
            ...fs(inView, 0, "up"),
            background: "linear-gradient(135deg, #7B2FE0 0%, #5B21B6 45%, #3730A3 100%)",
          }}
          className="rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.12)_0%,transparent_55%)]" />

          <div className="relative">
            <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-5">
              Be Part of It
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-tight mb-5">
              Ready to get your
              <br />
              <span className="italic opacity-75">work recognized?</span>
            </h2>
            <p className="text-white/45 max-w-md mx-auto mb-10 leading-relaxed">
              Join Rachnax and start showcasing your projects to thousands of
              creators, employers, and clients.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Join the Waitlist
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:border-white/50 hover:bg-white/[0.06] transition-all"
              >
                Learn More
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
    <footer className="border-t border-white/[0.05] px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-white/30 hover:text-white/60 transition-colors"
        >
          Rachnax
        </Link>
        <p className="text-white/15 text-xs text-center">
          © {new Date().getFullYear()} Rachnax · Showcasing the world&apos;s best creative work
        </p>
        <Link
          href="/#contact"
          className="text-white/25 hover:text-white/55 text-sm transition-colors flex items-center gap-1"
        >
          Join Waitlist
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [category, setCategory] = useState("All");

  return (
    <div className="min-h-screen" style={{ background: "#09090f", color: "#ffffff" }}>
      <ExploreNav />
      <PageHero />
      <CategoryTabs active={category} setActive={setCategory} />
      <div className="pt-8">
        <FeaturedSection category={category} />
        <NominationsSection category={category} />
        <RisingSection />
        <LeaderboardSection />
        <CTASection />
      </div>
      <ExploreFooter />
    </div>
  );
}

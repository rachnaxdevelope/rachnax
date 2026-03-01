"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// ─── Animation ───────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}
function fs(inView: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(0,18px,0)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// ─── Mock Data ────────────────────────────────────────────────
const CREATORS = [
  {
    id: "1", initials: "AM", name: "Aryan Mehta", role: "Product Designer", score: 9.8, projects: 12,
    gradient: "135deg, #3b0764, #7B2FE0", accentColor: "#a78bfa", category: "Design",
    location: "Mumbai, India", bio: "Product designer obsessed with building interfaces that feel inevitable. I work at the intersection of clarity, motion, and systems thinking.",
    skills: ["Figma", "Framer", "UI Design", "Design Systems", "Prototyping", "User Research"],
    topProject: "Nebula Finance Dashboard",
    projects_list: [
      { id: "1", title: "Nebula Finance Dashboard", category: "Design", score: 9.8, views: "24.1K", gradient: "135deg, #3b0764, #7B2FE0", accentColor: "#a78bfa" },
      { id: "9", title: "Atlas Design System", category: "Design System", score: 9.2, views: "15.3K", gradient: "135deg, #1e1b4b, #4338ca", accentColor: "#818cf8" },
      { id: "10", title: "Zephyr Mobile App", category: "Mobile", score: 8.9, views: "11.4K", gradient: "135deg, #312e81, #6366f1", accentColor: "#a5b4fc" },
    ],
    social: { instagram: "#", twitter: "#", dribbble: "#", behance: "#" },
  },
  {
    id: "2", initials: "KN", name: "Karan Nair", role: "3D Artist & Developer", score: 9.6, projects: 8,
    gradient: "135deg, #0c4a6e, #0284c7", accentColor: "#38bdf8", category: "3D Art",
    location: "Bangalore, India", bio: "I build immersive 3D experiences on the web. Blending Three.js with creative direction to create worlds people want to get lost in.",
    skills: ["Three.js", "Blender", "WebGL", "React", "GSAP", "Shaders"],
    topProject: "Horizon 3D Portfolio",
    projects_list: [
      { id: "3", title: "Horizon — 3D Portfolio World", category: "3D Art", score: 9.6, views: "31.2K", gradient: "135deg, #0c4a6e, #0284c7", accentColor: "#38bdf8" },
      { id: "11", title: "Void WebGL Experience", category: "WebGL", score: 9.1, views: "19.8K", gradient: "135deg, #042f2e, #0d9488", accentColor: "#5eead4" },
      { id: "12", title: "Particle System Viz", category: "Motion", score: 8.7, views: "8.9K", gradient: "135deg, #0a192f, #1e3a5f", accentColor: "#64ffda" },
    ],
    social: { instagram: "#", twitter: "#", dribbble: "#", behance: "#" },
  },
  {
    id: "3", initials: "RK", name: "Rohit Kumar", role: "Motion Designer", score: 9.4, projects: 6,
    gradient: "135deg, #831843, #e11d48", accentColor: "#fb7185", category: "Motion",
    location: "Delhi, India", bio: "Motion designer bringing interfaces to life through purposeful animation. I believe every transition tells a story.",
    skills: ["After Effects", "Lottie", "CSS Animation", "React Spring", "Framer Motion"],
    topProject: "Rhythm Music Visualizer",
    projects_list: [
      { id: "2", title: "Rhythm — Music Visualizer", category: "Motion", score: 9.4, views: "18.6K", gradient: "135deg, #831843, #e11d48", accentColor: "#fb7185" },
      { id: "13", title: "Liquid UI Kit", category: "Motion", score: 8.9, views: "12.1K", gradient: "135deg, #7c1d6f, #c026d3", accentColor: "#e879f9" },
    ],
    social: { instagram: "#", twitter: "#", dribbble: "#", behance: "#" },
  },
];

function getScoreStyle(score: number) {
  if (score >= 9.5) return { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" };
  if (score >= 9.0) return { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" };
  if (score >= 8.5) return { color: "#d97706", bg: "#fffbeb", border: "#fde68a" };
  return { color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" };
}

function ProjectCard({ p, delay, inView }: { p: typeof CREATORS[0]["projects_list"][0]; delay: number; inView: boolean }) {
  return (
    <div style={fs(inView, delay)}>
      <Link href={`/project/${p.id}`} className="group block rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {/* Preview */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: `linear-gradient(${p.gradient})` }}>
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ background: `radial-gradient(circle at 30% 30%, ${p.accentColor}40 0%, transparent 60%)` }} />
          {/* Score */}
          <div className="absolute top-3 right-3">
            <span className="font-display text-xs px-2 py-0.5 rounded-lg shadow" style={{ color: getScoreStyle(p.score).color, background: "rgba(255,255,255,0.95)", border: `1px solid ${getScoreStyle(p.score).border}` }}>
              {p.score.toFixed(1)}
            </span>
          </div>
        </div>
        {/* Info */}
        <div className="p-4 bg-white border-x border-b border-black/[0.07] rounded-b-2xl">
          <h3 className="font-display text-base text-black mb-1 group-hover:text-[#7B2FE0] transition-colors">{p.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/40 bg-black/[0.04] px-2 py-0.5 rounded-full border border-black/[0.05]">{p.category}</span>
            <span className="text-xs text-black/30">{p.views} views</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function CreatorPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const creator = CREATORS.find((c) => c.id === id) ?? CREATORS[0];
  const scoreStyle = getScoreStyle(creator.score);

  const [heroRef, heroInView] = useInView(0.05);
  const [projectsRef, projectsInView] = useInView(0.05);

  return (
    <div className="min-h-screen" style={{ background: "#fffefe", color: "#0a0a0a" }}>

      {/* ── Nav ─────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fffefe]/90 backdrop-blur-xl border-b border-black/[0.07]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/explore" className="flex items-center gap-1.5 text-black/40 hover:text-black/70 transition-colors text-sm group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Explore
            </Link>
            <span className="text-black/10">·</span>
            <span className="text-black/40 text-sm">{creator.name}</span>
          </div>
          <Link href="/#contact" className="flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-black/80 transition-colors">
            Submit Work
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="pt-28 pb-14 px-6 border-b border-black/[0.07]">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Avatar + name col */}
            <div className="lg:col-span-1" style={fs(heroInView, 0)}>
              {/* Big avatar */}
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white mb-5 shadow-xl"
                style={{ background: `linear-gradient(${creator.gradient})` }}>
                {creator.initials}
              </div>
              <h1 className="font-display text-4xl text-black mb-1">{creator.name}</h1>
              <p className="text-black/50 mb-3">{creator.role}</p>
              <div className="flex items-center gap-2 mb-5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-black/30">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-black/40 text-sm">{creator.location}</span>
              </div>

              {/* Score badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border mb-5"
                style={{ color: scoreStyle.color, background: scoreStyle.bg, borderColor: scoreStyle.border }}>
                <span className="font-display text-2xl">{creator.score.toFixed(1)}</span>
                <span className="text-xs opacity-60">/10 · {creator.category}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[{ v: creator.projects, l: "Projects" }, { v: `${creator.score}`, l: "Avg Score" }].map((s) => (
                  <div key={s.l} className="bg-white rounded-xl border border-black/[0.07] p-4 text-center">
                    <p className="font-display text-2xl text-black">{s.v}</p>
                    <p className="text-black/40 text-xs mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/#contact" className="w-full flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-black/80 hover:scale-[1.01] transition-[transform,background-color]">
                Contact Creator
              </Link>
            </div>

            {/* Bio + skills col */}
            <div className="lg:col-span-2 space-y-7" style={fs(heroInView, 80)}>
              {/* Bio */}
              <div>
                <p className="text-black/35 text-xs uppercase tracking-widest font-medium mb-3">About</p>
                <p className="text-black/70 text-lg leading-relaxed">{creator.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <p className="text-black/35 text-xs uppercase tracking-widest font-medium mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {creator.skills.map((s) => (
                    <span key={s} className="text-sm text-black/60 bg-black/[0.04] border border-black/[0.07] px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category focus */}
              <div className="p-5 rounded-2xl border border-black/[0.07] bg-white">
                <p className="text-black/35 text-xs uppercase tracking-widest font-medium mb-2">Focus Area</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg" style={{ background: `linear-gradient(${creator.gradient})` }} />
                  <div>
                    <p className="font-medium text-black text-sm">{creator.category}</p>
                    <p className="text-black/40 text-xs">Top project: {creator.topProject}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────── */}
      <section className="px-6 py-14">
        <div ref={projectsRef} className="max-w-7xl mx-auto">
          <div style={fs(projectsInView, 0)} className="flex items-end justify-between mb-8">
            <div>
              <p className="text-black/35 text-xs uppercase tracking-widest font-medium mb-2">Portfolio</p>
              <h2 className="font-display text-3xl text-black">Featured Projects</h2>
            </div>
            <span className="text-black/30 text-sm">{creator.projects_list.length} shown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {creator.projects_list.map((p, i) => (
              <ProjectCard key={p.id} p={p} delay={60 + i * 80} inView={projectsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-black/[0.07] px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/explore" className="text-black/35 hover:text-black/65 text-sm transition-colors">
            ← Back to Explore
          </Link>
          <Link href="/" className="font-display text-black/30 hover:text-black/60 transition-colors">Rachnax</Link>
          <Link href="/#contact" className="text-black/35 hover:text-black/65 text-sm transition-colors">
            Join Waitlist →
          </Link>
        </div>
      </footer>
    </div>
  );
}

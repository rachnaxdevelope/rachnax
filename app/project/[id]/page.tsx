"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// ─── Animation ────────────────────────────────────────────────
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
const PROJECTS = [
  {
    id: "1", title: "Nebula Finance Dashboard",
    creator: { id: "1", name: "Aryan Mehta", initials: "AM", role: "Product Designer" },
    category: "Design", score: 9.8, views: "24.1K", likes: 1847, time: "2 hours ago",
    breakdown: { design: 4.9, usability: 4.8, creativity: 5.0, content: 4.7 },
    gradient: "135deg, #3b0764 0%, #7B2FE0 55%, #1e1b4b 100%",
    accentColor: "#a78bfa",
    tags: ["Dashboard", "FinTech", "Dark UI", "Data Visualization"],
    description: "A comprehensive finance dashboard that reimagines how users interact with their financial data. Built with clarity and precision, every chart, metric and interaction is crafted to reduce cognitive load while delivering maximum insight.",
    tools: ["Figma", "Framer", "Lottie", "CSS"],
    year: "2026",
  },
  {
    id: "2", title: "Rhythm — Music Visualizer",
    creator: { id: "3", name: "Rohit Kumar", initials: "RK", role: "Motion Designer" },
    category: "Motion", score: 9.4, views: "18.6K", likes: 1243, time: "5h ago",
    breakdown: { design: 4.8, usability: 4.6, creativity: 4.9, content: 4.5 },
    gradient: "135deg, #831843 0%, #e11d48 55%, #7c1d6f 100%",
    accentColor: "#fb7185",
    tags: ["Motion", "Music", "WebGL", "Three.js"],
    description: "A real-time music visualizer that translates audio frequency data into stunning 3D particle systems. The particles react to beat, melody and bass independently creating a unique visual signature for every track.",
    tools: ["Three.js", "Web Audio API", "GLSL", "React"],
    year: "2026",
  },
  {
    id: "3", title: "Horizon — 3D Portfolio World",
    creator: { id: "2", name: "Karan Nair", initials: "KN", role: "3D Artist" },
    category: "3D Art", score: 9.6, views: "31.2K", likes: 2891, time: "8h ago",
    breakdown: { design: 4.9, usability: 4.7, creativity: 5.0, content: 4.8 },
    gradient: "135deg, #0c4a6e 0%, #0284c7 55%, #164e63 100%",
    accentColor: "#38bdf8",
    tags: ["Three.js", "3D", "WebGL", "Portfolio"],
    description: "An immersive 3D portfolio world built entirely in the browser using Three.js. Visitors navigate through a rendered world discovering projects embedded into the environment itself — redefining what a portfolio can be.",
    tools: ["Three.js", "Blender", "React", "GSAP"],
    year: "2026",
  },
  {
    id: "4", title: "Bloom — Wellness App",
    creator: { id: "4", name: "Meera Joshi", initials: "MJ", role: "UI/UX Designer" },
    category: "Design", score: 8.7, views: "12.4K", likes: 876, time: "1h ago",
    breakdown: { design: 4.6, usability: 4.5, creativity: 4.3, content: 4.4 },
    gradient: "135deg, #064e3b 0%, #059669 55%, #065f46 100%",
    accentColor: "#34d399",
    tags: ["Health", "Mobile", "Calm UI", "iOS"],
    description: "A wellness app designed around the principle that calm design leads to calmer minds. Bloom uses gentle micro-interactions, breathing-paced animations and a carefully curated soft color system to make self-care feel effortless.",
    tools: ["Figma", "Principle", "Protopie"],
    year: "2025",
  },
  {
    id: "5", title: "Prism Design System",
    creator: { id: "5", name: "Sneha Gupta", initials: "SG", role: "Brand Designer" },
    category: "Branding", score: 9.1, views: "9.8K", likes: 654, time: "3h ago",
    breakdown: { design: 4.8, usability: 4.7, creativity: 4.7, content: 4.6 },
    gradient: "135deg, #78350f 0%, #d97706 55%, #92400e 100%",
    accentColor: "#fbbf24",
    tags: ["Design System", "Figma", "Components", "Tokens"],
    description: "A complete design system built to scale across multiple products. Prism includes 200+ components, comprehensive token documentation, dark/light mode support, and usage guidelines that make design and engineering alignment seamless.",
    tools: ["Figma", "Storybook", "Tokens Studio"],
    year: "2026",
  },
  {
    id: "6", title: "Nexus — Dev Portfolio",
    creator: { id: "6", name: "Vikram Shah", initials: "VS", role: "Full Stack Dev" },
    category: "Development", score: 8.9, views: "15.7K", likes: 1102, time: "6h ago",
    breakdown: { design: 4.5, usability: 4.8, creativity: 4.4, content: 4.6 },
    gradient: "135deg, #172554 0%, #2563eb 55%, #1e3a8a 100%",
    accentColor: "#60a5fa",
    tags: ["Portfolio", "Next.js", "GSAP", "TypeScript"],
    description: "A developer portfolio that shows rather than tells. Nexus features interactive code playgrounds, live project demos, a terminal-style contact form, and GSAP-powered transitions that demonstrate frontend mastery in every scroll.",
    tools: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS"],
    year: "2026",
  },
];

function getScoreStyle(score: number) {
  if (score >= 9.5) return { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", label: "Exceptional" };
  if (score >= 9.0) return { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", label: "Excellent" };
  if (score >= 8.5) return { color: "#d97706", bg: "#fffbeb", border: "#fde68a", label: "Great" };
  return { color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", label: "Good" };
}

export default function ProjectPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const project = PROJECTS.find((p) => p.id === id) ?? PROJECTS[0];
  const scoreStyle = getScoreStyle(project.score);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(project.likes);

  const [heroRef, heroInView] = useInView(0.05);
  const [detailRef, detailInView] = useInView(0.05);

  // Related projects
  const related = PROJECTS.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2)
    .concat(PROJECTS.filter((p) => p.id !== project.id && p.category !== project.category).slice(0, 2 - PROJECTS.filter((p) => p.id !== project.id && p.category === project.category).length));

  return (
    <div className="min-h-screen" style={{ background: "#fffefe", color: "#0a0a0a" }}>

      {/* ── Nav ──────────────────────────────────────── */}
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
            <span className="text-black/40 text-sm truncate max-w-[200px]">{project.title}</span>
          </div>
          <Link href="/#contact" className="flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-black/80 transition-colors">
            Submit Work
          </Link>
        </div>
      </nav>

      {/* ── Hero — big preview ───────────────────────── */}
      <section className="pt-14">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(320px, 55vw, 580px)", background: `linear-gradient(${project.gradient})` }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 35% 40%, ${project.accentColor}45 0%, transparent 60%)` }} />

          {/* UI mock */}
          <div className="absolute inset-8 md:inset-14 bg-black/25 rounded-2xl border border-white/[0.08] p-6 backdrop-blur-[1px] flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-2 rounded-full w-24" style={{ background: `${project.accentColor}90` }} />
              <div className="h-2 w-14 rounded-full bg-white/20" />
              <div className="ml-auto flex gap-2">
                {[0, 1, 2].map((i) => <div key={i} className="w-14 h-6 rounded-lg bg-white/15" />)}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 flex-1">
              <div className="col-span-3 bg-white/[0.06] rounded-xl border border-white/[0.06] p-4 flex flex-col gap-3">
                <div className="h-1.5 w-20 rounded-full" style={{ background: `${project.accentColor}60` }} />
                <div className="flex-1 grid grid-cols-8 gap-1 items-end">
                  {[40, 65, 55, 80, 50, 75, 90, 60].map((h, i) => (
                    <div key={i} className="rounded-t" style={{ height: `${h}%`, background: i === 6 ? project.accentColor : `${project.accentColor}35` }} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {["9.8", "18K", "7"].map((v, i) => (
                  <div key={i} className="flex-1 bg-white/[0.06] rounded-xl border border-white/[0.06] flex items-center justify-center">
                    <p className="font-display text-sm text-white/60">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gradient fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fffefe] to-transparent" />
        </div>
      </section>

      {/* ── Info grid ────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT — main info */}
            <div className="lg:col-span-2 space-y-8" style={fs(heroInView, 0)}>
              {/* Title row */}
              <div className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-black/40 bg-black/[0.04] border border-black/[0.07] px-2.5 py-1 rounded-full">{project.category}</span>
                  <span className="text-xs text-black/30">{project.year}</span>
                  <span className="text-xs text-black/25">·</span>
                  <span className="text-xs text-black/30">{project.time}</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-black leading-tight mb-4">{project.title}</h1>

                {/* Creator */}
                <Link href={`/creator/${project.creator.id}`} className="inline-flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(${PROJECTS.find(p => p.id === project.id)?.gradient ?? "135deg, #333, #666"})` }}>
                    {project.creator.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black group-hover:text-[#7B2FE0] transition-colors">{project.creator.name}</p>
                    <p className="text-xs text-black/40">{project.creator.role}</p>
                  </div>
                </Link>
              </div>

              {/* Description */}
              <div>
                <p className="text-black/35 text-xs uppercase tracking-widest font-medium mb-3">About the Project</p>
                <p className="text-black/65 text-base leading-relaxed">{project.description}</p>
              </div>

              {/* Tags */}
              <div>
                <p className="text-black/35 text-xs uppercase tracking-widest font-medium mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="text-sm text-black/55 bg-black/[0.04] border border-black/[0.07] px-3 py-1.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <p className="text-black/35 text-xs uppercase tracking-widest font-medium mb-3">Built With</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span key={t} className="text-xs text-black/50 bg-white border border-black/[0.1] px-3 py-1.5 rounded-full font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — score sidebar */}
            <div className="space-y-4" style={fs(heroInView, 100)}>
              {/* Score card */}
              <div className="rounded-2xl border border-black/[0.07] bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-black/35 text-xs uppercase tracking-widest font-medium">Score</p>
                  <span className="font-display text-4xl" style={{ color: scoreStyle.color }}>{project.score.toFixed(1)}</span>
                </div>

                {/* Score bars */}
                <div className="space-y-3 mb-5">
                  {Object.entries(project.breakdown).map(([key, val], i) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-black/40 text-xs w-20 capitalize">{key}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-black/[0.06]">
                        <div className="h-full rounded-full transition-all duration-700" style={{
                          width: heroInView ? `${(val / 5) * 100}%` : "0%",
                          background: scoreStyle.color,
                          transitionDelay: `${300 + i * 100}ms`,
                        }} />
                      </div>
                      <span className="text-black/50 text-xs w-6 text-right font-display">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Score label */}
                <div className="text-center py-1.5 rounded-xl text-xs font-medium" style={{ color: scoreStyle.color, background: scoreStyle.bg, border: `1px solid ${scoreStyle.border}` }}>
                  {scoreStyle.label}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[{ v: project.views, l: "Views" }, { v: votes.toLocaleString(), l: "Votes" }].map((s) => (
                  <div key={s.l} className="bg-white rounded-xl border border-black/[0.07] p-4 text-center">
                    <p className="font-display text-xl text-black">{s.v}</p>
                    <p className="text-black/35 text-xs mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Vote + View buttons */}
              <button
                onClick={() => { if (!voted) { setVoted(true); setVotes((v) => v + 1); } }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-[background-color,border-color,color] duration-300 ${
                  voted
                    ? "bg-green-50 border border-green-200 text-green-600 cursor-default"
                    : "bg-white border border-black/[0.12] text-black hover:bg-black/[0.04] hover:border-black/25"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill={voted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                {voted ? "Voted!" : "Vote for this project"}
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-black/85 hover:scale-[1.01] transition-[transform,background-color]">
                View Live Project
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Projects ──────────────────────────── */}
      {related.length > 0 && (
        <section className="px-6 pb-16 border-t border-black/[0.07] pt-12">
          <div ref={detailRef} className="max-w-7xl mx-auto">
            <div style={fs(detailInView, 0)} className="flex items-center justify-between mb-7">
              <h2 className="font-display text-2xl text-black">More Projects</h2>
              <Link href="/explore" className="text-sm text-black/40 hover:text-black/70 transition-colors link-underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.slice(0, 2).map((p, i) => {
                const s = getScoreStyle(p.score);
                return (
                  <div key={p.id} style={fs(detailInView, 60 + i * 80)}>
                    <Link href={`/project/${p.id}`} className="group block rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: `linear-gradient(${p.gradient})` }}>
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                          style={{ background: `radial-gradient(circle at 30% 30%, ${p.accentColor}40 0%, transparent 60%)` }} />
                        <div className="absolute top-3 right-3">
                          <span className="font-display text-xs px-2 py-0.5 rounded-lg shadow" style={{ color: s.color, background: "rgba(255,255,255,0.95)", border: `1px solid ${s.border}` }}>{p.score.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white border-x border-b border-black/[0.07] rounded-b-2xl">
                        <h3 className="font-display text-lg text-black mb-1 group-hover:text-[#7B2FE0] transition-colors">{p.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-black/40">{p.creator.name}</span>
                          <span className="text-xs text-black/30">{p.views} views</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-black/[0.07] px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/explore" className="text-black/35 hover:text-black/65 text-sm transition-colors">← Back to Explore</Link>
          <Link href="/" className="font-display text-black/30 hover:text-black/60 transition-colors">Rachnax</Link>
          <Link href="/#contact" className="text-black/35 hover:text-black/65 text-sm transition-colors">Join Waitlist →</Link>
        </div>
      </footer>
    </div>
  );
}

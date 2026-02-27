"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// ─── ICONSAX SVG ICONS (inline, no package needed) ────────────────────────────
// Using iconsax.io icon style: Linear/outline — clean, professional

const Icon = {
  Portfolio: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-8 10 8M4 9v12a1 1 0 001 1h14a1 1 0 001-1V9" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4" />
    </svg>
  ),
  Medal: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  ),
  People: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Chart: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  Flash: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  ),
  Check: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Star: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Mail: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  User: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Menu: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  Close: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Globe: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  ),
};

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.png"
                alt="Rachnax"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display text-lg tracking-tight text-black">
              Rachnax
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {["About", "How it Works", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="px-4 py-2 text-sm text-black/55 hover:text-black rounded-lg hover:bg-black/5 transition-all duration-150"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden md:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black/85 transition-colors"
            >
              Join Waitlist
              <Icon.ArrowUpRight />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-black/6 transition-colors"
            >
              {open ? <Icon.Close /> : <Icon.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-black/8 bg-[#e8e9e8]/95 backdrop-blur-md px-6 py-4 space-y-1">
            {["About", "How it Works", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm text-black/70 hover:text-black rounded-lg hover:bg-black/5 transition-all"
              >
                {item}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="#contact"
                className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-full text-sm font-medium w-full"
              >
                Join Waitlist <Icon.ArrowUpRight />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
          {/* Left — Copy */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 border border-black/12 bg-white/60 px-4 py-2 rounded-full text-xs text-black/60 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Early Access — Limited Spots Available
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-[64px] text-black leading-[1.05] tracking-tight mb-6">
              Your work
              <br />
              deserves to
              <br />
              be <span className="italic">seen.</span>
            </h1>

            <p className="text-black/55 text-lg leading-relaxed mb-10 max-w-md">
              Rachnax is the platform where creators, students, and
              professionals showcase projects, build portfolios, get recognized
              — and get hired.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3 mb-10">
              <div className="flex -space-x-2">
                {["#7B2FE0", "#3B82F6", "#10B981", "#F59E0B"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#e8e9e8]"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Icon.Star key={i} />
                  ))}
                </div>
                <p className="text-xs text-black/45 mt-0.5">
                  Trusted by 2,000+ creators on waitlist
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-black/85 transition-colors"
              >
                Join the Waitlist
                <Icon.ArrowRight />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 border border-black/15 text-black px-7 py-3.5 rounded-full text-sm font-medium hover:border-black/30 hover:bg-black/4 transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right — UI mockup */}
          <div className="relative">
            {/* Main profile card */}
            <div className="bg-white rounded-2xl border border-black/8 shadow-sm overflow-hidden">
              {/* Card header */}
              <div className="bg-black px-6 pt-8 pb-12 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 20%, #7B2FE0 0%, transparent 60%)",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                      A
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        Aryan Mehta
                      </p>
                      <p className="text-white/50 text-xs">
                        Product Designer · Student
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/20 px-3 py-1 rounded-full">
                    Open to work
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-black/6 -mt-6 mx-6 bg-white rounded-xl border border-black/8 shadow-sm relative z-10">
                {[
                  { label: "Projects", value: "24" },
                  { label: "Views", value: "18.4K" },
                  { label: "Offers", value: "7" },
                ].map((s, i) => (
                  <div key={i} className="py-4 text-center">
                    <p className="font-display text-2xl text-black">
                      {s.value}
                    </p>
                    <p className="text-xs text-black/40 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Projects list */}
              <div className="px-6 py-5 space-y-3">
                <p className="text-xs text-black/35 uppercase tracking-widest font-medium">
                  Featured Projects
                </p>
                {[
                  {
                    name: "FinTech Dashboard UI",
                    tag: "Design",
                    views: "4.2K",
                    color: "#7B2FE0",
                  },
                  {
                    name: "AI Study Assistant App",
                    tag: "Dev + Design",
                    views: "6.8K",
                    color: "#3B82F6",
                  },
                  {
                    name: "Open Source UI Kit",
                    tag: "Design System",
                    views: "7.4K",
                    color: "#10B981",
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-black/5 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex-shrink-0"
                        style={{ background: p.color + "18" }}
                      >
                        <div
                          className="w-full h-full rounded-lg flex items-center justify-center"
                          style={{ color: p.color }}
                        >
                          <Icon.Portfolio />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">
                          {p.name}
                        </p>
                        <p className="text-xs text-black/40">{p.tag}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-black/35 text-xs">
                      <Icon.Eye />
                      {p.views}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl border border-black/8 shadow-lg px-4 py-3 flex items-center gap-3 max-w-[220px]">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Icon.Briefcase />
              </div>
              <div>
                <p className="text-xs font-medium text-black">New job offer</p>
                <p className="text-xs text-black/45">Stripe · Full-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM ───────────────────────────────────────────────────────────────────
function Problem() {
  const problems = [
    {
      icon: <Icon.Portfolio />,
      title: "Your work is invisible",
      desc: "Great projects stuck in local folders with no audience or recognition.",
    },
    {
      icon: <Icon.Medal />,
      title: "Talent goes unnoticed",
      desc: "Young builders create incredible things with zero path to opportunity.",
    },
    {
      icon: <Icon.Briefcase />,
      title: "Hiring ignores skills",
      desc: "Employers see resumes — not what you've actually built and shipped.",
    },
    {
      icon: <Icon.Flash />,
      title: "Earning as a creator is hard",
      desc: 'No clear path from "I built something" to "I got paid for my skills."',
    },
  ];

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-white/30 text-xs tracking-widest uppercase font-medium mb-5">
              The Problem
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
              The world is full
              <br />
              of <span className="italic text-white/40">unrecognized</span>
              <br />
              talent.
            </h2>
            <p className="text-white/45 leading-relaxed max-w-sm">
              Millions of people create incredible work every day — but without
              a platform to showcase it, that work disappears.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <div
                key={i}
                className="border border-white/8 rounded-2xl p-6 hover:border-white/16 transition-colors group"
              >
                <div className="text-white/40 mb-4 group-hover:text-white/70 transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-white text-sm font-medium mb-2">
                  {p.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-20 border-t border-white/8 text-center">
          <p className="font-display text-3xl md:text-4xl text-white/70">
            Rachnax is the answer.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const values = [
    "Meritocracy over credentials",
    "Work speaks louder than resumes",
    "Every age, every background",
    "Build → Showcase → Grow",
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-black/35 text-xs tracking-widest uppercase font-medium mb-5">
              About Rachnax
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-black leading-tight mb-6">
              One platform.
              <br />
              <span className="italic">Every creator.</span>
            </h2>
            <p className="text-black/55 leading-relaxed mb-6 text-lg">
              We built Rachnax on a simple belief:{" "}
              <strong className="text-black font-medium">
                your work should speak for you.
              </strong>
            </p>
            <p className="text-black/50 leading-relaxed mb-10">
              Whether you&apos;re a 16-year-old who shipped an app, a design
              student with a stunning portfolio, or a professional looking to
              freelance — Rachnax gives you the stage. No gatekeeping. No CV
              filtering. Just work.
            </p>

            <div className="space-y-3">
              {values.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 text-white">
                    <Icon.Check />
                  </div>
                  <span className="text-sm text-black/70">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Numbers */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                number: "1",
                unit: "Platform",
                desc: "Portfolio + Hire + Freelance combined",
              },
              {
                number: "∞",
                unit: "Projects",
                desc: "No limit on what you can showcase",
              },
              {
                number: "0",
                unit: "Gatekeeping",
                desc: "Open to every age and background",
              },
              {
                number: "10K+",
                unit: "Creators",
                desc: "Already waiting to join Rachnax",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 border ${
                  i === 0
                    ? "bg-black border-transparent text-white"
                    : "bg-white border-black/8 text-black"
                }`}
              >
                <p
                  className={`font-display text-4xl mb-1 ${
                    i === 0 ? "text-white" : "text-black"
                  }`}
                >
                  {s.number}
                </p>
                <p
                  className={`text-sm font-medium mb-2 ${
                    i === 0 ? "text-white/70" : "text-black/70"
                  }`}
                >
                  {s.unit}
                </p>
                <p
                  className={`text-xs leading-relaxed ${
                    i === 0 ? "text-white/40" : "text-black/40"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <Icon.User />,
      title: "Create your profile",
      desc: "Set up in minutes. Add your skills, bio, and what you're looking for — job, freelance, or collaboration.",
    },
    {
      num: "02",
      icon: <Icon.Portfolio />,
      title: "Showcase your projects",
      desc: "Upload anything you've built. Each project gets a rich page with demos, screenshots, links, and context.",
    },
    {
      num: "03",
      icon: <Icon.Eye />,
      title: "Get discovered",
      desc: "Employers and clients browse Rachnax. Your work makes the first impression — not your college name.",
    },
    {
      num: "04",
      icon: <Icon.Flash />,
      title: "Earn and grow",
      desc: "Get hired full-time, land freelance gigs via InstaHire, or collaborate with creators who match your vision.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 bg-black/[0.02] border-y border-black/6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black/35 text-xs tracking-widest uppercase font-medium mb-5">
            How It Works
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-black leading-tight">
            From zero to <span className="italic">recognized</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/8 rounded-2xl overflow-hidden border border-black/8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[#e8e9e8] p-8 relative hover:bg-white transition-colors group"
            >
              <p className="font-display text-5xl text-black/6 absolute top-6 right-6">
                {step.num}
              </p>
              <div className="text-black/40 mb-5 group-hover:text-black/70 transition-colors">
                {step.icon}
              </div>
              <h3 className="font-display text-lg text-black mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-black/50 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ──────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: <Icon.Portfolio />,
      title: "Portfolio Builder",
      desc: "A stunning, shareable portfolio page built for you — no code needed. Fully customizable to match your style.",
      tag: "For everyone",
      featured: false,
    },
    {
      icon: <Icon.Globe />,
      title: "Project Showcase",
      desc: "Every project gets its own rich page. Add demos, images, links, and context. Let your work tell its own story.",
      tag: "Creators & Students",
      featured: false,
    },
    {
      icon: <Icon.Flash />,
      title: "InstaHire",
      desc: "Get hired as a freelancer instantly. Clients post micro-projects, you apply with your existing portfolio.",
      tag: "Freelancers",
      featured: true,
    },
    {
      icon: <Icon.Medal />,
      title: "Recognition Engine",
      desc: "Get upvotes, featured spots, and merit badges. Rachnax surfaces talent based on work quality, not background.",
      tag: "All creators",
      featured: false,
    },
    {
      icon: <Icon.People />,
      title: "Collaboration Hub",
      desc: "Find co-founders, teammates, or collaborators. Connect with people who share your vision and skill gaps.",
      tag: "Builders",
      featured: false,
    },
    {
      icon: <Icon.Chart />,
      title: "Analytics Dashboard",
      desc: "See who viewed your profile, which projects got traction, and track your growth and visibility over time.",
      tag: "Pro",
      featured: false,
    },
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-black/35 text-xs tracking-widest uppercase font-medium mb-5">
              What We Offer
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-black leading-tight">
              Everything you need
              <br />
              <span className="italic">to get noticed</span>
            </h2>
          </div>
          <p className="text-black/50 max-w-xs text-sm leading-relaxed">
            Rachnax bundles every tool a creator needs — portfolio, showcase,
            hiring, freelancing — into one clean platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 border flex flex-col gap-5 group transition-all hover:-translate-y-0.5 hover:shadow-md ${
                s.featured
                  ? "bg-black border-transparent"
                  : "bg-white border-black/8 hover:border-black/15"
              }`}
            >
              <div
                className={`${
                  s.featured ? "text-white/60" : "text-black/40"
                } group-hover:${
                  s.featured ? "text-white/90" : "text-black/70"
                } transition-colors`}
              >
                {s.icon}
              </div>
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3
                    className={`font-display text-xl ${
                      s.featured ? "text-white" : "text-black"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5 ${
                      s.featured
                        ? "bg-white/10 text-white/50"
                        : "bg-black/5 text-black/45"
                    }`}
                  >
                    {s.tag}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    s.featured ? "text-white/50" : "text-black/50"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TICKER ────────────────────────────────────────────────────────────────────
function Ticker() {
  const tags = [
    "Portfolio",
    "InstaHire",
    "Freelance",
    "Showcase",
    "Recognition",
    "Collaborate",
    "Get Hired",
    "Build",
    "Earn",
    "Grow",
  ];

  return (
    <div className="py-5 bg-black border-y border-white/5 overflow-hidden select-none">
      <div className="flex gap-10 ticker-scroll whitespace-nowrap">
        {[...tags, ...tags, ...tags].map((tag, i) => (
          <span
            key={i}
            className="text-sm text-white/25 font-body tracking-widest uppercase flex items-center gap-10"
          >
            {tag}
            <span className="text-white/10 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:pt-4">
            <p className="text-black/35 text-xs tracking-widest uppercase font-medium mb-5">
              Get Early Access
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-black leading-tight mb-6">
              Be the first
              <br />
              <span className="italic">to launch.</span>
            </h2>
            <p className="text-black/50 leading-relaxed mb-10">
              Rachnax is launching soon. Join the waitlist and be among the
              first creators to showcase their work on our platform.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <Icon.Flash />,
                  title: "Early Access",
                  desc: "Be first to get on the platform before public launch.",
                },
                {
                  icon: <Icon.Medal />,
                  title: "Founding Member Badge",
                  desc: "Exclusive badge on your profile forever.",
                },
                {
                  icon: <Icon.People />,
                  title: "Priority Support",
                  desc: "Direct line to our team during onboarding.",
                },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0 text-black/50">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black mb-0.5">
                      {b.title}
                    </p>
                    <p className="text-sm text-black/45">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-black rounded-3xl p-8">
            <h3 className="font-display text-2xl text-white mb-1">
              Join the Waitlist
            </h3>
            <p className="text-white/40 text-sm mb-8">
              No spam. Only launch updates.
            </p>

            <div className="space-y-4">
              {/* Name */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Icon.User />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/6 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Icon.Mail />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/6 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors"
                />
              </div>

              {/* Role */}
              <div className="grid grid-cols-2 gap-2">
                {["Student", "Professional", "Freelancer", "Creator"].map(
                  (r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-2.5 px-4 rounded-xl text-sm border transition-all ${
                        role === r
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:text-white/70"
                      }`}
                    >
                      {r}
                    </button>
                  )
                )}
              </div>

              <a
                href={`mailto:hello@rachnax.com?subject=Waitlist: ${encodeURIComponent(
                  name
                )}&body=Name: ${encodeURIComponent(
                  name
                )}%0AEmail: ${encodeURIComponent(
                  email
                )}%0ARole: ${encodeURIComponent(role)}`}
                className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors mt-2"
              >
                Reserve My Spot
                <Icon.ArrowRight />
              </a>

              <p className="text-white/25 text-xs text-center">
                Or email us directly at{" "}
                <a
                  href="mailto:hello@rachnax.com"
                  className="underline hover:text-white/50 transition-colors"
                >
                  hello@rachnax.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-black/8 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 relative">
            <Image
              src="/logo.png"
              alt="Rachnax"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="font-display text-base text-black">Rachnax</span>
        </Link>

        <p className="text-xs text-black/35 text-center">
          © {new Date().getFullYear()} Rachnax. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm text-black/45">
          <a
            href="mailto:hello@rachnax.com"
            className="hover:text-black transition-colors flex items-center gap-1.5 text-xs"
          >
            <Icon.Mail /> hello@rachnax.com
          </a>
          <a href="#" className="hover:text-black transition-colors text-xs">
            Twitter
          </a>
          <a href="#" className="hover:text-black transition-colors text-xs">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <About />
        <HowItWorks />
        <Services />
        <Ticker />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

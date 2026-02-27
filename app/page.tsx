import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Rachnax — Showcase Your Work, Get Recognized',
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemsSection />
        <AboutSection />
        <HowItWorksSection />
        <ServicesSection />
        <MarqueeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-black/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-black/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Badge */}
      <div className="animate-fade-up delay-100 mb-8 inline-flex items-center gap-2 bg-black text-[#e8e9e8] px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-widest uppercase">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Now in Early Access — Join the Waitlist
      </div>

      {/* Headline */}
      <h1 className="animate-fade-up delay-200 font-display text-center text-5xl md:text-7xl lg:text-8xl text-black leading-[0.95] tracking-tight max-w-5xl">
        Your Work<br />
        <span className="italic">Deserves</span> to Be<br />
        <span className="relative inline-block">
          Seen
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 16" fill="none">
            <path d="M2 12 Q100 4 200 10 Q300 16 398 8" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </span>
      </h1>

      {/* Subheadline */}
      <p className="animate-fade-up delay-300 mt-10 font-body text-center text-lg md:text-xl text-black/60 max-w-2xl leading-relaxed">
        Rachnax is the platform where <strong className="text-black font-medium">creators, students, and professionals</strong> showcase projects, build portfolios, get recognized, and get hired — all in one place.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up delay-400 mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#contact"
          className="btn-magnetic bg-black text-[#e8e9e8] px-8 py-4 rounded-full font-body font-medium text-base hover:bg-black/80 transition-colors inline-flex items-center gap-2"
        >
          Join Waitlist
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a
          href="#how-it-works"
          className="btn-magnetic border border-black/20 text-black px-8 py-4 rounded-full font-body font-medium text-base hover:border-black/40 hover:bg-black/5 transition-all"
        >
          See How It Works
        </a>
      </div>

      {/* Hero Visual — Abstract Portfolio Cards */}
      <div className="animate-fade-up delay-500 mt-20 w-full max-w-4xl relative">
        <div className="flex gap-4 justify-center items-end flex-wrap">
          {/* Card 1 */}
          <div className="card-hover w-44 bg-white rounded-2xl p-4 shadow-sm border border-black/8 flex flex-col gap-3">
            <div className="w-full h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-3xl">🎨</div>
            <div>
              <div className="w-20 h-2.5 bg-black rounded-full mb-1.5" />
              <div className="w-14 h-2 bg-black/20 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-300 to-pink-400" />
              <div className="w-16 h-2 bg-black/15 rounded-full" />
            </div>
            <div className="flex gap-1">
              <span className="text-xs bg-black/6 text-black/60 px-2 py-0.5 rounded-full">Design</span>
              <span className="text-xs bg-black/6 text-black/60 px-2 py-0.5 rounded-full">UI</span>
            </div>
          </div>

          {/* Card 2 — center, elevated */}
          <div className="card-hover w-52 bg-black rounded-2xl p-4 shadow-xl flex flex-col gap-3 -translate-y-4">
            <div className="w-full h-28 bg-white/10 rounded-xl flex items-center justify-center text-4xl">💻</div>
            <div>
              <div className="w-24 h-2.5 bg-white rounded-full mb-1.5" />
              <div className="w-16 h-2 bg-white/30 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
              <div className="w-20 h-2 bg-white/25 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <span className="text-xs bg-white/15 text-white/80 px-2 py-0.5 rounded-full">Dev</span>
                <span className="text-xs bg-white/15 text-white/80 px-2 py-0.5 rounded-full">App</span>
              </div>
              <span className="text-xs text-green-400 font-medium">Hired ✓</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-hover w-44 bg-white rounded-2xl p-4 shadow-sm border border-black/8 flex flex-col gap-3">
            <div className="w-full h-24 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <div className="w-20 h-2.5 bg-black rounded-full mb-1.5" />
              <div className="w-14 h-2 bg-black/20 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-teal-500" />
              <div className="w-16 h-2 bg-black/15 rounded-full" />
            </div>
            <div className="flex gap-1">
              <span className="text-xs bg-black/6 text-black/60 px-2 py-0.5 rounded-full">Data</span>
              <span className="text-xs bg-black/6 text-black/60 px-2 py-0.5 rounded-full">ML</span>
            </div>
          </div>
        </div>

        {/* Stats below cards */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="font-display text-4xl text-black">10K+</p>
            <p className="font-body text-sm text-black/50 mt-1">Creators Ready</p>
          </div>
          <div className="w-px bg-black/10 hidden md:block" />
          <div>
            <p className="font-display text-4xl text-black">∞</p>
            <p className="font-body text-sm text-black/50 mt-1">Projects to Showcase</p>
          </div>
          <div className="w-px bg-black/10 hidden md:block" />
          <div>
            <p className="font-display text-4xl text-black">1</p>
            <p className="font-body text-sm text-black/50 mt-1">Platform for Everything</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEMS ───────────────────────────────────────── */
function ProblemsSection() {
  const problems = [
    {
      icon: '😤',
      problem: 'Your work is scattered',
      description: 'Great projects stuck in local folders, Google Drive, or random links — invisible to the world.',
    },
    {
      icon: '🙈',
      problem: 'Talent goes unnoticed',
      description: 'Students and young builders create incredible things with zero way to get recognition or opportunity.',
    },
    {
      icon: '💼',
      problem: 'Getting hired is broken',
      description: 'Resume-only hiring ignores actual skills. Employers can\'t see what you\'ve built — only where you studied.',
    },
    {
      icon: '💸',
      problem: 'Earning as a creator is hard',
      description: 'No easy path from "I made something cool" to "I got paid for my skills" for creators and freelancers.',
    },
  ];

  return (
    <section className="px-6 md:px-12 py-24 bg-black text-[#e8e9e8]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs tracking-widest uppercase text-white/40 mb-4">The Problem</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            The world is full of<br />
            <span className="italic text-white/50">unrecognized talent</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, i) => (
            <div
              key={i}
              className="card-hover border border-white/10 rounded-2xl p-8 hover:border-white/25 transition-colors"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-display text-2xl text-white mb-3">{item.problem}</h3>
              <p className="font-body text-white/50 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-16 text-center">
          <p className="font-display text-3xl md:text-5xl text-white/80">
            Rachnax is the answer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-black/40 mb-4">About Rachnax</p>
            <h2 className="font-display text-4xl md:text-5xl text-black leading-tight mb-6">
              One platform.<br />
              <span className="italic">Every creator.</span>
            </h2>
            <p className="font-body text-black/60 text-lg leading-relaxed mb-6">
              Rachnax was built on a simple belief: <strong className="text-black">your work should speak for you.</strong> Whether you&apos;re a 16-year-old who built an app, a design student with a killer portfolio, or a professional looking to freelance — Rachnax gives you a stage.
            </p>
            <p className="font-body text-black/60 text-lg leading-relaxed">
              We combine portfolio building, project showcasing, hiring, and freelancing into one seamless experience. No more jumping between 5 platforms. One profile. Infinite possibilities.
            </p>
          </div>

          {/* Right — Visual */}
          <div className="relative">
            <div className="bg-black rounded-3xl p-8 text-[#e8e9e8]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-white/40 text-xs font-body">rachnax.com/u/yourname</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-2xl">👨‍💻</div>
                <div>
                  <p className="font-display text-xl">Alex Kumar</p>
                  <p className="font-body text-white/50 text-sm">Full-Stack Developer · Student</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/60">Open to Work</span>
                    <span className="text-xs bg-green-500/20 px-2 py-0.5 rounded-full text-green-400">Freelance</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-white/40 text-xs uppercase tracking-widest">Featured Projects</p>
                {[
                  { name: 'AI Study Planner', tag: 'App', views: '2.4K', emoji: '🤖' },
                  { name: 'E-commerce Dashboard', tag: 'Web', views: '1.1K', emoji: '📊' },
                  { name: 'Open-Source UI Kit', tag: 'Design', views: '5.7K', emoji: '🎨' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{p.emoji}</span>
                      <div>
                        <p className="font-body text-sm text-white">{p.name}</p>
                        <span className="text-xs text-white/40">{p.tag}</span>
                      </div>
                    </div>
                    <span className="text-xs text-white/40">{p.views} views</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-display text-xl">12</p>
                  <p className="text-white/40 text-xs">Projects</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-display text-xl">9.2K</p>
                  <p className="text-white/40 text-xs">Views</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="font-display text-xl">3</p>
                  <p className="text-white/40 text-xs">Offers</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#e8e9e8] border border-black/10 rounded-2xl px-4 py-3 shadow-lg animate-float">
              <p className="text-xs font-body text-black/50">New offer received</p>
              <p className="font-body text-sm text-black font-medium">💼 TechCorp wants to hire you!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ───────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Create Your Profile',
      desc: 'Sign up and set up your Rachnax profile in minutes. Add your skills, bio, and what you\'re looking for.',
      icon: '👤',
    },
    {
      num: '02',
      title: 'Showcase Your Projects',
      desc: 'Upload anything you\'ve built — apps, designs, research, art, code. Every project gets its own spotlight page.',
      icon: '🚀',
    },
    {
      num: '03',
      title: 'Get Discovered',
      desc: 'Employers, clients, and collaborators browse Rachnax. Your work speaks for itself and brings opportunities to you.',
      icon: '🔍',
    },
    {
      num: '04',
      title: 'Earn & Grow',
      desc: 'Get hired full-time, land freelance gigs via InstaHire, or collaborate with other creators. Rachnax is your career launchpad.',
      icon: '💰',
    },
  ];

  return (
    <section id="how-it-works" className="px-6 md:px-12 py-24 bg-black/[0.03]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-widest uppercase text-black/40 mb-4">How It Works</p>
          <h2 className="font-display text-4xl md:text-5xl text-black leading-tight">
            From zero to <span className="italic">recognized</span><br />in 4 steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="card-hover relative bg-[#e8e9e8] border border-black/8 rounded-2xl p-6">
              <div className="text-3xl mb-4">{step.icon}</div>
              <p className="font-display text-6xl text-black/8 absolute top-4 right-5">{step.num}</p>
              <h3 className="font-display text-xl text-black mb-3">{step.title}</h3>
              <p className="font-body text-sm text-black/55 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ───────────────────────────────────────── */
function ServicesSection() {
  const services = [
    {
      icon: '🖼️',
      title: 'Portfolio Builder',
      description: 'Create a stunning portfolio page that showcases your best work — no coding needed. Fully customizable and shareable.',
      highlight: 'For everyone',
    },
    {
      icon: '📁',
      title: 'Project Showcase',
      description: 'Each project gets a rich page with demos, screenshots, links, and descriptions. Let your builds make the first impression.',
      highlight: 'Creators & Students',
    },
    {
      icon: '⚡',
      title: 'InstaHire',
      description: 'Get hired or hired as a freelancer instantly. Clients post micro-projects, creators apply with their existing portfolio.',
      highlight: 'Freelancers',
    },
    {
      icon: '🏆',
      title: 'Recognition Engine',
      description: 'Get upvotes, featured spots, and badges for your work. Rachnax surfaces the best talent regardless of age or background.',
      highlight: 'All creators',
    },
    {
      icon: '🤝',
      title: 'Collaboration Hub',
      description: 'Find co-founders, teammates, or collaborators for your next project. Connect with people who share your vision.',
      highlight: 'Builders',
    },
    {
      icon: '📈',
      title: 'Analytics Dashboard',
      description: 'See who viewed your profile, which projects got attention, and track your growth over time.',
      highlight: 'Pro feature',
    },
  ];

  return (
    <section id="services" className="px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-black/40 mb-4">What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl text-black leading-tight">
              Everything you need<br />
              <span className="italic">to get noticed</span>
            </h2>
          </div>
          <p className="font-body text-black/55 max-w-xs leading-relaxed">
            Rachnax bundles every tool a creator needs into one clean, powerful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`card-hover rounded-2xl p-7 border flex flex-col gap-4 ${i === 2 ? 'bg-black text-[#e8e9e8] border-transparent' : 'bg-white border-black/6'}`}
            >
              <div className="text-3xl">{s.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-display text-xl ${i === 2 ? 'text-white' : 'text-black'}`}>{s.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body ${i === 2 ? 'bg-white/15 text-white/60' : 'bg-black/6 text-black/50'}`}>{s.highlight}</span>
                </div>
                <p className={`font-body text-sm leading-relaxed ${i === 2 ? 'text-white/55' : 'text-black/55'}`}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MARQUEE ────────────────────────────────────────── */
function MarqueeSection() {
  const tags = ['Portfolio', 'Freelance', 'InstaHire', 'Projects', 'Recognition', 'Collaborate', 'Earn', 'Showcase', 'Get Hired', 'Build', 'Create', 'Grow'];

  return (
    <div className="py-8 border-y border-black/8 overflow-hidden bg-black">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...tags, ...tags].map((tag, i) => (
          <span key={i} className="font-display text-2xl text-white/30 flex items-center gap-8">
            {tag}
            <span className="text-white/15">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACT ────────────────────────────────────────── */
function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-body text-xs tracking-widest uppercase text-black/40 mb-4">Get Early Access</p>
        <h2 className="font-display text-4xl md:text-6xl text-black leading-tight mb-6">
          Be the first<br />
          <span className="italic">to launch</span>
        </h2>
        <p className="font-body text-black/55 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Rachnax is launching soon. Join the waitlist and be among the first creators to showcase their work on our platform.
        </p>

        {/* Waitlist form */}
        <div className="bg-black rounded-3xl p-8 md:p-12 text-left">
          <h3 className="font-display text-2xl text-white mb-2">Join the Waitlist</h3>
          <p className="font-body text-white/50 text-sm mb-8">No spam. We&apos;ll only reach out when we&apos;re ready to onboard you.</p>

          <form className="space-y-4" action="mailto:hello@rachnax.com" method="GET">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <select className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white/70 text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none">
              <option value="">I am a... (select one)</option>
              <option>Student</option>
              <option>Professional / Working</option>
              <option>Freelancer</option>
              <option>Creator / Artist</option>
              <option>Employer / Hiring</option>
            </select>
            <button
              type="submit"
              className="btn-magnetic w-full bg-[#e8e9e8] text-black font-body font-medium py-4 rounded-xl text-base hover:bg-white transition-colors"
            >
              Reserve My Spot →
            </button>
          </form>

          <p className="font-body text-white/30 text-xs mt-6 text-center">
            Questions? Email us at{' '}
            <a href="mailto:hello@rachnax.com" className="underline hover:text-white/60 transition-colors">
              hello@rachnax.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-black/8 px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
            <span className="text-[#e8e9e8] font-display font-bold text-xs">R</span>
          </div>
          <span className="font-display text-lg text-black">Rachnax</span>
        </div>

        <p className="font-body text-sm text-black/40 text-center">
          © {new Date().getFullYear()} Rachnax. All rights reserved. · rachnax.com
        </p>

        <div className="flex items-center gap-6 text-sm font-body text-black/50">
          <a href="mailto:hello@rachnax.com" className="hover:text-black transition-colors">hello@rachnax.com</a>
          <a href="#" className="hover:text-black transition-colors">Twitter</a>
          <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

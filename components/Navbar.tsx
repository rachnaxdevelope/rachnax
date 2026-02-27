"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        background: "rgba(232,233,232,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 relative flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Rachnax Logo"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
        </div>
        <span className="font-display text-xl tracking-tight text-black">
          Rachnax
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-body text-black/60">
        <Link href="#about" className="hover:text-black transition-colors">
          About
        </Link>
        <Link
          href="#how-it-works"
          className="hover:text-black transition-colors"
        >
          How it Works
        </Link>
        <Link href="#services" className="hover:text-black transition-colors">
          Services
        </Link>
        <Link href="#contact" className="hover:text-black transition-colors">
          Contact
        </Link>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Link
          href="#contact"
          className="btn-magnetic hidden md:inline-flex items-center gap-2 bg-black text-[#e8e9e8] px-5 py-2.5 rounded-full text-sm font-body font-medium hover:bg-black/80 transition-colors"
        >
          Join Waitlist
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 11L11 1M11 1H4M11 1V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

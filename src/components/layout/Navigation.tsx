"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "#home", label: "HOME" },
  { href: "#technology", label: "TECHNOLOGY" },
  { href: "#company", label: "COMPANY" },
  { href: "#roadmap", label: "ROADMAP" },
  { href: "#contact", label: "CONTACT" },
];

export function Navigation({ activeSection }: { activeSection: string }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="#home"
          className="font-display font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
          aria-label="SAN-D Home"
        >
          SAN-D
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity border border-border rounded-full"
            aria-label="Contact us"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            CONTACT
          </button>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </nav>
  );
}
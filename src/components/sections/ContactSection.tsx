"use client";

import { useEffect, useState } from "react";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("contact");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-background"
      aria-labelledby="contact-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-8 tech-panel">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              GET IN TOUCH
            </span>
          </div>

          <h2
            id="contact-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            LET'S BUILD THE
            <br />
            <span className="text-primary">FUTURE TOGETHER</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            We're always interested in collaborating with researchers, engineers,
            and organizations pushing the boundaries of semiconductor technology.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
            <div className="tech-panel-elevated p-8 rounded-xl space-y-6">
              <h3 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                CONTACT INFORMATION
              </h3>

              <div className="space-y-4">
                {[
                  { label: "GENERAL INQUIRIES", value: "hello@san-d.tech", type: "email" },
                  { label: "TECHNICAL PARTNERSHIPS", value: "partnerships@san-d.tech", type: "email" },
                  { label: "RESEARCH COLLABORATIONS", value: "research@san-d.tech", type: "email" },
                  { label: "CAREERS", value: "careers@san-d.tech", type: "email" },
                  { label: "MEDIA / PRESS", value: "press@san-d.tech", type: "email" },
                ].map((contact, i) => (
                  <a
                    key={i}
                    href={`mailto:${contact.value}`}
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 transition-all hover:border-primary/30 hover:bg-accent group"
                  >
                    <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">{contact.label}</span>
                    <span className="font-sans text-base text-foreground/90 group-hover:text-primary transition-colors">{contact.value}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="tech-panel-elevated p-8 rounded-xl space-y-6">
              <h3 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                LOCATIONS
              </h3>

              <div className="space-y-6">
                {[
                  {
                    name: "HEADQUARTERS",
                    address: "San Jose, California, USA",
                    detail: "Advanced R&D Center & Operations",
                  },
                  {
                    name: "EUROPE",
                    address: "Munich, Germany",
                    detail: "Design Center & University Partnerships",
                  },
                  {
                    name: "ASIA-PACIFIC",
                    address: "Hsinchu, Taiwan",
                    detail: "Process Integration & Manufacturing",
                  },
                ].map((loc, i) => (
                  <div key={i} className="p-6 rounded-lg bg-background/50 border border-border/50">
                    <div className="font-mono text-xs tracking-widest uppercase text-primary mb-2">{loc.name}</div>
                    <div className="font-sans text-lg text-foreground mb-1">{loc.address}</div>
                    <div className="text-muted-foreground text-sm">{loc.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-border/50">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground text-center">
              © 2025 SAN-D Technologies. All rights reserved.
            </p>
            <div className="mt-4 flex items-center justify-center gap-8 text-sm text-muted-foreground/70">
              <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-foreground transition-colors">Terms of Use</a>
              <a href="#cookies" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
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
            We&apos;re interested in hearing from investors, foundry partners,
            engineers, and anyone working on the future of memory.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
            <div className="tech-panel-elevated p-8 rounded-xl space-y-6">
              <h3 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                CONTACT INFORMATION
              </h3>

              <div className="space-y-4">
                {[
                  { label: "GENERAL INQUIRIES", value: "To be announced" },
                  { label: "INVESTORS", value: "To be announced" },
                  { label: "FOUNDRY PARTNERSHIPS", value: "To be announced" },
                  { label: "MEDIA / PRESS", value: "To be announced" },
                ].map((contact, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 p-4 rounded-lg bg-background/50 border border-border/50"
                  >
                    <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">{contact.label}</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 border border-border/50 rounded-full px-2 py-1 shrink-0">
                      PLACEHOLDER
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-panel-elevated p-8 rounded-xl space-y-6">
              <h3 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                LOCATION
              </h3>

              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-xs tracking-widest uppercase text-primary mb-2">HEADQUARTERS</div>
                      <div className="font-sans text-lg text-muted-foreground/70 mb-1">To be announced</div>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 border border-border/50 rounded-full px-2 py-1 shrink-0">
                      PLACEHOLDER
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground/70 leading-relaxed">
                SAN-D is a fabless company: we design the chip, foundries manufacture
                it. Design work is distributed; manufacturing happens at our future
                foundry partner&apos;s fabs.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-border/50">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground text-center">
              © 2026 SAN-D. All rights reserved.
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

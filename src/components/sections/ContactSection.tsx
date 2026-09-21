"use client";

import { Reveal } from "@/components/ui/Reveal";
import { LevelEyebrow } from "@/components/ui/LevelEyebrow";

const CHANNELS = [
  {
    label: "General inquiries",
    name: "Dharshan Kumar",
    value: "dharshankkumar9103@gmail.com",
    href: "mailto:dharshankkumar9103@gmail.com",
  },
  { label: "Investors", value: "To be announced", placeholder: true },
  { label: "Foundry partnerships", value: "To be announced", placeholder: true },
  {
    label: "Technical inquiries",
    value: "dharshankkumar9103@gmail.com",
    href: "mailto:dharshankkumar9103@gmail.com",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative" aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <Reveal>
          <LevelEyebrow level="Level 04" label="Contact" />

          <h2
            id="contact-title"
            className="font-display font-bold tracking-tight text-foreground mb-6"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            LET&apos;S BUILD THE
            <br />
            <span className="text-primary">FUTURE TOGETHER</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14">
            We&apos;re interested in hearing from investors, foundry partners,
            engineers, and anyone working on the future of memory.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mb-14">
          <Reveal>
            <div className="dream-card p-8 rounded-xl h-full">
              <h3
                className="font-display font-bold text-foreground mb-6"
                style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)" }}
              >
                CONTACT INFORMATION
              </h3>
              <div className="space-y-3">
                {CHANNELS.map((contact) => (
                  <div
                    key={contact.label}
                    className="flex items-center justify-between gap-4 p-4 rounded-lg bg-background/60 border border-border/60"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                        {contact.label}
                      </div>
                      {contact.name && (
                        <div className="text-foreground mt-1">{contact.name}</div>
                      )}
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="font-mono text-xs text-primary hover:underline break-all text-right shrink-0"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 border border-border/60 rounded-full px-2 py-1 shrink-0">
                        {contact.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="dream-card p-8 rounded-xl h-full">
              <h3
                className="font-display font-bold text-foreground mb-6"
                style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)" }}
              >
                LOCATION
              </h3>
              <div className="p-6 rounded-lg bg-background/60 border border-border/60 mb-6">
                <div className="font-mono text-xs tracking-widest uppercase text-primary mb-2">
                  Headquarters
                </div>
                <div className="font-sans text-lg text-muted-foreground/70">
                  To be announced
                </div>
              </div>
              <p className="text-sm text-muted-foreground/70 leading-relaxed">
                SAN-D is a fabless company: we design the chip, foundries manufacture
                it. Design work is distributed; manufacturing happens at our future
                foundry partner&apos;s fabs.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="totem-divider mb-10" aria-hidden="true">
            <span />
          </div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground text-center">
            © 2026 SAN-D. All rights reserved.
          </p>
          <div className="mt-4 flex items-center justify-center gap-8 text-sm text-muted-foreground/70">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-foreground transition-colors">Terms of Use</a>
            <a href="#cookies" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

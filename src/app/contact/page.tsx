import { SecondaryLayout } from "@/components/layout/SecondaryLayout";
import Link from "next/link";

export default function ContactPage() {
  return (
    <SecondaryLayout>
      <div className="space-y-20">
        {/* Hero */}
        <section className="text-center py-16">
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight mb-6">
            CONTACT
          </h1>
          <p className="font-sans text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            We&apos;re always interested in collaborating with researchers, engineers,
            and organizations pushing the boundaries of semiconductor technology.
          </p>
        </section>

        {/* Contact Info */}
        <section className="grid gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <article className="p-8 bg-background/50 border border-border/50 rounded-xl">
              <h2 className="font-display font-bold text-foreground mb-6">
                CONTACT INFORMATION
              </h2>
              <div className="space-y-6">
                {[
                  { label: "GENERAL INQUIRIES", value: "hello@san-d.tech", type: "email" },
                  { label: "TECHNICAL PARTNERSHIPS", value: "partnerships@san-d.tech", type: "email" },
                  { label: "RESEARCH COLLABORATIONS", value: "research@san-d.tech", type: "email" },
                  { label: "CAREERS", value: "careers@san-d.tech", type: "email" },
                  { label: "MEDIA / PRESS", value: "press@san-d.tech", type: "email" },
                ].map((contact, i) => (
                  <div key={i} className="p-4 bg-background border border-border/50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
                          {contact.label}
                        </p>
                        <a
                          href={`mailto:${contact.value}`}
                          className="font-sans text-base text-foreground/90 hover:text-primary transition-colors"
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Locations */}
            <article className="p-8 bg-background/50 border border-border/50 rounded-xl">
              <h2 className="font-display font-bold text-foreground mb-6">
                GLOBAL LOCATIONS
              </h2>
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
                  <div key={i} className="p-6 bg-background border border-border/50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                      <div>
                        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">
                          {loc.name}
                        </p>
                        <p className="font-sans text-lg text-foreground mb-1">
                          {loc.address}
                        </p>
                        <p className="text-muted-foreground text-sm">{loc.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* Contact Form */}
        <section className="border-t border-border/50 pt-16">
          <h2 className="font-display font-bold text-foreground mb-8">
            GET IN TOUCH
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed mb-12">
            Have a question, partnership idea, or just want to say hello?
            Please fill out the form below and we&apos;ll get back to you shortly.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block mb-2 font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-mono text-xs tracking-widest uppercase text-muted-foreground">
                ORGANIZATION / AFFILIATION
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Company, university, or lab (optional)"
              />
            </div>

            <div>
              <label className="block mb-2 font-mono text-xs tracking-widest uppercase text-muted-foreground">
                MESSAGE
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="How can we help you?"
              />
            </div>

            <div className="flex items-center justify-start">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                SEND MESSAGE
                <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-5 5M22 2 5 11" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider uppercase rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            RETURN TO HOME
            <span className="w-4 h-4 flex items-center justify-center" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </section>
      </div>
    </SecondaryLayout>
  );
}

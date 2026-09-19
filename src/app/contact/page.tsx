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
            We&apos;re interested in hearing from investors, foundry partners,
            engineers, and anyone working on the future of memory.
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
                  { label: "GENERAL INQUIRIES", value: "To be announced" },
                  { label: "INVESTORS", value: "To be announced" },
                  { label: "FOUNDRY PARTNERSHIPS", value: "To be announced" },
                  { label: "MEDIA / PRESS", value: "To be announced" },
                ].map((contact, i) => (
                  <div key={i} className="p-4 bg-background border border-border/50 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
                          {contact.label}
                        </p>
                        <p className="font-sans text-base text-muted-foreground/70">
                          {contact.value}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 border border-border/50 rounded-full px-2 py-1 shrink-0">
                        PLACEHOLDER
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground/70 mt-6 leading-relaxed">
                Contact details will be published here once they are finalized.
              </p>
            </article>

            {/* Location */}
            <article className="p-8 bg-background/50 border border-border/50 rounded-xl">
              <h2 className="font-display font-bold text-foreground mb-6">
                LOCATION
              </h2>
              <div className="p-6 bg-background border border-border/50 rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">
                      HEADQUARTERS
                    </p>
                    <p className="font-sans text-lg text-muted-foreground/70 mb-1">
                      To be announced
                    </p>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 border border-border/50 rounded-full px-2 py-1 shrink-0">
                    PLACEHOLDER
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground/70 mt-6 leading-relaxed">
                SAN-D is a fabless company: we design the chip, foundries manufacture
                it. Design work is distributed; manufacturing happens at our future
                foundry partner&apos;s fabs.
              </p>
            </article>
          </div>
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

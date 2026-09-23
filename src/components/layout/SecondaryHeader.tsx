import Image from "next/image";
import Link from "next/link";

export function SecondaryHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="flex items-center gap-4 px-6">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
          aria-label="SAN-D Home"
        >
          <Image
            src="/san-d-logo.png"
            alt="SAN-D"
            width={160}
            height={48}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-mono text-xs tracking-widest uppercase">
          <Link
            href="/"
            className="hover:text-foreground transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/technology"
            className="hover:text-foreground transition-colors"
          >
            TECHNOLOGY
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            ABOUT
          </Link>
          <Link
            href="/roadmap"
            className="hover:text-foreground transition-colors"
          >
            ROADMAP
          </Link>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            CONTACT
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 px-6">
        <button
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase text-foreground hover:opacity-70 transition-opacity border border-border rounded-full"
          aria-label="Contact us"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
          CONTACT
        </button>
      </div>
    </header>
  );
}
import { ReactNode } from "react";
import { SecondaryHeader } from "./SecondaryHeader";
import "@/app/globals.css"; // Reuse the same globals for design tokens

export function SecondaryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SecondaryHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background text-foreground pb-16">
        <div className="max-w-7xl mx-auto px-6 py-12">{children}</div>
      </main>
    </>
  );
}
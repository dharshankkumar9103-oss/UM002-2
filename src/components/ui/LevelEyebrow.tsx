export function LevelEyebrow({ level, label }: { level: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8" aria-hidden="true">
      <span className="font-mono text-xs tracking-[0.35em] uppercase text-accent">
        {level}
      </span>
      <span className="h-px w-14 bg-border" />
      <span className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

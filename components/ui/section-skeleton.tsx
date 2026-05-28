export function SectionSkeleton({ label = "Loading…" }: { label?: string }) {
  return (
    <section className="mt-16 animate-pulse rounded-3xl border border-slate-800 bg-slate-950/90 p-10 text-center">
      <div className="mx-auto h-4 w-32 rounded-full bg-slate-800" />
      <p className="mt-4 text-sm text-slate-500">{label}</p>
    </section>
  );
}

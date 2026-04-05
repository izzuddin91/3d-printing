import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl p-10 text-white md:p-16">
      <Image
        src="/3d-printer.png"
        alt="3D printer producing a custom object"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/65 via-blue-900/55 to-purple-900/55" />

      {/* Decorative background elements */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-pink-400/10 blur-3xl" />

      <div className="relative z-10">
        <p className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-blue-100 backdrop-blur-sm">
          ✨ Reliable 3D printing partner
        </p>
        <h1 className="mt-4 max-w-3xl bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-6xl">
          Prototype, iterate, and manufacture custom parts faster.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
          We help product teams, makers, and small businesses ship better
          hardware with fast turnaround and consistent quality. From concept to
          delivery in days, not weeks.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/quote"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <span>Request a Quote</span>
            <span>→</span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 backdrop-blur-sm"
          >
            <span>View Portfolio</span>
            <span>↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

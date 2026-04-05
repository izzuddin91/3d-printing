import { PortfolioGrid } from "@/components/portfolio-grid";

export default function PortfolioPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Portfolio</p>
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">Recent projects</h1>
        <p className="max-w-3xl text-neutral-600">
          A sample of functional parts and creative prints delivered for startups, makers, and local businesses.
        </p>
      </div>
      <section className="mt-10">
        <PortfolioGrid />
      </section>
    </main>
  );
}



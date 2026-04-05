import Link from "next/link";

import { FaqList } from "@/components/faq-list";
import { Hero } from "@/components/hero";
import { HomeCarousel } from "@/components/home-carousel";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { ServiceCards } from "@/components/service-cards";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-20 px-6 py-12">
      <Hero />
      <HomeCarousel />

      <section>
        <div className="mb-8 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Our Expertise</p>
          <h2 className="text-4xl font-bold tracking-tight text-blue-950">What we offer</h2>
          <p className="max-w-2xl text-neutral-600">
            Everything needed to get your 3D printed parts from idea to delivery.
          </p>
        </div>
        <ServiceCards />
      </section>

      <section className="card-glow overflow-hidden bg-gradient-to-br from-white to-blue-50 p-10">
        <h2 className="text-3xl font-bold tracking-tight text-blue-950">🚀 How we work</h2>
        <ol className="mt-8 grid gap-6 text-sm text-neutral-700 md:grid-cols-4">
          <li className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <p className="mt-3 font-semibold text-blue-950">Share your file</p>
            <p className="mt-2 text-neutral-600">Upload STL/STEP or describe your concept.</p>
          </li>
          <li className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <p className="mt-3 font-semibold text-blue-950">Review and quote</p>
            <p className="mt-2 text-neutral-600">
              We confirm material, print settings, and timeline.
            </p>
          </li>
          <li className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="mt-3 font-semibold text-blue-950">Print and inspect</p>
            <p className="mt-2 text-neutral-600">
              Every part is checked for finish and dimension tolerance.
            </p>
          </li>
          <li className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <p className="mt-3 font-semibold text-blue-950">Deliver</p>
            <p className="mt-2 text-neutral-600">
              Pickup or shipping with careful protective packing.
            </p>
          </li>
        </ol>
      </section>

      <section>
        <div className="mb-8 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Portfolio</p>
          <h2 className="text-4xl font-bold tracking-tight text-blue-950">Recent projects</h2>
          <p className="max-w-2xl text-neutral-600">
            Examples of real-world prints delivered by our team.
          </p>
        </div>
        <PortfolioGrid />
      </section>

      <section className="card-glow overflow-hidden bg-gradient-to-br from-white to-blue-50 p-10">
        <div className="mb-6 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">❓ Common questions</h2>
          <p className="text-neutral-600">Find answers to frequently asked questions about our services.</p>
        </div>
        <FaqList />
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-10 text-white md:p-16">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-pink-400/10 blur-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold tracking-tight">Ready to start your print?</h2>
          <p className="mt-3 max-w-2xl text-lg text-blue-100">
            Send your requirements and get a detailed quote with timeline, material
            recommendations, and delivery options within one business day.
          </p>
          <Link
            href="/quote"
            className="btn-primary mt-6 inline-flex"
          >
            <span>Get my quote</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

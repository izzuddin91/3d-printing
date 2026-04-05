import { ServiceCards } from "@/components/service-cards";

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Services</p>
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">Complete 3D printing solutions</h1>
        <p className="max-w-3xl text-neutral-600">
          End-to-end support from early prototype to small-batch delivery with quality checks at every stage.
        </p>
      </div>
      <section className="mt-10">
        <ServiceCards />
      </section>
    </main>
  );
}



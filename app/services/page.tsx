import { ServiceCards } from "@/components/service-cards";

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Services
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">
          3D printing services built for speed and quality
        </h1>
        <p className="max-w-3xl text-neutral-600">
          From one-off prototypes to repeatable production runs, we help you
          deliver functional and visual parts on schedule.
        </p>
      </div>

      {/* Main Hero Image */}
      <div className="mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 md:p-12">
          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">
                State-of-the-art 3D printing technology
              </h2>
              <p className="text-neutral-700">
                Our advanced printers and materials deliver precision parts with
                professional finishes. From rapid prototyping to production
                runs, we ensure quality and reliability in every project.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/30720501/pexels-photo-30720501.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="3D printer in action creating detailed parts"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <ServiceCards />
    </main>
  );
}

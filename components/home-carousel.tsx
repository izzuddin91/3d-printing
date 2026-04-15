import Image from "next/image";

import { carouselSlides } from "@/lib/site-data";

export function HomeCarousel() {
  return (
    <section>
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Showcase
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-blue-950">
          Prints we deliver
        </h2>
      </div>

      {/* Main Hero Image */}
      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 md:p-12">
          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-950 md:text-3xl">
                From concept to creation
              </h3>
              <p className="text-neutral-700">
                We transform digital designs into physical reality. Our
                portfolio showcases the diverse range of projects we brought to
                life, from functional prototypes to artistic creations.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/19835263/pexels-photo-19835263.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="3D printer creating detailed parts in modern workshop"
                width={600}
                height={400}
                className="w-full rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {carouselSlides.map((slide) => (
          <article
            key={slide.title}
            className="overflow-hidden rounded-2xl border border-blue-100 bg-white"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-blue-950">{slide.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{slide.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

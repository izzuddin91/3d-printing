"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { homeCarouselSlides } from "@/lib/site-data";

const AUTO_ROTATE_MS = 4500;

export function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = homeCarouselSlides.length;

  useEffect(() => {
    if (isPaused || totalSlides < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides]);

  function goToPrevious() {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }

  function goToNext() {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }

  return (
    <section className="card-glow overflow-hidden bg-gradient-to-br from-white to-blue-50 p-6 md:p-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Featured Prints</p>
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">See what we can build for you</h2>
          <p className="max-w-2xl text-sm text-neutral-600 md:text-base">
            A quick look at real 3D printed projects across prototyping, production tooling, and collectibles.
          </p>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[240px] overflow-hidden rounded-2xl sm:h-[320px] md:h-[420px]">
          {homeCarouselSlides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1100px"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-6">
                  <p className="text-xl font-semibold md:text-2xl">{slide.title}</p>
                  <p className="mt-1 text-sm text-blue-100 md:text-base">{slide.caption}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-3">
          <button
            type="button"
            onClick={goToPrevious}
            className="pointer-events-auto rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-blue-950 shadow hover:bg-white"
            aria-label="Show previous featured object"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="pointer-events-auto rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-blue-950 shadow hover:bg-white"
            aria-label="Show next featured object"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {homeCarouselSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-blue-600" : "w-2.5 bg-blue-200 hover:bg-blue-300"}`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
        <p className="text-xs text-neutral-500">Autoplay pauses on hover</p>
      </div>
    </section>
  );
}


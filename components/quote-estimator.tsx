"use client";

import { useMemo, useState } from "react";

import { materials, projectTypes } from "@/lib/site-data";

const baseByType: Record<(typeof projectTypes)[number], number> = {
  Prototype: 45,
  "Replacement part": 35,
  "Small-batch product": 120,
  "Art/collectible": 70,
  "Educational model": 55,
};

const materialMultiplier: Record<string, number> = {
  PLA: 1,
  PETG: 1.2,
  ABS: 1.3,
  TPU: 1.55,
  Resin: 1.65,
};

export function QuoteEstimator() {
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]>("Prototype");
  const [material, setMaterial] = useState("PLA");
  const [quantity, setQuantity] = useState(1);

  const estimate = useMemo(() => {
    const base = baseByType[projectType];
    const multiplier = materialMultiplier[material] ?? 1;
    const subtotal = base * multiplier * quantity;
    const lower = Math.round(subtotal * 0.9);
    const upper = Math.round(subtotal * 1.15);
    return { lower, upper };
  }, [material, projectType, quantity]);

  return (
    <section className="card-glow overflow-hidden bg-gradient-to-br from-white to-blue-50 p-8">
      <h2 className="text-2xl font-bold tracking-tight text-blue-950">💰 Quick Price Estimator</h2>
      <p className="mt-2 text-sm text-neutral-600">Use this for planning. Final price depends on model size and print complexity.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          <span className="mb-2 block font-semibold text-neutral-700">Project type</span>
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={projectType}
            onChange={(event) => setProjectType(event.target.value as (typeof projectTypes)[number])}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-2 block font-semibold text-neutral-700">Material</span>
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
          >
            {materials.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-2 block font-semibold text-neutral-700">Quantity</span>
          <input
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
          />
        </label>
      </div>

      <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 p-6 text-white">
        <p className="text-sm text-blue-200">Estimated price range</p>
        <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          ${estimate.lower} - ${estimate.upper}
        </p>
      </div>
    </section>
  );
}



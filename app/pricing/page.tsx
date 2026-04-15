import { QuoteEstimator } from "@/components/quote-estimator";
import { getFilamentPrices } from "@/lib/filament-store";
import type { FilamentPrice } from "@/lib/types";

// Prevent prerendering since this requires Firestore access
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  let filaments: FilamentPrice[] = [];

  try {
    filaments = await getFilamentPrices();
  } catch (error) {
    console.error("Failed to load filament prices:", error);
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-6 py-14">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Pricing
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">
          Transparent pricing guidance
        </h1>
        <p className="max-w-3xl text-neutral-600">
          Final pricing depends on geometry complexity, print duration, and
          post-processing requirements. Use the estimator below to get a rough
          range.
        </p>
      </div>

      <QuoteEstimator />

      <section className="rounded-2xl border border-blue-100 bg-white p-8">
        <h2 className="text-2xl font-bold text-blue-950">
          Available Materials
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filaments.length === 0 ? (
            <div className="col-span-full text-center py-8 text-neutral-500">
              <p>Filament prices are being loaded...</p>
              <p className="text-sm mt-2">
                If this persists, please contact support.
              </p>
            </div>
          ) : (
            filaments
              .filter((filament) => filament.inStock)
              .map((filament) => (
                <article
                  key={filament.id}
                  className="rounded-xl border border-neutral-200 p-4"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-blue-950">
                      {filament.name}
                    </h3>
                    <span
                      className="inline-block w-3 h-3 rounded-full ml-2"
                      style={{ backgroundColor: filament.color.toLowerCase() }}
                      title={filament.color}
                    />
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    {filament.material} • {filament.color}
                  </p>
                  <p className="mt-2 text-sm font-medium text-blue-600">
                    RM {filament.pricePerGram.toFixed(2)} per gram
                  </p>
                  {filament.pricePerMeter && (
                    <p className="mt-1 text-xs text-neutral-500">
                      RM {filament.pricePerMeter.toFixed(2)} per meter
                    </p>
                  )}
                  {filament.description && (
                    <p className="mt-2 text-xs text-neutral-600">
                      {filament.description}
                    </p>
                  )}
                </article>
              ))
          )}
        </div>
      </section>
    </main>
  );
}

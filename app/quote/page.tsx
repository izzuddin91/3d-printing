"use client";

import { useActionState, useState, useEffect } from "react";

import { submitQuoteRequest } from "@/app/quote/actions";
import { initialQuoteFormState, type QuoteFormState } from "@/lib/quote-form";
import { SubmissionSummaryModal } from "@/components/submission-summary-modal";
import { getFilamentPrices } from "@/lib/filament-store";

const projectTypes = [
  "Prototype",
  "Replacement part",
  "Small-batch product",
  "Art/collectible",
] as const;

export default function QuotePage() {
  const [state, action, isPending] = useActionState(
    submitQuoteRequest,
    initialQuoteFormState,
  );
  const [showModal, setShowModal] = useState(false);
  const [materials, setMaterials] = useState<string[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);

  // Fetch materials from Firebase
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const filamentPrices = await getFilamentPrices();
        // Extract unique materials from filament prices
        const uniqueMaterials = [
          ...new Set(filamentPrices.map((fp) => fp.material)),
        ].sort();
        setMaterials(uniqueMaterials);
      } catch (error) {
        console.error("Failed to load materials:", error);
        // Fallback to hardcoded materials if Firebase fails
        setMaterials(["PLA", "PETG", "ABS", "TPU", "Resin"]);
      } finally {
        setLoadingMaterials(false);
      }
    };

    loadMaterials();
  }, []);

  // Show modal when submission is successful
  useEffect(() => {
    if (state.success && state.data) {
      setShowModal(true);
    }
  }, [state.success, state.data]);

  return (
    <>
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Quote Request
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950">
            Upload your project details
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Share your requirements and a downloadable STL or 3D file link.
          </p>

          <form action={action} className="mt-8 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-neutral-700">
                Name *
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="name"
                  required
                />
              </label>
              <label className="text-sm font-medium text-neutral-700">
                Email
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="email"
                  type="email"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-neutral-700">
                Phone number *
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="phone"
                  required
                />
              </label>
              <label className="text-sm font-medium text-neutral-700">
                STL / 3D File URL *
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="fileUrl"
                  placeholder="https://drive.google.com/..."
                  type="url"
                  required
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="text-sm font-medium text-neutral-700">
                Project type
                <select
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="projectType"
                  defaultValue={projectTypes[0]}
                >
                  {projectTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Material
                <select
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900 disabled:opacity-60"
                  name="material"
                  defaultValue={materials[0] || ""}
                  disabled={loadingMaterials}
                >
                  {loadingMaterials ? (
                    <option>Loading materials...</option>
                  ) : (
                    materials.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                  )}
                </select>
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Quantity
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  defaultValue={1}
                  min={1}
                  name="quantity"
                  type="number"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-neutral-700">
                Target date
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="targetDate"
                  type="date"
                />
              </label>
              <label className="text-sm font-medium text-neutral-700">
                Notes
                <textarea
                  className="mt-2 h-24 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="notes"
                />
              </label>
            </div>

            <button
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Submitting..." : "Submit quote request"}
            </button>

            {state.message ? (
              <p
                className={`text-sm ${state.success ? "text-emerald-600" : "text-red-600"}`}
              >
                {state.message}
              </p>
            ) : null}
          </form>
        </div>
      </main>

      <SubmissionSummaryModal
        isOpen={showModal}
        data={state.data || null}
        onDismiss={() => setShowModal(false)}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

import { addQuoteRequest } from "@/lib/quote-store";
import { SubmissionSummaryModal } from "@/components/submission-summary-modal";
import { getFilamentPrices } from "@/lib/filament-store";
import type { QuoteRequest } from "@/lib/types";

const projectTypes = [
  "Prototype",
  "Replacement part",
  "Small-batch product",
  "Art/collectible",
] as const;

const serviceDescriptions = ["Printing Service"] as const;

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

export default function QuotePage() {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submittedData, setSubmittedData] =
    useState<Partial<QuoteRequest> | null>(null);
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

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage("");
    setSuccessMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const fileUrl = String(formData.get("fileUrl") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const material = String(formData.get("material") ?? "").trim();
    const targetDate = String(formData.get("targetDate") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();
    const quantity = Math.max(1, Number(formData.get("quantity") ?? 1));
    const transactionPeriod = String(
      formData.get("transactionPeriod") ?? "",
    ).trim();
    const serviceDescription = String(
      formData.get("serviceDescription") ?? "Printing Service",
    ).trim();
    const weight = Number(formData.get("weight") ?? 0);
    const pricePerGram = Number(formData.get("pricePerGram") ?? 0);
    const totalPayment = Number(formData.get("totalPayment") ?? 0);

    if (!name || !phone) {
      setErrorMessage("Please fill in name and phone number.");
      setIsPending(false);
      return;
    }

    try {
      await addQuoteRequest({
        name,
        email,
        phone,
        fileUrl,
        projectType,
        quantity,
        material,
        targetDate,
        notes,
        transactionPeriod,
        serviceDescription,
        weight,
        pricePerGram,
        totalPayment,
      });

      const payload: Partial<QuoteRequest> = {
        name,
        email,
        phone,
        fileUrl,
        projectType,
        quantity,
        material,
        targetDate,
        notes,
        transactionPeriod,
        serviceDescription,
        weight,
        pricePerGram,
        totalPayment,
      };

      setSubmittedData(payload);
      setSuccessMessage(
        "Quote request submitted. We will contact you shortly.",
      );
      setShowModal(true);
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save quote request";
      setErrorMessage(message);
    } finally {
      setIsPending(false);
    }
  }

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

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
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
                STL / 3D File URL
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="fileUrl"
                  placeholder="https://drive.google.com/..."
                  type="url"
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
                Transaction date
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="transactionPeriod"
                  type="date"
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Service description
                <select
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  name="serviceDescription"
                  defaultValue={serviceDescriptions[0]}
                >
                  {serviceDescriptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="text-sm font-medium text-neutral-700">
                Weight (g)
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  defaultValue={0}
                  min={0}
                  name="weight"
                  step="0.01"
                  type="number"
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Price per gram
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  defaultValue={0}
                  min={0}
                  name="pricePerGram"
                  step="0.01"
                  type="number"
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Total payment
                <input
                  className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                  defaultValue={0}
                  min={0}
                  name="totalPayment"
                  step="0.01"
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

            {successMessage ? (
              <p className="text-sm text-emerald-600">{successMessage}</p>
            ) : null}
            {errorMessage ? (
              <p className="text-sm text-red-600">{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </main>

      <SubmissionSummaryModal
        isOpen={showModal}
        data={submittedData}
        onDismiss={() => setShowModal(false)}
      />
    </>
  );
}

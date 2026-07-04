"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

import { getQuoteRequestByDocId, updateQuoteRequest } from "@/lib/quote-store";
import type { QuoteRequest } from "@/lib/types";

const projectTypes = [
  "Prototype",
  "Replacement part",
  "Small-batch product",
  "Art/collectible",
] as const;

const serviceDescriptions = ["Printing Service"] as const;
const materials = ["PLA", "PETG", "ABS", "TPU", "Resin"] as const;

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

export default function AdminEditQuotePage() {
  const params = useParams<{ docId: string }>();
  const router = useRouter();
  const docId = params?.docId ?? "";

  const [request, setRequest] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getQuoteRequestByDocId(docId);
      setRequest(data);
      setLoading(false);
    };

    if (docId) {
      void load();
    }
  }, [docId]);

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);

    const updates = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      fileUrl: String(formData.get("fileUrl") ?? "").trim(),
      projectType: String(formData.get("projectType") ?? "").trim(),
      quantity: Math.max(1, Number(formData.get("quantity") ?? 1)),
      material: String(formData.get("material") ?? "").trim(),
      targetDate: String(formData.get("targetDate") ?? "").trim(),
      notes: String(formData.get("notes") ?? "").trim(),
      transactionPeriod: String(formData.get("transactionPeriod") ?? "").trim(),
      serviceDescription: String(
        formData.get("serviceDescription") ?? "Printing Service",
      ).trim(),
      weight: Number(formData.get("weight") ?? 0),
      pricePerGram: Number(formData.get("pricePerGram") ?? 0),
      totalPayment: Number(formData.get("totalPayment") ?? 0),
    };

    if (!updates.name || !updates.phone) {
      setErrorMessage("Please fill in name and phone number.");
      setIsPending(false);
      return;
    }

    try {
      await updateQuoteRequest(docId, updates);
      setSuccessMessage("Quote updated successfully.");
      setTimeout(() => {
        router.push("/admin/requests");
        router.refresh();
      }, 600);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update quote request";
      setErrorMessage(message);
    } finally {
      setIsPending(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <div className="text-center">Loading quote...</div>
      </main>
    );
  }

  if (!request) {
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Quote not found</h1>
          <Link
            href="/admin/requests"
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            ← Back to transaction quotes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <div className="mb-6">
        <Link
          href="/admin/requests"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to transaction quotes
        </Link>
      </div>

      <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950">
          Edit Quote
        </h1>

        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-neutral-700">
              Name *
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                name="name"
                required
                defaultValue={request.name ?? ""}
              />
            </label>
            <label className="text-sm font-medium text-neutral-700">
              Email
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                name="email"
                type="email"
                defaultValue={request.email ?? ""}
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
                defaultValue={request.phone ?? ""}
              />
            </label>
            <label className="text-sm font-medium text-neutral-700">
              STL / 3D File URL
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                name="fileUrl"
                type="url"
                defaultValue={request.fileUrl ?? ""}
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="text-sm font-medium text-neutral-700">
              Project type
              <select
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                name="projectType"
                defaultValue={request.projectType ?? projectTypes[0]}
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
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                name="material"
                defaultValue={request.material ?? materials[0]}
              >
                {materials.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-neutral-700">
              Quantity
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                min={1}
                name="quantity"
                type="number"
                defaultValue={request.quantity ?? 1}
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
                defaultValue={request.transactionPeriod ?? ""}
              />
            </label>

            <label className="text-sm font-medium text-neutral-700">
              Service description
              <select
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                name="serviceDescription"
                defaultValue={
                  request.serviceDescription ?? serviceDescriptions[0]
                }
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
                min={0}
                name="weight"
                step="0.01"
                type="number"
                defaultValue={request.weight ?? 0}
              />
            </label>

            <label className="text-sm font-medium text-neutral-700">
              Price per gram
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                min={0}
                name="pricePerGram"
                step="0.01"
                type="number"
                defaultValue={request.pricePerGram ?? 0}
              />
            </label>

            <label className="text-sm font-medium text-neutral-700">
              Total payment
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                min={0}
                name="totalPayment"
                step="0.01"
                type="number"
                defaultValue={request.totalPayment ?? 0}
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
                defaultValue={request.targetDate ?? ""}
              />
            </label>
            <label className="text-sm font-medium text-neutral-700">
              Notes
              <textarea
                className="mt-2 h-24 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
                name="notes"
                defaultValue={request.notes ?? ""}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Saving..." : "Save changes"}
            </button>

            <Link
              href="/admin/requests"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-blue-400 hover:text-blue-700"
            >
              Cancel
            </Link>
          </div>

          {successMessage ? (
            <p className="text-sm text-emerald-600">{successMessage}</p>
          ) : null}
          {errorMessage ? (
            <p className="text-sm text-red-600">{errorMessage}</p>
          ) : null}
        </form>
      </div>
    </main>
  );
}

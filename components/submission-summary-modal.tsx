"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { QuoteRequest } from "@/lib/types";

export function SubmissionSummaryModal({
  isOpen,
  data,
  onDismiss,
}: {
  isOpen: boolean;
  data: Partial<QuoteRequest> | null;
  onDismiss: () => void;
}) {
  const router = useRouter();

  const handleDismiss = () => {
    onDismiss();
    router.push("/");
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-blue-100 bg-white p-8 shadow-lg md:p-10">
        <div className="text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-6 w-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-blue-950">
            Quote Request Submitted!
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Thank you for submitting your project details. We will review your
            request and contact you shortly.
          </p>
        </div>

        <div className="mt-8 space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="font-semibold text-neutral-900">Submission Summary</h3>

          <div className="grid gap-4 md:grid-cols-2">
            {data.name && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Name
                </p>
                <p className="mt-1 text-sm text-neutral-900">{data.name}</p>
              </div>
            )}

            {data.email && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Email
                </p>
                <p className="mt-1 text-sm text-neutral-900">{data.email}</p>
              </div>
            )}

            {data.phone && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Phone
                </p>
                <p className="mt-1 text-sm text-neutral-900">{data.phone}</p>
              </div>
            )}

            {data.projectType && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Project Type
                </p>
                <p className="mt-1 text-sm text-neutral-900">
                  {data.projectType}
                </p>
              </div>
            )}

            {data.material && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Material
                </p>
                <p className="mt-1 text-sm text-neutral-900">{data.material}</p>
              </div>
            )}

            {data.quantity && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Quantity
                </p>
                <p className="mt-1 text-sm text-neutral-900">{data.quantity}</p>
              </div>
            )}

            {data.targetDate && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Target Date
                </p>
                <p className="mt-1 text-sm text-neutral-900">
                  {data.targetDate}
                </p>
              </div>
            )}

            {data.fileUrl && (
              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  File URL
                </p>
                <p className="mt-1 truncate text-sm text-neutral-900">
                  <a
                    href={data.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.fileUrl}
                  </a>
                </p>
              </div>
            )}

            {data.notes && (
              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Notes
                </p>
                <p className="mt-1 text-sm text-neutral-900">{data.notes}</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="mt-8 w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

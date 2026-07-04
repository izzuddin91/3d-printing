"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AdminLogoutButton } from "@/app/admin/requests/logout-button";
import { getAllQuoteRequests } from "@/lib/quote-store";
import type { QuoteRequest } from "@/lib/types";

export default function AdminQuoteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [request, setRequest] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const requests = await getAllQuoteRequests();
        const foundRequest = requests.find((r) => r.id === id);
        setRequest(foundRequest || null);
      } catch (error) {
        console.error("Failed to load quote request:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadRequest();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <div className="text-center">Loading request details...</div>
      </main>
    );
  }

  if (!request) {
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Request Not Found
          </h1>
          <Link
            href="/admin/requests"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            ← Back to requests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/admin/requests"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to requests
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950">
            Quote Transaction Details
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Submitted on {new Date(request.createdAt).toLocaleString()}
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-950 mb-6">
            Transaction Summary
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Transaction Date
              </p>
              <p className="mt-1 text-lg text-neutral-900">
                {request.transactionPeriod ||
                  request.createdAt.slice(0, 10) ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Service Description
              </p>
              <p className="mt-1 text-lg text-neutral-900">
                {request.serviceDescription || "Printing Service"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Weight (g)
              </p>
              <p className="mt-1 text-lg text-neutral-900">
                {(request.weight ?? 0).toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Price Per Gram
              </p>
              <p className="mt-1 text-lg text-neutral-900">
                RM {(request.pricePerGram ?? 0).toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Total Payment
              </p>
              <p className="mt-1 text-lg font-semibold text-blue-900">
                RM {(request.totalPayment ?? 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-950 mb-6">
            Project Details
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Material
              </p>
              <p className="mt-1 text-lg text-neutral-900">
                {request.material}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Quantity
              </p>
              <p className="mt-1 text-lg text-neutral-900">
                {request.quantity}
              </p>
            </div>

            {request.targetDate && (
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                  Target Date
                </p>
                <p className="mt-1 text-lg text-neutral-900">
                  {request.targetDate}
                </p>
              </div>
            )}
          </div>

          {request.notes && (
            <div className="mt-6">
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-600">
                Notes
              </p>
              <p className="mt-1 text-lg text-neutral-900 whitespace-pre-wrap">
                {request.notes}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-950 mb-6">
            File Access
          </h2>

          {request.fileUrl ? (
            <div className="flex items-center gap-4">
              <Link
                href={request.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download STL File
              </Link>
              <span className="text-sm text-neutral-600">
                {request.fileUrl}
              </span>
            </div>
          ) : (
            <p className="text-sm text-neutral-600">
              No file URL attached for this quote.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

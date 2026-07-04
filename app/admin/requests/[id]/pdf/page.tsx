"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getAllQuoteRequests } from "@/lib/quote-store";
import type { QuoteRequest } from "@/lib/types";

function formatMoney(value?: number): string {
  const amount = Number(value ?? 0);
  return `RM ${amount.toFixed(2)}`;
}

export default function AdminQuotePdfPage() {
  const params = useParams();
  const id = params.id as string;
  const [request, setRequest] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const requests = await getAllQuoteRequests();
        const foundRequest = requests.find((item) => item.id === id);
        setRequest(foundRequest || null);
      } catch (error) {
        console.error("Failed to load quote request for PDF view:", error);
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
      <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-12 text-sm text-neutral-600">
        Preparing quote document...
      </main>
    );
  }

  if (!request) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Request not found</h1>
        <p className="mt-2 text-sm text-neutral-600">
          The quote request could not be loaded for PDF preview.
        </p>
        <Link
          href="/admin/requests"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Back to requests
        </Link>
      </main>
    );
  }

  const submittedAt = request.createdAt
    ? new Date(request.createdAt).toLocaleString()
    : "-";
  const transactionDate =
    request.transactionPeriod || request.createdAt?.slice(0, 10) || "-";

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-8 text-neutral-900 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Quote Transaction Report
            </p>
            <h1 className="mt-2 text-2xl font-bold text-blue-950">INVOICE</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Submitted on {submittedAt}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Print / Save as PDF
            </button>
            <Link
              href="/admin/requests"
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-blue-400 hover:text-blue-700"
            >
              Close
            </Link>
          </div>
        </div>

        <section className="rounded-xl border border-neutral-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Customer Details
          </p>
          <div className="mt-3 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
            <div>
              <span className="font-semibold">Customer Name:</span>{" "}
              {request.name || "-"}
            </div>
            <div>
              <span className="font-semibold">Contact No:</span>{" "}
              {request.phone || "-"}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Transaction Summary
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-[0.16em] text-neutral-600">
                <tr>
                  <th className="border-b border-neutral-200 px-3 py-2">
                    Transaction Period
                  </th>
                  <th className="border-b border-neutral-200 px-3 py-2">
                    Service Description
                  </th>
                  <th className="border-b border-neutral-200 px-3 py-2">
                    Weight (g)
                  </th>
                  <th className="border-b border-neutral-200 px-3 py-2">
                    Total Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border-b border-neutral-200 px-3 py-2 text-neutral-800">
                    {transactionDate}
                  </td>
                  <td className="border-b border-neutral-200 px-3 py-2 text-neutral-800">
                    {request.serviceDescription || "Printing service"}
                  </td>
                  <td className="border-b border-neutral-200 px-3 py-2 text-neutral-800">
                    {(request.weight ?? 0).toFixed(2)}
                  </td>
                  <td className="border-b border-neutral-200 px-3 py-2 font-semibold text-blue-900">
                    {formatMoney(request.totalPayment)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Notes
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-neutral-700">
            {request.notes || "No additional notes provided."}
          </p>
        </section>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }

          header,
          footer,
          nav,
          .site-header,
          .site-footer {
            display: none !important;
          }

          main {
            min-height: auto !important;
            padding: 0 !important;
            background: white !important;
          }

          .print\:shadow-none {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
          }

          button,
          a[href="/admin/requests"] {
            display: none !important;
          }

          .border-b,
          .border,
          .rounded-2xl,
          .rounded-xl {
            border-color: #d4d4d4 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}

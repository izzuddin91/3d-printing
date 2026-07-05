"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function formatMoney(value?: number): string {
  const amount = Number(value ?? 0);
  return `RM ${amount.toFixed(2)}`;
}

export default function RevenuePdfPage() {
  const searchParams = useSearchParams();
  const month = searchParams.get("month") || "-";
  const total = Number(searchParams.get("total") || 0);
  const overhead = Number(searchParams.get("overhead") || 0);
  const description = searchParams.get("description") || "-";
  const mySharePercent = Number(searchParams.get("mySharePercent") || 0);
  const partnerSharePercent = Number(
    searchParams.get("partnerSharePercent") || 0,
  );
  const netRevenue = Math.max(total - overhead, 0);
  const myShare = (netRevenue * mySharePercent) / 100;
  const partnerShare = (netRevenue * partnerSharePercent) / 100;

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-8 text-neutral-900 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Monthly Revenue Report
            </p>
            <h1 className="mt-2 text-2xl font-bold text-blue-950">
              Revenue Summary
            </h1>
            <p className="mt-2 text-sm text-neutral-600">Month: {month}</p>
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
            Revenue Details
          </p>
          <div className="mt-3 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
            <div>
              <span className="font-semibold">Month:</span> {month}
            </div>
            <div>
              <span className="font-semibold">Gross Total:</span>{" "}
              {formatMoney(total)}
            </div>

            <div>
              <span className="font-semibold">Overhead:</span>{" "}
              {formatMoney(overhead)}
            </div>
            <div>
              <span className="font-semibold">Description:</span> {description}
            </div>
            <div>
              <span className="font-semibold">Net Revenue:</span>{" "}
              {formatMoney(netRevenue)}
            </div>
            <div>
              <span className="font-semibold">Split:</span> {mySharePercent}% /{" "}
              {partnerSharePercent}%
            </div>

            <div>
              <span className="font-semibold">Partner Share:</span>{" "}
              {formatMoney(partnerShare)}
            </div>

            <div>
              <span className="font-semibold">My Share:</span>{" "}
              {formatMoney(myShare)}
            </div>
          </div>
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
        }
      `}</style>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminLogoutButton } from "@/app/admin/requests/logout-button";
import { deleteQuoteRequest, getAllQuoteRequests } from "@/lib/quote-store";
import type { QuoteRequest } from "@/lib/types";

const PAGE_SIZE = 5;

function getEffectiveTransactionDate(request: QuoteRequest): string {
  if (request.transactionPeriod) {
    return request.transactionPeriod;
  }

  if (request.createdAt) {
    return request.createdAt.slice(0, 10);
  }

  return "";
}

function formatMoney(value?: number): string {
  const amount = Number(value ?? 0);
  return `RM ${amount.toFixed(2)}`;
}

function RequestTable({
  requests,
  deletingDocId,
  onDelete,
}: {
  requests: QuoteRequest[];
  deletingDocId: string | null;
  onDelete: (request: QuoteRequest) => Promise<void>;
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50 text-left text-xs uppercase tracking-[0.15em] text-blue-800">
              <th className="px-4 py-3">Material</th>
              <th className="px-4 py-3">Weight (g)</th>
              <th className="px-4 py-3">Price / g</th>
              <th className="px-4 py-3">Total Payment</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">File</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Transaction Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-sm text-neutral-500" colSpan={9}>
                  No requests yet. Ask users to submit via the quote form.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {request.material || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {(request.weight ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {formatMoney(request.pricePerGram)}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-900">
                    {formatMoney(request.totalPayment)}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {request.quantity ?? 0}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap gap-2">
                      {request.fileUrl ? (
                        <a
                          href={request.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-700 underline-offset-2 hover:underline"
                        >
                          Download file
                        </a>
                      ) : (
                        <span className="text-neutral-500">-</span>
                      )}

                      {request.id ? (
                        <a
                          href={`/admin/requests/${request.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-emerald-700 underline-offset-2 hover:underline"
                        >
                          View PDF
                        </a>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {getEffectiveTransactionDate(request) || "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {request.docId ? (
                        <Link
                          href={`/admin/quotes/${request.docId}/edit`}
                          className="rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                          Edit
                        </Link>
                      ) : (
                        <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-400">
                          Edit
                        </span>
                      )}

                      <button
                        type="button"
                        className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => void onDelete(request)}
                        disabled={
                          deletingDocId === request.docId || !request.docId
                        }
                      >
                        {deletingDocId === request.docId
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [fromDateInput, setFromDateInput] = useState("");
  const [toDateInput, setToDateInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      try {
        const data = await getAllQuoteRequests({
          fromDate: fromDate || undefined,
          toDate: toDate || undefined,
        });
        setRequests(data);
      } catch (error) {
        console.error("Failed to load quote requests:", error);
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    };

    loadRequests();
  }, [fromDate, toDate]);

  function handleSearch() {
    setSearchLoading(true);
    setHasSearched(true);
    setCurrentPage(1);
    setFromDate(fromDateInput);
    setToDate(toDateInput);
  }

  function handleClear() {
    setFromDateInput("");
    setToDateInput("");
    setCurrentPage(1);
    setFromDate("");
    setToDate("");
    setHasSearched(false);
    setSearchLoading(false);
  }

  async function handleDelete(request: QuoteRequest) {
    if (!request.docId) {
      alert(
        "Unable to delete this row because its Firestore document id is missing.",
      );
      return;
    }

    const shouldDelete = confirm("Delete this quote record permanently?");
    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingDocId(request.docId);
      await deleteQuoteRequest(request.docId);
      setRequests((prev) =>
        prev.filter((item) => item.docId !== request.docId),
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete quote request";
      alert(message);
    } finally {
      setDeletingDocId(null);
    }
  }

  const totalPages = Math.max(1, Math.ceil(requests.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedRequests = requests.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const showSearchLoader = loading && searchLoading;
  const searchedTotalPayment = requests.reduce(
    (sum, item) => sum + Number(item.totalPayment ?? 0),
    0,
  );

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950">
            Transaction quotes
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Internal transaction ledger for submitted quote jobs.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/filaments"
            className="inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Manage Filaments
          </Link>
          <Link
            href="/admin/quotes/create"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create Quotes
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <label className="text-sm font-medium text-neutral-700">
          From date
          <input
            className="mt-2 w-full min-w-56 rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
            type="date"
            value={fromDateInput}
            onChange={(event) => setFromDateInput(event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-neutral-700">
          To date
          <input
            className="mt-2 w-full min-w-56 rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
            type="date"
            value={toDateInput}
            onChange={(event) => setToDateInput(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="inline-flex h-10 items-center rounded-full bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
        {fromDate || toDate ? (
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 transition hover:border-blue-400 hover:text-blue-700"
            onClick={handleClear}
          >
            Clear filter
          </button>
        ) : null}

        {hasSearched ? (
          <div className="ml-auto rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
              Total RM
            </p>
            <p className="text-lg font-bold text-emerald-900">
              RM {searchedTotalPayment.toFixed(2)}
            </p>
          </div>
        ) : null}
      </div>

      {showSearchLoader ? (
        <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span>Searching quotes...</span>
        </div>
      ) : null}

      <RequestTable
        requests={paginatedRequests}
        deletingDocId={deletingDocId}
        onDelete={handleDelete}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-700">
        <p>
          Showing {requests.length === 0 ? 0 : startIndex + 1} -{" "}
          {Math.min(startIndex + PAGE_SIZE, requests.length)} of{" "}
          {requests.length} records
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-neutral-300 px-4 py-1.5 font-semibold transition hover:border-blue-400 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Previous
          </button>

          <span className="font-medium text-neutral-800">
            Page {safePage} / {totalPages}
          </span>

          <button
            type="button"
            className="rounded-full border border-neutral-300 px-4 py-1.5 font-semibold transition hover:border-blue-400 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={safePage >= totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

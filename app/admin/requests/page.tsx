"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminLogoutButton } from "@/app/admin/requests/logout-button";
import {
  addRevenueEntry,
  deleteQuoteRequest,
  getAllQuoteRequests,
  getRevenueEntries,
} from "@/lib/quote-store";
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

function getMonthKey(value?: string): string {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  if (trimmed.length >= 7) {
    return trimmed.slice(0, 7);
  }

  return trimmed;
}

function formatMonthKey(monthKey: string): string {
  if (!monthKey) {
    return "-";
  }

  const [year, month] = monthKey.split("-");
  if (!year || !month) {
    return monthKey;
  }

  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    },
  );

  return monthName;
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
  const [activeSection, setActiveSection] = useState<
    "transactions" | "revenue"
  >("transactions");
  const [showCreateRevenueForm, setShowCreateRevenueForm] = useState(false);
  const [selectedRevenueMonth, setSelectedRevenueMonth] = useState("");
  const [revenueEntries, setRevenueEntries] = useState<
    Array<{
      id: string;
      docId?: string;
      monthKey: string;
      monthLabel: string;
      totalPayment: number;
      overheadCost: number;
      description: string;
      mySharePercent: number;
      partnerSharePercent: number;
    }>
  >([]);
  const [revenueSaving, setRevenueSaving] = useState(false);
  const [revenueOverheadCost, setRevenueOverheadCost] = useState("");
  const [revenueDescription, setRevenueDescription] = useState("");
  const [revenueMySharePercent, setRevenueMySharePercent] = useState("50");
  const [revenuePartnerSharePercent, setRevenuePartnerSharePercent] =
    useState("50");

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

  useEffect(() => {
    const loadRevenueData = async () => {
      try {
        const data = await getRevenueEntries();
        setRevenueEntries(data);
      } catch (error) {
        console.error("Failed to load revenue entries:", error);
      }
    };

    void loadRevenueData();
  }, []);

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

  const monthlyRevenueData = requests.reduce<Record<string, number>>(
    (acc, item) => {
      const monthKey = getMonthKey(
        item.transactionPeriod || item.createdAt?.slice(0, 10),
      );

      if (!monthKey) {
        return acc;
      }

      acc[monthKey] = (acc[monthKey] ?? 0) + Number(item.totalPayment ?? 0);
      return acc;
    },
    {},
  );

  const monthlyRevenueRows = Object.entries(monthlyRevenueData)
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([monthKey, totalPayment]) => ({
      monthKey,
      totalPayment,
      monthLabel: formatMonthKey(monthKey),
    }));

  useEffect(() => {
    if (monthlyRevenueRows.length === 0) {
      setSelectedRevenueMonth("");
      return;
    }

    if (
      !selectedRevenueMonth ||
      !monthlyRevenueRows.some((row) => row.monthKey === selectedRevenueMonth)
    ) {
      setSelectedRevenueMonth(monthlyRevenueRows[0].monthKey);
    }
  }, [monthlyRevenueRows, selectedRevenueMonth]);

  const selectedRevenueRow =
    monthlyRevenueRows.find((row) => row.monthKey === selectedRevenueMonth) ||
    monthlyRevenueRows[0] ||
    null;
  const selectedRevenueTotal = selectedRevenueRow?.totalPayment ?? 0;
  const selectedRevenueOverheadValue = Number(revenueOverheadCost) || 0;
  const selectedRevenueMyShareValue = Number(revenueMySharePercent) || 0;
  const selectedRevenuePartnerShareValue =
    Number(revenuePartnerSharePercent) || 0;
  const selectedRevenueAfterOverhead = Math.max(
    selectedRevenueTotal - selectedRevenueOverheadValue,
    0,
  );
  const selectedRevenueMyShareAmount =
    (selectedRevenueAfterOverhead * selectedRevenueMyShareValue) / 100;
  const selectedRevenuePartnerShareAmount =
    (selectedRevenueAfterOverhead * selectedRevenuePartnerShareValue) / 100;
  const selectedRevenueSplitTotalPercent =
    selectedRevenueMyShareValue + selectedRevenuePartnerShareValue;

  async function handleCreateRevenueEntry() {
    if (!selectedRevenueRow) {
      return;
    }

    setRevenueSaving(true);

    try {
      const entry = await addRevenueEntry({
        monthKey: selectedRevenueRow.monthKey,
        monthLabel: selectedRevenueRow.monthLabel,
        totalPayment: selectedRevenueRow.totalPayment,
        overheadCost: Number(revenueOverheadCost) || 0,
        description: revenueDescription.trim(),
        mySharePercent: Number(revenueMySharePercent) || 0,
        partnerSharePercent: Number(revenuePartnerSharePercent) || 0,
      });

      setRevenueEntries((prev) => [entry, ...prev]);
      setShowCreateRevenueForm(false);
      setRevenueOverheadCost("");
      setRevenueDescription("");
      setRevenueMySharePercent("50");
      setRevenuePartnerSharePercent("50");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save revenue entry";
      alert(message);
    } finally {
      setRevenueSaving(false);
    }
  }

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

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveSection("transactions")}
          className={`rounded-2xl border px-5 py-4 text-left transition ${
            activeSection === "transactions"
              ? "border-blue-600 bg-blue-600 text-white shadow-sm"
              : "border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em]">
            Transactions
          </p>
          <p className="mt-2 text-sm opacity-80">
            Manage submitted quote transactions and view the ledger.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("revenue")}
          className={`rounded-2xl border px-5 py-4 text-left transition ${
            activeSection === "revenue"
              ? "border-blue-600 bg-blue-600 text-white shadow-sm"
              : "border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em]">
            Monthly Revenue
          </p>
          <p className="mt-2 text-sm opacity-80">
            Review monthly totals and create revenue entries with profit splits.
          </p>
        </button>
      </div>

      {activeSection === "transactions" ? (
        <>
          <div className="mt-8 flex flex-wrap items-end gap-4">
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
        </>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-blue-950">
                  Monthly revenue
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Create monthly revenue entries and review the split details.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateRevenueForm((value) => !value)}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {showCreateRevenueForm ? "Cancel" : "Create Monthly Revenue"}
              </button>
            </div>

            {showCreateRevenueForm ? (
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                  <label className="text-sm font-medium text-neutral-700">
                    Month
                    <select
                      value={selectedRevenueMonth}
                      onChange={(event) =>
                        setSelectedRevenueMonth(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
                    >
                      {monthlyRevenueRows.length === 0 ? (
                        <option value="">No months available</option>
                      ) : (
                        monthlyRevenueRows.map((row) => (
                          <option key={row.monthKey} value={row.monthKey}>
                            {row.monthLabel}
                          </option>
                        ))
                      )}
                    </select>
                  </label>

                  <div className="rounded-xl border border-blue-200 bg-white p-4 text-sm text-neutral-700">
                    <p className="font-semibold text-blue-900">
                      Selected month total
                    </p>
                    <p className="mt-2 text-2xl font-bold text-blue-950">
                      {formatMoney(selectedRevenueTotal)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Overhead cost
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={revenueOverheadCost}
                      onChange={(event) =>
                        setRevenueOverheadCost(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
                      placeholder="0.00"
                    />
                  </label>

                  <label className="text-sm font-medium text-neutral-700">
                    Description
                    <input
                      type="text"
                      value={revenueDescription}
                      onChange={(event) =>
                        setRevenueDescription(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
                      placeholder="e.g. Equipment maintenance"
                    />
                  </label>

                  <label className="text-sm font-medium text-neutral-700">
                    My portion (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={revenueMySharePercent}
                      onChange={(event) =>
                        setRevenueMySharePercent(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
                    />
                  </label>

                  <label className="text-sm font-medium text-neutral-700">
                    Partner (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={revenuePartnerSharePercent}
                      onChange={(event) =>
                        setRevenuePartnerSharePercent(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
                    />
                  </label>
                </div>

                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  <p className="font-semibold">Estimated split</p>
                  <p className="mt-2">
                    Revenue after overhead:{" "}
                    {formatMoney(selectedRevenueAfterOverhead)}
                  </p>
                  <p className="mt-1">
                    Your share: {formatMoney(selectedRevenueMyShareAmount)}
                  </p>
                  <p className="mt-1">
                    Partner share:{" "}
                    {formatMoney(selectedRevenuePartnerShareAmount)}
                  </p>
                  {selectedRevenueSplitTotalPercent !== 100 ? (
                    <p className="mt-2 text-xs font-medium text-amber-700">
                      Percentages should total 100% for a balanced split.
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => void handleCreateRevenueEntry()}
                    className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!selectedRevenueRow || revenueSaving}
                  >
                    {revenueSaving ? "Saving..." : "Save Monthly Revenue"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
            <div className="border-b border-blue-50 bg-blue-50 px-4 py-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-800">
                Monthly revenue records
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white text-left text-xs uppercase tracking-[0.16em] text-neutral-600">
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3">Total payment</th>
                    <th className="px-4 py-3">Overhead</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">My share</th>
                    <th className="px-4 py-3">Partner share</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueEntries.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-6 text-sm text-neutral-500"
                        colSpan={7}
                      >
                        No monthly revenue entries yet. Create one to get
                        started.
                      </td>
                    </tr>
                  ) : (
                    revenueEntries.map((entry) => {
                      const entryMyShare =
                        (entry.totalPayment - entry.overheadCost) *
                        (entry.mySharePercent / 100);
                      const entryPartnerShare =
                        (entry.totalPayment - entry.overheadCost) *
                        (entry.partnerSharePercent / 100);

                      return (
                        <tr
                          key={entry.id}
                          className="border-t border-neutral-100"
                        >
                          <td className="px-4 py-3 text-neutral-800">
                            {entry.monthLabel}
                          </td>
                          <td className="px-4 py-3 font-semibold text-blue-900">
                            {formatMoney(entry.totalPayment)}
                          </td>
                          <td className="px-4 py-3 text-neutral-800">
                            {formatMoney(entry.overheadCost)}
                          </td>
                          <td className="px-4 py-3 text-neutral-800">
                            {entry.description || "-"}
                          </td>
                          <td className="px-4 py-3 text-neutral-800">
                            {formatMoney(entryMyShare)}
                          </td>
                          <td className="px-4 py-3 text-neutral-800">
                            {formatMoney(entryPartnerShare)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <a
                              href={`/admin/requests/revenue/${entry.id}/pdf?month=${encodeURIComponent(entry.monthLabel)}&total=${entry.totalPayment}&overhead=${entry.overheadCost}&description=${encodeURIComponent(entry.description || "")}&mySharePercent=${entry.mySharePercent}&partnerSharePercent=${entry.partnerSharePercent}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-emerald-700 underline-offset-2 hover:underline"
                            >
                              View PDF
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

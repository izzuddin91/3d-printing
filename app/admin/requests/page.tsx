"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminLogoutButton } from "@/app/admin/requests/logout-button";
import { getAllQuoteRequests } from "@/lib/quote-store";
import type { QuoteRequest } from "@/lib/types";

function RequestTable({ requests }: { requests: QuoteRequest[] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50 text-left text-xs uppercase tracking-[0.15em] text-blue-800">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">File</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-sm text-neutral-500" colSpan={4}>
                  No requests yet. Ask users to submit via the quote form.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-t border-neutral-100 cursor-pointer hover:bg-blue-50/50 transition-colors"
                  onClick={() =>
                    (window.location.href = `/admin/requests/${request.id}`)
                  }
                >
                  <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                    {request.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {request.phone}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <a
                      href={request.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-700 underline-offset-2 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Download file
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {new Date(request.createdAt).toLocaleString()}
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await getAllQuoteRequests();
        setRequests(data);
      } catch (error) {
        console.error("Failed to load quote requests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="text-center">Loading requests...</div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950">
            Submission requests
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            View all incoming quote submissions and access shared STL/3D files.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/filaments"
            className="inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Manage Filaments
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      <RequestTable requests={requests} />
    </main>
  );
}

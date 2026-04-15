"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { authenticateAdmin } from "@/lib/firebase-auth";
import { adminBypassEnabled } from "@/lib/firebase-credentials";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    let isAuthenticated = false;

    if (email && password) {
      try {
        await authenticateAdmin(email, password);
        isAuthenticated = true;
      } catch (error) {
        if (!adminBypassEnabled) {
          const errorMessage =
            error instanceof Error ? error.message : "Firebase login failed";
          setErrorMessage(
            errorMessage === "Access denied: User is not an admin"
              ? "Access denied: Admin privileges required"
              : "Firebase login failed. Check credentials and try again.",
          );
          setIsPending(false);
          return;
        }
      }
    }

    if (!isAuthenticated && !adminBypassEnabled) {
      setErrorMessage("Email and password are required.");
      setIsPending(false);
      return;
    }

    const response = await fetch("/api/admin/session", {
      method: "POST",
    });

    if (!response.ok) {
      setErrorMessage("Unable to start admin session. Please retry.");
      setIsPending(false);
      return;
    }

    router.push("/admin/requests");
    router.refresh();
  }

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-6 py-16">
      <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Admin
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950">
          Login
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Firebase auth is wired. Bypass is currently{" "}
          {adminBypassEnabled ? "enabled" : "disabled"}.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-neutral-700">
            Admin email
            <input
              className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
              name="email"
              placeholder="admin@example.com"
              type="email"
            />
          </label>

          <label className="block text-sm font-medium text-neutral-700">
            Password
            <input
              className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900"
              name="password"
              placeholder="********"
              type="password"
            />
          </label>

          <button
            className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Signing in..." : "Enter admin dashboard"}
          </button>

          {errorMessage ? (
            <p className="text-sm text-red-600">{errorMessage}</p>
          ) : null}
        </form>
      </div>
    </main>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

import {
  addFilamentPrice,
  deleteFilamentPrice,
  getFilamentPrices,
  updateFilamentPrice,
} from "@/lib/filament-store";
import type { FilamentPrice } from "@/lib/types";

const materials = ["PLA", "PETG", "ABS", "TPU", "Resin", "Nylon", "PC", "ASA"];

export default function AdminFilamentsPage() {
  const [filaments, setFilaments] = useState<FilamentPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadFilaments();
  }, []);

  const loadFilaments = async () => {
    try {
      const data = await getFilamentPrices();
      setFilaments(data);
    } catch (error) {
      console.error("Failed to load filaments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData: FormData) => {
    try {
      const newFilament = {
        name: String(formData.get("name") ?? "").trim(),
        pricePerGram: Number(formData.get("pricePerGram") ?? 0),
        pricePerMeter: formData.get("pricePerMeter")
          ? Number(formData.get("pricePerMeter"))
          : undefined,
        color: String(formData.get("color") ?? "").trim(),
        material: String(formData.get("material") ?? "").trim(),
        description:
          String(formData.get("description") ?? "").trim() || undefined,
        inStock: formData.get("inStock") === "on",
      };

      await addFilamentPrice(newFilament);
      await loadFilaments();
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add filament:", error);
      alert("Failed to add filament");
    }
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      const updates = {
        name: String(formData.get("name") ?? "").trim(),
        pricePerGram: Number(formData.get("pricePerGram") ?? 0),
        pricePerMeter: formData.get("pricePerMeter")
          ? Number(formData.get("pricePerMeter"))
          : undefined,
        color: String(formData.get("color") ?? "").trim(),
        material: String(formData.get("material") ?? "").trim(),
        description:
          String(formData.get("description") ?? "").trim() || undefined,
        inStock: formData.get("inStock") === "on",
      };

      await updateFilamentPrice(id, updates);
      await loadFilaments();
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update filament:", error);
      alert("Failed to update filament");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this filament?")) return;

    try {
      await deleteFilamentPrice(id);
      await loadFilaments();
    } catch (error) {
      console.error("Failed to delete filament:", error);
      alert("Failed to delete filament");
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="text-center">Loading filaments...</div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
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
            Back to dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950">
            Filament Price Management
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Manage filament prices and availability for quote calculations.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {showAddForm ? "Cancel" : "Add Filament"}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-950 mb-4">
            Add New Filament
          </h2>
          <form action={handleAdd} className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Name *
              </span>
              <input
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                placeholder="e.g., PLA White 1.75mm"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Material *
              </span>
              <select
                name="material"
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
              >
                {materials.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Color *
              </span>
              <input
                name="color"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                placeholder="e.g., White"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Price per Gram (RM) *
              </span>
              <input
                name="pricePerGram"
                type="number"
                step="0.01"
                min="0"
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                placeholder="0.00"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Price per Meter (RM)
              </span>
              <input
                name="pricePerMeter"
                type="number"
                step="0.01"
                min="0"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                placeholder="0.00 (optional)"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Description
              </span>
              <input
                name="description"
                type="text"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                placeholder="Optional description"
              />
            </label>

            <label className="block flex items-center gap-2">
              <input
                name="inStock"
                type="checkbox"
                defaultChecked
                className="rounded border-neutral-300"
              />
              <span className="text-sm font-medium text-neutral-700">
                In Stock
              </span>
            </label>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add Filament
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 text-left text-xs uppercase tracking-[0.15em] text-blue-800">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Material</th>
                <th className="px-4 py-3">Color</th>
                <th className="px-4 py-3">Price/g</th>
                <th className="px-4 py-3">Price/m</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filaments.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-6 text-sm text-neutral-500"
                    colSpan={7}
                  >
                    No filaments added yet. Click "Add Filament" to get started.
                  </td>
                </tr>
              ) : (
                filaments.map((filament) => (
                  <tr key={filament.id} className="border-t border-neutral-100">
                    {editingId === filament.id ? (
                      <>
                        <td className="px-4 py-3" colSpan={7}>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              handleUpdate(filament.id, formData);
                            }}
                            className="grid gap-4 md:grid-cols-4"
                          >
                            <input
                              name="name"
                              defaultValue={filament.name}
                              required
                              className="rounded border border-neutral-300 px-2 py-1 text-sm"
                            />
                            <select
                              name="material"
                              defaultValue={filament.material}
                              required
                              className="rounded border border-neutral-300 px-2 py-1 text-sm"
                            >
                              {materials.map((material) => (
                                <option key={material} value={material}>
                                  {material}
                                </option>
                              ))}
                            </select>
                            <input
                              name="color"
                              defaultValue={filament.color}
                              required
                              className="rounded border border-neutral-300 px-2 py-1 text-sm"
                            />
                            <input
                              name="pricePerGram"
                              type="number"
                              step="0.01"
                              defaultValue={filament.pricePerGram}
                              required
                              className="rounded border border-neutral-300 px-2 py-1 text-sm"
                            />
                            <input
                              name="pricePerMeter"
                              type="number"
                              step="0.01"
                              defaultValue={filament.pricePerMeter || ""}
                              className="rounded border border-neutral-300 px-2 py-1 text-sm"
                            />
                            <input
                              name="description"
                              defaultValue={filament.description || ""}
                              className="rounded border border-neutral-300 px-2 py-1 text-sm"
                            />
                            <label className="flex items-center gap-1">
                              <input
                                name="inStock"
                                type="checkbox"
                                defaultChecked={filament.inStock}
                                className="rounded border-neutral-300"
                              />
                              <span className="text-xs">In Stock</span>
                            </label>
                            <div className="flex gap-1">
                              <button
                                type="submit"
                                className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="rounded border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                          {filament.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-700">
                          {filament.material}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-700">
                          {filament.color}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-700">
                          RM {filament.pricePerGram.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-700">
                          {filament.pricePerMeter
                            ? `RM ${filament.pricePerMeter.toFixed(2)}`
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                              filament.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {filament.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingId(filament.id)}
                              className="rounded border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(filament.id)}
                              className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

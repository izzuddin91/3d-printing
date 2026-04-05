import { materials, projectTypes } from "@/lib/site-data";

import { submitQuote } from "./actions";

type QuotePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toSingleValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const query = await searchParams;
  const submitted = toSingleValue(query.submitted) === "1";
  const error = toSingleValue(query.error);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-14">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Quote Request</p>
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">Get your project quoted</h1>
        <p className="max-w-2xl text-neutral-600">Tell us about your project and we will reply with pricing and timeline within one business day.</p>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 p-5 text-emerald-900 shadow-sm">
          <p className="font-semibold">✅ Quote request submitted!</p>
          <p className="mt-2 text-sm">We usually respond within one business day. Check your email for our response.</p>
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-xl border border-red-300 bg-gradient-to-br from-red-50 to-orange-50 p-5 text-red-800 shadow-sm">
          <p className="font-semibold">⚠️ Error submitting form</p>
          <p className="mt-2 text-sm">Please check your input and try again.</p>
        </div>
      ) : null}

      <form action={submitQuote} className="card-glow mt-8 overflow-hidden bg-gradient-to-br from-white to-blue-50 p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-blue-950">Full name</span>
            <input className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" name="name" required />
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold text-blue-950">Email</span>
            <input className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" name="email" type="email" required />
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold text-blue-950">Phone</span>
            <input className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" name="phone" required />
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold text-blue-950">Project type</span>
            <select className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" name="projectType" required>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold text-blue-950">Material</span>
            <select className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" name="material" required>
              {materials.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold text-blue-950">Quantity</span>
            <input className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" name="quantity" type="number" min={1} defaultValue={1} required />
          </label>

          <label className="text-sm md:col-span-2">
            <span className="mb-2 block font-semibold text-blue-950">Target delivery date</span>
            <input className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" name="targetDate" type="date" />
          </label>
        </div>

        <label className="block text-sm mt-5">
          <span className="mb-2 block font-semibold text-blue-950">Project notes</span>
          <textarea
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            name="notes"
            rows={5}
            placeholder="Model dimensions, tolerances, use-case, and any special requirements"
          />
        </label>

        <button className="btn-primary mt-6 w-full" type="submit">
          Submit quote request
        </button>
      </form>
    </main>
  );
}



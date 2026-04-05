import { QuoteEstimator } from "@/components/quote-estimator";
import { materials } from "@/lib/site-data";

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Pricing</p>
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">Transparent pricing model</h1>
        <p className="max-w-3xl text-neutral-600">
          Get an instant estimate using our calculator. Final quotes include print complexity, post-processing, and lead time.
        </p>
      </div>

      <section className="mt-12">
        <QuoteEstimator />
      </section>

      <section className="mt-14">
        <div className="mb-6 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">Material options</h2>
          <p className="text-neutral-600">Choose the material that best fits your project requirements and budget.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-950">
              <tr>
                <th className="px-6 py-4 font-semibold">Material</th>
                <th className="px-6 py-4 font-semibold">Best for</th>
                <th className="px-6 py-4 font-semibold">Finish</th>
                <th className="px-6 py-4 font-semibold">Price tier</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item, idx) => (
                <tr key={item.name} className={`border-t border-neutral-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}`}>
                  <td className="px-6 py-4 font-semibold text-blue-950">{item.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.bestFor}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.finish}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-pink-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                      {item.priceTier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}



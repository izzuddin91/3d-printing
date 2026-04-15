import { portfolioItems } from "@/lib/site-data";

export function PortfolioGrid() {
  return (
	<div className="grid gap-6 md:grid-cols-2">
	  {portfolioItems.map((item) => (
		<article
		  key={item.name}
		  className="rounded-2xl border border-blue-100 bg-white p-6"
		>
		  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
			{item.category}
		  </p>
		  <h3 className="mt-2 text-xl font-bold text-blue-950">{item.name}</h3>
		  <p className="mt-3 text-sm text-neutral-600">{item.summary}</p>
		  <p className="mt-4 text-sm font-medium text-neutral-700">
			Lead time: <span className="text-blue-700">{item.leadTime}</span>
		  </p>
		</article>
	  ))}
	</div>
  );
}


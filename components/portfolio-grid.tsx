import { portfolioItems } from "@/lib/site-data";

export function PortfolioGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {portfolioItems.map((item, index) => (
        <article
          key={item.name}
          className="group card-glow relative overflow-hidden bg-gradient-to-br from-white to-blue-50 p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:to-pink-400/10 transition-all duration-300" />
          
          <div className="relative z-10">
            <p className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              {item.category}
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-blue-950">{item.name}</h3>
            <p className="mt-2 text-sm text-neutral-600">{item.summary}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500" />
              <p className="text-sm font-semibold text-neutral-700">Lead time: {item.leadTime}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}



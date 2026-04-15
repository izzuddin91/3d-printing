import { faqItems } from "@/lib/site-data";

export function FaqList() {
  return (
	<div className="grid gap-4 md:grid-cols-2">
	  {faqItems.map((item) => (
		<article
		  key={item.question}
		  className="rounded-2xl border border-blue-100 bg-white p-6"
		>
		  <h3 className="text-base font-semibold text-blue-950">{item.question}</h3>
		  <p className="mt-2 text-sm text-neutral-600">{item.answer}</p>
		</article>
	  ))}
	</div>
  );
}


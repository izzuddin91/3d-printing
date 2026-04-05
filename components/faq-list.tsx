import { faqs } from "@/lib/site-data";

export function FaqList() {
  return (
    <div className="space-y-4">
      {faqs.map((item) => (
        <details
          key={item.question}
          className="group card-glow cursor-pointer bg-gradient-to-br from-white to-blue-50 p-5"
        >
          <summary className="flex items-center justify-between font-semibold text-blue-950">
            <span>{item.question}</span>
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 group-open:scale-0 transition-transform" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}



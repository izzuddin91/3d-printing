import { services } from "@/lib/site-data";

export function ServiceCards() {
  const icons = ["🔧", "📦", "✏️"];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {services.map((service, index) => (
        <article
          key={service.id}
          className="group card-glow relative overflow-hidden bg-gradient-to-br from-white to-blue-50 p-6"
        >
          {/* Accent gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
          
          <div className="relative z-10">
            <div className="mb-3 text-4xl">{icons[index % icons.length]}</div>
            <h3 className="text-xl font-bold tracking-tight text-blue-950">{service.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
            <ul className="mt-4 space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}



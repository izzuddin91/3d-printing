import Link from "next/link";

const links = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/quote", label: "Get Quote" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group text-lg font-bold tracking-tighter">
            <span className="text-gradient">🖨️ IZ 3D Printing</span>
          </Link>
        </div>
        <nav className="mt-3 flex gap-5 overflow-x-auto pb-1 text-sm font-medium md:mt-2 md:justify-end">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-neutral-600 transition-all hover:text-blue-600 hover:font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

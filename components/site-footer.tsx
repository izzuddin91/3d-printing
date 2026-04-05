export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/50 bg-gradient-to-br from-neutral-50 to-blue-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-gradient font-bold">🖨️ IZ 3D Printing</p>
            <p className="mt-2 text-sm text-neutral-600">
              Fast, reliable 3D printing for makers and businesses.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-950">Services</p>
            <ul className="mt-3 space-y-1 text-sm text-neutral-600">
              <li>
                <a href="/services" className="hover:text-blue-600 transition">
                  Rapid Prototyping
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-blue-600 transition">
                  Small Batch
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-blue-600 transition">
                  Custom Design
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-950">Company</p>
            <ul className="mt-3 space-y-1 text-sm text-neutral-600">
              <li>
                <a href="/portfolio" className="hover:text-blue-600 transition">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/quote" className="hover:text-blue-600 transition">
                  Get Quote
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-950">Contact</p>
            <p className="mt-3 text-sm text-neutral-600">
              hello@3dprintstudio.local
            </p>
            <p className="text-sm text-neutral-600">+60 12-345 6789</p>
            <p className="mt-2 text-sm text-neutral-600">Mon-Sat, 9AM-7PM</p>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-600">
          <p>
            © {new Date().getFullYear()} IZ 3D Printing. Built for fast local
            production. ✨
          </p>
        </div>
      </div>
    </footer>
  );
}

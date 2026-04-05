import { FaqList } from "@/components/faq-list";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Contact</p>
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">Get in touch</h1>
        <p className="max-w-3xl text-neutral-600">
          Reach out for project discussions, bulk pricing, and design support.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="card-glow overflow-hidden bg-gradient-to-br from-white to-blue-50 p-6">
          <div className="mb-3 inline-block rounded-lg bg-gradient-to-r from-blue-100 to-pink-100 p-3">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="text-lg font-semibold text-blue-950">Email</h2>
          <p className="mt-2 text-sm text-neutral-600">hello@3dprintstudio.local</p>
        </article>
        <article className="card-glow overflow-hidden bg-gradient-to-br from-white to-blue-50 p-6">
          <div className="mb-3 inline-block rounded-lg bg-gradient-to-r from-blue-100 to-pink-100 p-3">
            <span className="text-2xl">📞</span>
          </div>
          <h2 className="text-lg font-semibold text-blue-950">Phone</h2>
          <p className="mt-2 text-sm text-neutral-600">+60 12-345 6789</p>
        </article>
        <article className="card-glow overflow-hidden bg-gradient-to-br from-white to-blue-50 p-6">
          <div className="mb-3 inline-block rounded-lg bg-gradient-to-r from-blue-100 to-pink-100 p-3">
            <span className="text-2xl">🕐</span>
          </div>
          <h2 className="text-lg font-semibold text-blue-950">Workshop Hours</h2>
          <p className="mt-2 text-sm text-neutral-600">Mon-Sat, 9:00AM - 7:00PM</p>
        </article>
      </section>

      <section className="mt-14">
        <div className="mb-6 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">❓ Frequently asked questions</h2>
          <p className="text-neutral-600">Find answers to common questions about our services.</p>
        </div>
        <FaqList />
      </section>
    </main>
  );
}



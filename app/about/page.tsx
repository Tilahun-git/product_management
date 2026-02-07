'use client'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            We build scalable, high-quality digital products focused on performance, usability, and long-term value.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Our mission is to craft software that solves real problems. We focus on clean architecture, thoughtful design, and sustainable engineering practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Core Values</h2>
            <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <li>• Simplicity and clarity</li>
              <li>• Engineering excellence</li>
              <li>• Honest collaboration</li>
              <li>• Long-term thinking</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-10 shadow-sm">
          <h2 className="text-2xl font-semibold">How We Work</h2>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We work closely with our partners, prioritize communication, and focus on outcomes — not just output.
          </p>
        </div>
      </section>
    </main>
  )
}

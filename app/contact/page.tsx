'use client'

import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Let’s talk about your project or idea.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {/* Info */}
          <div>
            <h2 className="text-xl font-semibold">Get in touch</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Send us a message and we’ll respond shortly.
            </p>

            <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Email:</strong> contact@yourcompany.com</p>
              <p><strong>Availability:</strong> Worldwide</p>
            </div>
          </div>

          {/* Form */}
          <form className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-8 shadow-sm space-y-6">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={4}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-900 px-4 py-3 font-medium hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

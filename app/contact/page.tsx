export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Contact
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Let’s talk about your project or idea.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {/* Info */}
          <div>
            <h2 className="text-xl font-semibold">Get in touch</h2>
            <p className="mt-4 text-muted-foreground">
              Send us a message and we’ll respond shortly.
            </p>

            <div className="mt-6 space-y-3 text-muted-foreground">
              <p><strong>Email:</strong> contact@yourcompany.com</p>
              <p><strong>Availability:</strong> Worldwide</p>
            </div>
          </div>

          {/* Form */}
          <form className="rounded-2xl border bg-card p-8 shadow-sm space-y-6">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                required
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring hover:bg-gray-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring hover:bg-gray-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={4}
                required
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring hover:bg-gray-200"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-3 text-primary-foreground font-medium hover:opacity-90 transition hover:bg-gray-400"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

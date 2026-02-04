export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">
            About Us
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We build scalable, high-quality digital products focused on
            performance, usability, and long-term value.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mission is to craft software that solves real problems.
              We focus on clean architecture, thoughtful design, and
              sustainable engineering practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Core Values</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• Simplicity and clarity</li>
              <li>• Engineering excellence</li>
              <li>• Honest collaboration</li>
              <li>• Long-term thinking</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 rounded-2xl border bg-card p-10 shadow-sm">
          <h2 className="text-2xl font-semibold">
            How We Work
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We work closely with our partners, prioritize communication,
            and focus on outcomes — not just output.
          </p>
        </div>
      </section>
    </main>
  );
}

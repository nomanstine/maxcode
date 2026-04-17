export default function HomeLoading() {
  return (
    <main className="page-shell" aria-busy="true" aria-live="polite">
      <div className="mx-auto max-w-6xl">
        <section className="panel-surface mb-8 rounded-3xl p-6 sm:p-8">
          <div className="skeleton h-3 w-32 rounded-full" />
          <div className="skeleton mt-4 h-11 w-56 rounded-xl" />
          <div className="skeleton mt-4 h-5 w-full max-w-3xl rounded-lg" />
        </section>

        <section className="panel-surface mb-10 rounded-2xl p-5 sm:p-6">
          <div className="skeleton h-8 w-52 rounded-lg" />
          <div className="skeleton mt-4 h-12 w-full rounded-xl" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="skeleton h-20 rounded-xl" />
            <div className="skeleton h-20 rounded-xl" />
          </div>
        </section>

        <section>
          <div className="skeleton mb-5 h-10 w-44 rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="panel-surface rounded-2xl p-5">
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton mt-3 h-8 w-2/3 rounded-lg" />
                <div className="skeleton mt-4 h-12 w-4/5 rounded-lg" />
                <div className="skeleton mt-4 h-4 w-24 rounded" />
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

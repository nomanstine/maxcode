export default function SurahLoading() {
  return (
    <main className="page-shell" aria-busy="true" aria-live="polite">
      <div className="mx-auto max-w-4xl">
        <div className="panel-surface inline-flex h-10 w-40 rounded-full" />

        <section className="panel-surface mt-4 rounded-3xl p-6 sm:p-8">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton mt-3 h-11 w-64 rounded-xl" />
          <div className="skeleton mt-4 ml-auto h-16 w-56 rounded-xl" />
          <div className="skeleton mt-4 h-4 w-20 rounded" />
        </section>

        <section className="mt-7 space-y-4 sm:space-y-5">
          {Array.from({ length: 7 }).map((_, index) => (
            <article key={index} className="panel-surface rounded-2xl p-5 sm:p-6">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton mt-4 ml-auto h-12 w-11/12 rounded-xl" />
              <div className="skeleton mt-5 h-5 w-full rounded" />
              <div className="skeleton mt-2 h-5 w-10/12 rounded" />
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

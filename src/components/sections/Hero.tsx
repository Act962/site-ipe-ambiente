export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="/images/hero-background.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-ipe-green-900/45 to-black/65" />
      <div className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-6 py-40 md:min-h-[90vh] md:py-56">
        <div className="max-w-3xl">
          <img
            src="/icons/quote.svg"
            alt=""
            aria-hidden="true"
            className="mb-4 h-10 w-10 md:h-12 md:w-12"
          />
          <p className="text-2xl font-semibold uppercase leading-relaxed tracking-[0.18em] text-white drop-shadow-lg md:text-3xl">
            Proteger as florestas do nosso planeta é a única forma de garantir que nossos
            filhos e netos tenham um lar.
          </p>
        </div>
      </div>
    </section>
  )
}

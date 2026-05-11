import { Quote } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden hero-forest">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center md:py-40">
        <Quote className="mb-6 h-10 w-10 text-white/80" />
        <p className="max-w-3xl text-2xl font-semibold uppercase leading-relaxed tracking-[0.18em] text-white drop-shadow-lg md:text-3xl">
          Proteger as florestas do nosso planeta é a única forma de garantir que nossos
          filhos e netos tenham um lar.
        </p>
      </div>
      <div className="treeline relative h-24 w-full" />
    </section>
  )
}

import { CtaButton } from '#/components/ui/CtaButton'

export function FinalCta() {
  return (
    <section id="support" className="relative isolate overflow-hidden hero-forest">
      <div className="relative flex flex-col items-center px-6 py-28 text-center">
        <div className="mb-8 h-32 w-32 rounded-full bg-ipe-pink/40 blur-2xl" />
        <CtaButton href="#contact">CONTRATAR</CtaButton>
      </div>
    </section>
  )
}

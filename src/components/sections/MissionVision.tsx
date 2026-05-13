import { ClippedPhoto } from '#/components/ui/ClippedPhoto'
import { CtaButton } from '#/components/ui/CtaButton'

export function MissionVision() {
  return (
    <section className="relative bg-ipe-brand py-20">
      <div className="mx-auto max-w-5xl space-y-14 px-6">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h3 className="mb-3 text-lg font-bold text-ipe-pink">Missão:</h3>
            <p className="text-sm leading-relaxed text-white/95">
              Semear conhecimento e cultivar o pertencimento através de experiências de
              educação ambiental de alto impacto, conectando saberes locais a uma consciência
              global de forma inclusiva e sustentável.
            </p>
          </div>
          <ClippedPhoto
            className="h-60 w-80 md:h-72 md:w-96"
            src="/images/01.jpeg"
            alt="Missão"
          />
        </div>

        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <ClippedPhoto
            className="h-60 w-80 md:h-72 md:w-96"
            src="/images/02.jpeg"
            alt="Visão"
            imgClassName="object-top"
          />
          <div>
            <h3 className="mb-3 text-lg font-bold text-ipe-pink">Visão:</h3>
            <p className="text-sm leading-relaxed text-white/95">
              Ser referência nacional em educação ambiental integrada, transformando
              realidades locais em exemplos globais.
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <CtaButton href="#contact">CONTRATAR</CtaButton>
        </div>
      </div>
    </section>
  )
}

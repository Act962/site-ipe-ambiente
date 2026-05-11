import { Logo } from '#/components/ui/Logo'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ipe-green-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-10 text-sm font-semibold tracking-widest text-white md:flex">
          <a href="#about-us" className="hover:text-ipe-pink">QUEM SOMOS</a>
          <a href="#services" className="hover:text-ipe-pink">SERVIÇOS</a>
          <a href="#support" className="hover:text-ipe-pink">APOIO</a>
          <a href="#contact" className="hover:text-ipe-pink">CONTATO</a>
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-ipe-green-500 px-6 py-2 text-xs font-bold tracking-widest text-white shadow hover:bg-ipe-green-400 md:inline-flex"
        >
          CONTRATAR
        </a>
      </div>
    </header>
  )
}

type CtaButtonProps = {
  children?: React.ReactNode
  href?: string
  className?: string
}

export function CtaButton({
  children = 'CONTRATAR',
  href,
  className = '',
}: CtaButtonProps) {
  const cls = `inline-flex items-center justify-center rounded-full bg-ipe-green-500 px-10 py-3 text-sm font-bold tracking-widest text-white shadow-lg shadow-ipe-green-900/30 transition-transform hover:scale-[1.03] hover:bg-ipe-green-400 active:scale-[0.98] ${className}`
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls}>
      {children}
    </button>
  )
}

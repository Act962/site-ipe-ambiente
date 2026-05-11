export function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const isLg = size === 'lg'
  return (
    <div className={`flex items-center gap-2 ${isLg ? 'flex-col' : ''}`}>
      <div
        className={`relative flex items-center justify-center rounded-full bg-white ${
          isLg ? 'h-20 w-20' : 'h-10 w-10'
        }`}
      >
        <span
          className={`font-script leading-none text-ipe-green-700 ${
            isLg ? 'text-4xl' : 'text-2xl'
          }`}
        >
          ip
        </span>
        <span
          className={`absolute rounded-full bg-ipe-pink shadow-sm ${
            isLg ? '-top-1.5 right-1 h-4 w-4' : '-top-1 right-0 h-2.5 w-2.5'
          }`}
        />
      </div>
      <div className={`leading-tight ${isLg ? 'text-center' : ''}`}>
        <div className={`font-script text-white ${isLg ? 'text-3xl' : 'text-xl'}`}>Ipê</div>
        <div
          className={`font-semibold tracking-[0.25em] text-white/80 ${
            isLg ? 'text-[10px]' : 'text-[10px]'
          }`}
        >
          EDUCAÇÃO AMBIENTAL
        </div>
      </div>
    </div>
  )
}

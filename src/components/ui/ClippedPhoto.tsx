type ClippedPhotoProps = {
  className?: string
  src?: string
  alt?: string
  imgClassName?: string
  children?: React.ReactNode
}

/**
 * Decorative photo shape — a slanted quadrilateral with rounded corners.
 * Uses an SVG mask (not raw clip-path) so all four corners stay rounded
 * and content never leaks past the visible edge.
 *
 * Pass `src` to fill it with an image later; otherwise it renders the
 * green placeholder.
 */
const SHAPE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M 0 18 A 4 4 0 0 1 3.916 13.18 L 63.084 0.82 A 4 4 0 0 1 68.256 3.796 L 98.744 96.204 A 4 4 0 0 1 96 100 L 4 100 A 4 4 0 0 1 0 96 Z' fill='black'/></svg>"

const maskStyle: React.CSSProperties = {
  WebkitMaskImage: `url("${SHAPE_SVG}")`,
  maskImage: `url("${SHAPE_SVG}")`,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
}

export function ClippedPhoto({
  className = '',
  src,
  alt = '',
  imgClassName = '',
  children,
}: ClippedPhotoProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ filter: 'drop-shadow(0 10px 14px rgb(0 0 0 / 0.25))' }}
    >
      <div className="absolute inset-0 bg-ipe-green-700" style={maskStyle}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className={`h-full w-full object-cover ${imgClassName}`}
          />
        ) : (
          <div className="photo-placeholder h-full w-full" />
        )}
        {children}
      </div>
    </div>
  )
}

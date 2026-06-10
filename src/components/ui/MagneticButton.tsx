import { useRef, type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../lib/gsap'
import { isTouch, cn } from '../../lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  to?: string
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'ghost'
  cursorLabel?: string
  className?: string
}

/**
 * A button (or link) that leans toward the pointer while hovered, then springs
 * back on leave. The inner label drifts at a smaller radius for depth.
 */
export default function MagneticButton({
  children,
  href,
  to,
  onClick,
  variant = 'solid',
  cursorLabel,
  className,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  const onMove = (e: MouseEvent) => {
    if (isTouch() || !wrapRef.current || !innerRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(wrapRef.current, { x: x * 0.3, y: y * 0.4, duration: 0.6, ease: 'power3' })
    gsap.to(innerRef.current, { x: x * 0.15, y: y * 0.2, duration: 0.6, ease: 'power3' })
  }

  const onLeave = () => {
    if (!wrapRef.current || !innerRef.current) return
    gsap.to([wrapRef.current, innerRef.current], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const base = cn(
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
    'px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-500',
    variant === 'solid' && 'bg-forest text-paper',
    variant === 'outline' && 'border border-graphite/25 text-graphite hover:border-forest',
    variant === 'ghost' && 'text-graphite',
    className,
  )

  const content = (
    <span ref={innerRef} className="relative z-10 inline-flex items-center gap-3">
      {children}
    </span>
  )

  const fill =
    variant === 'solid' ? (
      <span className="absolute inset-0 z-0 translate-y-full bg-sage transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0" />
    ) : null

  const wrapProps = {
    ref: wrapRef,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-cursor': 'hover',
    'data-cursor-label': cursorLabel,
    className: 'inline-block',
  }

  if (to) {
    return (
      <div {...wrapProps}>
        <Link to={to} className={base} onClick={onClick}>
          {fill}
          {content}
        </Link>
      </div>
    )
  }

  if (href) {
    return (
      <div {...wrapProps}>
        <a href={href} className={base} onClick={onClick}>
          {fill}
          {content}
        </a>
      </div>
    )
  }

  return (
    <div {...wrapProps}>
      <button type="button" className={base} onClick={onClick}>
        {fill}
        {content}
      </button>
    </div>
  )
}

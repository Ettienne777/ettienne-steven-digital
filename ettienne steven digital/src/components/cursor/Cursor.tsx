import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { isTouch } from '../../lib/utils'

type CursorVariant = 'default' | 'hover' | 'view' | 'explore' | 'drag' | 'scroll'

/**
 * A premium two-part cursor: a precise dot that tracks instantly and a ring
 * that trails with easing. State is driven declaratively from the DOM — any
 * element can set `data-cursor="view"` and `data-cursor-label="Open"`.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isTouch()) return

    const dot = dotRef.current!
    const ring = ringRef.current!

    const moveDot = {
      x: gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' }),
      y: gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' }),
    }
    const moveRing = {
      x: gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' }),
      y: gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' }),
    }

    let shown = false
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true
        setVisible(true)
      }
      moveDot.x(e.clientX)
      moveDot.y(e.clientY)
      moveRing.x(e.clientX)
      moveRing.y(e.clientY)
    }

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]')
      if (el) {
        setVariant((el.dataset.cursor as CursorVariant) || 'hover')
        setLabel(el.dataset.cursorLabel || '')
      } else {
        const interactive = (e.target as HTMLElement)?.closest(
          'a, button, input, textarea, select, label',
        )
        setVariant(interactive ? 'hover' : 'default')
        setLabel('')
      }
    }

    const onDown = () => gsap.to(ring, { scale: 0.78, duration: 0.2, ease: 'power3' })
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3' })
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  if (typeof window !== 'undefined' && isTouch()) return null

  const expanded = variant === 'view' || variant === 'explore' || variant === 'drag'

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-forest/40
          transition-[width,height,background-color,margin] duration-500 ease-[var(--ease)]"
        style={{
          width: expanded ? 84 : 44,
          height: expanded ? 84 : 44,
          marginLeft: expanded ? -42 : -22,
          marginTop: expanded ? -42 : -22,
          backgroundColor:
            variant === 'hover'
              ? 'rgba(36,49,38,0.06)'
              : expanded
                ? 'rgba(36,49,38,0.92)'
                : 'transparent',
        }}
      >
        {label && (
          <span className="select-none text-[10px] font-medium uppercase tracking-[0.18em] text-paper">
            {label}
          </span>
        )}
      </div>

      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-forest transition-opacity duration-300"
        style={{ opacity: expanded ? 0 : 1 }}
      />
    </div>
  )
}

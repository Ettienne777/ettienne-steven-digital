import { useEffect, useRef, type ElementType } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { cn } from '../../lib/utils'

interface RevealTextProps {
  text: string
  as?: ElementType
  className?: string
  /** Seconds between each word. */
  stagger?: number
  /** Initial delay in seconds. */
  delay?: number
  /** Start position for ScrollTrigger (default: when 85% into view). */
  start?: string
}

/**
 * Editorial word-by-word reveal. Each word sits in an overflow-hidden line and
 * rises into place with a soft skew — the signature type motion of the site.
 */
export default function RevealText({
  text,
  as: Tag = 'span',
  className,
  stagger = 0.06,
  delay = 0,
  start = 'top 85%',
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = el.querySelectorAll<HTMLElement>('.rt-inner')
    if (reduce) {
      gsap.set(targets, { y: '0%', rotate: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 115, rotate: 4, opacity: 0 })
      gsap.to(targets, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.05,
        delay,
        ease: 'power4.out',
        stagger,
        scrollTrigger: { trigger: el, start },
      })
    }, el)

    return () => ctx.revert()
  }, [text, stagger, delay, start])

  return (
    <Tag ref={ref as any} className={cn('inline-block', className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-top"
          style={{ marginRight: '0.26em' }}
        >
          <span className="rt-inner inline-block will-change-transform">{word}</span>
        </span>
      ))}
    </Tag>
  )
}

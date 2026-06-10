import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

type Treatment = 'maskUp' | 'wordStagger' | 'charBlur' | 'slideClip' | 'scaleSettle'

interface Statement {
  text: string
  treatment: Treatment
  align: 'left' | 'center' | 'right'
}

const statements: Statement[] = [
  { text: "We don't build websites.", treatment: 'maskUp', align: 'left' },
  { text: 'We design moments.', treatment: 'wordStagger', align: 'right' },
  { text: 'We create curiosity.', treatment: 'charBlur', align: 'center' },
  { text: 'We create memory.', treatment: 'slideClip', align: 'left' },
  { text: 'We create experiences.', treatment: 'scaleSettle', align: 'right' },
]

function StatementBlock({ data, idx }: { data: Statement; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const heading = el.querySelector<HTMLElement>('.stmt')!
    const trigger: any = { trigger: el, start: 'top 78%' }

    if (reduce) return

    const ctx = gsap.context(() => {
      switch (data.treatment) {
        case 'maskUp': {
          const inner = heading.querySelector('.inner')!
          gsap.set(inner, { yPercent: 120 })
          gsap.to(inner, { yPercent: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: trigger })
          break
        }
        case 'wordStagger': {
          const words = heading.querySelectorAll('.word')
          gsap.set(words, { yPercent: 120, opacity: 0 })
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.12,
            scrollTrigger: trigger,
          })
          break
        }
        case 'charBlur': {
          const chars = heading.querySelectorAll('.char')
          gsap.set(chars, { opacity: 0, filter: 'blur(14px)', y: 14 })
          gsap.to(chars, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            stagger: 0.018,
            scrollTrigger: trigger,
          })
          break
        }
        case 'slideClip': {
          gsap.set(heading, { xPercent: -8, opacity: 0, clipPath: 'inset(0 100% 0 0)' })
          gsap.to(heading, {
            xPercent: 0,
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: trigger,
          })
          break
        }
        case 'scaleSettle': {
          gsap.set(heading, { scale: 1.18, opacity: 0 })
          gsap.to(heading, {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: trigger,
          })
          break
        }
      }
    }, el)
    return () => ctx.revert()
  }, [data])

  const alignClass =
    data.align === 'left' ? 'items-start text-left'
    : data.align === 'right' ? 'items-end text-right'
    : 'items-center text-center'

  // Build the heading markup appropriate to its treatment.
  let headingContent
  if (data.treatment === 'maskUp') {
    headingContent = (
      <span className="block overflow-hidden">
        <span className="inner block">{data.text}</span>
      </span>
    )
  } else if (data.treatment === 'wordStagger') {
    headingContent = data.text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden align-top" style={{ marginRight: '0.22em' }}>
        <span className="word inline-block">{w}</span>
      </span>
    ))
  } else if (data.treatment === 'charBlur') {
    headingContent = data.text.split('').map((c, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: 'pre' }}>
        {c}
      </span>
    ))
  } else {
    headingContent = data.text
  }

  return (
    <div ref={ref} className={`flex min-h-[58vh] flex-col justify-center ${alignClass}`}>
      <span className="eyebrow mb-6 text-graphite/30">{String(idx + 1).padStart(2, '0')} — 05</span>
      <h3 className="stmt max-w-5xl font-display text-[10vw] font-light leading-[0.95] text-forest md:text-[6.5vw]">
        {headingContent}
      </h3>
    </div>
  )
}

export default function Philosophy() {
  return (
    <section className="relative z-10 bg-paper">
      <div className="shell py-24 md:py-36">
        <p className="eyebrow mb-20">Philosophy</p>
        <div className="flex flex-col gap-10">
          {statements.map((s, i) => (
            <StatementBlock key={i} data={s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

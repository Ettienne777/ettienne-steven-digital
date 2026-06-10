import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import RevealText from '../ui/RevealText'

const phases = [
  { n: '01', name: 'Discovery', copy: 'Listening first. Understanding the brand, the audience and the ambition.' },
  { n: '02', name: 'Strategy', copy: 'Defining the idea worth building, and the story it needs to tell.' },
  { n: '03', name: 'Direction', copy: 'Setting the visual and motion language before a single screen is designed.' },
  { n: '04', name: 'Design', copy: 'Composing every state, type scale and detail with intention.' },
  { n: '05', name: 'Development', copy: 'Engineering it for real — performant, accessible, alive.' },
  { n: '06', name: 'Launch', copy: 'Refining to the last frame, then releasing something worth remembering.' },
]

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // The spine draws itself as the section scrolls through.
      const spine = el.querySelector<HTMLElement>('.spine-fill')!
      if (!reduce) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom 75%', scrub: true },
          },
        )
      } else {
        gsap.set(spine, { scaleY: 1 })
      }

      // Each phase fades and rises into place.
      const rows = el.querySelectorAll<HTMLElement>('.phase')
      rows.forEach((row) => {
        if (reduce) return
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 82%' },
        })
        // The dot fills as the phase arrives.
        const dot = row.querySelector('.dot')
        gsap.to(dot, {
          backgroundColor: '#243126',
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 70%' },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="relative z-10 bg-forest text-paper">
      <div className="shell py-24 md:py-36">
        <div className="mb-20 max-w-3xl">
          <p className="eyebrow mb-8 text-sage">How the work is made</p>
          <RevealText
            as="h2"
            text="The Process"
            className="font-display text-6xl font-light leading-none text-paper md:text-8xl"
          />
        </div>

        <div ref={ref} className="relative pl-10 md:pl-16">
          {/* Spine */}
          <div className="absolute left-[3px] top-2 bottom-2 w-px bg-paper/15 md:left-[5px]">
            <div className="spine-fill absolute inset-0 origin-top bg-paper/70" style={{ transform: 'scaleY(0)' }} />
          </div>

          <ol className="space-y-14 md:space-y-20">
            {phases.map((p) => (
              <li key={p.n} className="phase relative">
                <span
                  className="dot absolute -left-10 top-2 h-2.5 w-2.5 rounded-full border border-paper/50 md:-left-16"
                  style={{ transform: 'scale(0.6)', backgroundColor: 'transparent' }}
                />
                <div className="grid gap-2 md:grid-cols-12 md:items-baseline md:gap-8">
                  <span className="font-sans text-sm text-sage md:col-span-1">{p.n}</span>
                  <h3 className="font-display text-4xl font-light text-paper md:col-span-4 md:text-6xl">
                    {p.name}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-paper/60 md:col-span-7">
                    {p.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

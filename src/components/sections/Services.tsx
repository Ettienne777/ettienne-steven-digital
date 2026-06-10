import { useState } from 'react'
import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

const services = [
  {
    index: '01',
    name: 'Experience Design',
    copy: 'Architecting how a site feels, moves and unfolds — the choreography beneath the surface.',
  },
  {
    index: '02',
    name: 'Web Development',
    copy: 'Hand-built, performant front-ends. React, TypeScript, WebGL and motion, engineered to last.',
  },
  {
    index: '03',
    name: 'Creative Direction',
    copy: 'A coherent visual language: typography, palette, art direction and tone of voice.',
  },
  {
    index: '04',
    name: 'Motion Design',
    copy: 'Animation with intent — reveals, transitions and ambient movement that carry meaning.',
  },
]

export default function Services() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="services" className="relative z-10 bg-paper">
      <div className="shell border-t border-graphite/10 py-24 md:py-36">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-8">What I do</p>
          <RevealText
            as="h2"
            text="Services"
            className="font-display text-6xl font-light leading-none text-forest md:text-8xl"
          />
        </div>

        <ul>
          {services.map((s, i) => {
            const open = active === i
            return (
              <li
                key={s.name}
                data-cursor="explore"
                className="group border-t border-graphite/10 last:border-b"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="relative flex items-center gap-6 py-7 md:py-9">
                  {/* Accent wash that wipes in on hover */}
                  <span
                    className={`pointer-events-none absolute inset-0 -z-0 origin-left bg-mist transition-transform duration-500 ease-[var(--ease)] ${
                      open ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                  <span className="relative z-10 w-12 font-sans text-sm text-sage">{s.index}</span>
                  <h3
                    className={`relative z-10 flex-1 font-display text-4xl font-light leading-tight transition-all duration-500 md:text-6xl ${
                      open ? 'translate-x-2 text-forest' : 'text-graphite'
                    }`}
                  >
                    {s.name}
                  </h3>
                  <span
                    className={`relative z-10 text-2xl text-forest transition-transform duration-500 ${
                      open ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    +
                  </span>
                </div>

                {/* Description: hover-expand on desktop, always shown on small screens */}
                <div
                  className={`relative z-10 overflow-hidden transition-all duration-500 ease-[var(--ease)] ${
                    open ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  } md:block`}
                >
                  <p className="max-w-xl pb-8 pl-[4.5rem] text-lg leading-relaxed text-graphite/60">
                    {s.copy}
                  </p>
                </div>
                {/* Mobile fallback (no hover): show copy */}
                <div className="block pb-7 pl-[4.5rem] md:hidden">
                  <p className="max-w-xl text-base leading-relaxed text-graphite/60">{s.copy}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <Reveal>
          <p className="mt-12 max-w-xl text-sm leading-relaxed text-graphite/40">
            Most engagements weave these together. The discipline that leads depends entirely
            on what the work needs to become.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

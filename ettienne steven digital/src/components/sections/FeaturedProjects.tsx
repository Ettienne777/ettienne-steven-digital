import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '../../data/projects'
import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

/** Art-directed visual plate built from each project's own palette — no stock imagery. */
function ProjectVisual({ project, idx }: { project: Project; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const { bg, ink, accent } = project.palette

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] md:aspect-[5/6]"
      style={{ backgroundColor: bg }}
    >
      {/* Ghosted wordmark */}
      <motion.span
        style={{ y, color: ink }}
        className="pointer-events-none absolute -left-2 bottom-4 select-none font-display text-[22vw] font-light leading-none opacity-[0.08] md:text-[12vw]"
      >
        {project.index}
      </motion.span>

      {/* Composition that varies per project */}
      <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.04]">
        {idx === 0 && (
          <>
            <div className="absolute left-1/2 top-1/2 h-[60%] w-px -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: accent, opacity: 0.5 }} />
            <div className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: accent }} />
            <div className="absolute left-1/2 top-1/2 h-[20%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent, opacity: 0.85 }} />
          </>
        )}
        {idx === 1 && (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(60% 50% at 50% 60%, ${accent}55, transparent 70%), radial-gradient(40% 40% at 65% 30%, ${accent}40, transparent 70%)`,
            }}
          />
        )}
        {idx === 2 && (
          <>
            <div className="absolute inset-x-[18%] top-[16%] bottom-[34%]" style={{ backgroundColor: accent, opacity: 0.16 }} />
            <div className="absolute inset-x-[28%] top-[28%] bottom-[22%]" style={{ backgroundColor: accent, opacity: 0.28 }} />
            <div className="absolute inset-x-[38%] top-[40%] bottom-[10%]" style={{ backgroundColor: accent, opacity: 0.5 }} />
          </>
        )}
      </div>

      <span
        className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.22em]"
        style={{ color: ink, opacity: 0.5 }}
      >
        {project.year}
      </span>
    </div>
  )
}

function ProjectRow({ project, idx }: { project: Project; idx: number }) {
  const reversed = idx % 2 === 1
  return (
    <Reveal y={40}>
      <Link
        to={`/work/${project.slug}`}
        data-cursor="view"
        data-cursor-label="View"
        className="group block border-t border-graphite/10 py-12 md:py-20"
      >
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
          <div className={`md:col-span-6 ${reversed ? 'md:order-2' : ''}`}>
            <ProjectVisual project={project} idx={idx} />
          </div>

          <div className={`md:col-span-6 ${reversed ? 'md:order-1' : ''}`}>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-xl text-sage">{project.index}</span>
              <span className="eyebrow text-graphite/40">{project.category}</span>
            </div>

            <h3 className="mt-4 font-display text-5xl font-light leading-[0.98] text-forest transition-colors duration-500 group-hover:text-sage md:text-7xl">
              {project.name}
            </h3>

            <p className="mt-5 max-w-md font-display text-2xl italic text-graphite/70">
              {project.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-3 gap-y-1 text-sm text-graphite/50">
              {project.services.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < project.services.length - 1 && <span className="ml-3 text-graphite/20">·</span>}
                </span>
              ))}
            </div>

            <span className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-forest">
              View project
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="relative z-10 bg-paper">
      <div className="shell border-t border-graphite/10 py-24 md:py-36">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-8">Selected Work</p>
          <RevealText
            as="h2"
            text="Concept Studies"
            className="font-display text-6xl font-light leading-[0.98] text-forest md:text-8xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-graphite/60">
              Self-initiated projects, created to demonstrate creative thinking, design
              systems and development capability. Each is approached exactly as a real
              client engagement would be — strategy through to refinement.
            </p>
          </Reveal>
        </div>

        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

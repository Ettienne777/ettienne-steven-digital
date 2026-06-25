import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '../../data/projects'
import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

/** Real screenshot of the live site, framed like a browser window. */
function ProjectVisual({ project }: { project: Project; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const { bg, ink, accent } = project.palette

  return (
    <div
      ref={ref}
      className="relative aspect-[16/11] w-full overflow-hidden rounded-[6px] border"
      style={{ backgroundColor: bg, borderColor: `${ink}1a` }}
    >
      {/* Ghosted index number, sits behind the screenshot */}
      <motion.span
        style={{ y, color: ink }}
        className="pointer-events-none absolute -left-2 bottom-2 select-none font-display text-[22vw] font-light leading-none opacity-[0.06] md:text-[10vw]"
      >
        {project.index}
      </motion.span>

      {/* Faux browser chrome so it reads unmistakably as "a real, live website" */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-2.5"
        style={{ backgroundColor: bg, borderBottom: `1px solid ${ink}14` }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent, opacity: 0.6 }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ink, opacity: 0.18 }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ink, opacity: 0.18 }} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: ink, opacity: 0.45 }}>
          {project.year}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-9 overflow-hidden transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.04]">
        <img src={project.image} alt={`${project.name} — live site`} className="h-full w-full object-cover object-top" />
      </div>
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
            text="Real Clients, Real Sites"
            className="font-display text-6xl font-light leading-[0.98] text-forest md:text-8xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-graphite/60">
              No mock-ups here — these are live businesses, built and deployed exactly the way
              I&rsquo;d build yours: strategy through to refinement, then handed over and kept
              running.
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

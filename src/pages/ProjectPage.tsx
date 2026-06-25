import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProject, projects } from '../data/projects'
import { ScrollTrigger } from '../lib/gsap'
import { scrollTo } from '../lib/scroll'
import RevealText from '../components/ui/RevealText'
import Reveal from '../components/ui/Reveal'
import MagneticButton from '../components/ui/MagneticButton'

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    scrollTo(0, { duration: 0 })
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [slug])

  if (!project) {
    return (
      <main className="flex min-h-[100svh] flex-col items-center justify-center text-center">
        <p className="eyebrow mb-6">404</p>
        <h1 className="font-display text-5xl text-forest">That project drifted into the mist.</h1>
        <Link to="/" className="mt-8 text-sm text-forest underline-offset-4 hover:underline" data-cursor="hover">
          ← Back to the studio
        </Link>
      </main>
    )
  }

  const idx = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(idx + 1) % projects.length]
  const { bg, ink, accent } = project.palette

  return (
    <main className="relative z-10">
      {/* Cinematic title block in the project's own palette */}
      <header
        className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden"
        style={{ backgroundColor: bg, color: ink }}
      >
        <div className="shell pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="flex items-center gap-4"
          >
            <span className="font-display text-xl" style={{ color: accent }}>
              {project.index}
            </span>
            <span className="text-[11px] uppercase tracking-[0.24em]" style={{ opacity: 0.7 }}>
              {project.category} · {project.year}
            </span>
          </motion.div>

          <h1 className="mt-8 overflow-hidden font-display text-[16vw] font-light leading-[0.9] md:text-[10vw]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease, delay: 0.1 }}
            >
              {project.name}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, ease, delay: 0.5 }}
            className="mt-8 max-w-xl font-display text-2xl italic md:text-3xl"
          >
            {project.tagline}
          </motion.p>
        </div>

        {/* faint accent field */}
        <div
          className="pointer-events-none absolute -right-1/4 top-0 h-full w-1/2 rounded-full blur-3xl"
          style={{ background: accent, opacity: 0.18 }}
        />
      </header>

      {/* The actual, live site */}
      <section className="bg-paper">
        <div className="shell py-16 md:py-20">
          <div className="overflow-hidden rounded-[6px] border border-graphite/10 shadow-[0_40px_80px_-30px_rgba(23,23,23,0.25)]">
            <img src={project.image} alt={`${project.name} — live site`} className="block w-full" />
          </div>
        </div>
      </section>

      {/* The brand idea */}
      <section className="border-t border-graphite/10 bg-paper">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <p className="eyebrow md:col-span-3">The Brand</p>
          <div className="md:col-span-9">
            <RevealText
              as="p"
              text={project.brand.idea}
              className="max-w-3xl font-display text-3xl font-light leading-snug text-forest md:text-5xl"
              stagger={0.04}
            />
            <ul className="mt-12 grid max-w-2xl gap-4">
              {project.brand.notes.map((n, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex gap-4 text-graphite/70">
                    <span className="text-sage">—</span>
                    <span className="text-lg leading-relaxed">{n}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-graphite/10 bg-paper">
        <div className="shell grid gap-12 py-24 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Overview</p>
          <Reveal className="md:col-span-9">
            <p className="max-w-3xl text-xl leading-relaxed text-graphite/75 md:text-2xl">
              {project.story}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="border-t border-graphite/10 bg-paper">
        <div className="shell grid gap-12 py-24 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow mb-6">The Challenge</p>
              <p className="text-lg leading-relaxed text-graphite/70">{project.challenge}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="eyebrow mb-6">The Solution</p>
              <p className="text-lg leading-relaxed text-graphite/70">{project.solution}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bespoke interactions */}
      <section className="border-t border-graphite/10" style={{ backgroundColor: bg, color: ink }}>
        <div className="shell py-24 md:py-32">
          <p className="eyebrow mb-12" style={{ color: accent }}>
            Custom Interactions
          </p>
          <ol className="grid gap-px overflow-hidden rounded-[2px] md:grid-cols-3" style={{ backgroundColor: `${ink}1a` }}>
            {project.interactions.map((it, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <li
                  className="flex h-full flex-col gap-6 p-8 md:p-10"
                  style={{ backgroundColor: bg }}
                >
                  <span className="font-display text-3xl" style={{ color: accent }}>
                    0{i + 1}
                  </span>
                  <p className="text-lg leading-relaxed" style={{ opacity: 0.85 }}>
                    {it}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Metrics + services */}
      <section className="border-t border-graphite/10 bg-paper">
        <div className="shell grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-8">At a glance</p>
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="text-sm text-graphite/40">{m.label}</dt>
                  <dd className="mt-2 font-display text-2xl text-forest">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow mb-8">Disciplines</p>
            <ul className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <li key={s} className="rounded-full border border-graphite/15 px-4 py-2 text-sm text-graphite/70">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-graphite/10 bg-paper">
        <Link
          to={`/work/${next.slug}`}
          data-cursor="view"
          data-cursor-label="Next"
          className="group block"
        >
          <div className="shell flex flex-col items-center py-24 text-center md:py-36">
            <p className="eyebrow mb-6">Next Project</p>
            <h2 className="font-display text-6xl font-light text-forest transition-colors duration-500 group-hover:text-sage md:text-8xl">
              {next.name}
            </h2>
            <span className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-forest">
              View project
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
            </span>
          </div>
        </Link>
      </section>

      {/* Quiet CTA back to contact */}
      <section className="bg-forest text-paper">
        <div className="shell flex flex-col items-center gap-8 py-20 text-center">
          <p className="max-w-xl font-display text-3xl font-light leading-snug md:text-4xl">
            Have a project that deserves the same care?
          </p>
          <MagneticButton variant="outline" to="/" cursorLabel="Home" className="border-paper/30 text-paper hover:border-paper">
            Start a conversation
          </MagneticButton>
        </div>
      </section>
    </main>
  )
}

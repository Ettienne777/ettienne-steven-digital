import { useEffect, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { viewport } from '../../lib/viewport'
import { scrollTo } from '../../lib/scroll'
import MagneticButton from '../ui/MagneticButton'

const ease = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const rise: Variants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1, ease } },
}
const lineRise: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease } },
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)

  // Drive the global hero progress (0 → 1) used by the WebGL scene.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        viewport.heroProgress = self.progress
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        className="shell relative z-10 flex flex-col items-center text-center"
      >
        <motion.p variants={rise} className="eyebrow mb-8">
          Digital Studio · South Africa
        </motion.p>

        <h1 className="font-display leading-[0.92] text-forest">
          <span className="block overflow-hidden">
            <motion.span variants={lineRise} className="block text-[18vw] font-light md:text-[12vw] lg:text-[10rem]">
              By Ettienne
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={rise}
          className="mt-8 max-w-2xl font-display text-2xl italic leading-snug text-graphite/80 md:text-3xl"
        >
          Digital experiences designed to be felt, not simply viewed.
        </motion.p>

        <motion.p
          variants={rise}
          className="mt-6 max-w-xl text-base leading-relaxed text-graphite/60"
        >
          I create immersive websites that blend storytelling, design, motion and
          technology into unforgettable online experiences.
        </motion.p>

        <motion.div variants={rise} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton variant="solid" cursorLabel="Enter" onClick={() => scrollTo('#studio')}>
            Explore the Studio
          </MagneticButton>
          <MagneticButton variant="outline" cursorLabel="Say hello" onClick={() => scrollTo('#contact')}>
            Start a Project
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Corner meta + scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="shell pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-end justify-between"
      >
        <span className="hidden text-xs uppercase tracking-[0.2em] text-graphite/40 md:block">
          28°S — Free State
        </span>
        <div className="mx-auto flex flex-col items-center gap-3 md:mx-0">
          <span className="text-[10px] uppercase tracking-[0.3em] text-graphite/40">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-graphite/15">
            <span className="absolute inset-x-0 top-0 block h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-forest" />
          </span>
        </div>
        <span className="hidden text-xs uppercase tracking-[0.2em] text-graphite/40 md:block">
          Est. 2025
        </span>
      </motion.div>

      <style>{`
        @keyframes scrollcue {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}

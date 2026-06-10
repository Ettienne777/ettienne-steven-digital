import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { splitChars } from '../../lib/utils'

/** Cinematic entry curtain: the studio name settles, a hairline fills, lift-off. */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false)
  const name = 'By Ettienne'

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-paper"
      initial={{ y: 0 }}
      animate={done ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => done && onComplete()}
    >
      <div className="overflow-hidden">
        <motion.h1
          className="font-display text-4xl md:text-6xl italic text-forest"
          aria-label={name}
        >
          {splitChars(name).map((c, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.15 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {c}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <div className="mt-8 h-px w-40 overflow-hidden bg-graphite/10">
        <motion.div
          className="h-full bg-forest"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: 'left' }}
          transition={{ delay: 0.4, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

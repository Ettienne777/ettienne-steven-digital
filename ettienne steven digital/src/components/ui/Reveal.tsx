import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

/** Generic fade-and-rise on scroll into view. Respects reduced motion via CSS. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease, delay },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </motion.div>
  )
}

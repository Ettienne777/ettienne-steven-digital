import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { scrollTo } from '../../lib/scroll'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'studio', label: 'Studio' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[90]"
    >
      <div
        className={`shell flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-7'
        }`}
      >
        <Link
          to="/"
          data-cursor="hover"
          className="font-display text-xl italic tracking-tight text-forest"
          onClick={() => isHome && scrollTo(0)}
        >
          By Ettienne
        </Link>

        <nav className="flex items-center gap-7">
          {isHome ? (
            <ul className="hidden items-center gap-7 md:flex">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    data-cursor="hover"
                    onClick={() => scrollTo(`#${s.id}`)}
                    className="group relative text-sm text-graphite/70 transition-colors hover:text-forest"
                  >
                    {s.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-forest transition-all duration-500 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <Link
              to="/"
              data-cursor="hover"
              className="hidden text-sm text-graphite/70 transition-colors hover:text-forest md:block"
            >
              ← Back to the studio
            </Link>
          )}

          <span className="hidden h-4 w-px bg-graphite/15 md:block" />

          <button
            data-cursor="hover"
            onClick={() => (isHome ? scrollTo('#contact') : (window.location.href = '/#contact'))}
            className="rounded-full border border-graphite/20 px-5 py-2 text-sm text-graphite transition-colors hover:border-forest hover:text-forest"
          >
            Start a project
          </button>
        </nav>
      </div>
    </motion.header>
  )
}

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { viewport } from '../lib/viewport'

/**
 * Initialises Lenis smooth scrolling and wires it into GSAP's ScrollTrigger
 * and the shared viewport store. Mount once, near the app root.
 */
export function useLenis(onReady?: (lenis: Lenis) => void) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', (e: { scroll: number; limit: number }) => {
      ScrollTrigger.update()
      viewport.scroll = e.limit > 0 ? e.scroll / e.limit : 0
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    onReady?.(lenis)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

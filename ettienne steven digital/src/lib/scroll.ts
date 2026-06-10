import type Lenis from 'lenis'

let _lenis: Lenis | null = null

export const registerLenis = (l: Lenis) => {
  _lenis = l
}

/** Smoothly scroll to a selector or offset. Falls back to native behaviour. */
export const scrollTo = (
  target: string | number,
  opts: { offset?: number; duration?: number } = {},
) => {
  if (_lenis) {
    _lenis.scrollTo(target, { offset: opts.offset ?? 0, duration: opts.duration ?? 1.4 })
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
}

export const stopScroll = () => _lenis?.stop()
export const startScroll = () => _lenis?.start()

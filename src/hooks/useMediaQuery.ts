import { useEffect, useState } from 'react'

/** Tracks a CSS media query and returns whether it currently matches. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Convenience: true when the user asked for reduced motion. */
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

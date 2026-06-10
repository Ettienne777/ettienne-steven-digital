/** Clamp a number between min and max. */
export const clamp = (n: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, n))

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Map a value from one range to another. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin)

/** Join class names, dropping falsy values. */
export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

/** True on touch / coarse-pointer devices (no bespoke cursor there). */
export const isTouch = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches

/** Split a string into characters while keeping spaces as non-breaking. */
export const splitChars = (text: string) =>
  text.split('').map((c) => (c === ' ' ? '\u00A0' : c))

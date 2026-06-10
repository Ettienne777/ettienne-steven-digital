/**
 * A tiny mutable singleton shared between the DOM world and the WebGL world.
 * The Three.js scene reads these values every frame inside `useFrame` so it can
 * react to the pointer and to scroll WITHOUT triggering React re-renders.
 */
export const viewport = {
  pointer: { x: 0, y: 0 },
  smoothPointer: { x: 0, y: 0 },
  scroll: 0,
  heroProgress: 0,
}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      viewport.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      viewport.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    },
    { passive: true },
  )
}

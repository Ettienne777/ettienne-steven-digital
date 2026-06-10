import { Suspense, lazy } from 'react'
import Hero from '../components/sections/Hero'
import Philosophy from '../components/sections/Philosophy'
import About from '../components/sections/About'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Services from '../components/sections/Services'
import Process from '../components/sections/Process'
import Contact from '../components/sections/Contact'

// The WebGL atmosphere is heavy — load it lazily so first paint stays fast.
const Atmosphere = lazy(() => import('../components/three/Atmosphere'))

export default function Home({ ready }: { ready: boolean }) {
  return (
    <>
      {/* Fixed atmospheric backdrop, behind all content */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Atmosphere />
        </Suspense>
      </div>

      <main className="relative">
        <Hero ready={ready} />
        <Philosophy />
        <About />
        <FeaturedProjects />
        <Services />
        <Process />
        <Contact />
      </main>
    </>
  )
}

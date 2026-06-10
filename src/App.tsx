import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import { ScrollTrigger } from './lib/gsap'
import { registerLenis, scrollTo, stopScroll, startScroll } from './lib/scroll'
import Cursor from './components/cursor/Cursor'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Loader from './components/layout/Loader'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'

/** Resets scroll + refreshes triggers whenever the route changes. */
function RouteController() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollTo(0, { duration: 0 })
    const t = setTimeout(() => ScrollTrigger.refresh(), 250)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

export default function App() {
  const [ready, setReady] = useState(false)

  // Smooth scrolling, wired to GSAP + the shared viewport store.
  useLenis((lenis) => registerLenis(lenis))

  // Hold scroll while the loader is up; release once we're in.
  useEffect(() => {
    stopScroll()
  }, [])

  const onLoaded = () => {
    setReady(true)
    startScroll()
    ScrollTrigger.refresh()
  }

  return (
    <>
      <Loader onComplete={onLoaded} />
      <Cursor />
      <Nav />
      <RouteController />

      <Routes>
        <Route path="/" element={<Home ready={ready} />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Home ready={ready} />} />
      </Routes>

      <Footer />

      {/* Paper grain over everything */}
      <div className="grain" aria-hidden />
    </>
  )
}

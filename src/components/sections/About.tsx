import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

const chips = ['📍 Welkom, SA', '💻 Designer & developer', '☕ Fuelled by coffee', '🌿 Detail-obsessed']

export default function About() {
  return (
    <section id="studio" className="relative z-10 bg-paper">
      <div className="shell border-t border-graphite/10 py-24 md:py-36">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Sticky meta rail + the actual person */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-28">
              <Reveal>
                <div className="polaroid mx-auto max-w-[260px] rotate-2 md:mx-0">
                  <div className="polaroid-tape" />
                  <img src="/me/about.jpg" alt="Ettienne, candid" />
                  <p className="handwritten mt-2 text-center text-lg text-graphite">
                    probably mid-thought about a layout
                  </p>
                </div>
              </Reveal>

              <p className="eyebrow mb-8 mt-12">The Studio</p>
              <dl className="space-y-6 text-sm">
                <div>
                  <dt className="text-graphite/40">Founder</dt>
                  <dd className="mt-1 text-graphite">Ettienne</dd>
                </div>
                <div>
                  <dt className="text-graphite/40">Based</dt>
                  <dd className="mt-1 text-graphite">Welkom, South Africa</dd>
                </div>
                <div>
                  <dt className="text-graphite/40">Established</dt>
                  <dd className="mt-1 text-graphite">2025</dd>
                </div>
              </dl>

              <ul className="mt-10 flex flex-wrap gap-2">
                {chips.map((c, i) => (
                  <li
                    key={c}
                    className={`handwritten rounded-full bg-forest px-4 py-1.5 text-base text-gold ${
                      i % 2 ? 'rotate-1' : '-rotate-1'
                    }`}
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="handwritten mt-6 text-2xl text-gold">— xo, Ettienne</p>
            </div>
          </aside>

          {/* Narrative */}
          <div className="md:col-span-8 lg:col-span-9">
            <RevealText
              as="h2"
              text="About By Ettienne"
              className="font-display text-5xl font-light leading-[1.02] text-forest md:text-7xl"
            />

            <p className="mt-12 max-w-2xl font-display text-3xl italic leading-snug text-graphite md:text-4xl">
              I started By Ettienne with a simple belief: a website should leave an
              impression.
            </p>

            <div className="mt-12 grid max-w-3xl gap-6 text-lg leading-relaxed text-graphite/70">
              <Reveal>
                <p>
                  Too many websites today feel interchangeable. They follow trends, use the
                  same layouts, and are forgotten moments after visitors leave. I wanted to
                  create something different.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  A studio focused on crafting digital experiences that feel intentional,
                  memorable, and alive. By combining design, motion, storytelling, and
                  development, I create websites that don&rsquo;t simply present information
                  — they create atmosphere, emotion, and curiosity.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  I&rsquo;m a little obsessive about details nobody else notices, and
                  genuinely happiest when a layout finally clicks. By Ettienne started as a
                  one-page-site side hustle in Welkom, and somewhere along the way it became
                  the thing I actually care about. Every project below is a real, live
                  business, not a concept — I treat each one exactly as I&rsquo;d want to be
                  treated as a client:
                </p>
              </Reveal>
            </div>

            {/* The working method */}
            <Reveal delay={0.05}>
              <ul className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4">
                {['Strategy', 'Research', 'Design', 'Development', 'Refinement'].map((s, i, arr) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="font-display text-2xl text-forest md:text-3xl">{s}</span>
                    {i < arr.length - 1 && <span className="text-sage">/</span>}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-12 max-w-2xl text-lg leading-relaxed text-graphite/70">
                Because great work begins long before a website goes live. My goal is simple:
              </p>
            </Reveal>

            <RevealText
              as="p"
              text="To create digital experiences people remember."
              className="mt-8 max-w-3xl font-display text-4xl font-light leading-tight text-forest md:text-6xl"
              stagger={0.05}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

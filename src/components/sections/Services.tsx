import { useState } from 'react'
import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

interface ServiceItem {
  name: string
  desc: string
  price: string
}
interface ServiceCategory {
  index: string
  title: string
  tagline: string
  from: string
  items: ServiceItem[]
}

const categories: ServiceCategory[] = [
  {
    index: '01',
    title: 'Website Packages',
    tagline: '4 ways to get online, from a single page to a full store.',
    from: 'From R3,500',
    items: [
      { name: 'One-Page Website', desc: 'Full design + dev + deployment', price: 'R7,500' },
      { name: 'Three-Page Website', desc: 'Home · About · Contact', price: 'R12,000' },
      { name: 'E-commerce Starter', desc: 'Up to 20 products · payment integration', price: 'R18,500' },
      { name: 'Landing Page Only', desc: 'Single conversion page', price: 'R3,500' },
    ],
  },
  {
    index: '02',
    title: 'Care Plans',
    tagline: 'Monthly retainers so your site stays online, fast and current.',
    from: 'From R400/mo',
    items: [
      { name: 'Basic Care Plan', desc: 'Hosting · uptime monitoring · 1 update/mo', price: 'R400/mo' },
      { name: 'Standard Care Plan', desc: 'Basic + 3 updates · monthly report', price: 'R750/mo' },
      { name: 'Premium Care Plan', desc: 'Unlimited updates · priority support', price: 'R1,200/mo' },
    ],
  },
  {
    index: '03',
    title: 'Add-On Services',
    tagline: 'Little extras that round out your online presence.',
    from: 'From R200',
    items: [
      { name: 'Google Business Profile', desc: 'Setup + optimisation', price: 'R500' },
      { name: 'WhatsApp Business Setup', desc: 'Config + integration', price: 'R350' },
      { name: 'Logo & Brand Identity', desc: 'Crest · wordmark · palette', price: 'R1,200' },
      { name: 'SEO Optimisation', desc: 'On-page + local SEO', price: 'R800' },
      { name: 'Monthly Social Graphic', desc: '1 branded post design', price: 'R200/mo' },
    ],
  },
  {
    index: '04',
    title: 'Ownership & Handover',
    tagline: 'For when you want full control, or just need a hand.',
    from: 'From R250',
    items: [
      { name: 'Full Site Ownership Transfer', desc: 'GitHub repo + Vercel + domain handover + walkthrough · replaces care plan', price: 'R1,500' },
      { name: 'Domain Setup Assistance', desc: 'Help buying & pointing your domain · free with a website package', price: 'R250' },
      { name: 'Client Training Session', desc: '30-min walkthrough — how to request updates etc', price: 'R400' },
    ],
  },
]

function FlipCard({ cat, i }: { cat: ServiceCategory; i: number }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <Reveal delay={i * 0.06}>
      <div
        className="group h-[380px] cursor-pointer [perspective:1500px]"
        data-cursor="explore"
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-[6px] border border-paper/10 bg-forest p-8 [backface-visibility:hidden]"
            style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold font-display text-lg italic text-gold">
              {cat.index}
            </span>
            <div>
              <h3 className="font-display text-3xl font-light text-paper">{cat.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/55">{cat.tagline}</p>
              <p className="mt-5 text-sm font-medium tracking-wide text-gold">{cat.from}</p>
            </div>
            <span className="self-end text-[10px] uppercase tracking-[0.2em] text-paper/40">
              ↻ tap to see pricing
            </span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 overflow-y-auto rounded-[6px] border border-graphite/10 bg-mist p-8 [backface-visibility:hidden]"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <h4 className="mb-5 font-display text-xl text-forest">{cat.title}</h4>
            <ul className="space-y-4">
              {cat.items.map((it) => (
                <li key={it.name} className="border-b border-graphite/10 pb-3 last:border-none">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-graphite">{it.name}</span>
                    <span className="whitespace-nowrap text-sm font-semibold text-forest">{it.price}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-graphite/55">{it.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative z-10 bg-paper">
      <div className="shell border-t border-graphite/10 py-24 md:py-36">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow mb-8">What I do</p>
            <RevealText
              as="h2"
              text="Everything I offer"
              className="font-display text-6xl font-light leading-none text-forest md:text-8xl"
            />
          </div>
          <p className="handwritten text-xl text-graphite/50">↻ tap a card to flip it</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat, i) => (
            <FlipCard key={cat.title} cat={cat} i={i} />
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-xl text-sm leading-relaxed text-graphite/40">
            Reference pricing — every project gets a proper quote based on what it actually
            needs. Update anytime.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

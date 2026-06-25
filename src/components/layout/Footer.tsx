import { scrollTo } from '../../lib/scroll'

const email = 'Ettienne06@icloud.com'
const phone = '063 023 2145'
const whatsapp = 'https://wa.me/27630232145'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-graphite/10 bg-paper">
      <div className="shell py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">By Ettienne</p>
            <p className="max-w-md font-display text-2xl leading-snug text-graphite md:text-3xl">
              Crafted with intention from South Africa.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-graphite/70">
            <span className="eyebrow mb-2 text-graphite/40">Contact</span>
            <span className="text-graphite">Ettienne</span>
            <a data-cursor="hover" href={whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-forest">
              WhatsApp
            </a>
            <a data-cursor="hover" href={`mailto:${email}`} className="transition-colors hover:text-forest">
              {email}
            </a>
            <a data-cursor="hover" href={`tel:${phone.replace(/\s/g, '')}`} className="transition-colors hover:text-forest">
              {phone}
            </a>
            <span className="text-graphite/50">South Africa</span>
          </div>
        </div>

        <div className="rule my-10" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-graphite/40 md:flex-row md:items-center">
          <span>© {year} By Ettienne. All rights reserved.</span>
          <button
            data-cursor="hover"
            onClick={() => scrollTo(0)}
            className="uppercase tracking-[0.2em] transition-colors hover:text-forest"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

const email = 'byettienne257@gmail.com'
const whatsapp = 'https://wa.me/27630232145'
const calendlyUrl = 'https://calendly.com/byettienne257/30min'
const calendlyEmbedUrl = `${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f6f3ee&text_color=171717&primary_color=243126`

export default function Booking() {
  return (
    <section id="booking" className="relative z-10 bg-forest text-paper">
      <div className="shell border-t border-paper/10 py-24 md:py-36">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Invitation */}
          <div className="md:col-span-5">
            <p className="eyebrow mb-8 text-sage">Let&rsquo;s build something</p>
            <RevealText
              as="h2"
              text="Got a Project in Mind?"
              className="font-display text-5xl font-light leading-[1.02] text-paper md:text-6xl"
              stagger={0.05}
            />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-md text-lg leading-relaxed text-paper/65">
                Pick a time that actually works on my calendar and let&rsquo;s talk through
                what you&rsquo;re building — no pressure, no pitch, just a conversation.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`${whatsapp}?text=Hi%20Ettienne!%20I%20found%20your%20site%20and%20I'd%20love%20to%20chat.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  WhatsApp me
                </a>
                <a
                  href={`mailto:${email}`}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  {email}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Real, live Calendly embed */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[10px] bg-paper shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)]">
                <div
                  className="calendly-inline-widget"
                  data-url={calendlyEmbedUrl}
                  style={{ minWidth: '320px', height: '650px' }}
                />
              </div>
              <p className="handwritten mt-4 text-center text-lg text-paper/45">
                pick any open slot — it lands straight on my real calendar
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

const email = 'Ettienne06@icloud.com'
const whatsapp = 'https://wa.me/27630232145'

const availableDays = [3, 4, 7, 10, 11, 14, 17, 18, 21, 24, 25]
const slots = ['09:00', '11:30', '14:00', '16:30']

export default function Booking() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

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
                Pick a time that works and let&rsquo;s talk through what you&rsquo;re
                building — no pressure, no pitch, just a conversation.
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

          {/* Booking widget */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-[10px] bg-paper p-7 text-graphite shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)] md:p-9">
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="font-display text-lg text-forest">July 2026</h4>
                  <div className="flex gap-3 text-sm text-graphite/40">
                    <span>‹</span>
                    <span>›</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-graphite/40">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const isAvail = availableDays.includes(day)
                    const isSelected = selectedDay === day
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={!isAvail}
                        data-cursor={isAvail ? 'hover' : undefined}
                        onClick={() => {
                          setSelectedDay(day)
                          setSelectedSlot(null)
                        }}
                        className={`aspect-square rounded-md text-sm transition-colors ${
                          isSelected
                            ? 'bg-gold font-semibold text-forest'
                            : isAvail
                              ? 'cursor-pointer bg-forest/8 font-medium text-forest hover:bg-forest/15'
                              : 'cursor-default text-graphite/25'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                {selectedDay && (
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        data-cursor="hover"
                        onClick={() => setSelectedSlot(s)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          selectedSlot === s
                            ? 'border-forest bg-forest text-paper'
                            : 'border-graphite/15 text-graphite hover:border-forest'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <a
                  href={`${whatsapp}?text=Hi%20Ettienne!%20I'd%20like%20to%20book%20a%20discovery%20call${
                    selectedDay ? `%20on%20July%20${selectedDay}` : ''
                  }${selectedSlot ? `%20at%20${selectedSlot}` : ''}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="mt-7 block w-full rounded-full bg-forest py-4 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90"
                >
                  Book discovery call →
                </a>
                <p className="handwritten mt-4 text-center text-base text-graphite/45">
                  (this becomes a real, live Calendly once we wire it up)
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

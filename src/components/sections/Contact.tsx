import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealText from '../ui/RevealText'

const email = 'devilliersettienne257@gmail.com'
const phone = '063 023 2145'

// WhatsApp — international format: no "+", no spaces. (SA: drop the leading 0, prepend 27.)
const whatsappNumber = '27630232145'
const whatsappMessage = "Hi Ettienne, I'd love to talk about a project."
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

// Web3Forms key — get a free one at https://web3forms.com (enter your email, they
// send you a key by mail). Paste it below. Enquiries then land in that inbox.
const ACCESS_KEY = '6d1c945f-0363-4156-9d88-a489608aeb90'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

const empty: FormState = {
  name: '', email: '', phone: '', company: '',
  projectType: '', budget: '', timeline: '', message: '',
}

const projectTypes = ['Brand & Website', 'Portfolio / Studio', 'E-commerce', 'Campaign / Microsite', 'Something else']
const budgets = ['Under R20k', 'R20k – R50k', 'R50k – R100k', 'R100k +', 'Not sure yet']
const timelines = ['ASAP', '1–2 months', '3–6 months', 'Just exploring']

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Your name, please.'
    if (!form.email.trim()) next.email = 'An email so I can reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'That email looks off.'
    if (!form.message.trim()) next.message = 'Tell me a little about it.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry from ${form.name} — By Ettienne`,
          from_name: 'By Ettienne website',
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          project_type: form.projectType,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setForm(empty)
    setErrors({})
    setStatus('idle')
  }

  return (
    <section id="contact" className="relative z-10 bg-paper">
      <div className="shell border-t border-graphite/10 py-24 md:py-36">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Invitation */}
          <div className="md:col-span-5">
            <p className="eyebrow mb-8">Contact</p>
            <RevealText
              as="h2"
              text="Let's Create Something Worth Remembering"
              className="font-display text-5xl font-light leading-[1.02] text-forest md:text-6xl"
              stagger={0.05}
            />
            <p className="mt-10 max-w-md text-lg leading-relaxed text-graphite/60">
              Whether you&rsquo;re launching a brand, reimagining your online presence, or
              exploring a new idea, I&rsquo;d love to hear about it.
            </p>

            <div className="mt-12 space-y-3 text-sm">
              <p className="text-graphite">Ettienne</p>
              <a data-cursor="hover" href={`mailto:${email}`} className="block text-graphite/70 transition-colors hover:text-forest">
                {email}
              </a>
              <a data-cursor="hover" href={`tel:${phone.replace(/\s/g, '')}`} className="block text-graphite/70 transition-colors hover:text-forest">
                {phone}
              </a>
              <p className="text-graphite/50">South Africa</p>
            </div>

            <a
              data-cursor="hover"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-forest/30 px-7 py-3.5 text-sm font-medium text-forest transition-colors duration-500 hover:border-forest hover:bg-forest hover:text-paper"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.911zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Message on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[420px] flex-col items-start justify-center"
                >
                  <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-forest text-forest">
                    ✓
                  </span>
                  <h3 className="font-display text-4xl font-light text-forest md:text-5xl">
                    Thank you, {form.name.split(' ')[0] || 'friend'}.
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite/60">
                    Your message is on its way. I read every enquiry personally and will be in
                    touch shortly — usually within a day or two.
                  </p>
                  <button
                    data-cursor="hover"
                    onClick={reset}
                    className="mt-10 text-sm font-medium text-forest underline-offset-4 hover:underline"
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2"
                >
                  <Field label="Name" error={errors.name}>
                    <input className="field-input" value={form.name} onChange={set('name')} placeholder="Your name" />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input className="field-input" type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                  </Field>
                  <Field label="Phone">
                    <input className="field-input" value={form.phone} onChange={set('phone')} placeholder="Optional" />
                  </Field>
                  <Field label="Company">
                    <input className="field-input" value={form.company} onChange={set('company')} placeholder="Optional" />
                  </Field>
                  <Field label="Project Type">
                    <Select value={form.projectType} onChange={set('projectType')} options={projectTypes} />
                  </Field>
                  <Field label="Budget">
                    <Select value={form.budget} onChange={set('budget')} options={budgets} />
                  </Field>
                  <Field label="Timeline">
                    <Select value={form.timeline} onChange={set('timeline')} options={timelines} />
                  </Field>
                  <div className="hidden sm:block" />
                  <Field label="Message" error={errors.message} full>
                    <textarea
                      className="field-input resize-none"
                      rows={3}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell me about the idea…"
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      data-cursor="hover"
                      disabled={status === 'loading'}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-forest px-9 py-4 text-sm font-medium text-paper transition-opacity disabled:opacity-80"
                    >
                      <span className="absolute inset-0 translate-y-full bg-sage transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0" />
                      <span className="relative z-10 flex items-center gap-3">
                        {status === 'loading' ? (
                          <>
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border border-paper/40 border-t-paper" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message
                            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                          </>
                        )}
                      </span>
                    </button>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-5 text-sm text-sage"
                        >
                          Something went wrong sending that. Please try again, or{' '}
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 hover:text-forest"
                          >
                            reach me on WhatsApp
                          </a>
                          .
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string
  error?: string
  full?: boolean
  children: React.ReactNode
}) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`} data-cursor="hover">
      <span className="field-label">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 block text-xs text-sage"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="field-input cursor-pointer appearance-none pr-8 text-xl md:text-2xl"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 top-1 text-graphite/30">▾</span>
    </div>
  )
}

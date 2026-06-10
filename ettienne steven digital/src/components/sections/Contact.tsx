import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealText from '../ui/RevealText'

const email = 'Ettienne06@icloud.com'
const phone = '063 023 2145'

type Status = 'idle' | 'loading' | 'success'

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    if (!validate()) return
    setStatus('loading')
    // Front-end demo: simulate a send. Wire a real endpoint (e.g. Formspree,
    // Resend, or your own API) here when you take this live.
    setTimeout(() => setStatus('success'), 1600)
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

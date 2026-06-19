'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Linkedin, BookOpen, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { personalInfo } from '@/app/data/portfolio-data'
import { toast } from 'sonner'

export function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    if (!formData?.name?.trim() || !formData?.email?.trim() || !formData?.message?.trim()) {
      toast?.error?.('Please fill in all required fields')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res?.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
        toast?.success?.('Message sent successfully!')
      } else {
        throw new Error('Failed to send')
      }
    } catch {
      setStatus('error')
      toast?.error?.('Failed to send message. Please try again.')
    }
  }

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo?.email ?? '',
      href: `mailto:${personalInfo?.email ?? ''}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo?.location ?? '',
      href: null,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/bijshakya77',
      href: personalInfo?.linkedin ?? '',
    },
    {
      icon: BookOpen,
      label: 'Google Scholar',
      value: 'Google Scholar Profile',
      href: personalInfo?.googleScholar ?? '',
    },
  ]

  return (
    <section id="contact" className="relative py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open to research collaborations, speaking opportunities, and interesting conversations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactLinks?.map((link: any, i: number) => {
              const Icon = link?.icon
              return (
                <div
                  key={i}
                  className="bg-card rounded-xl p-4 shadow-sm border border-border/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {Icon ? <Icon className="w-5 h-5 text-primary" /> : null}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{link?.label ?? ''}</p>
                      {link?.href ? (
                        <a
                          href={link?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {link?.value ?? ''}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{link?.value ?? ''}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            }) ?? []}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                  <input
                    type="text"
                    value={formData?.name ?? ''}
                    onChange={(e: any) => setFormData((prev) => ({ ...(prev ?? {}), name: e?.target?.value ?? '' }))}
                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={formData?.email ?? ''}
                    onChange={(e: any) => setFormData((prev) => ({ ...(prev ?? {}), email: e?.target?.value ?? '' }))}
                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input
                  type="text"
                  value={formData?.subject ?? ''}
                  onChange={(e: any) => setFormData((prev) => ({ ...(prev ?? {}), subject: e?.target?.value ?? '' }))}
                  className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Research collaboration, question, etc."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                <textarea
                  value={formData?.message ?? ''}
                  onChange={(e: any) => setFormData((prev) => ({ ...(prev ?? {}), message: e?.target?.value ?? '' }))}
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'sent' ? (
                  <><CheckCircle className="w-4 h-4" /> Sent!</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
              <p className="text-xs text-muted-foreground mt-3">
                Your information will be stored securely and used only to respond to your inquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

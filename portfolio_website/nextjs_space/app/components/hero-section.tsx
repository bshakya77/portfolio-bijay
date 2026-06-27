'use client'

import { personalInfo } from '@/app/data/portfolio-data'
import { motion } from 'framer-motion'
import { BookOpen, ChevronDown, Download, ExternalLink, Linkedin, Mail, MapPin } from 'lucide-react'
import { CountUpNumber } from './count-up-number'

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              {personalInfo?.firstName ?? ''}{' '}
              <span className="text-primary">{personalInfo?.lastName ?? ''}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl text-muted-foreground font-medium mb-3"
          >
            {personalInfo?.title ?? ''}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-primary font-medium mb-6"
          >
            {personalInfo?.tagline ?? ''}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>{personalInfo?.location ?? ''}</span>
            <span className="mx-1">·</span>
            <span>{personalInfo?.institution ?? ''}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView?.({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              View My Research
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={personalInfo?.resume ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
            <a
              href={`mailto:${personalInfo?.email ?? ''}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <a
              href={personalInfo?.linkedin ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo?.googleScholar ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar"
              className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-8 sm:gap-12"
          >
            {(personalInfo?.stats ?? [])?.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <CountUpNumber value={stat?.value ?? 0} />
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat?.label ?? ''}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView?.({ behavior: 'smooth' })}
            className="w-10 h-10 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center text-muted-foreground animate-bounce"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </motion.div>
    </section>
  )
}

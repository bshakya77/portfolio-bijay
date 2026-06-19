'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  //{ label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach((entry: any) => {
          if (entry?.isIntersecting) {
            setActiveSection(entry?.target?.id ?? 'home')
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    const sections = document.querySelectorAll('section[id]')
    sections?.forEach((section: any) => observer?.observe?.(section))
    return () => observer?.disconnect?.()
  }, [])

  const scrollToSection = (href: string) => {
    const id = href?.replace('#', '') ?? ''
    const el = document.getElementById(id)
    el?.scrollIntoView?.({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('#about')}
            className="flex items-center gap-2 group"
            aria-label="Go to About Me"
          >
            <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary shadow-sm ring-1 ring-primary/20 group-hover:bg-primary/15 group-hover:border-primary/60 transition-all">
              BS
            </span>
            <span className="text-base font-bold text-primary">bijay</span>
            <span className="text-base font-bold text-foreground">shakya</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems?.map((item: any) => (
              <button
                key={item?.label}
                onClick={() => scrollToSection(item?.href)}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeSection === (item?.href?.replace('#', '') ?? '')
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item?.label}
              </button>
            )) ?? []}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Let&apos;s Connect
            </button>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems?.map((item: any) => (
                <button
                  key={item?.label}
                  onClick={() => scrollToSection(item?.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg text-left ${
                    activeSection === (item?.href?.replace('#', '') ?? '')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item?.label}
                </button>
              )) ?? []}
              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
              >
                Let&apos;s Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

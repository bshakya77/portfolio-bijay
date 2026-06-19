'use client'

import { personalInfo } from '@/app/data/portfolio-data'
import { BookOpen, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-base font-bold text-primary">bijay</span>
              <span className="text-base font-bold text-foreground">shakya</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Ph.D. candidate researching Deep Learning and Computer Vision to solve
              real-world challenges through AI.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {['About', 'Experience', 'Education', 'Research', 'Skills'].map((item: string) => (
                <button
                  key={item}
                  onClick={() => {
                    const el = document.getElementById(item?.toLowerCase?.() ?? '')
                    el?.scrollIntoView?.({ behavior: 'smooth' })
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Connect</h4>
            <div className="flex gap-3">
              <a
                href={personalInfo?.linkedin ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo?.googleScholar ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo?.email ?? ''}`}
                className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Bijay Shakya. Built with passion for research.
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Calendar, ExternalLink, ChevronRight } from 'lucide-react'
import { certifications, additionalCertifications } from '@/app/data/portfolio-data'

const INITIAL_VISIBLE_COUNT = 6

export function CertificationsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [showAll, setShowAll] = useState(false)

  const visibleCertifications = showAll
    ? [...certifications, ...additionalCertifications]
    : certifications

  const totalCertifications = certifications.length + additionalCertifications.length

  return (
    <section id="certifications" className="relative py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Certifications</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Licenses & Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through industry-recognized courses and platforms
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleCertifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all group border border-border/50"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-primary font-medium mb-1.5">{cert.issuer}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                  {cert.credentialId && (
                    <p className="text-xs text-muted-foreground mt-1.5 font-mono truncate">
                      ID: {cert.credentialId}
                    </p>
                  )}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Show credential
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && totalCertifications > INITIAL_VISIBLE_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              Show all {totalCertifications} licenses & certifications
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

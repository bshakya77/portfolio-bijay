'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, Calendar, ChevronRight, GraduationCap, Briefcase } from 'lucide-react'
import { academicExperience, industrialExperience } from '@/app/data/portfolio-data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type ExperienceItem = {
  organization: string
  title: string
  period: string
  isCurrent: boolean
  description: string
  highlights: string[]
}

function ExperienceTimeline({
  items,
  inView,
}: {
  items: ExperienceItem[]
  inView: boolean
}) {
  return (
    <div className="relative pt-2">
      <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-8">
        {items.map((exp, i) => (
          <motion.div
            key={`${exp.organization}-${exp.title}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            className={`relative flex flex-col md:flex-row items-start gap-6 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10 mt-6" />

            <div className="hidden md:block md:w-1/2" />

            <div className="ml-10 md:ml-0 md:w-1/2">
              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50">
                {exp.isCurrent && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    Current
                  </span>
                )}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.organization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="relative py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Professional Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Academic research and industry experience in software engineering and AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible defaultValue="academic" className="space-y-4">
            <AccordionItem
              value="academic"
              className="border border-border/50 rounded-xl px-4 sm:px-6 bg-card shadow-sm"
            >
              <AccordionTrigger className="py-5 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Academic Journey</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      Research-focused experience in deep learning and computer vision
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ExperienceTimeline items={academicExperience} inView={inView} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="industrial"
              className="border border-border/50 rounded-xl px-4 sm:px-6 bg-card shadow-sm"
            >
              <AccordionTrigger className="py-5 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Industrial Journey</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      Full-stack and enterprise software development across industries
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ExperienceTimeline items={industrialExperience} inView={inView} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

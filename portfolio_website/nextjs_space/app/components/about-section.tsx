'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Eye, Cpu, Network, GraduationCap } from 'lucide-react'
import { personalInfo } from '@/app/data/portfolio-data'

const researchAreas = [
  { icon: Brain, label: 'Deep Learning', desc: 'Neural network architectures & training' },
  { icon: Eye, label: 'Computer Vision', desc: 'Image analysis & understanding' },
  { icon: Cpu, label: 'Object Detection', desc: 'YOLO & attention mechanisms' },
  { icon: Network, label: 'Federated Learning', desc: 'Privacy-aware collaborative AI' },
]

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Research at the Intersection of AI & Vision
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {personalInfo?.description ?? ''}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{personalInfo?.institution ?? ''}</h3>
                <p className="text-sm text-muted-foreground">{personalInfo?.college ?? ''}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Currently pursuing a Ph.D. in Computer Science with a focus on advancing
              small object detection through novel attention mechanisms and lightweight
              architectures. Passionate about applying AI to real-world challenges including
              disaster response and UAV-based surveillance.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(personalInfo?.stats ?? [])?.map((stat: any, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {stat?.value ?? 0}+ {stat?.label ?? ''}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {researchAreas?.map((area: any, i: number) => {
              const Icon = area?.icon
              return (
                <div
                  key={i}
                  className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    {Icon ? <Icon className="w-4 h-4 text-primary" /> : null}
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">{area?.label ?? ''}</h4>
                  <p className="text-xs text-muted-foreground">{area?.desc ?? ''}</p>
                </div>
              )
            }) ?? []}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

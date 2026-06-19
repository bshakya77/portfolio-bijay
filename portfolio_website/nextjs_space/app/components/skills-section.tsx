'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronRight } from 'lucide-react'
import { skills, skillCategories } from '@/app/data/portfolio-data'

const SKILLS_INITIAL_COUNT = 9

const displayCategories = skillCategories.filter((cat) => cat !== 'All')

type Skill = { name: string; category: string; level?: number }

function SkillChip({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="inline-flex items-center px-3.5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-sky-500/10 text-foreground text-sm font-medium border border-primary/20 hover:border-primary/40 hover:from-primary/15 hover:to-sky-500/15 hover:text-primary transition-all cursor-default shadow-sm"
    >
      {name}
    </motion.span>
  )
}

function SkillGroup({
  title,
  items,
  expanded,
  onToggle,
}: {
  title?: string
  items: Skill[]
  expanded: boolean
  onToggle: () => void
}) {
  const visibleItems = expanded ? items : items.slice(0, SKILLS_INITIAL_COUNT)
  const hasMore = items.length > SKILLS_INITIAL_COUNT

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
      {title && (
        <h3 className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-2.5">
        {visibleItems.map((skill, i) => (
          <SkillChip key={skill.name} name={skill.name} index={i} />
        ))}
      </div>
      {hasMore && !expanded && (
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Show all {items.length} skills
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const toggleExpanded = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setExpandedCategories({})
  }

  const getSkillsForCategory = (category: string) =>
    skills.filter((skill) => skill.category === category)

  return (
    <section id="skills" className="relative py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Core competencies in AI research and software development
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="space-y-6">
          {activeCategory === 'All' ? (
            displayCategories.map((category, i) => {
              const categorySkills = getSkillsForCategory(category)
              if (categorySkills.length === 0) return null

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                >
                  <SkillGroup
                    title={category}
                    items={categorySkills}
                    expanded={!!expandedCategories[category]}
                    onToggle={() => toggleExpanded(category)}
                  />
                </motion.div>
              )
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <SkillGroup
                items={getSkillsForCategory(activeCategory)}
                expanded={!!expandedCategories[activeCategory]}
                onToggle={() => toggleExpanded(activeCategory)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

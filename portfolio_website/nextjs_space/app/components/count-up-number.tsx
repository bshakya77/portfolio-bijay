'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function CountUpNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const { ref, inView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      const safeValue = value ?? 0
      const duration = 1500
      const steps = 40
      const increment = safeValue / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= safeValue) {
          setCount(safeValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [inView, value])

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold font-display text-foreground">
      {count}<span className="text-primary">+</span>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface StatsCounterProps {
  isInView: boolean
  start?: number
  end: number
  duration?: number
  suffix?: string
  title: string
}

export default function StatsCounter({
  isInView,
  start = 0,
  end,
  duration = 2,
  suffix = "",
  title,
}: StatsCounterProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(progress * (end - start) + start)

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, start, end, duration])

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-primary mb-2"
      >
        {count}
        {suffix}
      </motion.div>
      <div className="text-lg text-muted-foreground">{title}</div>
    </div>
  )
}

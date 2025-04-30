"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* AR Device Mockup */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Image
          src="/placeholder.svg?height=500&width=300"
          alt="AR Device"
          width={300}
          height={500}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* AR Elements floating around */}
      <motion.div
        className="absolute top-1/4 -left-4 md:left-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
          <span className="text-2xl">🏠</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 -right-4 md:right-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
          <span className="text-2xl">🛍️</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-10 right-1/4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
          <span className="text-xl">📱</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
          <span className="text-xl">🎮</span>
        </div>
      </motion.div>

      {/* AR Rays/Lines connecting elements */}
      <svg
        className="absolute inset-0 w-full h-full z-[-1]"
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M150 250 L50 125"
          stroke="url(#gradientPrimary)"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="200"
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, delay: 1.6 }}
        />
        <motion.path
          d="M250 250 L350 125"
          stroke="url(#gradientAccent)"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="200"
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        />
        <motion.path
          d="M150 250 L50 375"
          stroke="url(#gradientAccent)"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="200"
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
        />
        <motion.path
          d="M250 250 L350 375"
          stroke="url(#gradientPrimary)"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="200"
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, delay: 2.2 }}
        />
        <defs>
          <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="gradientAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

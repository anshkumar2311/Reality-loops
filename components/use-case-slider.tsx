"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const useCases = [
  {
    id: 1,
    title: "Retail & E-Commerce",
    description:
      "Try before you buy with AR product visualization. Increase conversion rates by 40% with immersive shopping experiences.",
    icon: "🛍️",
  },
  {
    id: 2,
    title: "Education & Training",
    description:
      "Transform learning with interactive 3D models and immersive educational experiences for better retention.",
    icon: "🎓",
  },
  {
    id: 3,
    title: "Healthcare & Medical",
    description:
      "Visualize anatomy and medical procedures with AR for improved patient education and professional training.",
    icon: "🏥",
  },
  {
    id: 4,
    title: "Real Estate & Architecture",
    description: "Showcase properties and architectural designs with AR walkthroughs and interactive floor plans.",
    icon: "🏠",
  },
  {
    id: 5,
    title: "Marketing & Advertising",
    description:
      "Create memorable brand experiences with interactive AR campaigns that boost engagement and conversion.",
    icon: "📱",
  },
  {
    id: 6,
    title: "Manufacturing & Industry",
    description: "Streamline assembly, maintenance, and training with AR-guided instructions and visualizations.",
    icon: "🏭",
  },
]

export default function UseCaseSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === useCases.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? useCases.length - 1 : prevIndex - 1))
  }

  return (
    <div className="relative">
      <div className="flex justify-end space-x-2 mb-4">
        <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-hidden">
        <motion.div
          ref={carousel}
          className="flex"
          animate={{ x: -activeIndex * (300 + 16) }} // Card width + gap
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {useCases.map((useCase) => (
            <motion.div
              key={useCase.id}
              className="min-w-[300px] mr-4"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground flex-grow">{useCase.description}</p>
                  <div className="h-40 relative mt-4 rounded-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=160&width=268&text=${useCase.title}`}
                      alt={useCase.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {useCases.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

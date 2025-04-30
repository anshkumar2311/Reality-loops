"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "Reality Loops has completely transformed how we showcase our products. Our customers can now visualize furniture in their homes before purchasing, reducing returns by 35%.",
    author: "Sarah Johnson",
    role: "E-commerce Director, ModernHome",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    rating: 5,
  },
  {
    id: 2,
    content:
      "As an educator, I've seen firsthand how AR enhances student engagement. Reality Loops made it incredibly easy to create interactive 3D models for my anatomy classes.",
    author: "Dr. Michael Chen",
    role: "Professor of Medicine, University Medical School",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    rating: 5,
  },
  {
    id: 3,
    content:
      "The no-code platform is a game-changer. I was able to create and deploy an AR marketing campaign in just a few days without any technical background.",
    author: "Alex Rivera",
    role: "Marketing Manager, TechStart Inc.",
    avatar: "/placeholder.svg?height=40&width=40&text=AR",
    rating: 4,
  },
  {
    id: 4,
    content:
      "Reality Loops' enterprise solution has streamlined our manufacturing training process. New employees learn assembly procedures 40% faster with AR guidance.",
    author: "Priya Patel",
    role: "Head of Operations, IndustryTech",
    avatar: "/placeholder.svg?height=40&width=40&text=PP",
    rating: 5,
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from businesses and creators who have transformed their work with Reality Loops.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: -activeIndex * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-lg text-center mb-6">"{testimonial.content}"</p>
                      <div className="flex items-center justify-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                          <AvatarFallback>
                            {testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-background shadow-md"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-background shadow-md"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

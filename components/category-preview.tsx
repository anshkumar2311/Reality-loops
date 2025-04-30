"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

// Featured categories
const featuredCategories = [
  {
    id: "ar-filters",
    name: "AR Filters",
    icon: "🎭",
    description: "Enhance photos and videos with interactive AR filters and effects",
  },
  {
    id: "retail-and-consumer",
    name: "Retail & Consumer",
    icon: "🛍️",
    description: "Transform shopping experiences with product visualization",
  },
  {
    id: "education-and-training",
    name: "Education & Training",
    icon: "🎓",
    description: "Create interactive learning experiences with 3D models",
  },
  {
    id: "healthcare-and-medical",
    name: "Healthcare & Medical",
    icon: "🏥",
    description: "Visualize anatomy and medical procedures with AR",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "🏭",
    description: "Streamline assembly and maintenance with AR guidance",
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    icon: "🛒",
    description: "Boost sales with immersive product experiences",
  },
]

export default function CategoryPreview() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore AR Categories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how augmented reality is transforming industries and creating new possibilities.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featuredCategories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link href={`/categories/${category.id}`}>
                <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="w-12 h-1 bg-primary/50 rounded-full mt-2 group-hover:w-20 transition-all duration-300"></div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/categories">
              Explore All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

// Import the categories from the provided file
const categories = [
  { id: "ar-filters", name: "AR Filters" },
  { id: "retail-and-consumer", name: "Retail and Consumer" },
  { id: "tourism-and-hospitality", name: "Tourism & Hospitality" },
  { id: "automation", name: "Automation" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "professional-and-event-solutions", name: "Professional & Event Solutions" },
  { id: "e-commerce", name: "E-Commerce" },
  { id: "healthcare-and-medical", name: "Healthcare & Medical" },
  { id: "education-and-training", name: "Education & Training" },
  { id: "agriculture-and-farming", name: "Agriculture & Farming" },
  { id: "advertising-and-marketing", name: "Advertising & Marketing" },
  { id: "additional-solutions", name: "Additional Solutions" },
]

// Icons for each category
const categoryIcons: Record<string, string> = {
  "ar-filters": "🎭",
  "retail-and-consumer": "🛍️",
  "tourism-and-hospitality": "🏨",
  automation: "🤖",
  manufacturing: "🏭",
  "professional-and-event-solutions": "🎪",
  "e-commerce": "🛒",
  "healthcare-and-medical": "🏥",
  "education-and-training": "🎓",
  "agriculture-and-farming": "🌾",
  "advertising-and-marketing": "📢",
  "additional-solutions": "✨",
}

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse AR Categories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our wide range of augmented reality solutions across various industries and use cases.
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredCategories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <CategoryCard id={category.id} name={category.name} icon={categoryIcons[category.id] || "🔍"} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

interface CategoryCardProps {
  id: string
  name: string
  icon: string
}

function CategoryCard({ id, name, icon }: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`}>
      <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{name}</h3>
          <div className="w-12 h-1 bg-primary/50 rounded-full mt-2 group-hover:w-20 transition-all duration-300"></div>
        </CardContent>
      </Card>
    </Link>
  )
}

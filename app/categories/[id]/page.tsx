"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

// Categories data
const categories = [
  { id: "ar-filters", name: "AR Filters", icon: "🎭" },
  { id: "retail-and-consumer", name: "Retail and Consumer", icon: "🛍️" },
  { id: "tourism-and-hospitality", name: "Tourism & Hospitality", icon: "🏨" },
  { id: "automation", name: "Automation", icon: "🤖" },
  { id: "manufacturing", name: "Manufacturing", icon: "🏭" },
  { id: "professional-and-event-solutions", name: "Professional & Event Solutions", icon: "🎪" },
  { id: "e-commerce", name: "E-Commerce", icon: "🛒" },
  { id: "healthcare-and-medical", name: "Healthcare & Medical", icon: "🏥" },
  { id: "education-and-training", name: "Education & Training", icon: "🎓" },
  { id: "agriculture-and-farming", name: "Agriculture & Farming", icon: "🌾" },
  { id: "advertising-and-marketing", name: "Advertising & Marketing", icon: "📢" },
  { id: "additional-solutions", name: "Additional Solutions", icon: "✨" },
]

// Sample use cases for each category
const useCases = {
  "ar-filters": [
    {
      title: "Social Media Filters",
      description: "Engage users with interactive face filters and effects for social media platforms.",
      image: "/placeholder.svg?height=300&width=500&text=Social+Media+Filters",
    },
    {
      title: "Virtual Try-On",
      description: "Allow customers to virtually try on glasses, jewelry, makeup, and accessories.",
      image: "/placeholder.svg?height=300&width=500&text=Virtual+Try-On",
    },
    {
      title: "Photo Enhancement",
      description: "Add dynamic effects, animations, and overlays to photos and videos.",
      image: "/placeholder.svg?height=300&width=500&text=Photo+Enhancement",
    },
  ],
  "retail-and-consumer": [
    {
      title: "Virtual Showrooms",
      description: "Create immersive virtual showrooms for products and collections.",
      image: "/placeholder.svg?height=300&width=500&text=Virtual+Showrooms",
    },
    {
      title: "In-Store Navigation",
      description: "Guide customers through stores with AR wayfinding and product information.",
      image: "/placeholder.svg?height=300&width=500&text=In-Store+Navigation",
    },
    {
      title: "Product Visualization",
      description: "Allow customers to visualize products in their space before purchasing.",
      image: "/placeholder.svg?height=300&width=500&text=Product+Visualization",
    },
  ],
  // Add more use cases for other categories as needed
}

// Default use cases for categories without specific ones
const defaultUseCases = [
  {
    title: "Interactive Experiences",
    description: "Create engaging and interactive AR experiences for users.",
    image: "/placeholder.svg?height=300&width=500&text=Interactive+Experiences",
  },
  {
    title: "Data Visualization",
    description: "Visualize complex data and information in an intuitive AR format.",
    image: "/placeholder.svg?height=300&width=500&text=Data+Visualization",
  },
  {
    title: "Training & Simulation",
    description: "Provide immersive training and simulation experiences with AR.",
    image: "/placeholder.svg?height=300&width=500&text=Training+Simulation",
  },
]

// Benefits for each category
const benefits = {
  "ar-filters": [
    "Increase social media engagement by 40%",
    "Reduce product returns with virtual try-on",
    "Create memorable brand experiences",
    "Drive user-generated content",
  ],
  "retail-and-consumer": [
    "Increase conversion rates by 35%",
    "Reduce product returns by 25%",
    "Enhance in-store customer experience",
    "Collect valuable customer insights",
  ],
  // Add more benefits for other categories as needed
}

// Default benefits for categories without specific ones
const defaultBenefits = [
  "Increase user engagement and interaction",
  "Create memorable and shareable experiences",
  "Collect valuable user data and insights",
  "Stand out from competitors with innovative technology",
]

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string
  const [category, setCategory] = useState<any>(null)

  useEffect(() => {
    const foundCategory = categories.find((cat) => cat.id === categoryId)
    setCategory(foundCategory || null)
  }, [categoryId])

  if (!category) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Category not found</h1>
          <Button asChild>
            <Link href="/categories">Back to Categories</Link>
          </Button>
        </div>
      </div>
    )
  }

  const categoryUseCases = useCases[categoryId] || defaultUseCases
  const categoryBenefits = benefits[categoryId] || defaultBenefits

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/categories"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover how {category.name} is transforming industries and creating new possibilities with augmented
            reality.
          </p>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <Image
            src={`/placeholder.svg?height=500&width=1200&text=${category.name}`}
            alt={category.name}
            width={1200}
            height={500}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 flex items-center">
            <div className="p-8 md:p-12 max-w-xl">
              <Badge className="mb-4 bg-primary text-primary-foreground">AR Solutions</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Business with {category.name}</h2>
              <p className="text-lg mb-6">
                Reality Loops provides cutting-edge AR solutions for {category.name.toLowerCase()} that drive
                engagement, increase conversions, and create memorable experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/marketplace">Explore Solutions</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{category.name} Use Cases</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how businesses are leveraging AR technology for {category.name.toLowerCase()}.
            </p>
          </div>

          <div className="space-y-12">
            {categoryUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="md:w-1/2">
                  <Image
                    src={useCase.image || "/placeholder.svg"}
                    alt={useCase.title}
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-1/2 space-y-4">
                  <h3 className="text-2xl font-bold">{useCase.title}</h3>
                  <p className="text-lg text-muted-foreground">{useCase.description}</p>
                  <Button variant="outline" asChild>
                    <Link href="/marketplace">
                      View Solutions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of {category.name} AR</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the advantages of implementing AR solutions for {category.name.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">{benefit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of businesses already leveraging {category.name} AR solutions with Reality Loops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

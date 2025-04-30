"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Layers, Zap, Users, Globe, Sparkles } from "lucide-react"
// import Hero3DModels from "@/components/hero-3d-models"
import UseCaseSlider from "@/components/use-case-slider"
import StatsCounter from "@/components/stats-counter"
import CategoryPreview from "@/components/category-preview"
import Testimonials from "@/components/testimonials"
import HeroAnimation from "@/components/hero-animation"

export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-radial-gradient opacity-20"></div>
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[100px] -z-10"
          aria-hidden="true"
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Badge variant="outline" className="mb-4 py-1.5">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  <span>The Future of AR is Here</span>
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Build Immersive <span className="text-gradient">AR Experiences</span> Without Coding
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Create, deploy, and monetize augmented reality experiences with no coding required. The ultimate
                  marketplace for AR assets, creators, and solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <Link href="/designer">Start Designing</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/marketplace">
                      Explore Marketplace
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <HeroAnimation />
              {/* <Hero3DModels /> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for AR Development</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Reality Loops provides all the tools and resources to create stunning AR experiences without writing a
              single line of code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layers className="h-10 w-10 text-primary" />}
              title="No-Code AR Designer"
              description="Drag and drop interface to create professional AR experiences without any coding knowledge."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-primary" />}
              title="AR Marketplace"
              description="Browse thousands of ready-to-use AR assets, templates, and complete solutions."
            />
            <FeatureCard
              icon={<Code className="h-10 w-10 text-primary" />}
              title="API Access"
              description="Integrate AR experiences directly into your existing applications with our simple API."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Creator Network"
              description="Connect with verified AR creators and developers for custom projects."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="One-Click Deploy"
              description="Publish your AR experiences instantly to web, mobile, or social platforms."
            />
            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-primary" />}
              title="Enterprise Solutions"
              description="Custom AR solutions for retail, education, healthcare, and more."
            />
          </div>
        </div>
      </section>

      <CategoryPreview />

      {/* Use Cases Slider */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore AR Use Cases</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how businesses and creators are using augmented reality to transform their industries.
            </p>
          </div>

          <UseCaseSlider />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatsCounter isInView={isInView} end={500} suffix="+" title="Solutions Built" />
            <StatsCounter isInView={isInView} end={100} suffix="+" title="Verified Creators" />
            <StatsCounter isInView={isInView} end={50} suffix="k+" title="Monthly Users" />
            <StatsCounter isInView={isInView} end={12} suffix="+" title="Industries Served" />
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Ideas into AR Reality?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of creators and businesses already building the future with Reality Loops.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary/10">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

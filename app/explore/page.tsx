"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Zap, Shield, Globe, Users, BarChart } from "lucide-react"

export default function ExplorePage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Reality Loops</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our platform is revolutionizing the way people create, share, and experience augmented reality.
          </p>
        </div>

        {/* Platform Overview */}
        <div className="mb-20">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold">The Ultimate AR Platform</h2>
                  <p className="text-lg text-muted-foreground">
                    Reality Loops is a comprehensive platform that enables anyone to create, deploy, and monetize
                    augmented reality experiences without writing a single line of code.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Our intuitive drag-and-drop AR Designer, extensive Marketplace, and powerful API make it easy to
                    bring your AR ideas to life, whether you're an individual creator or an enterprise.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link href="/designer">Try AR Designer</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/marketplace">Browse Marketplace</Link>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Platform+Overview"
                    alt="Reality Loops Platform Overview"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Zap className="h-10 w-10 text-primary" />}
                  title="No-Code AR Designer"
                  description="Create professional AR experiences with our intuitive drag-and-drop interface. No coding required."
                />
                <FeatureCard
                  icon={<Globe className="h-10 w-10 text-primary" />}
                  title="AR Marketplace"
                  description="Browse and purchase thousands of ready-to-use AR assets, templates, and complete solutions."
                />
                <FeatureCard
                  icon={<Shield className="h-10 w-10 text-primary" />}
                  title="Enterprise Solutions"
                  description="Custom AR solutions for retail, education, healthcare, manufacturing, and more."
                />
                <FeatureCard
                  icon={<Users className="h-10 w-10 text-primary" />}
                  title="Creator Network"
                  description="Connect with verified AR creators and developers for custom projects and collaborations."
                />
                <FeatureCard
                  icon={<BarChart className="h-10 w-10 text-primary" />}
                  title="Analytics Dashboard"
                  description="Track engagement, conversions, and user behavior with comprehensive analytics."
                />
                <FeatureCard
                  icon={<Check className="h-10 w-10 text-primary" />}
                  title="Cross-Platform Compatibility"
                  description="Deploy AR experiences across web, mobile, and social platforms with a single click."
                />
              </div>
            </TabsContent>

            <TabsContent value="use-cases">
              <div className="space-y-8">
                <UseCaseCard
                  title="Retail & E-Commerce"
                  description="Allow customers to visualize products in their space before purchasing, reducing returns and increasing conversion rates."
                  image="/placeholder.svg?height=300&width=500&text=Retail+AR"
                  reverse={false}
                />
                <UseCaseCard
                  title="Education & Training"
                  description="Create interactive 3D models and immersive educational experiences for better engagement and knowledge retention."
                  image="/placeholder.svg?height=300&width=500&text=Education+AR"
                  reverse={true}
                />
                <UseCaseCard
                  title="Healthcare & Medical"
                  description="Visualize anatomy and medical procedures with AR for improved patient education and professional training."
                  image="/placeholder.svg?height=300&width=500&text=Healthcare+AR"
                  reverse={false}
                />
                <UseCaseCard
                  title="Manufacturing & Industry"
                  description="Streamline assembly, maintenance, and training with AR-guided instructions and visualizations."
                  image="/placeholder.svg?height=300&width=500&text=Manufacturing+AR"
                  reverse={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="enterprise">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Enterprise AR Solutions</h2>
                  <p className="text-lg text-muted-foreground">
                    Reality Loops offers custom AR solutions tailored to the unique needs of enterprises across various
                    industries.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Our enterprise solutions include dedicated support, custom development, integration with existing
                    systems, and advanced security features.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Custom Development</h3>
                        <p className="text-muted-foreground">
                          Tailored AR experiences designed specifically for your business needs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">System Integration</h3>
                        <p className="text-muted-foreground">
                          Seamless integration with your existing CRM, ERP, and e-commerce systems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Advanced Analytics</h3>
                        <p className="text-muted-foreground">
                          Comprehensive data and insights on user engagement and behavior
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Dedicated Support</h3>
                        <p className="text-muted-foreground">Priority support and dedicated account management</p>
                      </div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/contact">
                      Contact Sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div>
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Enterprise+Solutions"
                    alt="Enterprise AR Solutions"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Stats Section */}
        <div className="mb-20 py-12 bg-muted/30 rounded-xl" ref={ref}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Reality Loops by the Numbers</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join thousands of creators and businesses already building the future with our platform.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatCard isInView={isInView} number={500} suffix="+" label="AR Solutions Built" />
              <StatCard isInView={isInView} number={100} suffix="+" label="Verified Creators" />
              <StatCard isInView={isInView} number={50} suffix="k+" label="Monthly Users" />
              <StatCard isInView={isInView} number={12} suffix="+" label="Industries Served" />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Product Evolution</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how Reality Loops has evolved and what's coming next.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-border md:transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              <TimelineItem
                date="2021"
                title="Platform Inception"
                description="Reality Loops was founded with a vision to democratize AR development."
                align="right"
              />
              <TimelineItem
                date="2022"
                title="AR Designer Launch"
                description="Released our no-code AR Designer tool, enabling anyone to create AR experiences."
                align="left"
              />
              <TimelineItem
                date="2023"
                title="Marketplace Launch"
                description="Launched the AR Marketplace with 100+ initial assets and templates."
                align="right"
              />
              <TimelineItem
                date="2023"
                title="Enterprise Solutions"
                description="Expanded offering to include enterprise-grade AR solutions for various industries."
                align="left"
              />
              <TimelineItem
                date="2024"
                title="Creator Network"
                description="Established a network of verified AR creators and developers."
                align="right"
              />
              <TimelineItem
                date="Coming Soon"
                title="Mobile App"
                description="Native mobile app for creating and experiencing AR on the go."
                align="left"
                isFuture={true}
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of creators and businesses already building the future with Reality Loops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories">
                Explore Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
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

function UseCaseCard({
  title,
  description,
  image,
  reverse,
}: { title: string; description: string; image: string; reverse: boolean }) {
  return (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}>
      <div className="md:w-1/2">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
        <Button variant="outline" asChild>
          <Link href={`/categories/${title.toLowerCase().replace(/\s+/g, "-")}`}>
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function StatCard({
  isInView,
  number,
  suffix,
  label,
}: { isInView: boolean; number: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-primary mb-2"
      >
        {isInView ? number : 0}
        {suffix}
      </motion.div>
      <div className="text-lg text-muted-foreground">{label}</div>
    </div>
  )
}

function TimelineItem({
  date,
  title,
  description,
  align,
  isFuture = false,
}: { date: string; title: string; description: string; align: "left" | "right"; isFuture?: boolean }) {
  return (
    <div className="relative">
      <div className={`flex flex-col md:flex-row items-center ${align === "right" ? "md:flex-row-reverse" : ""}`}>
        <div className="md:w-1/2 mb-4 md:mb-0">
          <div
            className={`md:${align === "right" ? "mr-12" : "ml-12"} p-6 rounded-lg ${isFuture ? "bg-primary/10" : "bg-card"} shadow-sm`}
          >
            <Badge variant={isFuture ? "outline" : "default"} className="mb-2">
              {date}
            </Badge>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>
        </div>
        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background md:transform md:-translate-x-1/2"></div>
        <div className="md:w-1/2"></div>
      </div>
    </div>
  )
}

"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "AR/VR enthusiast with 10+ years of experience in immersive technologies.",
      image: "/placeholder.svg?height=300&width=300&text=Alex",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Former lead engineer at Meta Reality Labs with expertise in spatial computing.",
      image: "/placeholder.svg?height=300&width=300&text=Sarah",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Design",
      bio: "Award-winning UX designer specializing in immersive experiences and interfaces.",
      image: "/placeholder.svg?height=300&width=300&text=Michael",
    },
    {
      name: "Priya Patel",
      role: "Head of Marketing",
      bio: "Digital marketing strategist with a passion for emerging technologies.",
      image: "/placeholder.svg?height=300&width=300&text=Priya",
    },
  ]

  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description: "Reality Loops was founded with a vision to democratize AR development.",
    },
    {
      year: "2022",
      title: "Seed Funding",
      description: "Secured $2.5M in seed funding to build the core platform.",
    },
    {
      year: "2022",
      title: "Beta Launch",
      description: "Released beta version of the AR Designer to early adopters.",
    },
    {
      year: "2023",
      title: "Marketplace Launch",
      description: "Launched the AR Marketplace with 100+ initial assets.",
    },
    {
      year: "2023",
      title: "Enterprise Solutions",
      description: "Expanded offering to include enterprise-grade AR solutions.",
    },
    {
      year: "2024",
      title: "Series A Funding",
      description: "Raised $10M in Series A to scale operations globally.",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Reality Loops</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize augmented reality and make it accessible to everyone.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              We envision a world where augmented reality is as ubiquitous and accessible as the internet is today. A
              world where anyone can create, share, and experience immersive AR content without technical barriers.
            </p>
            <p className="text-lg text-muted-foreground">
              Reality Loops is building the tools and platform to make this vision a reality, empowering creators,
              businesses, and developers to bring their ideas to life in augmented reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Our mission is to remove the technical barriers to AR creation and deployment, making it accessible to
              everyone regardless of their coding experience or technical background.
            </p>
            <p className="text-lg text-muted-foreground">
              We're building a comprehensive ecosystem that connects creators, businesses, and users through a
              marketplace of AR experiences, assets, and solutions that can be easily customized and deployed.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're a diverse team of AR enthusiasts, engineers, designers, and business professionals passionate about
              building the future of augmented reality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20" ref={ref}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From a small startup to a growing AR platform, here's how Reality Loops has evolved over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.title} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                      <div className="bg-card p-6 rounded-lg shadow-sm">
                        <span className="text-primary font-bold">{milestone.year}</span>
                        <h3 className="text-xl font-bold mt-1">{milestone.title}</h3>
                        <p className="text-muted-foreground mt-2">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background"></div>
                    <div className="w-1/2"></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The core principles that guide everything we do at Reality Loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon="🚀"
              title="Innovation"
              description="We're constantly pushing the boundaries of what's possible in AR, exploring new technologies and approaches."
            />
            <ValueCard
              icon="🤝"
              title="Accessibility"
              description="We believe AR should be accessible to everyone, regardless of technical background or resources."
            />
            <ValueCard
              icon="🔍"
              title="Quality"
              description="We're committed to delivering high-quality tools, assets, and experiences that exceed expectations."
            />
            <ValueCard
              icon="🌍"
              title="Community"
              description="We foster a supportive community of creators, developers, and users who share our passion for AR."
            />
            <ValueCard
              icon="🔒"
              title="Trust"
              description="We prioritize privacy, security, and transparency in everything we build and share."
            />
            <ValueCard
              icon="🌱"
              title="Growth"
              description="We're dedicated to continuous learning and improvement, both as individuals and as a company."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us on This Journey</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you're a creator, developer, business, or AR enthusiast, there's a place for you in the Reality
            Loops community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <Card className="border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

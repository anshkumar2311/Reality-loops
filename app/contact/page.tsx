"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react"
import ContactMap from "@/components/contact-map"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setDepartment("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or want to learn more about Reality Loops? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={department} onValueChange={setDepartment} required>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnerships</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <ContactInfoItem
                  icon={<Mail className="h-6 w-6" />}
                  title="Email"
                  content="realityloops1@gmail.com"
                  href="mailto:realityloops1@gmail.com"
                />
                <ContactInfoItem
                  icon={<Phone className="h-6 w-6" />}
                  title="Phone"
                  content="+91 76025-48747"
                  href="tel:76025-48747"
                />
                <ContactInfoItem
                  icon={<MapPin className="h-6 w-6" />}
                  title="Office"
                  content="Phagwara,Punjab,India"
                  href="https://maps.google.com"
                />
                <ContactInfoItem
                  icon={<MessageSquare className="h-6 w-6" />}
                  title="Live Chat"
                  content="Available Monday-Friday, 9am-5pm PT"
                  href="#"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              <div className="flex space-x-4">
                <SocialButton name="Twitter" href="#" />
                <SocialButton name="LinkedIn" href="#" />
                <SocialButton name="Facebook" href="#" />
                <SocialButton name="Instagram" href="https://www.instagram.com/reality.loops/" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM PT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM PT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              <ContactMap />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ContactInfoItem({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode
  title: string
  content: string
  href: string
}) {
  return (
    <a href={href} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted transition-colors duration-200">
      <div className="flex-shrink-0 mt-1 text-primary">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
      </div>
    </a>
  )
}

function SocialButton({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-primary/10 transition-colors duration-200"
      aria-label={name}
    >
      <span className="text-lg">{getSocialIcon(name)}</span>
    </a>
  )
}

function getSocialIcon(name: string): string {
  switch (name) {
    case "Twitter":
      return "𝕏"
    case "LinkedIn":
      return "in"
    case "Facebook":
      return "f"
    case "Instagram":
      return "📷"
    default:
      return ""
  }
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail } from "lucide-react"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect would happen here
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold text-gradient">Reality Loops</h2>
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="oauth">Social</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <div className="mt-4">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                </div>

                <div className="flex items-center">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="ml-2 text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="oauth">
            <div className="mt-4 space-y-4">
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <Github className="mr-2 h-4 w-4" />
                Sign up with GitHub
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <p className="text-center text-sm text-muted-foreground">
            By signing up, you agree to receive occasional product updates and marketing communications. You can
            unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

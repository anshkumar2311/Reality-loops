"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail, AlertCircle } from "lucide-react"
import Logo from "@/components/logo"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Simple validation
      if (!email || !password) {
        setError("Please enter both email and password")
        return
      }

      // Simulate successful login
      localStorage.setItem("user", JSON.stringify({ email }))
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Logo />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Or{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              create a new account
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
              <form onSubmit={handleSignIn} className="space-y-6">
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="ml-2 text-sm">
                    Remember me
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="oauth">
            <div className="mt-4 space-y-4">
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <p className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Mountain } from "lucide-react"

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative w-8 h-8 mr-2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-md transform rotate-45"></div>
        <div className="absolute inset-1 bg-background rounded-sm transform rotate-45 flex items-center justify-center">
          <Mountain className="h-4 w-4 text-primary" />
        </div>
      </div>
      <span className="text-2xl font-bold text-gradient">Reality Loops</span>
    </Link>
  )
}

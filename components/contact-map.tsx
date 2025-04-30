"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function ContactMap() {
  const [loaded, setLoaded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0508841239795!2d-122.41941638468204!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1652887628265!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        ></iframe>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </Card>
  )
}

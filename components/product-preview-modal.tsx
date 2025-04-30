"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Download, ShoppingCart, X, CheckCircle2, MessageSquare } from "lucide-react"

interface MarketplaceItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  creator: string
  verified: boolean
  rating: number
  downloads: number
  image: string
  tags: string[]
  isFree: boolean
  isNew: boolean
}

interface ProductPreviewModalProps {
  item: MarketplaceItem | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductPreviewModal({ item, isOpen, onClose }: ProductPreviewModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{item.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm text-muted-foreground">{item.creator}</span>
              {item.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                {item.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
                {item.isFree && <Badge className="bg-primary text-primary-foreground">Free</Badge>}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=Preview+${i + 1}`}
                    alt={`Preview ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-lg font-medium">{item.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">(120 reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Download className="h-4 w-4" />
                  <span>{item.downloads}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-2xl font-bold mb-4">
                {item.isFree ? <span className="text-primary">Free</span> : <span>${item.price.toFixed(2)}</span>}
              </div>

              <div className="flex gap-3 mb-6">
                <Button className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.isFree ? "Get Now" : "Buy Now"}
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Creator
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <p>{item.description}</p>
                <p>
                  This {item.title.toLowerCase()} provides a seamless AR experience that can be easily integrated into
                  your existing applications or used standalone. It's designed to work across multiple platforms and
                  devices, ensuring maximum compatibility and reach.
                </p>
                <h4 className="font-semibold mt-4">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cross-platform compatibility</li>
                  <li>Easy integration with existing apps</li>
                  <li>Customizable appearance and behavior</li>
                  <li>Detailed documentation and support</li>
                  <li>Regular updates and improvements</li>
                </ul>
              </TabsContent>
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Category</h4>
                    <p>{item.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Created</h4>
                    <p>June 12, 2023</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Last Updated</h4>
                    <p>August 25, 2023</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">File Size</h4>
                    <p>24.5 MB</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Supported Platforms</h4>
                    <p>iOS, Android, Web</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">License</h4>
                    <p>Standard License</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>iOS 14+ or Android 10+</li>
                    <li>ARKit or ARCore compatible device</li>
                    <li>Reality Loops SDK v2.0+</li>
                    <li>Internet connection for initial setup</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold">{item.rating}</span>
                      <span className="text-muted-foreground ml-1">(120 reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Based on verified purchases</p>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=User${i + 1}`} />
                          <AvatarFallback>U{i + 1}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">User {i + 1}</div>
                          <div className="text-sm text-muted-foreground">June {10 + i}, 2023</div>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < 5 - i * 0.5 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm">
                        {i === 0
                          ? "This is an excellent AR asset! The quality is outstanding and it integrated seamlessly with my project. Highly recommended for anyone looking to enhance their AR experience."
                          : i === 1
                            ? "Great product with lots of customization options. Documentation could be a bit more detailed, but overall very satisfied with the purchase."
                            : "Works as advertised. Good value for the price and the creator was responsive when I had questions."}
                      </p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

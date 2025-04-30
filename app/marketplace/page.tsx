"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid3X3, List, Star, Download, ShoppingCart, Layers, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import ProductPreviewModal from "@/components/product-preview-modal"

// Sample marketplace items
const marketplaceItems = [
  {
    id: 1,
    title: "AR Product Visualizer",
    description: "Allow customers to visualize products in their space before purchasing.",
    price: 49.99,
    category: "e-commerce",
    creator: "ARStudio",
    verified: true,
    rating: 4.8,
    downloads: 1250,
    image: "/placeholder.svg?height=200&width=300&text=AR+Product+Visualizer",
    tags: ["retail", "e-commerce", "visualization"],
    isFree: false,
    isNew: true,
  },
  {
    id: 2,
    title: "Educational Anatomy Model",
    description: "Interactive 3D anatomy models for educational purposes.",
    price: 0,
    category: "education-and-training",
    creator: "MedViz",
    verified: true,
    rating: 4.5,
    downloads: 3200,
    image: "/placeholder.svg?height=200&width=300&text=Anatomy+Model",
    tags: ["education", "medical", "3d-model"],
    isFree: true,
    isNew: false,
  },
  {
    id: 3,
    title: "AR Navigation System",
    description: "Indoor navigation system with AR waypoints and directions.",
    price: 79.99,
    category: "tourism-and-hospitality",
    creator: "NavTech",
    verified: false,
    rating: 4.2,
    downloads: 850,
    image: "/placeholder.svg?height=200&width=300&text=AR+Navigation",
    tags: ["navigation", "tourism", "indoor"],
    isFree: false,
    isNew: true,
  },
  {
    id: 4,
    title: "Virtual Try-On Filter",
    description: "AR filter for trying on glasses, jewelry, and accessories.",
    price: 29.99,
    category: "ar-filters",
    creator: "FilterPro",
    verified: true,
    rating: 4.7,
    downloads: 5600,
    image: "/placeholder.svg?height=200&width=300&text=Virtual+Try-On",
    tags: ["fashion", "retail", "filter"],
    isFree: false,
    isNew: false,
  },
  {
    id: 5,
    title: "AR Assembly Instructions",
    description: "Step-by-step AR assembly instructions for manufacturing.",
    price: 99.99,
    category: "manufacturing",
    creator: "IndustryAR",
    verified: true,
    rating: 4.9,
    downloads: 720,
    image: "/placeholder.svg?height=200&width=300&text=AR+Assembly",
    tags: ["manufacturing", "instructions", "industrial"],
    isFree: false,
    isNew: false,
  },
  {
    id: 6,
    title: "AR Business Card",
    description: "Interactive AR business card template with customizable elements.",
    price: 0,
    category: "advertising-and-marketing",
    creator: "CreativeAR",
    verified: false,
    rating: 4.3,
    downloads: 8900,
    image: "/placeholder.svg?height=200&width=300&text=AR+Business+Card",
    tags: ["marketing", "business", "template"],
    isFree: true,
    isNew: true,
  },
  {
    id: 7,
    title: "Virtual Event Space",
    description: "Customizable AR event space for virtual conferences and meetings.",
    price: 149.99,
    category: "professional-and-event-solutions",
    creator: "EventAR",
    verified: true,
    rating: 4.6,
    downloads: 430,
    image: "/placeholder.svg?height=200&width=300&text=Virtual+Event+Space",
    tags: ["events", "professional", "virtual"],
    isFree: false,
    isNew: true,
  },
  {
    id: 8,
    title: "AR Crop Analysis Tool",
    description: "Analyze crop health and growth with augmented reality overlays.",
    price: 129.99,
    category: "agriculture-and-farming",
    creator: "AgriTech",
    verified: true,
    rating: 4.4,
    downloads: 320,
    image: "/placeholder.svg?height=200&width=300&text=Crop+Analysis",
    tags: ["agriculture", "analysis", "farming"],
    isFree: false,
    isNew: false,
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all")
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price-low" | "price-high">("popular")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const [previewItem, setPreviewItem] = useState<MarketplaceItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePreview = (item: MarketplaceItem) => {
    setPreviewItem(item)
    setIsPreviewOpen(true)
  }

  // Filter and sort items
  const filteredItems = marketplaceItems
    .filter((item) => {
      // Search filter
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Price filter
      const matchesPrice =
        priceFilter === "all" || (priceFilter === "free" && item.isFree) || (priceFilter === "paid" && !item.isFree)

      // Category filter
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

      return matchesSearch && matchesPrice && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "popular":
        default:
          return b.downloads - a.downloads
      }
    })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AR Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover and purchase high-quality AR assets, templates, and complete solutions.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search assets, templates, solutions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <Select value={priceFilter} onValueChange={(value: "all" | "free" | "paid") => setPriceFilter(value)}>
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Select
                value={sortBy}
                onValueChange={(value: "popular" | "newest" | "price-low" | "price-high") => setSortBy(value)}
              >
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-none rounded-l-md"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-none rounded-r-md"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {marketplaceItems.length} items
          </p>
        </div>

        {/* Marketplace Items */}
        {viewMode === "grid" ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={item}>
                <MarketplaceItemCard item={item} handlePreview={handlePreview} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={item}>
                <MarketplaceItemListCard item={item} handlePreview={handlePreview} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No items found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setPriceFilter("all")
                setCategoryFilter("all")
                setSortBy("popular")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <ProductPreviewModal item={previewItem} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  )
}

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

function MarketplaceItemCard({
  item,
  handlePreview,
}: { item: MarketplaceItem; handlePreview: (item: MarketplaceItem) => void }) {
  return (
    <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={300}
            height={200}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {item.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
          {item.isFree && <Badge className="bg-primary text-primary-foreground">Free</Badge>}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Download className="h-4 w-4" />
            <span>{item.downloads}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm text-muted-foreground">{item.creator}</span>
          {item.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-bold">
          {item.isFree ? <span className="text-primary">Free</span> : <span>${item.price.toFixed(2)}</span>}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handlePreview(item)}>
            <Layers className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button size="sm">
            <ShoppingCart className="h-4 w-4 mr-1" />
            {item.isFree ? "Get" : "Buy"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function MarketplaceItemListCard({
  item,
  handlePreview,
}: { item: MarketplaceItem; handlePreview: (item: MarketplaceItem) => void }) {
  return (
    <Card className="border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/4">
          <div className="aspect-video md:aspect-square overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              width={300}
              height={200}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {item.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
            {item.isFree && <Badge className="bg-primary text-primary-foreground">Free</Badge>}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{item.title}</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Download className="h-4 w-4" />
                <span>{item.downloads}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-sm text-muted-foreground">{item.creator}</span>
            {item.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="font-bold text-lg">
              {item.isFree ? <span className="text-primary">Free</span> : <span>${item.price.toFixed(2)}</span>}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handlePreview(item)}>
                <Layers className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-1" />
                {item.isFree ? "Get" : "Buy"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Categories data from the provided file
const categories = [
  { id: "ar-filters", name: "AR Filters" },
  { id: "retail-and-consumer", name: "Retail and Consumer" },
  { id: "tourism-and-hospitality", name: "Tourism & Hospitality" },
  { id: "automation", name: "Automation" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "professional-and-event-solutions", name: "Professional & Event Solutions" },
  { id: "e-commerce", name: "E-Commerce" },
  { id: "healthcare-and-medical", name: "Healthcare & Medical" },
  { id: "education-and-training", name: "Education & Training" },
  { id: "agriculture-and-farming", name: "Agriculture & Farming" },
  { id: "advertising-and-marketing", name: "Advertising & Marketing" },
  { id: "additional-solutions", name: "Additional Solutions" },
]

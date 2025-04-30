"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Download,
  Edit,
  Eye,
  FileUp,
  Grid,
  Heart,
  LayoutDashboard,
  List,
  Plus,
  Settings,
  ShoppingCart,
  Trash2,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample user data
const userData = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40&text=JD",
  memberSince: "Jan 2023",
  subscription: "Pro",
  storageUsed: 65, // percentage
}

// Sample projects
const projects = [
  {
    id: 1,
    name: "Product Visualizer",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Product+Visualizer",
    lastEdited: "2 days ago",
    status: "published",
    views: 1245,
    likes: 89,
  },
  {
    id: 2,
    name: "AR Business Card",
    thumbnail: "/placeholder.svg?height=200&width=300&text=AR+Business+Card",
    lastEdited: "1 week ago",
    status: "draft",
    views: 0,
    likes: 0,
  },
  {
    id: 3,
    name: "Virtual Try-On",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Virtual+Try-On",
    lastEdited: "3 days ago",
    status: "published",
    views: 756,
    likes: 42,
  },
]

// Sample assets
const assets = [
  {
    id: 1,
    name: "3D Chair Model",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Chair",
    type: "3D Model",
    size: "2.4 MB",
    uploadDate: "May 15, 2023",
  },
  {
    id: 2,
    name: "Wood Texture",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Texture",
    type: "Texture",
    size: "1.2 MB",
    uploadDate: "Jun 3, 2023",
  },
  {
    id: 3,
    name: "Bounce Animation",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Animation",
    type: "Animation",
    size: "0.8 MB",
    uploadDate: "Apr 22, 2023",
  },
]

// Sample purchases
const purchases = [
  {
    id: 1,
    name: "AR Product Visualizer",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Product",
    price: "$49.99",
    purchaseDate: "May 10, 2023",
    seller: "ARStudio",
  },
  {
    id: 2,
    name: "Educational Anatomy Model",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Anatomy",
    price: "Free",
    purchaseDate: "Jun 5, 2023",
    seller: "MedViz",
  },
]

// Sample analytics data
const analyticsData = {
  views: {
    total: 2001,
    change: "+15%",
    positive: true,
  },
  engagement: {
    total: 131,
    change: "+8%",
    positive: true,
  },
  revenue: {
    total: "$249.50",
    change: "-3%",
    positive: false,
  },
}

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Manage your AR projects, assets, and analytics</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button asChild>
              <Link href="/designer">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/upload">
                <FileUp className="mr-2 h-4 w-4" />
                Upload Asset
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                  <Badge className="mt-2">{userData.subscription} Plan</Badge>
                </div>

                <div className="space-y-1 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>{userData.storageUsed}%</span>
                  </div>
                  <Progress value={userData.storageUsed} className="h-2" />
                </div>

                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/projects">
                      <Grid className="mr-2 h-4 w-4" />
                      My Projects
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/assets">
                      <FileUp className="mr-2 h-4 w-4" />
                      My Assets
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/purchases">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Purchases
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="projects">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">My Projects</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden h-full">
                          <div className="relative aspect-video">
                            <Image
                              src={project.thumbnail || "/placeholder.svg"}
                              alt={project.name}
                              fill
                              className="object-cover"
                            />
                            {project.status === "draft" && (
                              <Badge variant="secondary" className="absolute top-2 right-2">
                                Draft
                              </Badge>
                            )}
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <p className="text-sm text-muted-foreground">Last edited {project.lastEdited}</p>
                            {project.status === "published" && (
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {project.views}
                                </div>
                                <div className="flex items-center">
                                  <Heart className="h-4 w-4 mr-1" />
                                  {project.likes}
                                </div>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-between">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/designer?project=${project.id}`}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Export
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <User className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Card className="h-full flex items-center justify-center border-dashed">
                        <CardContent className="p-6 text-center">
                          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Plus className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-1">Create New Project</h3>
                          <p className="text-sm text-muted-foreground mb-4">Start building your next AR experience</p>
                          <Button asChild>
                            <Link href="/designer">Create Project</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                ) : (
                  <Card>
                    <div className="divide-y">
                      {projects.map((project) => (
                        <div key={project.id} className="flex items-center p-4">
                          <div className="relative w-16 h-16 rounded overflow-hidden mr-4">
                            <Image
                              src={project.thumbnail || "/placeholder.svg"}
                              alt={project.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium">{project.name}</h3>
                              {project.status === "draft" && (
                                <Badge variant="secondary" className="ml-2">
                                  Draft
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">Last edited {project.lastEdited}</p>
                            {project.status === "published" && (
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {project.views}
                                </div>
                                <div className="flex items-center">
                                  <Heart className="h-4 w-4 mr-1" />
                                  {project.likes}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/designer?project=${project.id}`}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Export
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <User className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Assets Tab */}
              <TabsContent value="assets" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">My Assets</h2>
                  <Button asChild>
                    <Link href="/upload">
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload Asset
                    </Link>
                  </Button>
                </div>

                <Card>
                  <div className="divide-y">
                    {assets.map((asset) => (
                      <div key={asset.id} className="flex items-center p-4">
                        <div className="relative w-12 h-12 rounded overflow-hidden mr-4">
                          <Image
                            src={asset.thumbnail || "/placeholder.svg"}
                            alt={asset.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{asset.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{asset.type}</span>
                            <span>{asset.size}</span>
                            <span>Uploaded {asset.uploadDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Purchases Tab */}
              <TabsContent value="purchases" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">My Purchases</h2>
                  <Button variant="outline" asChild>
                    <Link href="/marketplace">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Browse Marketplace
                    </Link>
                  </Button>
                </div>

                <Card>
                  <div className="divide-y">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center p-4">
                        <div className="relative w-12 h-12 rounded overflow-hidden mr-4">
                          <Image
                            src={purchase.thumbnail || "/placeholder.svg"}
                            alt={purchase.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{purchase.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By {purchase.seller}</span>
                            <span>Purchased on {purchase.purchaseDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="font-medium">{purchase.price}</div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Views</p>
                            <h3 className="text-2xl font-bold">{analyticsData.views.total}</h3>
                          </div>
                          <div
                            className={`text-sm ${analyticsData.views.positive ? "text-green-500" : "text-red-500"}`}
                          >
                            {analyticsData.views.change}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Engagement</p>
                            <h3 className="text-2xl font-bold">{analyticsData.engagement.total}</h3>
                          </div>
                          <div
                            className={`text-sm ${
                              analyticsData.engagement.positive ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {analyticsData.engagement.change}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                            <h3 className="text-2xl font-bold">{analyticsData.revenue.total}</h3>
                          </div>
                          <div
                            className={`text-sm ${analyticsData.revenue.positive ? "text-green-500" : "text-red-500"}`}
                          >
                            {analyticsData.revenue.change}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects
                        .filter((project) => project.status === "published")
                        .map((project) => (
                          <div key={project.id} className="flex items-center">
                            <div className="relative w-10 h-10 rounded overflow-hidden mr-3">
                              <Image
                                src={project.thumbnail || "/placeholder.svg"}
                                alt={project.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">{project.name}</h4>
                                <div className="flex items-center gap-2 text-sm">
                                  <div className="flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    {project.views}
                                  </div>
                                  <div className="flex items-center">
                                    <Heart className="h-3 w-3 mr-1" />
                                    {project.likes}
                                  </div>
                                </div>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-primary h-full"
                                  style={{ width: `${(project.likes / project.views) * 100 * 10}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

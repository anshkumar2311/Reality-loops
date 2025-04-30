"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Save,
  Download,
  Share2,
  Layers,
  CuboidIcon as Cube,
  Filter,
  Code2,
  Eye,
  EyeOff,
  RotateCw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Add this import at the top
import ARDesigner3D from "@/components/ar-designer-3d"

export default function DesignerPage() {
  const [activeTab, setActiveTab] = useState("models")
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [elements, setElements] = useState<ARElement[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [draggedElement, setDraggedElement] = useState<ARElement | null>(null)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })

  // Sample AR elements
  const models = [
    { id: "model1", name: "Chair", type: "model", icon: "🪑" },
    { id: "model2", name: "Table", type: "model", icon: "🪑" },
    { id: "model3", name: "Lamp", type: "model", icon: "💡" },
    { id: "model4", name: "Plant", type: "model", icon: "🌿" },
    { id: "model5", name: "Sofa", type: "model", icon: "🛋️" },
    { id: "model6", name: "Bookshelf", type: "model", icon: "📚" },
  ]

  const filters = [
    { id: "filter1", name: "Color Overlay", type: "filter", icon: "🎨" },
    { id: "filter2", name: "Blur Effect", type: "filter", icon: "🌫️" },
    { id: "filter3", name: "Glow", type: "filter", icon: "✨" },
    { id: "filter4", name: "Vintage", type: "filter", icon: "📷" },
    { id: "filter5", name: "Neon", type: "filter", icon: "💫" },
  ]

  const logicBlocks = [
    { id: "logic1", name: "Tap Interaction", type: "logic", icon: "👆" },
    { id: "logic2", name: "Proximity Trigger", type: "logic", icon: "📏" },
    { id: "logic3", name: "Animation", type: "logic", icon: "🎬" },
    { id: "logic4", name: "Sound Effect", type: "logic", icon: "🔊" },
    { id: "logic5", name: "Timer", type: "logic", icon: "⏱️" },
  ]

  // Handle drag start from sidebar
  const handleDragStart = (item: any) => {
    const newElement: ARElement = {
      id: `${item.type}-${Date.now()}`,
      type: item.type,
      name: item.name,
      icon: item.icon,
      position: { x: 100, y: 100 },
      rotation: 0,
      scale: 1,
      visible: true,
    }

    setDraggedElement(newElement)
    setIsDragging(true)
  }

  // Handle drag over canvas
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (canvasRef.current && draggedElement) {
      const rect = canvasRef.current.getBoundingClientRect()
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (canvasRef.current && draggedElement) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newElement = {
        ...draggedElement,
        position: { x, y },
      }

      setElements([...elements, newElement])
      setSelectedElement(newElement.id)
    }

    setIsDragging(false)
    setDraggedElement(null)
  }

  // Handle element selection
  const handleElementClick = (id: string) => {
    setSelectedElement(id)
  }

  // Handle element deletion
  const handleDeleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  // Get selected element
  const getSelectedElement = () => {
    return elements.find((el) => el.id === selectedElement) || null
  }

  // Update element property
  const updateElementProperty = (property: string, value: any) => {
    if (!selectedElement) return

    setElements(
      elements.map((el) => {
        if (el.id === selectedElement) {
          return { ...el, [property]: value }
        }
        return el
      }),
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-64 border-r bg-background flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">AR Designer</h2>
            <p className="text-sm text-muted-foreground">Drag elements to canvas</p>
          </div>

          <Tabs defaultValue="models" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="models">
                <Cube className="h-4 w-4 mr-1" />
                Models
              </TabsTrigger>
              <TabsTrigger value="filters">
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </TabsTrigger>
              <TabsTrigger value="logic">
                <Code2 className="h-4 w-4 mr-1" />
                Logic
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-2">
              <TabsContent value="models" className="mt-0 space-y-2">
                {models.map((model) => (
                  <ComponentItem key={model.id} item={model} onDragStart={() => handleDragStart(model)} />
                ))}
              </TabsContent>

              <TabsContent value="filters" className="mt-0 space-y-2">
                {filters.map((filter) => (
                  <ComponentItem key={filter.id} item={filter} onDragStart={() => handleDragStart(filter)} />
                ))}
              </TabsContent>

              <TabsContent value="logic" className="mt-0 space-y-2">
                {logicBlocks.map((logic) => (
                  <ComponentItem key={logic.id} item={logic} onDragStart={() => handleDragStart(logic)} />
                ))}
              </TabsContent>
            </div>
          </Tabs>

          <div className="p-4 border-t">
            <Button className="w-full" asChild>
              <a href="/marketplace">Browse Marketplace</a>
            </Button>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="h-12 border-b flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="h-6 border-r mx-2"></div>
              <Button variant="ghost" size="icon">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                {previewMode ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" />
                    Exit Preview
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </>
                )}
              </Button>

              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Layers className="h-4 w-4 mr-2" />
                    Publish to Marketplace
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Canvas */}
          {/* Replace the canvas div with the ARDesigner3D component: */}
          <div className="flex-1 relative bg-muted/30 overflow-hidden">
            <ARDesigner3D />
          </div>
        </div>

        {/* Properties Panel */}
        {selectedElement && !previewMode && (
          <div className="w-72 border-l bg-background">
            <div className="p-4 border-b">
              <h3 className="font-bold">Properties</h3>
              <p className="text-sm text-muted-foreground">{getSelectedElement()?.name}</p>
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={getSelectedElement()?.name || ""}
                  onChange={(e) => updateElementProperty("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">X</label>
                    <Input
                      type="number"
                      value={getSelectedElement()?.position.x || 0}
                      onChange={(e) => {
                        const el = getSelectedElement()
                        if (el) {
                          updateElementProperty("position", {
                            ...el.position,
                            x: Number(e.target.value),
                          })
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Y</label>
                    <Input
                      type="number"
                      value={getSelectedElement()?.position.y || 0}
                      onChange={(e) => {
                        const el = getSelectedElement()
                        if (el) {
                          updateElementProperty("position", {
                            ...el.position,
                            y: Number(e.target.value),
                          })
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rotation</label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[getSelectedElement()?.rotation || 0]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(value) => updateElementProperty("rotation", value[0])}
                  />
                  <span className="text-sm w-8 text-right">{getSelectedElement()?.rotation || 0}°</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Scale</label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[getSelectedElement()?.scale || 1]}
                    min={0.1}
                    max={3}
                    step={0.1}
                    onValueChange={(value) => updateElementProperty("scale", value[0])}
                  />
                  <span className="text-sm w-8 text-right">{getSelectedElement()?.scale || 1}x</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Visible</label>
                <Button
                  variant={getSelectedElement()?.visible ? "default" : "outline"}
                  size="sm"
                  className="ml-auto"
                  onClick={() => {
                    const el = getSelectedElement()
                    if (el) {
                      updateElementProperty("visible", !el.visible)
                    }
                  }}
                >
                  {getSelectedElement()?.visible ? (
                    <Eye className="h-4 w-4 mr-1" />
                  ) : (
                    <EyeOff className="h-4 w-4 mr-1" />
                  )}
                  {getSelectedElement()?.visible ? "Visible" : "Hidden"}
                </Button>
              </div>

              {/* Element-specific properties */}
              {getSelectedElement()?.type === "filter" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Intensity</label>
                  <div className="flex items-center space-x-2">
                    <Slider value={[0.5]} min={0} max={1} step={0.01} />
                    <span className="text-sm w-8 text-right">50%</span>
                  </div>
                </div>
              )}

              {getSelectedElement()?.type === "logic" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trigger</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>On Tap</option>
                    <option>On Proximity</option>
                    <option>On Load</option>
                    <option>On Timer</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ComponentItemProps {
  item: {
    id: string
    name: string
    type: string
    icon: string
  }
  onDragStart: () => void
}

function ComponentItem({ item, onDragStart }: ComponentItemProps) {
  return (
    <div className="flex items-center p-2 rounded-md hover:bg-muted cursor-grab" draggable onDragStart={onDragStart}>
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted mr-2">
        <span>{item.icon}</span>
      </div>
      <span className="text-sm">{item.name}</span>
    </div>
  )
}

interface ARElement {
  id: string
  type: string
  name: string
  icon: string
  position: {
    x: number
    y: number
  }
  rotation: number
  scale: number
  visible: boolean
}

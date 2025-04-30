"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, TransformControls, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CuboidIcon as Cube,
  SpaceIcon as Sphere,
  Cylinder,
  Trash2,
  Move,
  Scale,
  Rotate3dIcon as Rotate,
  Download,
  Share2,
  Plus,
} from "lucide-react"

// Sample 3D objects
const objectTypes = [
  { id: "cube", name: "Cube", icon: <Cube className="h-4 w-4" /> },
  { id: "sphere", name: "Sphere", icon: <Sphere className="h-4 w-4" /> },
  { id: "cylinder", name: "Cylinder", icon: <Cylinder className="h-4 w-4" /> },
  { id: "duck", name: "Duck", icon: "🦆", model: "/assets/3d/duck.glb" },
]

// Sample textures
const textures = [
  { id: "wood", name: "Wood", url: "/placeholder.svg?height=64&width=64&text=Wood" },
  { id: "metal", name: "Metal", url: "/placeholder.svg?height=64&width=64&text=Metal" },
  { id: "plastic", name: "Plastic", url: "/placeholder.svg?height=64&width=64&text=Plastic" },
  { id: "glass", name: "Glass", url: "/placeholder.svg?height=64&width=64&text=Glass" },
]

// Sample animations
const animations = [
  { id: "rotate", name: "Rotate", icon: <Rotate className="h-4 w-4" /> },
  { id: "bounce", name: "Bounce", icon: <Move className="h-4 w-4" /> },
  { id: "pulse", name: "Pulse", icon: <Scale className="h-4 w-4" /> },
]

function Scene({ objects, selectedObject, setSelectedObject, updateObject, removeObject, transformMode }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <gridHelper args={[20, 20, 0x888888, 0x444444]} />

      {objects.map((object) => (
        <Object
          key={object.id}
          object={object}
          isSelected={selectedObject?.id === object.id}
          onClick={() => setSelectedObject(object)}
          updateObject={updateObject}
          transformMode={selectedObject?.id === object.id ? transformMode : null}
        />
      ))}

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  )
}

function Object({ object, isSelected, onClick, updateObject, transformMode }) {
  const { position, rotation, scale, type, color, id, name } = object
  const groupRef = useRef()
  const [model, setModel] = useState(null)

  useEffect(() => {
    if (type === "duck") {
      // Load the duck model
      const loadModel = async () => {
        try {
          const gltf = await useGLTF.load("/assets/3d/duck.glb")
          setModel(gltf.scene.clone())
        } catch (error) {
          console.error("Failed to load model:", error)
        }
      }

      loadModel()
    } else {
      setModel(null)
    }
  }, [type])

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(position[0], position[1], position[2])
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
      groupRef.current.scale.set(scale[0], scale[1], scale[2])
    }
  }, [position, rotation, scale])

  const handleTransform = () => {
    if (groupRef.current && isSelected) {
      updateObject(id, {
        position: [groupRef.current.position.x, groupRef.current.position.y, groupRef.current.position.z],
        rotation: [groupRef.current.rotation.x, groupRef.current.rotation.y, groupRef.current.rotation.z],
        scale: [groupRef.current.scale.x, groupRef.current.scale.y, groupRef.current.scale.z],
      })
    }
  }

  return (
    <>
      {isSelected && transformMode && (
        <TransformControls object={groupRef.current} mode={transformMode} onObjectChange={handleTransform} />
      )}
      <group ref={groupRef} onClick={onClick} onPointerMissed={(e) => e.stopPropagation()}>
        {type === "cube" && (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )}
        {type === "sphere" && (
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )}
        {type === "cylinder" && (
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )}
        {type === "duck" && model && <primitive object={model} />}

        {isSelected && (
          <Html position={[0, 1.5, 0]} center>
            <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap">
              {name || type}
            </div>
          </Html>
        )}
      </group>
    </>
  )
}

export default function ARDesigner3D() {
  const [objects, setObjects] = useState([])
  const [selectedObject, setSelectedObject] = useState(null)
  const [transformMode, setTransformMode] = useState("translate") // translate, rotate, scale
  const [nextId, setNextId] = useState(1)
  const [showGrid, setShowGrid] = useState(true)
  const [showAxes, setShowAxes] = useState(true)
  const [viewMode, setViewMode] = useState("edit") // edit, preview
  const [projectName, setProjectName] = useState("Untitled Project")
  const [isSaving, setIsSaving] = useState(false)

  const addObject = (type) => {
    const newObject = {
      id: `object-${nextId}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nextId}`,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#" + Math.floor(Math.random() * 16777215).toString(16), // Random color
      animation: null,
      texture: null,
    }
    setObjects([...objects, newObject])
    setSelectedObject(newObject)
    setNextId(nextId + 1)
  }

  const updateObject = (id, updates) => {
    setObjects(
      objects.map((obj) => {
        if (obj.id === id) {
          return { ...obj, ...updates }
        }
        return obj
      }),
    )

    if (selectedObject && selectedObject.id === id) {
      setSelectedObject({ ...selectedObject, ...updates })
    }
  }

  const removeObject = (id) => {
    setObjects(objects.filter((obj) => obj.id !== id))
    if (selectedObject && selectedObject.id === id) {
      setSelectedObject(null)
    }
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      alert("Project saved successfully!")
    }, 1000)
  }

  const duplicateObject = () => {
    if (selectedObject) {
      const newObject = {
        ...selectedObject,
        id: `object-${nextId}`,
        name: `${selectedObject.name} (Copy)`,
        position: [selectedObject.position[0] + 1, selectedObject.position[1], selectedObject.position[2]],
      }
      setObjects([...objects, newObject])
      setSelectedObject(newObject)
      setNextId(nextId + 1)
    }
  }

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Object Library */}
      <div className="w-64 border-r bg-background p-4 flex flex-col">
        <div className="mb-4">
          <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="font-bold" />
        </div>

        <Tabs defaultValue="objects" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="objects">Objects</TabsTrigger>
            <TabsTrigger value="textures">Textures</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="objects" className="h-full">
              <div className="grid grid-cols-2 gap-2">
                {objectTypes.map((objType) => (
                  <Button
                    key={objType.id}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20"
                    onClick={() => addObject(objType.id)}
                  >
                    <div className="text-2xl mb-1">{objType.icon}</div>
                    <span className="text-xs">{objType.name}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="textures" className="h-full">
              <div className="grid grid-cols-2 gap-2">
                {textures.map((texture) => (
                  <Button
                    key={texture.id}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20"
                    onClick={() => selectedObject && updateObject(selectedObject.id, { texture: texture.id })}
                    disabled={!selectedObject}
                  >
                    <div
                      className="w-10 h-10 bg-muted rounded mb-1"
                      style={{ backgroundImage: `url(${texture.url})` }}
                    ></div>
                    <span className="text-xs">{texture.name}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="animations" className="h-full">
              <div className="grid grid-cols-2 gap-2">
                {animations.map((animation) => (
                  <Button
                    key={animation.id}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20"
                    onClick={() => selectedObject && updateObject(selectedObject.id, { animation: animation.id })}
                    disabled={!selectedObject}
                  >
                    <div className="text-2xl mb-1">{animation.icon}</div>
                    <span className="text-xs">{animation.name}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-4 pt-4 border-t">
          <Button className="w-full" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Button
            variant={transformMode === "translate" ? "default" : "outline"}
            size="icon"
            onClick={() => setTransformMode("translate")}
            disabled={!selectedObject || viewMode === "preview"}
          >
            <Move className="h-4 w-4" />
          </Button>
          <Button
            variant={transformMode === "rotate" ? "default" : "outline"}
            size="icon"
            onClick={() => setTransformMode("rotate")}
            disabled={!selectedObject || viewMode === "preview"}
          >
            <Rotate className="h-4 w-4" />
          </Button>
          <Button
            variant={transformMode === "scale" ? "default" : "outline"}
            size="icon"
            onClick={() => setTransformMode("scale")}
            disabled={!selectedObject || viewMode === "preview"}
          >
            <Scale className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => selectedObject && removeObject(selectedObject.id)}
            disabled={!selectedObject || viewMode === "preview"}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={duplicateObject}
            disabled={!selectedObject || viewMode === "preview"}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant={viewMode === "edit" ? "default" : "outline"} size="sm" onClick={() => setViewMode("edit")}>
            Edit
          </Button>
          <Button
            variant={viewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("preview")}
          >
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>

        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          <Scene
            objects={objects}
            selectedObject={viewMode === "preview" ? null : selectedObject}
            setSelectedObject={viewMode === "preview" ? () => {} : setSelectedObject}
            updateObject={updateObject}
            removeObject={removeObject}
            transformMode={viewMode === "preview" ? null : transformMode}
          />
        </Canvas>
      </div>

      {/* Right Sidebar - Properties */}
      {selectedObject && viewMode !== "preview" && (
        <div className="w-72 border-l bg-background p-4 overflow-y-auto">
          <h3 className="font-bold mb-4">Properties</h3>
          <Tabs defaultValue="transform">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transform">Transform</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="animation">Animation</TabsTrigger>
            </TabsList>
            <TabsContent value="transform" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">X</Label>
                    <Input
                      type="number"
                      value={selectedObject.position[0]}
                      onChange={(e) => {
                        const newPosition = [...selectedObject.position]
                        newPosition[0] = Number.parseFloat(e.target.value)
                        updateObject(selectedObject.id, { position: newPosition })
                      }}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Y</Label>
                    <Input
                      type="number"
                      value={selectedObject.position[1]}
                      onChange={(e) => {
                        const newPosition = [...selectedObject.position]
                        newPosition[1] = Number.parseFloat(e.target.value)
                        updateObject(selectedObject.id, { position: newPosition })
                      }}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Z</Label>
                    <Input
                      type="number"
                      value={selectedObject.position[2]}
                      onChange={(e) => {
                        const newPosition = [...selectedObject.position]
                        newPosition[2] = Number.parseFloat(e.target.value)
                        updateObject(selectedObject.id, { position: newPosition })
                      }}
                      step={0.1}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rotation (degrees)</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">X</Label>
                    <Input
                      type="number"
                      value={(selectedObject.rotation[0] * 180) / Math.PI}
                      onChange={(e) => {
                        const newRotation = [...selectedObject.rotation]
                        newRotation[0] = (Number.parseFloat(e.target.value) * Math.PI) / 180
                        updateObject(selectedObject.id, { rotation: newRotation })
                      }}
                      step={15}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Y</Label>
                    <Input
                      type="number"
                      value={(selectedObject.rotation[1] * 180) / Math.PI}
                      onChange={(e) => {
                        const newRotation = [...selectedObject.rotation]
                        newRotation[1] = (Number.parseFloat(e.target.value) * Math.PI) / 180
                        updateObject(selectedObject.id, { rotation: newRotation })
                      }}
                      step={15}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Z</Label>
                    <Input
                      type="number"
                      value={(selectedObject.rotation[2] * 180) / Math.PI}
                      onChange={(e) => {
                        const newRotation = [...selectedObject.rotation]
                        newRotation[2] = (Number.parseFloat(e.target.value) * Math.PI) / 180
                        updateObject(selectedObject.id, { rotation: newRotation })
                      }}
                      step={15}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Scale</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">X</Label>
                    <Input
                      type="number"
                      value={selectedObject.scale[0]}
                      onChange={(e) => {
                        const newScale = [...selectedObject.scale]
                        newScale[0] = Number.parseFloat(e.target.value)
                        updateObject(selectedObject.id, { scale: newScale })
                      }}
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Y</Label>
                    <Input
                      type="number"
                      value={selectedObject.scale[1]}
                      onChange={(e) => {
                        const newScale = [...selectedObject.scale]
                        newScale[1] = Number.parseFloat(e.target.value)
                        updateObject(selectedObject.id, { scale: newScale })
                      }}
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Z</Label>
                    <Input
                      type="number"
                      value={selectedObject.scale[2]}
                      onChange={(e) => {
                        const newScale = [...selectedObject.scale]
                        newScale[2] = Number.parseFloat(e.target.value)
                        updateObject(selectedObject.id, { scale: newScale })
                      }}
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appearance" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={selectedObject.name}
                  onChange={(e) => updateObject(selectedObject.id, { name: e.target.value })}
                />
              </div>

              {selectedObject.type !== "duck" && (
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={selectedObject.color}
                      onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={selectedObject.color}
                      onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Texture</Label>
                <Select
                  value={selectedObject.texture || "none"}
                  onValueChange={(value) =>
                    updateObject(selectedObject.id, { texture: value === "none" ? null : value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select texture" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {textures.map((texture) => (
                      <SelectItem key={texture.id} value={texture.id}>
                        {texture.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Opacity</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[selectedObject.opacity || 1]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={(value) => updateObject(selectedObject.id, { opacity: value[0] })}
                  />
                  <span className="text-sm w-12 text-right">{Math.round((selectedObject.opacity || 1) * 100)}%</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="animation" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Animation Type</Label>
                <Select
                  value={selectedObject.animation || "none"}
                  onValueChange={(value) =>
                    updateObject(selectedObject.id, { animation: value === "none" ? null : value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select animation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {animations.map((animation) => (
                      <SelectItem key={animation.id} value={animation.id}>
                        {animation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedObject.animation && (
                <>
                  <div className="space-y-2">
                    <Label>Speed</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        value={[selectedObject.animationSpeed || 1]}
                        min={0.1}
                        max={5}
                        step={0.1}
                        onValueChange={(value) => updateObject(selectedObject.id, { animationSpeed: value[0] })}
                      />
                      <span className="text-sm w-12 text-right">{selectedObject.animationSpeed || 1}x</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Loop</Label>
                    <Select
                      value={selectedObject.animationLoop?.toString() || "true"}
                      onValueChange={(value) => updateObject(selectedObject.id, { animationLoop: value === "true" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

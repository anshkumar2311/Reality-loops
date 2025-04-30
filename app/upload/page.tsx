"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { FileUp, X, Check, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [assetType, setAssetType] = useState("3d-model")
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    // Filter files based on asset type
    let validFiles: File[] = []

    switch (assetType) {
      case "3d-model":
        validFiles = newFiles.filter(
          (file) =>
            file.name.endsWith(".glb") ||
            file.name.endsWith(".gltf") ||
            file.name.endsWith(".obj") ||
            file.name.endsWith(".fbx"),
        )
        break
      case "texture":
        validFiles = newFiles.filter((file) => file.type.startsWith("image/") || file.name.endsWith(".hdr"))
        break
      case "animation":
        validFiles = newFiles.filter(
          (file) => file.name.endsWith(".anim") || file.name.endsWith(".fbx") || file.name.endsWith(".json"),
        )
        break
      case "audio":
        validFiles = newFiles.filter((file) => file.type.startsWith("audio/"))
        break
      default:
        validFiles = newFiles
    }

    if (validFiles.length === 0) {
      setUploadError("No valid files selected for this asset type")
      return
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles])
    setUploadError(null)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (files.length === 0) {
      setUploadError("Please select files to upload")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const resetUpload = () => {
    setFiles([])
    setUploadProgress(0)
    setIsUploading(false)
    setUploadComplete(false)
    setUploadError(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload AR Assets</h1>
            <p className="text-muted-foreground">
              Upload 3D models, textures, animations, and audio for your AR projects
            </p>
          </div>

          <Tabs defaultValue="upload" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Assets</TabsTrigger>
              <TabsTrigger value="marketplace">Sell on Marketplace</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="asset-type">Asset Type</Label>
                    <Select value={assetType} onValueChange={setAssetType}>
                      <SelectTrigger id="asset-type">
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3d-model">3D Model</SelectItem>
                        <SelectItem value="texture">Texture</SelectItem>
                        <SelectItem value="animation">Animation</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Files</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Drag and drop files here, or{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {assetType === "3d-model" && "Supported formats: GLB, GLTF, OBJ, FBX"}
                        {assetType === "texture" && "Supported formats: PNG, JPG, JPEG, HDR"}
                        {assetType === "animation" && "Supported formats: FBX, JSON"}
                        {assetType === "audio" && "Supported formats: MP3, WAV, OGG"}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>

                  {uploadError && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">{uploadError}</p>
                    </div>
                  )}

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Files</Label>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                                <FileUp className="h-4 w-4 text-primary" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                              disabled={isUploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {uploadComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 text-green-500 p-4 rounded-md flex items-center gap-3"
                    >
                      <div className="bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Upload Complete!</p>
                        <p className="text-sm">Your assets have been uploaded successfully.</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="asset-name">Asset Name</Label>
                    <Input id="asset-name" placeholder="Enter asset name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-description">Description</Label>
                    <Textarea id="asset-description" placeholder="Enter a description for your asset" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-tags">Tags</Label>
                    <Input id="asset-tags" placeholder="Enter tags separated by commas" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="private" />
                    <Label htmlFor="private">Private asset (only visible to you)</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetUpload}>
                    Reset
                  </Button>
                  <Button onClick={handleUpload} disabled={files.length === 0 || isUploading || uploadComplete}>
                    {isUploading ? "Uploading..." : uploadComplete ? "Uploaded" : "Upload Assets"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="marketplace" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sell on Marketplace</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea
                      id="product-description"
                      placeholder="Enter a detailed description of your product"
                      rows={5}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-price">Price ($)</Label>
                      <Input id="product-price" type="number" min="0" step="0.01" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-category">Category</Label>
                      <Select>
                        <SelectTrigger id="product-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar-filters">AR Filters</SelectItem>
                          <SelectItem value="3d-models">3D Models</SelectItem>
                          <SelectItem value="textures">Textures</SelectItem>
                          <SelectItem value="animations">Animations</SelectItem>
                          <SelectItem value="complete-solutions">Complete Solutions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-tags">Tags</Label>
                    <Input id="product-tags" placeholder="Enter tags separated by commas" />
                  </div>

                  <div className="space-y-2">
                    <Label>Product Files</Label>
                    <div
                      className="border-2 border-dashed rounded-lg p-8 text-center border-muted-foreground/25"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Drag and drop product files here, or{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-xs text-muted-foreground">Include all necessary files for your product</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preview Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center border-muted-foreground/25">
                      <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Upload a preview image for your product</p>
                      <p className="text-xs text-muted-foreground">Recommended size: 1200 x 800 pixels</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="terms" />
                    <Label htmlFor="terms">
                      I agree to the{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        marketplace terms and conditions
                      </a>
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Submit for Review</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Camera, RotateCcw, Download, Share, Heart, ArrowLeft, Maximize, Settings, Info } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Emerald Solitaire Ring",
    price: 2499,
    image: "/placeholder.svg?height=100&width=100",
    category: "rings",
  },
  {
    id: 2,
    name: "Ruby Heart Pendant",
    price: 1299,
    image: "/placeholder.svg?height=100&width=100",
    category: "necklaces",
  },
  {
    id: 3,
    name: "Diamond Stud Earrings",
    price: 1899,
    image: "/placeholder.svg?height=100&width=100",
    category: "earrings",
  },
  {
    id: 4,
    name: "Sapphire Tennis Bracelet",
    price: 3999,
    image: "/placeholder.svg?height=100&width=100",
    category: "bracelets",
  },
]

export default function ARTryOnPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [isARActive, setIsARActive] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Check for camera permission and WebRTC support
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setHasPermission(true)
    }
  }, [])

  const startAR = async () => {
    setIsLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsARActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
    setIsLoading(false)
  }

  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsARActive(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)

        // Convert to blob and download
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = `lumina-ar-tryOn-${Date.now()}.jpg`
              a.click()
              URL.revokeObjectURL(url)
            }
          },
          "image/jpeg",
          0.9,
        )
      }
    }
  }

  const sharePhoto = async () => {
    if (navigator.share && canvasRef.current) {
      canvasRef.current.toBlob(
        async (blob) => {
          if (blob) {
            const file = new File([blob], "lumina-ar-tryOn.jpg", { type: "image/jpeg" })
            try {
              await navigator.share({
                title: "My Lumina AR Try-On",
                text: `Check out how I look in this ${selectedProduct.name}!`,
                files: [file],
              })
            } catch (error) {
              console.error("Error sharing:", error)
            }
          }
        },
        "image/jpeg",
        0.9,
      )
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-serif font-bold text-stone-800">Lumina</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                AR Try-On
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AR Camera View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>AR Try-On Experience</span>
                  </span>
                  {isARActive && (
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={capturePhoto}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={sharePhoto}>
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-stone-100 rounded-lg overflow-hidden aspect-video">
                  {!isARActive ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-4">
                        <Camera className="h-16 w-16 text-stone-400 mx-auto" />
                        <div>
                          <h3 className="text-xl font-semibold text-stone-800 mb-2">Try On {selectedProduct.name}</h3>
                          <p className="text-stone-600 mb-4">Use your camera to see how this piece looks on you</p>
                          {hasPermission ? (
                            <Button
                              onClick={startAR}
                              disabled={isLoading}
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              {isLoading ? "Starting Camera..." : "Start AR Try-On"}
                            </Button>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-sm text-red-600">Camera access required</p>
                              <Button variant="outline" onClick={() => window.location.reload()}>
                                Grant Permission
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />

                      {/* AR Overlay - Simulated jewelry placement */}
                      <div className="absolute inset-0 pointer-events-none">
                        {selectedProduct.category === "rings" && (
                          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
                            <Image
                              src={selectedProduct.image || "/placeholder.svg"}
                              alt={selectedProduct.name}
                              width={80}
                              height={80}
                              className="opacity-80"
                            />
                          </div>
                        )}
                        {selectedProduct.category === "necklaces" && (
                          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                            <Image
                              src={selectedProduct.image || "/placeholder.svg"}
                              alt={selectedProduct.name}
                              width={120}
                              height={120}
                              className="opacity-80"
                            />
                          </div>
                        )}
                        {selectedProduct.category === "earrings" && (
                          <>
                            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2">
                              <Image
                                src={selectedProduct.image || "/placeholder.svg"}
                                alt={selectedProduct.name}
                                width={40}
                                height={40}
                                className="opacity-80"
                              />
                            </div>
                            <div className="absolute top-1/4 right-1/3 transform translate-x-1/2">
                              <Image
                                src={selectedProduct.image || "/placeholder.svg"}
                                alt={selectedProduct.name}
                                width={40}
                                height={40}
                                className="opacity-80 scale-x-[-1]"
                              />
                            </div>
                          </>
                        )}
                        {selectedProduct.category === "bracelets" && (
                          <div className="absolute bottom-1/4 right-1/4">
                            <Image
                              src={selectedProduct.image || "/placeholder.svg"}
                              alt={selectedProduct.name}
                              width={100}
                              height={100}
                              className="opacity-80"
                            />
                          </div>
                        )}
                      </div>

                      {/* Controls Overlay */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white/80 hover:bg-white"
                          onClick={capturePhoto}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="bg-white/80 hover:bg-white" onClick={stopAR}>
                          Stop AR
                        </Button>
                        <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* Hidden canvas for photo capture */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Instructions */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">AR Try-On Tips:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Ensure good lighting for best results</li>
                        <li>• Keep your hand steady for rings and bracelets</li>
                        <li>• Face the camera directly for earrings and necklaces</li>
                        <li>• Tap the capture button to save your try-on photo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Selection & Details */}
          <div className="space-y-6">
            {/* Current Product */}
            <Card>
              <CardHeader>
                <CardTitle>Currently Trying On</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    width={120}
                    height={120}
                    className="mx-auto rounded-lg"
                  />
                  <h3 className="font-semibold text-lg mt-3">{selectedProduct.name}</h3>
                  <p className="text-2xl font-bold text-emerald-600">${selectedProduct.price}</p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/product/${selectedProduct.id}`}>View Product Details</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Try Other Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedProduct.id === product.id
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-stone-200 hover:border-emerald-300"
                      }`}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="mx-auto rounded"
                      />
                      <p className="text-xs font-medium mt-2 text-center">{product.name}</p>
                      <p className="text-xs text-emerald-600 text-center">${product.price}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AR Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>AR Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-adjust size</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show placement guides</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">High quality rendering</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </CardContent>
            </Card>

            {/* Share & Save */}
            <Card>
              <CardHeader>
                <CardTitle>Share Your Look</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" onClick={sharePhoto}>
                  <Share className="h-4 w-4 mr-2" />
                  Share on Social Media
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Save to Gallery
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

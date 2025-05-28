"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Share,
  Star,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Truck,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react"

const product = {
  id: 1,
  name: "Emerald Solitaire Ring",
  price: 2499,
  originalPrice: 2999,
  rating: 4.8,
  reviews: 124,
  description:
    "A stunning emerald solitaire ring featuring a brilliant 1.5-carat emerald set in 18K yellow gold. This timeless piece combines classic elegance with modern craftsmanship.",
  features: [
    "1.5-carat natural emerald",
    "18K yellow gold band",
    "Conflict-free gemstone",
    "Handcrafted setting",
    "Lifetime warranty included",
  ],
  specifications: {
    Gemstone: "Natural Emerald",
    "Carat Weight": "1.5 ct",
    Metal: "18K Yellow Gold",
    Setting: "Solitaire",
    "Ring Size": "Adjustable",
    Certificate: "GIA Certified",
  },
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  inStock: true,
  stockCount: 15,
}

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Absolutely stunning ring! The emerald is even more beautiful in person. The craftsmanship is exceptional.",
    verified: true,
    helpful: 12,
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "2024-01-10",
    comment:
      "Bought this for my fiancée and she loves it! The color of the emerald is perfect and the setting is very secure.",
    verified: true,
    helpful: 8,
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 4,
    date: "2024-01-05",
    comment:
      "Beautiful ring, though it took a bit longer to arrive than expected. The quality is definitely worth the wait.",
    verified: true,
    helpful: 5,
  },
]

const ratingBreakdown = [
  { stars: 5, count: 89, percentage: 72 },
  { stars: 4, count: 25, percentage: 20 },
  { stars: 3, count: 7, percentage: 6 },
  { stars: 2, count: 2, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
]

export default function ProductDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("7")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
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
            <nav className="hidden md:flex space-x-6">
              <Link href="/products" className="text-stone-600 hover:text-emerald-600 transition-colors">
                All Products
              </Link>
              <Link href="/cart" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Cart
              </Link>
              <Link href="/account" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Account
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-stone-600 mb-8">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-emerald-600">
            Products
          </Link>
          <span>/</span>
          <Link href="/rings" className="hover:text-emerald-600">
            Rings
          </Link>
          <span>/</span>
          <span className="text-stone-800">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 object-contain"
              />

              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* 360° View Button */}
              <Button variant="outline" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                <RotateCcw className="h-4 w-4 mr-2" />
                360° View
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? "border-emerald-600" : "border-stone-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* AR Try-On */}
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
              <Sparkles className="h-5 w-5 mr-2" />
              Try On with AR
            </Button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-stone-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-stone-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-4xl font-bold text-stone-800">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-stone-400 line-through">${product.originalPrice}</span>
                    <Badge className="bg-red-500">Save ${product.originalPrice - product.price}</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="space-y-2">
              <h3 className="font-semibold text-stone-800">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-stone-600">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Ring Size</Label>
              <div className="flex flex-wrap gap-2">
                {["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className={selectedSize === size ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <Link href="/size-guide" className="text-sm text-emerald-600 hover:underline">
                Need help with sizing?
              </Link>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Quantity</Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-stone-600">{product.stockCount} items in stock</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" size="lg">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              <Button variant="outline" className="w-full" size="lg">
                Customize This Ring
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center space-y-2">
                <Truck className="h-6 w-6 text-emerald-600 mx-auto" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-stone-600">On orders over $500</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-6 w-6 text-emerald-600 mx-auto" />
                <p className="text-sm font-medium">Lifetime Warranty</p>
                <p className="text-xs text-stone-600">Comprehensive coverage</p>
              </div>
              <div className="text-center space-y-2">
                <Award className="h-6 w-6 text-emerald-600 mx-auto" />
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-stone-600">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="care">Care Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-stone-100">
                        <span className="font-medium text-stone-800">{key}:</span>
                        <span className="text-stone-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-stone-800 mb-2">{product.rating}</div>
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-stone-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-stone-600">Based on {product.reviews} reviews</p>
                      </div>
                      <div className="space-y-2">
                        {ratingBreakdown.map((rating) => (
                          <div key={rating.stars} className="flex items-center space-x-3">
                            <span className="text-sm w-8">{rating.stars}★</span>
                            <Progress value={rating.percentage} className="flex-1" />
                            <span className="text-sm text-stone-600 w-8">{rating.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium text-stone-800">{review.name}</span>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-stone-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-stone-600">{review.date}</span>
                            </div>
                            <p className="text-stone-600 mb-3">{review.comment}</p>
                            <div className="flex items-center space-x-4 text-sm text-stone-500">
                              <button className="hover:text-emerald-600">Helpful ({review.helpful})</button>
                              <button className="hover:text-emerald-600">Reply</button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-stone-800 mb-3">Caring for Your Emerald Ring</h3>
                    <div className="space-y-4 text-stone-600">
                      <div>
                        <h4 className="font-medium text-stone-800 mb-2">Daily Care</h4>
                        <ul className="space-y-1 ml-4">
                          <li>• Remove before swimming, exercising, or cleaning</li>
                          <li>• Store in a soft cloth pouch when not wearing</li>
                          <li>• Avoid contact with lotions, perfumes, and chemicals</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800 mb-2">Cleaning</h4>
                        <ul className="space-y-1 ml-4">
                          <li>• Clean with warm soapy water and a soft brush</li>
                          <li>• Rinse thoroughly and dry with a soft cloth</li>
                          <li>• Professional cleaning recommended every 6 months</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800 mb-2">Storage</h4>
                        <ul className="space-y-1 ml-4">
                          <li>• Store separately to prevent scratching</li>
                          <li>• Keep in a cool, dry place</li>
                          <li>• Use the provided jewelry box or soft pouch</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function Label({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  )
}

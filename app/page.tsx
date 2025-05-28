"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, ShoppingBag, User, Menu, Star, Timer, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

const featuredProducts = [
  {
    id: 1,
    name: "Emerald Solitaire Ring",
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    customizable: true,
    gemstone: "Emerald",
    metal: "18K Gold",
  },
  {
    id: 2,
    name: "Ruby Heart Pendant",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    customizable: true,
    gemstone: "Ruby",
    metal: "White Gold",
  },
  {
    id: 3,
    name: "Sapphire Tennis Bracelet",
    price: 3999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    customizable: true,
    gemstone: "Sapphire",
    metal: "Platinum",
  },
  {
    id: 4,
    name: "Diamond Stud Earrings",
    price: 1899,
    originalPrice: 2299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    customizable: true,
    gemstone: "Diamond",
    metal: "18K Gold",
  },
]

const collections = [
  {
    name: "Spring Blossoms",
    description: "Delicate floral designs inspired by nature",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 24,
  },
  {
    name: "Eternal Elegance",
    description: "Timeless pieces for special occasions",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 18,
  },
  {
    name: "Modern Minimalist",
    description: "Clean lines and contemporary style",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 32,
  },
]

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 })

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-emerald-600" />
                <span className="text-2xl font-serif font-bold text-stone-800">Lumina</span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/rings" className="text-stone-600 hover:text-emerald-600 transition-colors">
                  Rings
                </Link>
                <Link href="/necklaces" className="text-stone-600 hover:text-emerald-600 transition-colors">
                  Necklaces
                </Link>
                <Link href="/earrings" className="text-stone-600 hover:text-emerald-600 transition-colors">
                  Earrings
                </Link>
                <Link href="/bracelets" className="text-stone-600 hover:text-emerald-600 transition-colors">
                  Bracelets
                </Link>
                <Link href="/custom" className="text-emerald-600 font-medium">
                  Create Your Own
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Search className="h-5 w-5 text-stone-400" />
                <Input placeholder="Search jewelry..." className="w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4">
            <Timer className="h-4 w-4" />
            <span className="text-sm font-medium">Valentine's Special: 25% Off All Rings</span>
            <div className="flex items-center space-x-2 text-xs">
              <span>Ends in:</span>
              <span className="font-mono bg-white/20 px-2 py-1 rounded">
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-100 to-stone-200 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-stone-800 leading-tight">
                Craft Your
                <span className="text-emerald-600 block">Perfect Moment</span>
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed">
                Design custom jewelry that tells your unique story. From engagement rings to everyday elegance, create
                pieces as individual as you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Start Customizing
                </Button>
                <Button size="lg" variant="outline">
                  Explore Collections
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Elegant jewelry collection"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">AR Try-On</p>
                    <p className="text-sm text-stone-600">See how it looks on you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Featured Pieces</h2>
            <p className="text-xl text-stone-600">Handcrafted with love, designed to last forever</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500">
                        Save ${product.originalPrice - product.price}
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold text-lg text-stone-800">{product.name}</h3>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-stone-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-stone-600">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-stone-800">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-lg text-stone-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-stone-600">
                          <span>{product.gemstone}</span>
                          <span>•</span>
                          <span>{product.metal}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Customize</Button>
                      <Button variant="outline" className="flex-1">
                        Quick Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Seasonal Collections</h2>
            <p className="text-xl text-stone-600">Curated pieces for every season and celebration</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-serif font-bold">{collection.name}</h3>
                      <p className="text-sm opacity-90">{collection.itemCount} pieces</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-stone-600 mb-4">{collection.description}</p>
                    <Button variant="outline" className="w-full">
                      Explore Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800">Custom Design</h3>
              <p className="text-stone-600">Create unique pieces with our intuitive design tool and expert guidance</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800">AR Try-On</h3>
              <p className="text-stone-600">
                See how jewelry looks on you with our advanced augmented reality technology
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800">Lifetime Warranty</h3>
              <p className="text-stone-600">
                Every piece comes with our comprehensive lifetime warranty and free maintenance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-serif font-bold">Lumina</span>
              </div>
              <p className="text-stone-300">Crafting moments that last forever with exquisite, personalized jewelry.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Shop</h4>
              <div className="space-y-2 text-stone-300">
                <Link href="/rings" className="block hover:text-white transition-colors">
                  Rings
                </Link>
                <Link href="/necklaces" className="block hover:text-white transition-colors">
                  Necklaces
                </Link>
                <Link href="/earrings" className="block hover:text-white transition-colors">
                  Earrings
                </Link>
                <Link href="/bracelets" className="block hover:text-white transition-colors">
                  Bracelets
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-stone-300">
                <Link href="/contact" className="block hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link href="/sizing" className="block hover:text-white transition-colors">
                  Size Guide
                </Link>
                <Link href="/care" className="block hover:text-white transition-colors">
                  Care Instructions
                </Link>
                <Link href="/warranty" className="block hover:text-white transition-colors">
                  Warranty
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Learn</h4>
              <div className="space-y-2 text-stone-300">
                <Link href="/gemstone-guide" className="block hover:text-white transition-colors">
                  Gemstone Guide
                </Link>
                <Link href="/buying-guide" className="block hover:text-white transition-colors">
                  Buying Guide
                </Link>
                <Link href="/blog" className="block hover:text-white transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="block hover:text-white transition-colors">
                  About Us
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
            <p>&copy; 2024 Lumina Jewelry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

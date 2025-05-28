"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Filter, Grid, List, Star, Sparkles, ArrowUpDown, ShoppingBag, User, Search } from "lucide-react"

const earrings = [
  {
    id: 1,
    name: "Diamond Stud Earrings",
    price: 1899,
    originalPrice: 2299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    gemstone: "diamond",
    metal: "gold",
    style: "stud",
    size: "6mm",
    customizable: true,
    inStock: true,
    bestseller: true,
  },
  {
    id: 2,
    name: "Emerald Drop Earrings",
    price: 2499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 156,
    gemstone: "emerald",
    metal: "white-gold",
    style: "drop",
    size: "15mm",
    customizable: true,
    inStock: true,
    newArrival: true,
  },
  {
    id: 3,
    name: "Pearl Button Earrings",
    price: 599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 89,
    gemstone: "pearl",
    metal: "silver",
    style: "button",
    size: "8mm",
    customizable: false,
    inStock: true,
    bestseller: true,
  },
  {
    id: 4,
    name: "Ruby Chandelier Earrings",
    price: 3299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 124,
    gemstone: "ruby",
    metal: "gold",
    style: "chandelier",
    size: "35mm",
    customizable: true,
    inStock: false,
  },
  {
    id: 5,
    name: "Sapphire Hoop Earrings",
    price: 1799,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 178,
    gemstone: "sapphire",
    metal: "rose-gold",
    style: "hoop",
    size: "25mm",
    customizable: true,
    inStock: true,
  },
  {
    id: 6,
    name: "Diamond Huggie Earrings",
    price: 1299,
    originalPrice: 1599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 145,
    gemstone: "diamond",
    metal: "white-gold",
    style: "huggie",
    size: "12mm",
    customizable: true,
    inStock: true,
    newArrival: true,
  },
  {
    id: 7,
    name: "Vintage Clip-On Earrings",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 67,
    gemstone: "none",
    metal: "gold",
    style: "clip-on",
    size: "20mm",
    customizable: false,
    inStock: true,
  },
  {
    id: 8,
    name: "Multi-Gemstone Ear Climbers",
    price: 2199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 92,
    gemstone: "mixed",
    metal: "platinum",
    style: "climber",
    size: "30mm",
    customizable: true,
    inStock: true,
    newArrival: true,
  },
]

const gemstoneOptions = [
  { value: "diamond", label: "Diamond", color: "bg-gray-100" },
  { value: "emerald", label: "Emerald", color: "bg-emerald-200" },
  { value: "ruby", label: "Ruby", color: "bg-red-200" },
  { value: "sapphire", label: "Sapphire", color: "bg-blue-200" },
  { value: "pearl", label: "Pearl", color: "bg-gray-50" },
  { value: "mixed", label: "Mixed Gemstones", color: "bg-purple-200" },
  { value: "none", label: "No Gemstone", color: "bg-stone-200" },
]

const metalOptions = [
  { value: "gold", label: "18K Gold", color: "bg-yellow-200" },
  { value: "white-gold", label: "White Gold", color: "bg-gray-200" },
  { value: "rose-gold", label: "Rose Gold", color: "bg-pink-200" },
  { value: "platinum", label: "Platinum", color: "bg-gray-300" },
  { value: "silver", label: "Sterling Silver", color: "bg-gray-100" },
]

const styleOptions = [
  { value: "stud", label: "Stud" },
  { value: "drop", label: "Drop" },
  { value: "button", label: "Button" },
  { value: "chandelier", label: "Chandelier" },
  { value: "hoop", label: "Hoop" },
  { value: "huggie", label: "Huggie" },
  { value: "clip-on", label: "Clip-On" },
  { value: "climber", label: "Ear Climber" },
]

const sizeOptions = [
  { value: "small", label: "Small (4-8mm)" },
  { value: "medium", label: "Medium (10-20mm)" },
  { value: "large", label: "Large (25-35mm)" },
]

export default function EarringsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 4000])
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([])
  const [selectedMetals, setSelectedMetals] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyCustomizable, setShowOnlyCustomizable] = useState(false)

  const filteredEarrings = earrings.filter((earring) => {
    const matchesSearch = earring.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = earring.price >= priceRange[0] && earring.price <= priceRange[1]
    const matchesGemstone = selectedGemstones.length === 0 || selectedGemstones.includes(earring.gemstone)
    const matchesMetal = selectedMetals.length === 0 || selectedMetals.includes(earring.metal)
    const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(earring.style)
    const matchesSize =
      selectedSizes.length === 0 ||
      selectedSizes.some((size) => {
        const earringSize = Number.parseInt(earring.size)
        switch (size) {
          case "small":
            return earringSize <= 8
          case "medium":
            return earringSize >= 10 && earringSize <= 20
          case "large":
            return earringSize >= 25
          default:
            return true
        }
      })
    const matchesStock = !showOnlyInStock || earring.inStock
    const matchesCustomizable = !showOnlyCustomizable || earring.customizable

    return (
      matchesSearch &&
      matchesPrice &&
      matchesGemstone &&
      matchesMetal &&
      matchesStyle &&
      matchesSize &&
      matchesStock &&
      matchesCustomizable
    )
  })

  const sortedEarrings = [...filteredEarrings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleFilterChange = (type: string, value: string, checked: boolean) => {
    const setters = {
      gemstone: setSelectedGemstones,
      metal: setSelectedMetals,
      style: setSelectedStyles,
      size: setSelectedSizes,
    }

    const getters = {
      gemstone: selectedGemstones,
      metal: selectedMetals,
      style: selectedStyles,
      size: selectedSizes,
    }

    const setter = setters[type as keyof typeof setters]
    const current = getters[type as keyof typeof getters]

    if (checked) {
      setter([...current, value])
    } else {
      setter(current.filter((item) => item !== value))
    }
  }

  const clearAllFilters = () => {
    setSelectedGemstones([])
    setSelectedMetals([])
    setSelectedStyles([])
    setSelectedSizes([])
    setPriceRange([0, 4000])
    setSearchQuery("")
    setShowOnlyInStock(false)
    setShowOnlyCustomizable(false)
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
              <Link href="/rings" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Rings
              </Link>
              <Link href="/necklaces" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Necklaces
              </Link>
              <Link href="/earrings" className="text-emerald-600 font-medium border-b-2 border-emerald-600">
                Earrings
              </Link>
              <Link href="/bracelets" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Bracelets
              </Link>
              <Link href="/customize" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Create Your Own
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Search className="h-5 w-5 text-stone-400" />
                <Input placeholder="Search earrings..." className="w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/account">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">Stunning Earrings</h1>
          <p className="text-xl opacity-90 mb-8">
            Frame your face with elegance - from delicate studs to statement chandeliers
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="text-purple-700 border-white bg-white hover:bg-stone-100" asChild>
              <Link href="/customize">Design Your Earrings</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700" asChild>
              <Link href="/ar-tryOn">Try AR</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-stone-600 mb-8">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-stone-800">Earrings</span>
        </nav>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 space-y-6 sticky top-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-stone-600" />
                  <h3 className="font-semibold text-lg">Filters</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <Label>Search</Label>
                <Input
                  placeholder="Search earrings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <Label>Price Range</Label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={4000} step={100} className="w-full" />
                <div className="flex justify-between text-sm text-stone-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Gemstones */}
              <div className="space-y-3">
                <Label>Gemstones</Label>
                {gemstoneOptions.map((gemstone) => (
                  <div key={gemstone.value} className="flex items-center space-x-3">
                    <Checkbox
                      id={gemstone.value}
                      checked={selectedGemstones.includes(gemstone.value)}
                      onCheckedChange={(checked) => handleFilterChange("gemstone", gemstone.value, checked as boolean)}
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${gemstone.color}`} />
                      <Label htmlFor={gemstone.value} className="text-sm">
                        {gemstone.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metals */}
              <div className="space-y-3">
                <Label>Metal Type</Label>
                {metalOptions.map((metal) => (
                  <div key={metal.value} className="flex items-center space-x-3">
                    <Checkbox
                      id={metal.value}
                      checked={selectedMetals.includes(metal.value)}
                      onCheckedChange={(checked) => handleFilterChange("metal", metal.value, checked as boolean)}
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${metal.color}`} />
                      <Label htmlFor={metal.value} className="text-sm">
                        {metal.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Styles */}
              <div className="space-y-3">
                <Label>Earring Style</Label>
                {styleOptions.map((style) => (
                  <div key={style.value} className="flex items-center space-x-3">
                    <Checkbox
                      id={style.value}
                      checked={selectedStyles.includes(style.value)}
                      onCheckedChange={(checked) => handleFilterChange("style", style.value, checked as boolean)}
                    />
                    <Label htmlFor={style.value} className="text-sm">
                      {style.label}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Sizes */}
              <div className="space-y-3">
                <Label>Size</Label>
                {sizeOptions.map((size) => (
                  <div key={size.value} className="flex items-center space-x-3">
                    <Checkbox
                      id={size.value}
                      checked={selectedSizes.includes(size.value)}
                      onCheckedChange={(checked) => handleFilterChange("size", size.value, checked as boolean)}
                    />
                    <Label htmlFor={size.value} className="text-sm">
                      {size.label}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Additional Filters */}
              <div className="space-y-3">
                <Label>Additional Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={showOnlyInStock}
                    onCheckedChange={(checked) => setShowOnlyInStock(checked as boolean)}
                  />
                  <Label htmlFor="inStock" className="text-sm">
                    In Stock Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="customizable"
                    checked={showOnlyCustomizable}
                    onCheckedChange={(checked) => setShowOnlyCustomizable(checked as boolean)}
                  />
                  <Label htmlFor="customizable" className="text-sm">
                    Customizable Only
                  </Label>
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-stone-600">{sortedEarrings.length} earrings found</span>
              </div>

              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>Sort by</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>Highest Rated</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("name")}>Name A-Z</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center space-x-2">
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
            </div>

            {/* Products */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedEarrings.map((earring) => (
                <Card
                  key={earring.id}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Link href={`/product/${earring.id}`}>
                            <Image
                              src={earring.image || "/placeholder.svg"}
                              alt={earring.name}
                              width={300}
                              height={300}
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col space-y-1">
                            {earring.originalPrice && (
                              <Badge className="bg-red-500">Save ${earring.originalPrice - earring.price}</Badge>
                            )}
                            {earring.bestseller && <Badge className="bg-emerald-600">Bestseller</Badge>}
                            {earring.newArrival && <Badge className="bg-blue-600">New</Badge>}
                            {!earring.inStock && <Badge className="bg-gray-500">Out of Stock</Badge>}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="p-6 space-y-3">
                          <Link href={`/product/${earring.id}`}>
                            <h3 className="font-semibold text-lg text-stone-800 hover:text-emerald-600 transition-colors">
                              {earring.name}
                            </h3>
                          </Link>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(earring.rating) ? "text-yellow-400 fill-current" : "text-stone-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-stone-600">({earring.reviews})</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-stone-800">${earring.price}</span>
                            {earring.originalPrice && (
                              <span className="text-lg text-stone-400 line-through">${earring.originalPrice}</span>
                            )}
                          </div>

                          <p className="text-sm text-stone-600">{earring.size}</p>

                          <div className="flex space-x-2 pt-2">
                            {earring.customizable && (
                              <Button
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                disabled={!earring.inStock}
                                asChild
                              >
                                <Link href="/customize">Customize</Link>
                              </Button>
                            )}
                            <Button variant="outline" className="flex-1" disabled={!earring.inStock}>
                              {earring.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center space-x-6 p-6">
                        <Link href={`/product/${earring.id}`}>
                          <Image
                            src={earring.image || "/placeholder.svg"}
                            alt={earring.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                          />
                        </Link>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link href={`/product/${earring.id}`}>
                                <h3 className="font-semibold text-xl text-stone-800 hover:text-emerald-600 transition-colors">
                                  {earring.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-stone-600">{earring.size}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(earring.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-stone-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-stone-600">({earring.reviews})</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {earring.bestseller && <Badge className="bg-emerald-600">Bestseller</Badge>}
                              {earring.newArrival && <Badge className="bg-blue-600">New</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-stone-800">${earring.price}</span>
                            {earring.originalPrice && (
                              <span className="text-lg text-stone-400 line-through">${earring.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {earring.customizable && (
                            <Button className="bg-emerald-600 hover:bg-emerald-700" disabled={!earring.inStock} asChild>
                              <Link href="/customize">Customize</Link>
                            </Button>
                          )}
                          <Button variant="outline" disabled={!earring.inStock}>
                            {earring.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedEarrings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-stone-600 mb-4">No earrings found matching your criteria</p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

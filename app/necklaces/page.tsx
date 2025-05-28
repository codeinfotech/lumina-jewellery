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

const necklaces = [
  {
    id: 1,
    name: "Ruby Heart Pendant",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    gemstone: "ruby",
    metal: "white-gold",
    style: "pendant",
    length: "18-inch",
    customizable: true,
    inStock: true,
    bestseller: true,
  },
  {
    id: 2,
    name: "Diamond Tennis Necklace",
    price: 3999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 156,
    gemstone: "diamond",
    metal: "white-gold",
    style: "tennis",
    length: "16-inch",
    customizable: true,
    inStock: true,
    newArrival: true,
  },
  {
    id: 3,
    name: "Emerald Station Necklace",
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 124,
    gemstone: "emerald",
    metal: "gold",
    style: "station",
    length: "20-inch",
    customizable: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Pearl Strand Necklace",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 203,
    gemstone: "pearl",
    metal: "gold",
    style: "strand",
    length: "18-inch",
    customizable: false,
    inStock: true,
    bestseller: true,
  },
  {
    id: 5,
    name: "Sapphire Bar Necklace",
    price: 1599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 92,
    gemstone: "sapphire",
    metal: "rose-gold",
    style: "bar",
    length: "16-inch",
    customizable: true,
    inStock: false,
  },
  {
    id: 6,
    name: "Diamond Cross Pendant",
    price: 2299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 178,
    gemstone: "diamond",
    metal: "platinum",
    style: "cross",
    length: "18-inch",
    customizable: true,
    inStock: true,
  },
  {
    id: 7,
    name: "Vintage Locket Necklace",
    price: 699,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 65,
    gemstone: "none",
    metal: "silver",
    style: "locket",
    length: "20-inch",
    customizable: false,
    inStock: true,
    newArrival: true,
  },
  {
    id: 8,
    name: "Multi-Strand Chain Necklace",
    price: 1199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 134,
    gemstone: "none",
    metal: "gold",
    style: "chain",
    length: "adjustable",
    customizable: true,
    inStock: true,
  },
]

const gemstoneOptions = [
  { value: "diamond", label: "Diamond", color: "bg-gray-100" },
  { value: "emerald", label: "Emerald", color: "bg-emerald-200" },
  { value: "ruby", label: "Ruby", color: "bg-red-200" },
  { value: "sapphire", label: "Sapphire", color: "bg-blue-200" },
  { value: "pearl", label: "Pearl", color: "bg-gray-50" },
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
  { value: "pendant", label: "Pendant" },
  { value: "tennis", label: "Tennis" },
  { value: "station", label: "Station" },
  { value: "strand", label: "Strand" },
  { value: "bar", label: "Bar" },
  { value: "cross", label: "Cross" },
  { value: "locket", label: "Locket" },
  { value: "chain", label: "Chain" },
]

const lengthOptions = [
  { value: "14-inch", label: '14" Choker' },
  { value: "16-inch", label: '16" Short' },
  { value: "18-inch", label: '18" Standard' },
  { value: "20-inch", label: '20" Long' },
  { value: "24-inch", label: '24" Extra Long' },
  { value: "adjustable", label: "Adjustable" },
]

export default function NecklacesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([])
  const [selectedMetals, setSelectedMetals] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedLengths, setSelectedLengths] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyCustomizable, setShowOnlyCustomizable] = useState(false)

  const filteredNecklaces = necklaces.filter((necklace) => {
    const matchesSearch = necklace.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = necklace.price >= priceRange[0] && necklace.price <= priceRange[1]
    const matchesGemstone = selectedGemstones.length === 0 || selectedGemstones.includes(necklace.gemstone)
    const matchesMetal = selectedMetals.length === 0 || selectedMetals.includes(necklace.metal)
    const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(necklace.style)
    const matchesLength = selectedLengths.length === 0 || selectedLengths.includes(necklace.length)
    const matchesStock = !showOnlyInStock || necklace.inStock
    const matchesCustomizable = !showOnlyCustomizable || necklace.customizable

    return (
      matchesSearch &&
      matchesPrice &&
      matchesGemstone &&
      matchesMetal &&
      matchesStyle &&
      matchesLength &&
      matchesStock &&
      matchesCustomizable
    )
  })

  const sortedNecklaces = [...filteredNecklaces].sort((a, b) => {
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
      length: setSelectedLengths,
    }

    const getters = {
      gemstone: selectedGemstones,
      metal: selectedMetals,
      style: selectedStyles,
      length: selectedLengths,
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
    setSelectedLengths([])
    setPriceRange([0, 5000])
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
              <Link href="/necklaces" className="text-emerald-600 font-medium border-b-2 border-emerald-600">
                Necklaces
              </Link>
              <Link href="/earrings" className="text-stone-600 hover:text-emerald-600 transition-colors">
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
                <Input placeholder="Search necklaces..." className="w-64" />
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
      <section className="bg-gradient-to-r from-rose-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">Elegant Necklaces</h1>
          <p className="text-xl opacity-90 mb-8">
            Graceful pieces that complement your neckline and enhance your natural beauty
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="text-rose-700 border-white bg-white hover:bg-stone-100" asChild>
              <Link href="/customize">Design Your Necklace</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-rose-700" asChild>
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
          <span className="text-stone-800">Necklaces</span>
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
                  placeholder="Search necklaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <Label>Price Range</Label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="w-full" />
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
                <Label>Necklace Style</Label>
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

              {/* Lengths */}
              <div className="space-y-3">
                <Label>Length</Label>
                {lengthOptions.map((length) => (
                  <div key={length.value} className="flex items-center space-x-3">
                    <Checkbox
                      id={length.value}
                      checked={selectedLengths.includes(length.value)}
                      onCheckedChange={(checked) => handleFilterChange("length", length.value, checked as boolean)}
                    />
                    <Label htmlFor={length.value} className="text-sm">
                      {length.label}
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
                <span className="text-stone-600">{sortedNecklaces.length} necklaces found</span>
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
              {sortedNecklaces.map((necklace) => (
                <Card
                  key={necklace.id}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Link href={`/product/${necklace.id}`}>
                            <Image
                              src={necklace.image || "/placeholder.svg"}
                              alt={necklace.name}
                              width={300}
                              height={300}
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col space-y-1">
                            {necklace.originalPrice && (
                              <Badge className="bg-red-500">Save ${necklace.originalPrice - necklace.price}</Badge>
                            )}
                            {necklace.bestseller && <Badge className="bg-emerald-600">Bestseller</Badge>}
                            {necklace.newArrival && <Badge className="bg-blue-600">New</Badge>}
                            {!necklace.inStock && <Badge className="bg-gray-500">Out of Stock</Badge>}
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
                          <Link href={`/product/${necklace.id}`}>
                            <h3 className="font-semibold text-lg text-stone-800 hover:text-emerald-600 transition-colors">
                              {necklace.name}
                            </h3>
                          </Link>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(necklace.rating) ? "text-yellow-400 fill-current" : "text-stone-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-stone-600">({necklace.reviews})</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-stone-800">${necklace.price}</span>
                            {necklace.originalPrice && (
                              <span className="text-lg text-stone-400 line-through">${necklace.originalPrice}</span>
                            )}
                          </div>

                          <p className="text-sm text-stone-600">{necklace.length}</p>

                          <div className="flex space-x-2 pt-2">
                            {necklace.customizable && (
                              <Button
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                disabled={!necklace.inStock}
                                asChild
                              >
                                <Link href="/customize">Customize</Link>
                              </Button>
                            )}
                            <Button variant="outline" className="flex-1" disabled={!necklace.inStock}>
                              {necklace.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center space-x-6 p-6">
                        <Link href={`/product/${necklace.id}`}>
                          <Image
                            src={necklace.image || "/placeholder.svg"}
                            alt={necklace.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                          />
                        </Link>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link href={`/product/${necklace.id}`}>
                                <h3 className="font-semibold text-xl text-stone-800 hover:text-emerald-600 transition-colors">
                                  {necklace.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-stone-600">{necklace.length}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(necklace.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-stone-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-stone-600">({necklace.reviews})</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {necklace.bestseller && <Badge className="bg-emerald-600">Bestseller</Badge>}
                              {necklace.newArrival && <Badge className="bg-blue-600">New</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-stone-800">${necklace.price}</span>
                            {necklace.originalPrice && (
                              <span className="text-lg text-stone-400 line-through">${necklace.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {necklace.customizable && (
                            <Button
                              className="bg-emerald-600 hover:bg-emerald-700"
                              disabled={!necklace.inStock}
                              asChild
                            >
                              <Link href="/customize">Customize</Link>
                            </Button>
                          )}
                          <Button variant="outline" disabled={!necklace.inStock}>
                            {necklace.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedNecklaces.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-stone-600 mb-4">No necklaces found matching your criteria</p>
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

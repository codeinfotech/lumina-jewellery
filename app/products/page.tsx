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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Filter, Grid, List, Star, Sparkles, ArrowUpDown } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Emerald Solitaire Ring",
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "rings",
    gemstone: "emerald",
    metal: "gold",
    customizable: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Ruby Heart Pendant",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    category: "necklaces",
    gemstone: "ruby",
    metal: "white-gold",
    customizable: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Sapphire Tennis Bracelet",
    price: 3999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    category: "bracelets",
    gemstone: "sapphire",
    metal: "platinum",
    customizable: true,
    inStock: false,
  },
  {
    id: 4,
    name: "Diamond Stud Earrings",
    price: 1899,
    originalPrice: 2299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    category: "earrings",
    gemstone: "diamond",
    metal: "gold",
    customizable: true,
    inStock: true,
  },
  {
    id: 5,
    name: "Pearl Drop Earrings",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 78,
    category: "earrings",
    gemstone: "pearl",
    metal: "silver",
    customizable: false,
    inStock: true,
  },
  {
    id: 6,
    name: "Vintage Rose Gold Band",
    price: 1599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 92,
    category: "rings",
    gemstone: "none",
    metal: "rose-gold",
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
]

const metalOptions = [
  { value: "gold", label: "18K Gold", color: "bg-yellow-200" },
  { value: "white-gold", label: "White Gold", color: "bg-gray-200" },
  { value: "rose-gold", label: "Rose Gold", color: "bg-pink-200" },
  { value: "platinum", label: "Platinum", color: "bg-gray-300" },
  { value: "silver", label: "Sterling Silver", color: "bg-gray-100" },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([])
  const [selectedMetals, setSelectedMetals] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesGemstone = selectedGemstones.length === 0 || selectedGemstones.includes(product.gemstone)
    const matchesMetal = selectedMetals.length === 0 || selectedMetals.includes(product.metal)

    return matchesSearch && matchesCategory && matchesPrice && matchesGemstone && matchesMetal
  })

  const handleGemstoneChange = (gemstone: string, checked: boolean) => {
    if (checked) {
      setSelectedGemstones([...selectedGemstones, gemstone])
    } else {
      setSelectedGemstones(selectedGemstones.filter((g) => g !== gemstone))
    }
  }

  const handleMetalChange = (metal: string, checked: boolean) => {
    if (checked) {
      setSelectedMetals([...selectedMetals, metal])
    } else {
      setSelectedMetals(selectedMetals.filter((m) => m !== metal))
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
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 space-y-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-stone-600" />
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <Label>Search</Label>
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="rings">Rings</SelectItem>
                    <SelectItem value="necklaces">Necklaces</SelectItem>
                    <SelectItem value="earrings">Earrings</SelectItem>
                    <SelectItem value="bracelets">Bracelets</SelectItem>
                  </SelectContent>
                </Select>
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
                      onCheckedChange={(checked) => handleGemstoneChange(gemstone.value, checked as boolean)}
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
                      onCheckedChange={(checked) => handleMetalChange(metal.value, checked as boolean)}
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

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedGemstones([])
                  setSelectedMetals([])
                  setPriceRange([0, 5000])
                  setSelectedCategory("all")
                  setSearchQuery("")
                }}
              >
                Clear All Filters
              </Button>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-stone-600">{filteredProducts.length} products found</span>
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
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
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
                          {!product.inStock && (
                            <Badge className="absolute top-3 left-3 bg-gray-500">Out of Stock</Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                          >
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

                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-stone-800">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-lg text-stone-400 line-through">${product.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex space-x-2 pt-2">
                            {product.customizable && (
                              <Button
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                disabled={!product.inStock}
                              >
                                Customize
                              </Button>
                            )}
                            <Button variant="outline" className="flex-1" disabled={!product.inStock}>
                              {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center space-x-6 p-6">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-xl text-stone-800">{product.name}</h3>
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
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-stone-800">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-lg text-stone-400 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {product.customizable && (
                            <Button className="bg-emerald-600 hover:bg-emerald-700" disabled={!product.inStock}>
                              Customize
                            </Button>
                          )}
                          <Button variant="outline" disabled={!product.inStock}>
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

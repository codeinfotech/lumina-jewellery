"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Sparkles, RotateCcw, Share, Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

const gemstoneOptions = [
  {
    id: "diamond",
    name: "Diamond",
    price: 2000,
    image: "/placeholder.svg?height=80&width=80",
    description: "Classic brilliance and fire",
  },
  {
    id: "emerald",
    name: "Emerald",
    price: 1500,
    image: "/placeholder.svg?height=80&width=80",
    description: "Rich green luxury",
  },
  {
    id: "ruby",
    name: "Ruby",
    price: 1800,
    image: "/placeholder.svg?height=80&width=80",
    description: "Passionate red beauty",
  },
  {
    id: "sapphire",
    name: "Sapphire",
    price: 1600,
    image: "/placeholder.svg?height=80&width=80",
    description: "Royal blue elegance",
  },
]

const metalOptions = [
  {
    id: "gold",
    name: "18K Yellow Gold",
    price: 300,
    color: "bg-yellow-200",
    description: "Warm and traditional",
  },
  {
    id: "white-gold",
    name: "18K White Gold",
    price: 350,
    color: "bg-gray-200",
    description: "Modern and sleek",
  },
  {
    id: "rose-gold",
    name: "18K Rose Gold",
    price: 325,
    color: "bg-pink-200",
    description: "Romantic and trendy",
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 500,
    color: "bg-gray-300",
    description: "Premium and durable",
  },
]

const settingOptions = [
  {
    id: "solitaire",
    name: "Solitaire",
    price: 200,
    image: "/placeholder.svg?height=80&width=80",
    description: "Classic single stone",
  },
  {
    id: "halo",
    name: "Halo",
    price: 400,
    image: "/placeholder.svg?height=80&width=80",
    description: "Surrounded by smaller stones",
  },
  {
    id: "vintage",
    name: "Vintage",
    price: 350,
    image: "/placeholder.svg?height=80&width=80",
    description: "Intricate vintage design",
  },
  {
    id: "modern",
    name: "Modern",
    price: 300,
    image: "/placeholder.svg?height=80&width=80",
    description: "Contemporary styling",
  },
]

export default function CustomizePage() {
  const [selectedGemstone, setSelectedGemstone] = useState("diamond")
  const [selectedMetal, setSelectedMetal] = useState("gold")
  const [selectedSetting, setSelectedSetting] = useState("solitaire")
  const [caratSize, setCaratSize] = useState([1.0])
  const [engraving, setEngraving] = useState("")

  const calculatePrice = () => {
    const gemstone = gemstoneOptions.find((g) => g.id === selectedGemstone)
    const metal = metalOptions.find((m) => m.id === selectedMetal)
    const setting = settingOptions.find((s) => s.id === selectedSetting)

    const basePrice = (gemstone?.price || 0) + (metal?.price || 0) + (setting?.price || 0)
    const caratMultiplier = caratSize[0]

    return Math.round(basePrice * caratMultiplier)
  }

  const selectedGemstoneData = gemstoneOptions.find((g) => g.id === selectedGemstone)
  const selectedMetalData = metalOptions.find((m) => m.id === selectedMetal)
  const selectedSettingData = settingOptions.find((s) => s.id === selectedSetting)

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
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-serif font-bold text-stone-800">Live Preview</h2>

                {/* 3D Preview Placeholder */}
                <div className="relative bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Custom ring preview"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Button variant="outline" size="icon">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* AR Try-On Button */}
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Try On with AR
                </Button>

                {/* Specifications */}
                <div className="bg-stone-50 rounded-lg p-6 space-y-3 text-left">
                  <h3 className="font-semibold text-lg text-stone-800">Your Design</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Gemstone:</span>
                      <span className="font-medium">
                        {selectedGemstoneData?.name} ({caratSize[0]} ct)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Metal:</span>
                      <span className="font-medium">{selectedMetalData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Setting:</span>
                      <span className="font-medium">{selectedSettingData?.name}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-3">
                      <span className="text-stone-800 font-semibold">Total Price:</span>
                      <span className="text-2xl font-bold text-emerald-600">${calculatePrice()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Create Your Ring</h1>
              <p className="text-xl text-stone-600">Design a piece as unique as your love story</p>
            </div>

            {/* Gemstone Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>1. Choose Your Gemstone</span>
                  <Badge variant="outline">Required</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedGemstone} onValueChange={setSelectedGemstone}>
                  <div className="grid grid-cols-2 gap-4">
                    {gemstoneOptions.map((gemstone) => (
                      <div key={gemstone.id} className="relative">
                        <RadioGroupItem value={gemstone.id} id={gemstone.id} className="peer sr-only" />
                        <Label
                          htmlFor={gemstone.id}
                          className="flex flex-col items-center space-y-3 p-4 border-2 rounded-lg cursor-pointer hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 transition-all"
                        >
                          <Image
                            src={gemstone.image || "/placeholder.svg"}
                            alt={gemstone.name}
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                          <div className="text-center">
                            <p className="font-semibold text-stone-800">{gemstone.name}</p>
                            <p className="text-sm text-stone-600">{gemstone.description}</p>
                            <p className="text-sm font-medium text-emerald-600">+${gemstone.price}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Carat Size */}
                <div className="mt-6 space-y-4">
                  <Label className="text-base font-medium">Carat Size: {caratSize[0]} ct</Label>
                  <Slider
                    value={caratSize}
                    onValueChange={setCaratSize}
                    max={3}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>0.5 ct</span>
                    <span>3.0 ct</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metal Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>2. Choose Your Metal</span>
                  <Badge variant="outline">Required</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedMetal} onValueChange={setSelectedMetal}>
                  <div className="space-y-3">
                    {metalOptions.map((metal) => (
                      <div key={metal.id} className="relative">
                        <RadioGroupItem value={metal.id} id={metal.id} className="peer sr-only" />
                        <Label
                          htmlFor={metal.id}
                          className="flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 transition-all"
                        >
                          <div className={`w-8 h-8 rounded-full ${metal.color}`} />
                          <div className="flex-1">
                            <p className="font-semibold text-stone-800">{metal.name}</p>
                            <p className="text-sm text-stone-600">{metal.description}</p>
                          </div>
                          <p className="text-sm font-medium text-emerald-600">+${metal.price}</p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Setting Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>3. Choose Your Setting</span>
                  <Badge variant="outline">Required</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedSetting} onValueChange={setSelectedSetting}>
                  <div className="grid grid-cols-2 gap-4">
                    {settingOptions.map((setting) => (
                      <div key={setting.id} className="relative">
                        <RadioGroupItem value={setting.id} id={setting.id} className="peer sr-only" />
                        <Label
                          htmlFor={setting.id}
                          className="flex flex-col items-center space-y-3 p-4 border-2 rounded-lg cursor-pointer hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 transition-all"
                        >
                          <Image
                            src={setting.image || "/placeholder.svg"}
                            alt={setting.name}
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                          <div className="text-center">
                            <p className="font-semibold text-stone-800">{setting.name}</p>
                            <p className="text-sm text-stone-600">{setting.description}</p>
                            <p className="text-sm font-medium text-emerald-600">+${setting.price}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Engraving */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>4. Add Engraving</span>
                  <Badge variant="secondary">Optional</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="engraving">Personal Message (up to 20 characters)</Label>
                  <input
                    id="engraving"
                    type="text"
                    maxLength={20}
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder="Enter your message..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <p className="text-sm text-stone-600">{engraving.length}/20 characters</p>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-serif font-bold text-stone-800">Your Custom Ring</h3>
                  <div className="text-3xl font-bold text-emerald-600">${calculatePrice()}</div>
                  <p className="text-sm text-stone-600">Free shipping • 30-day returns • Lifetime warranty</p>
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Continue to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

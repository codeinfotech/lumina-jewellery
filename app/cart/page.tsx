"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Minus, Plus, Trash2, Heart, ShoppingBag, Truck, Shield, ArrowLeft, Gift } from "lucide-react"

const cartItems = [
  {
    id: 1,
    name: "Emerald Solitaire Ring",
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?height=120&width=120",
    quantity: 1,
    size: "7",
    customizations: ["18K Gold", "1.5ct Emerald", "Solitaire Setting"],
    inStock: true,
  },
  {
    id: 2,
    name: "Ruby Heart Pendant",
    price: 1299,
    image: "/placeholder.svg?height=120&width=120",
    quantity: 1,
    customizations: ["White Gold", "1ct Ruby", "Heart Shape"],
    inStock: true,
  },
  {
    id: 3,
    name: "Diamond Stud Earrings",
    price: 1899,
    originalPrice: 2299,
    image: "/placeholder.svg?height=120&width=120",
    quantity: 1,
    customizations: ["18K Gold", "0.5ct each", "Round Cut"],
    inStock: false,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = items.reduce((sum, item) => {
    const itemSavings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0
    return sum + itemSavings
  }, 0)
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0
  const shipping = subtotal > 500 ? 0 : 25
  const tax = (subtotal - promoDiscount) * 0.08
  const total = subtotal - promoDiscount + shipping + tax

  if (items.length === 0) {
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
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <ShoppingBag className="h-24 w-24 text-stone-300 mx-auto" />
            <h1 className="text-3xl font-serif font-bold text-stone-800">Your Cart is Empty</h1>
            <p className="text-stone-600">Discover our beautiful collection of handcrafted jewelry</p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
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
                Products
              </Link>
              <Link href="/account" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Account
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-serif font-bold text-stone-800">Shopping Cart</h1>
              <span className="text-stone-600">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className={!item.inStock ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover"
                        />
                        {!item.inStock && <Badge className="absolute -top-2 -right-2 bg-red-500">Out of Stock</Badge>}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-stone-800">{item.name}</h3>
                          {item.size && <p className="text-sm text-stone-600">Size: {item.size}</p>}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.customizations.map((custom, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {custom}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-stone-800">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-stone-400 line-through">${item.originalPrice}</span>
                              )}
                            </div>
                            {item.originalPrice && (
                              <p className="text-sm text-green-600">You save ${item.originalPrice - item.price}</p>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={!item.inStock}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={!item.inStock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="icon">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {!item.inStock && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600">
                              This item is currently out of stock. Remove it to continue with your order.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo ({appliedPromo})</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={!!appliedPromo}
                    />
                    <Button variant="outline" onClick={applyPromoCode} disabled={!!appliedPromo || !promoCode}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && <p className="text-sm text-green-600">Promo code applied successfully!</p>}
                </div>

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                  disabled={items.some((item) => !item.inStock)}
                  asChild
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center space-y-1">
                    <Truck className="h-5 w-5 text-emerald-600 mx-auto" />
                    <p className="text-xs font-medium">Free Shipping</p>
                    <p className="text-xs text-stone-600">On orders $500+</p>
                  </div>
                  <div className="text-center space-y-1">
                    <Shield className="h-5 w-5 text-emerald-600 mx-auto" />
                    <p className="text-xs font-medium">Secure Checkout</p>
                    <p className="text-xs text-stone-600">SSL Protected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gift Options */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-sm">Gift Wrapping</p>
                    <p className="text-xs text-stone-600">Add elegant gift packaging</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Add
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

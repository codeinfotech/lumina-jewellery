"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CreditCard, Truck, Shield, Lock, ArrowLeft, Check } from "lucide-react"

const cartItems = [
  {
    id: 1,
    name: "Emerald Solitaire Ring",
    price: 2499,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
    size: "7",
    customizations: ["18K Gold", "1.5ct Emerald"],
  },
  {
    id: 2,
    name: "Ruby Heart Pendant",
    price: 1299,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
    customizations: ["White Gold", "1ct Ruby"],
  },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const [billingAddress, setBillingAddress] = useState("same")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [field]: value }))
    } else if (section === "card") {
      setCardInfo((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect to success page
      window.location.href = "/checkout/success"
    }, 3000)
  }

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return shippingInfo.firstName && shippingInfo.lastName && shippingInfo.email && shippingInfo.address
      case 2:
        return paymentMethod === "card" ? cardInfo.number && cardInfo.expiry && cardInfo.cvc : true
      default:
        return false
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
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-stone-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-emerald-600 text-white" : "bg-stone-200 text-stone-600"
              }`}
            >
              {step > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <div className={`w-16 h-1 ${step > 1 ? "bg-emerald-600" : "bg-stone-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-emerald-600 text-white" : "bg-stone-200 text-stone-600"
              }`}
            >
              {step > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <div className={`w-16 h-1 ${step > 2 ? "bg-emerald-600" : "bg-stone-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? "bg-emerald-600 text-white" : "bg-stone-200 text-stone-600"
              }`}
            >
              3
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Shipping Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange("shipping", "firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange("shipping", "lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange("shipping", "email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                    <Input
                      id="apartment"
                      value={shippingInfo.apartment}
                      onChange={(e) => handleInputChange("shipping", "apartment", e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={shippingInfo.state}
                        onValueChange={(value) => handleInputChange("shipping", "state", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setStep(2)}
                    disabled={!isStepComplete(1)}
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apple" id="apple" />
                      <Label htmlFor="apple">Apple Pay</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.number}
                          onChange={(e) => handleInputChange("card", "number", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry *</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) => handleInputChange("card", "expiry", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC *</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cardInfo.cvc}
                            onChange={(e) => handleInputChange("card", "cvc", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <Input
                            id="cardName"
                            value={cardInfo.name}
                            onChange={(e) => handleInputChange("card", "name", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="font-semibold">Billing Address</h3>
                    <RadioGroup value={billingAddress} onValueChange={setBillingAddress}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="same" id="same" />
                        <Label htmlFor="same">Same as shipping address</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="different" id="different" />
                        <Label htmlFor="different">Use a different billing address</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back to Shipping
                    </Button>
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setStep(3)}
                      disabled={!isStepComplete(2)}
                    >
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-stone-50 rounded-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          {item.size && <p className="text-sm text-stone-600">Size: {item.size}</p>}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.customizations.map((custom, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {custom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price}</p>
                          <p className="text-sm text-stone-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Payment Summary */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Shipping Address</h3>
                      <div className="text-stone-600 text-sm">
                        <p>
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p>{shippingInfo.address}</p>
                        {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                        <p>
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Payment Method</h3>
                      <div className="text-stone-600 text-sm">
                        {paymentMethod === "card" && <p>•••• •••• •••• {cardInfo.number.slice(-4)}</p>}
                        {paymentMethod === "paypal" && <p>PayPal</p>}
                        {paymentMethod === "apple" && <p>Apple Pay</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-emerald-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-emerald-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back to Payment
                    </Button>
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-stone-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${item.price}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
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
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-stone-600">SSL encrypted checkout</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-stone-600">On all orders over $500</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-sm">30-Day Returns</p>
                    <p className="text-xs text-stone-600">Hassle-free returns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

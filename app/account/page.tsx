"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sparkles,
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  Edit,
  Eye,
  Download,
} from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 2499,
    items: [
      {
        name: "Emerald Solitaire Ring",
        image: "/placeholder.svg?height=80&width=80",
        price: 2499,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Processing",
    total: 1299,
    items: [
      {
        name: "Ruby Heart Pendant",
        image: "/placeholder.svg?height=80&width=80",
        price: 1299,
        quantity: 1,
      },
    ],
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "Sapphire Tennis Bracelet",
    price: 3999,
    image: "/placeholder.svg?height=120&width=120",
    inStock: true,
  },
  {
    id: 2,
    name: "Diamond Stud Earrings",
    price: 1899,
    originalPrice: 2299,
    image: "/placeholder.svg?height=120&width=120",
    inStock: true,
  },
]

const addresses = [
  {
    id: 1,
    type: "Home",
    name: "Sarah Johnson",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    name: "Sarah Johnson",
    address: "456 Business Ave",
    city: "New York",
    state: "NY",
    zip: "10002",
    isDefault: false,
  },
]

export default function AccountPage() {
  const [user, setUser] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [isEditing, setIsEditing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
              <Link href="/products" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Products
              </Link>
              <Link href="/cart" className="text-stone-600 hover:text-emerald-600 transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4 mb-6">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-lg text-stone-800">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-stone-600">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-3" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-3" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-3" />
                    Addresses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-3" />
                    Payment Methods
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-3" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={user.firstName}
                          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={user.lastName}
                          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="border">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">Order {order.id}</h3>
                                <p className="text-stone-600">Placed on {order.date}</p>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                <p className="text-lg font-bold mt-1">${order.total}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-stone-600">Quantity: {item.quantity}</p>
                                    <p className="font-semibold">${item.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex space-x-3 mt-4 pt-4 border-t">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Invoice
                              </Button>
                              {order.status === "Delivered" && (
                                <Button variant="outline" size="sm">
                                  Write Review
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <Card key={item.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={120}
                                height={120}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1 space-y-2">
                                <h3 className="font-semibold">{item.name}</h3>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-bold">${item.price}</span>
                                  {item.originalPrice && (
                                    <span className="text-sm text-stone-400 line-through">${item.originalPrice}</span>
                                  )}
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                    Add to Cart
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Saved Addresses</CardTitle>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Add New Address</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <Card key={address.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-semibold">{address.type}</h3>
                                  {address.isDefault && <Badge variant="outline">Default</Badge>}
                                </div>
                                <p className="font-medium">{address.name}</p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-stone-600 space-y-1">
                              <p>{address.address}</p>
                              <p>
                                {address.city}, {address.state} {address.zip}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payments" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Payment Methods</CardTitle>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Add Payment Method</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                VISA
                              </div>
                              <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-stone-600">Expires 12/25</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">Default</Badge>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-stone-600">Get notified about your order status</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotional Emails</p>
                          <p className="text-sm text-stone-600">Receive offers and new product announcements</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-stone-600">Get text messages for important updates</p>
                        </div>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Enable Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Download Account Data
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

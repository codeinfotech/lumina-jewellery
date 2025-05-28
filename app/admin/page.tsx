"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Sparkles,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const products = [
  {
    id: 1,
    name: "Emerald Solitaire Ring",
    category: "Rings",
    price: 2499,
    stock: 15,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    sales: 124,
  },
  {
    id: 2,
    name: "Ruby Heart Pendant",
    category: "Necklaces",
    price: 1299,
    stock: 8,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    sales: 89,
  },
  {
    id: 3,
    name: "Sapphire Tennis Bracelet",
    category: "Bracelets",
    price: 3999,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=60&width=60",
    sales: 156,
  },
  {
    id: 4,
    name: "Diamond Stud Earrings",
    category: "Earrings",
    price: 1899,
    stock: 23,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    sales: 203,
  },
]

const stats = [
  {
    title: "Total Products",
    value: "248",
    change: "+12%",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Total Sales",
    value: "$124,590",
    change: "+8.2%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Customers",
    value: "1,429",
    change: "+5.4%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.8%",
    icon: TrendingUp,
    color: "text-emerald-600",
  },
]

export default function AdminDashboard() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    gemstone: "",
    metal: "",
  })

  const handleAddProduct = () => {
    // Handle product addition logic here
    console.log("Adding product:", newProduct)
    setIsAddProductOpen(false)
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      gemstone: "",
      metal: "",
    })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-serif font-bold text-stone-800">Lumina Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">View Store</Button>
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-stone-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-stone-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Product Management</CardTitle>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Button>
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rings">Rings</SelectItem>
                              <SelectItem value="necklaces">Necklaces</SelectItem>
                              <SelectItem value="earrings">Earrings</SelectItem>
                              <SelectItem value="bracelets">Bracelets</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gemstone">Gemstone</Label>
                          <Select
                            value={newProduct.gemstone}
                            onValueChange={(value) => setNewProduct({ ...newProduct, gemstone: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gemstone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="diamond">Diamond</SelectItem>
                              <SelectItem value="emerald">Emerald</SelectItem>
                              <SelectItem value="ruby">Ruby</SelectItem>
                              <SelectItem value="sapphire">Sapphire</SelectItem>
                              <SelectItem value="pearl">Pearl</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="metal">Metal Type</Label>
                          <Select
                            value={newProduct.metal}
                            onValueChange={(value) => setNewProduct({ ...newProduct, metal: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select metal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gold">18K Gold</SelectItem>
                              <SelectItem value="white-gold">White Gold</SelectItem>
                              <SelectItem value="rose-gold">Rose Gold</SelectItem>
                              <SelectItem value="platinum">Platinum</SelectItem>
                              <SelectItem value="silver">Sterling Silver</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          placeholder="Enter product description"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Product Images</Label>
                        <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 text-stone-400 mx-auto mb-2" />
                          <p className="text-stone-600">Drag and drop images here, or click to browse</p>
                          <Button variant="outline" className="mt-2">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddProduct} className="bg-emerald-600 hover:bg-emerald-700">
                          Add Product
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-stone-800">{product.name}</p>
                          <p className="text-sm text-stone-600">ID: {product.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-medium">${product.price}</TableCell>
                    <TableCell>
                      <span className={product.stock === 0 ? "text-red-600" : "text-stone-800"}>{product.stock}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.status === "Active" ? "default" : "destructive"}
                        className={product.status === "Active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface InventoryItem {
  id: number
  name: string
  stock: number
  price: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export interface Order {
  id: string
  customer: string
  total: number
  status: 'Pending' | 'Processing' | 'Shipped'
  items: { name: string; quantity: number; price: number }[]
}

interface AppContextType {
  inventory: InventoryItem[]
  orders: Order[]
  isLoading: boolean
  updateInventoryStock: (id: number, newStock: number) => Promise<void>
  updateOrderStatus: (id: string, newStatus: Order['status']) => Promise<void>
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'status'>) => Promise<void>
  deleteInventoryItem: (id: number) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [invRes, ordersRes] = await Promise.all([
          fetch(`${API_URL}/inventory`),
          fetch(`${API_URL}/orders`),
        ])
        const invData = await invRes.json()
        const ordersData = await ordersRes.json()

        if (invData.success) setInventory(invData.data)
        if (ordersData.success) setOrders(ordersData.data)
      } catch (error) {
        console.error('Error fetching data from API:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiData()
  }, [API_URL])

  const addInventoryItem = async (newItem: Omit<InventoryItem, 'id' | 'status'>) => {
    try {
      const res = await fetch(`${API_URL}/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
      const result = await res.json()
      if (result.success) {
        setInventory((prev) => [...prev, result.data])
      }
    } catch (error) {
      console.error('Failed to add item:', error)
    }
  }

  const updateInventoryStock = async (id: number, newStock: number) => {
    try {
      const res = await fetch(`${API_URL}/inventory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock }),
      })
      const result = await res.json()
      if (result.success) {
        setInventory((prev) => prev.map((item) => (item.id === id ? result.data : item)))
      }
    } catch (error) {
      console.error('Failed to update stock:', error)
    }
  }

  const deleteInventoryItem = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/inventory/${id}`, {
        method: 'DELETE',
      })
      const result = await res.json()
      if (result.success) {
        setInventory((prev) => prev.filter((item) => item.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }

  const updateOrderStatus = async (id: string, newStatus: Order['status']) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const result = await res.json()
      if (result.success) {
        setOrders((prev) => prev.map((order) => (order.id === id ? result.data : order)))
      }
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        inventory,
        orders,
        isLoading,
        updateInventoryStock,
        updateOrderStatus,
        addInventoryItem,
        deleteInventoryItem,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within an AppProvider')
  return context
}

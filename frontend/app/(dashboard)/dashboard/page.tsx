'use client'

import React, { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Card } from '../../../components/ui/Card'

export default function DashboardPage() {
  const { inventory, orders } = useApp()

  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length
    const lowStockItems = inventory.filter((i) => i.stock < 5)
    const totalItemsInStock = inventory.reduce((sum, item) => sum + item.stock, 0)

    return { totalRevenue, pendingOrders, lowStockItems, totalItemsInStock }
  }, [inventory, orders])

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Dashboard Overview
        </h2>
        <p className='text-sm text-gray-500'>
          Real-time metrics for your inventory and fulfillment.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card
          title='Total Revenue'
          value={`$${analytics.totalRevenue.toFixed(2)}`}
          description='Based on current tracked orders'
        />
        <Card
          title='Pending Orders'
          value={analytics.pendingOrders}
          description='Orders awaiting fulfillment'
        />
        <Card
          title='Total Units in Stock'
          value={analytics.totalItemsInStock}
          description='Across all product categories'
        />
        <Card
          title='Low Stock Alerts'
          value={analytics.lowStockItems.length}
          description='Items needing immediate restock'
          alert={analytics.lowStockItems.length > 0}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
          <h3 className='text-base font-semibold text-gray-900'>Requires Attention</h3>
          <div className='mt-4 space-y-4'>
            {analytics.lowStockItems.length === 0 ? (
              <p className='text-sm text-gray-500'>All inventory levels are healthy.</p>
            ) : (
              analytics.lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3'
                >
                  <div>
                    <p className='text-sm font-medium text-red-800'>{item.name}</p>
                    <p className='text-xs text-red-600'>Stock: {item.stock} remaining</p>
                  </div>
                  <span className='inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800'>
                    Restock
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
          <h3 className='text-base font-semibold text-gray-900'>Recent Orders</h3>
          <div className='mt-4 divide-y divide-gray-100'>
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className='flex items-center justify-between py-3'>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    {order.id} - {order.customer}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'Processing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

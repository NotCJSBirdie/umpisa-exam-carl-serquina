'use client'

import { useParams, useRouter } from 'next/navigation'
import { useApp } from '@/app/context/AppContext'

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { orders, updateOrderStatus } = useApp()

  const orderId = params.id as string
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-gray-300 bg-gray-50'>
        <h2 className='text-xl font-semibold text-gray-700'>Order not found</h2>
        <p className='text-sm text-gray-500'>
          The order ID {orderId} does not exist in our system.
        </p>
        <button
          onClick={() => router.back()}
          className='mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
        >
          &larr; Back to Orders
        </button>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-4xl space-y-6'>
      <div className='flex items-center space-x-4'>
        <button
          onClick={() => router.push('/orders')}
          className='text-gray-500 hover:text-gray-900 transition-colors'
        >
          <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
        </button>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Order {order.id}
          </h2>
          <p className='text-sm text-gray-500 mt-1'>Placed by {order.customer}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='border-b border-gray-200 bg-gray-50 px-6 py-4'>
              <h3 className='text-base font-semibold text-gray-900'>Items Ordered</h3>
            </div>
            <ul className='divide-y divide-gray-200'>
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className='flex items-center justify-between px-6 py-4 hover:bg-gray-50'
                >
                  <div>
                    <p className='text-sm font-medium text-gray-900'>{item.name}</p>
                    <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                  </div>
                  <p className='text-sm font-semibold text-gray-900'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className='bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200'>
              <span className='text-base font-bold text-gray-900'>Total Amount</span>
              <span className='text-xl font-extrabold text-blue-600'>
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            <h3 className='text-base font-semibold text-gray-900 mb-4'>Current Status</h3>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                order.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : order.status === 'Processing'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {order.status}
            </span>

            <div className='mt-8'>
              <h4 className='text-sm font-medium text-gray-700 mb-3'>Update Status:</h4>
              <div className='space-y-2 flex flex-col'>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Pending')}
                  disabled={order.status === 'Pending'}
                  className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-left'
                >
                  Set to Pending
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Processing')}
                  disabled={order.status === 'Processing'}
                  className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-left'
                >
                  Set to Processing
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Shipped')}
                  disabled={order.status === 'Shipped'}
                  className='w-full rounded-md border border-gray-300 bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 text-left'
                >
                  Mark as Shipped
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

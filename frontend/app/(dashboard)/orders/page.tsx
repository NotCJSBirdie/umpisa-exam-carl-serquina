'use client'

import Link from 'next/link'
import { useApp, Order } from '../../context/AppContext'

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useApp()

  const renderColumn = (title: string, status: Order['status'], bgColor: string) => {
    const filteredOrders = orders.filter((order) => order.status === status)

    return (
      <div className={`flex flex-col rounded-xl ${bgColor} p-4 min-h-[500px]`}>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='font-semibold text-gray-700'>{title}</h3>
          <span className='bg-white text-gray-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm'>
            {filteredOrders.length}
          </span>
        </div>

        <div className='flex-1 space-y-3'>
          {filteredOrders.length === 0 ? (
            <div className='text-center text-sm text-gray-400 mt-10 border-2 border-dashed border-gray-200 rounded-lg p-6'>
              No orders
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className='bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'
              >
                <div className='flex justify-between items-start mb-2'>
                  <span className='text-sm font-bold text-blue-600'>{order.id}</span>
                  <span className='text-sm font-medium text-gray-900'>
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <p className='text-sm text-gray-600 mb-4'>{order.customer}</p>

                <div className='flex justify-between items-center mt-4 pt-3 border-t border-gray-50'>
                  <Link
                    href={`/orders/${order.id}`}
                    className='text-xs font-medium text-blue-600 hover:text-blue-800'
                  >
                    View Details &rarr;
                  </Link>

                  {status === 'Pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Processing')}
                      className='text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 font-medium'
                    >
                      Process
                    </button>
                  )}
                  {status === 'Processing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Shipped')}
                      className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 font-medium'
                    >
                      Ship Order
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Order Fulfillment
        </h2>
        <p className='text-sm text-gray-500 mt-1'>
          Manage and track customer orders through the pipeline.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {renderColumn('Pending', 'Pending', 'bg-gray-50')}
        {renderColumn('Processing', 'Processing', 'bg-blue-50/50')}
        {renderColumn('Shipped', 'Shipped', 'bg-green-50/50')}
      </div>
    </div>
  )
}

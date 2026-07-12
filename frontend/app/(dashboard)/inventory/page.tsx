'use client'

import React, { useState } from 'react'
import { useApp, InventoryItem } from '../../context/AppContext'
import { DataTable, Column } from '../../../components/ui/DataTable'

export default function InventoryPage() {
  const { inventory, addInventoryItem, deleteInventoryItem, updateInventoryStock } =
    useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [newItemForm, setNewItemForm] = useState({ name: '', stock: '', price: '' })

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns: Column<InventoryItem>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Product Name', accessor: 'name' },
    { header: 'Stock Level', accessor: 'stock' },
    { header: 'Price', accessor: (item) => `$${item.price.toFixed(2)}` },
    {
      header: 'Status',
      accessor: (item) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
            item.status === 'In Stock'
              ? 'bg-green-100 text-green-800'
              : item.status === 'Low Stock'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (item) => (
        <div className='flex space-x-3'>
          <button
            onClick={() => updateInventoryStock(item.id, item.stock + 5)}
            className='text-blue-600 hover:text-blue-900 text-sm font-medium'
          >
            +5 Stock
          </button>
          <button
            onClick={() => deleteInventoryItem(item.id)}
            className='text-red-600 hover:text-red-900 text-sm font-medium'
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemForm.name) return

    addInventoryItem({
      name: newItemForm.name,
      stock: Number(newItemForm.stock) || 0,
      price: Number(newItemForm.price) || 0,
    })

    setNewItemForm({ name: '', stock: '', price: '' })
    setIsModalOpen(false)
  }

  const isFormValid =
    newItemForm.name.trim() !== '' && newItemForm.stock !== '' && newItemForm.price !== ''

  return (
    <div className='space-y-6'>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Inventory Directory
          </h2>
          <p className='text-sm text-gray-500 mt-1'>
            Manage your product catalog and stock levels.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 flex space-x-3'>
          <input
            type='text'
            placeholder='Search products...'
            className='block w-full rounded-md border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none shadow-sm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className='inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Add Product
          </button>
        </div>
      </div>

      <DataTable
        data={filteredInventory}
        columns={columns}
        keyExtractor={(item) => item.id}
      />

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4'>
          <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
            <h3 className='text-lg font-medium text-gray-900'>Add New Product</h3>
            <form onSubmit={handleAddItem} className='mt-4 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Product Name
                </label>
                <input
                  type='text'
                  required
                  className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                  value={newItemForm.name}
                  onChange={(e) =>
                    setNewItemForm({ ...newItemForm, name: e.target.value })
                  }
                />
              </div>
              <div className='flex space-x-4'>
                <div className='flex-1'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Initial Stock
                  </label>
                  <input
                    type='number'
                    min='0'
                    required
                    className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                    value={newItemForm.stock}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, stock: e.target.value })
                    }
                  />
                </div>
                <div className='flex-1'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Price ($)
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    min='0'
                    required
                    className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                    value={newItemForm.price}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
                >
                  Cancel
                </button>
                {/* FIX: Button is now disabled and styled appropriately until form is valid */}
                <button
                  type='submit'
                  disabled={!isFormValid}
                  className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600'
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

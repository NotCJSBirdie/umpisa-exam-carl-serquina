export let inventory = [
  { id: 1, name: 'Mechanical Keyboard', stock: 45, price: 89.99, status: 'In Stock' },
  { id: 2, name: 'USB-C Docking Station', stock: 4, price: 129.99, status: 'Low Stock' },
  { id: 3, name: '4K Gaming Monitor', stock: 0, price: 349.99, status: 'Out of Stock' },
]

export let orders = [
  {
    id: 'ORD-1001',
    customer: 'Alice Vance',
    total: 179.98,
    status: 'Pending',
    items: [{ name: 'Mechanical Keyboard', quantity: 2, price: 89.99 }],
  },
  {
    id: 'ORD-1002',
    customer: 'Bob Miller',
    total: 129.99,
    status: 'Processing',
    items: [{ name: 'USB-C Docking Station', quantity: 1, price: 129.99 }],
  },
]

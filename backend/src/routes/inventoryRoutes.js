import express from 'express'
import { inventory } from '../data/db.js'

const router = express.Router()

// GET all inventory
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: inventory })
})

// POST new inventory item
router.post('/', (req, res) => {
  const { name, stock, price } = req.body
  const newId = inventory.length > 0 ? Math.max(...inventory.map((i) => i.id)) + 1 : 1
  const status = stock === 0 ? 'Out of Stock' : stock < 5 ? 'Low Stock' : 'In Stock'

  const newItem = { id: newId, name, stock: Number(stock), price: Number(price), status }
  inventory.push(newItem)

  res.status(201).json({ success: true, data: newItem })
})

// PATCH update stock
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { stock } = req.body

  const itemIndex = inventory.findIndex((i) => i.id === parseInt(id))
  if (itemIndex === -1)
    return res.status(404).json({ success: false, message: 'Item not found' })

  const status = stock === 0 ? 'Out of Stock' : stock < 5 ? 'Low Stock' : 'In Stock'
  inventory[itemIndex] = { ...inventory[itemIndex], stock: Number(stock), status }

  res.status(200).json({ success: true, data: inventory[itemIndex] })
})

// DELETE inventory item
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const itemIndex = inventory.findIndex((i) => i.id === parseInt(id))

  if (itemIndex === -1)
    return res.status(404).json({ success: false, message: 'Item not found' })

  inventory.splice(itemIndex, 1)
  res.status(200).json({ success: true, message: 'Item deleted successfully' })
})

export default router

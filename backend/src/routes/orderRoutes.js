import express from 'express'
import { orders } from '../data/db.js'

const router = express.Router()

// GET all orders
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: orders })
})

// PATCH update order status
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const orderIndex = orders.findIndex((o) => o.id === id)
  if (orderIndex === -1)
    return res.status(404).json({ success: false, message: 'Order not found' })

  orders[orderIndex].status = status
  res.status(200).json({ success: true, data: orders[orderIndex] })
})

export default router

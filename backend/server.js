import express from 'express'
import cors from 'cors'
import inventoryRoutes from './src/routes/inventoryRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Umpisa API is running seamlessly.' })
})

app.use('/api/inventory', inventoryRoutes)
app.use('/api/orders', orderRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Internal Server Error' })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend API running on http://localhost:${PORT}`)
  })
}

export default app

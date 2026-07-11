import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../server.js'

describe('Inventory API Endpoints', () => {
  it('GET /api/inventory should return all inventory items', async () => {
    const res = await request(app).get('/api/inventory')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success', true)
    expect(Array.isArray(res.body.data)).toBeTruthy()
    expect(res.body.data.length).toBeGreaterThan(0)
  })

  it('POST /api/inventory should create a new item', async () => {
    const newItem = {
      name: 'Test Monitor',
      stock: 10,
      price: 199.99,
    }

    const res = await request(app).post('/api/inventory').send(newItem)

    expect(res.statusCode).toEqual(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('id')
    expect(res.body.data.name).toEqual('Test Monitor')
    expect(res.body.data.status).toEqual('In Stock')
  })

  it('PATCH /api/inventory/:id should update stock and status', async () => {
    const res = await request(app).patch('/api/inventory/1').send({ stock: 2 })

    expect(res.statusCode).toEqual(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.stock).toEqual(2)
    expect(res.body.data.status).toEqual('Low Stock')
  })
})

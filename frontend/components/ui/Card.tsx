import React from 'react'

interface CardProps {
  title: string
  value?: string | number
  description?: string
  children?: React.ReactNode
  alert?: boolean
}

export function Card({ title, value, description, children, alert = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-white p-6 shadow-sm transition-all ${
        alert ? 'border-red-200 bg-red-50' : 'border-gray-100'
      }`}
    >
      <h3 className={`text-sm font-medium ${alert ? 'text-red-800' : 'text-gray-500'}`}>
        {title}
      </h3>

      {value !== undefined && (
        <p
          className={`mt-2 text-3xl font-bold ${
            alert ? 'text-red-600' : 'text-gray-900'
          }`}
        >
          {value}
        </p>
      )}

      {description && (
        <p className={`mt-1 text-xs ${alert ? 'text-red-500' : 'text-gray-400'}`}>
          {description}
        </p>
      )}

      {children && <div className='mt-4'>{children}</div>}
    </div>
  )
}

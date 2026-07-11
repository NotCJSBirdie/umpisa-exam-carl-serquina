// frontend/app/(dashboard)/layout.tsx
import React from 'react'
import Navigation from '@/components/Navigation'
import { AppProvider } from '../context/AppContext' // Ensure the import path is correct!

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className='flex h-screen overflow-hidden bg-gray-50'>
        <Navigation />
        <main className='flex-1 overflow-y-auto'>
          <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8'>{children}</div>
        </main>
      </div>
    </AppProvider>
  )
}

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
      />
    ),
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
      />
    ),
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
      />
    ),
  },
]

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className='flex w-64 flex-col border-r border-gray-200 bg-white'>
      <div className='flex h-16 items-center px-6 border-b border-gray-100'>
        <h1 className='text-xl font-bold text-blue-600'>Umpisa System</h1>
      </div>

      <nav className='flex-1 space-y-1 px-3 py-4'>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {item.icon}
              </svg>
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className='border-t border-gray-200 p-4'>
        <button
          onClick={handleLogout}
          className='flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors'
        >
          <svg
            className='mr-3 h-5 w-5 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Truck, Home, Users, FileText, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: Home },
  { name: 'Drivers', href: '/app/drivers', icon: Users },
  { name: 'Vehicles', href: '/app/vehicles', icon: Truck },
  { name: 'Expenses', href: '/app/expenses', icon: FileText },
  { name: 'Settings', href: '/app/settings', icon: Settings },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn('flex flex-col gap-y-5 px-6 pb-4', className)}>
      <div className="flex h-16 shrink-0 items-center gap-x-3 mt-4">
        <div className="flex bg-indigo-500 p-2 rounded-lg">
          <Truck className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Expenses Monitor</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        isActive
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors'
                      )}
                    >
                      <item.icon
                        className={cn(
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

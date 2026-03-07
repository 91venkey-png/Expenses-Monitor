'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Truck, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: Home, roles: ['admin', 'supervisor', 'driver'] },
  { name: 'Drivers', href: '/app/drivers', icon: Users, roles: ['admin', 'supervisor'] },
  { name: 'Vehicles', href: '/app/vehicles', icon: Truck, roles: ['admin', 'supervisor'] },
  { name: 'Expenses', href: '/app/expenses', icon: FileText, roles: ['admin', 'supervisor', 'driver'] },
]

export function MobileNav({ className, role = 'driver' }: { className?: string, role?: string }) {
  const pathname = usePathname()

  const filteredNavigation = navigation.filter(item => item.roles.includes(role))

  return (
    <div className={cn('fixed bottom-0 z-50 w-full border-t border-gray-200 bg-white shadow-lg', className)}>
      <div className="flex h-16 justify-around items-center px-2">
        {filteredNavigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1',
                isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              <item.icon className={cn('h-6 w-6', isActive ? 'text-indigo-600' : 'text-gray-400')} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

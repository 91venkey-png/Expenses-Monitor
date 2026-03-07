'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signout } from '@/app/(auth)/login/actions'

interface TopNavProps {
  user: {
    name: string
    role?: string
  }
}

export function TopNav({ user }: TopNavProps) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center flex-1">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent md:hidden">
            Expenses Monitor
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {/* Separator */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="sr-only">Open user menu</span>
            <span className="hidden lg:flex lg:items-center">
              <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                {user.name}
              </span>
              <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <span className="flex lg:hidden bg-indigo-100 text-indigo-700 h-8 w-8 items-center justify-center rounded-full font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signout()}
                    className={cn(
                      active ? 'bg-gray-50' : '',
                      'flex w-full px-3 py-1 text-sm leading-6 text-gray-900'
                    )}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { Calendar, Route, CheckSquare, Wrench } from 'lucide-react'

const expenseModules = [
  {
    name: 'Milkrun Expenses',
    description: 'Log daily/monthly local route expenses.',
    href: '/app/expenses/milkrun/new',
    icon: Calendar,
    bgColor: 'bg-indigo-100',
    color: 'text-indigo-600',
  },
  {
    name: 'Linehaul Trips',
    description: 'Create long-distance trips and log expenses.',
    href: '/app/expenses/linehaul',
    icon: Route,
    bgColor: 'bg-emerald-100',
    color: 'text-emerald-600',
  },
  {
    name: 'Admin Expenses',
    description: 'Log salary, insurance, and other fleet costs.',
    href: '/app/expenses/admin/new',
    icon: CheckSquare,
    bgColor: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    name: 'Maintenance Logs',
    description: 'Record accident, repair, or regular service costs.',
    href: '/app/expenses/maintenance/new',
    icon: Wrench,
    bgColor: 'bg-orange-100',
    color: 'text-orange-600',
  },
]

export default function ExpensesPage() {
  return (
    <div className="space-y-6 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Expenses Module
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Select an expense category to record or review costs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {expenseModules.map((module) => (
          <Link
            key={module.name}
            href={module.href}
            className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.bgColor}`}>
              <module.icon className={`h-6 w-6 ${module.color}`} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {module.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {module.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

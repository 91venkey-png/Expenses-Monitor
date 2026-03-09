import { createClient } from '@/lib/supabase/server'
import { Truck, Users, FileText, IndianRupee } from 'lucide-react'
import { DashboardChart } from '@/components/DashboardChart'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const [vehiclesReq, driversReq, tripsReq, linehaulReq, milkrunReq, maintenanceReq] = await Promise.all([
    supabase.from('vehicles').select('*', { count: 'exact', head: true }),
    supabase.from('drivers').select('*', { count: 'exact', head: true }),
    supabase.from('trips').select('*', { count: 'exact', head: true }).eq('status', 'ongoing'),
    supabase.from('linehaul_expenses').select('amount'),
    supabase.from('milkrun_expenses').select('amount'),
    supabase.from('maintenance_logs').select('cost')
  ])

  // Calculate total expenses roughly
  const sumLinehaul = linehaulReq.data?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0
  const sumMilkrun = milkrunReq.data?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0
  const sumMaintenance = maintenanceReq.data?.reduce((acc, curr) => acc + Number(curr.cost), 0) || 0
  
  const totalExpenses = sumLinehaul + sumMilkrun + sumMaintenance

  const stats = [
    { name: 'Total Vehicles', value: vehiclesReq.count || 0, icon: Truck, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Active Drivers', value: driversReq.count || 0, icon: Users, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    { name: 'Total Expenses', value: `₹${totalExpenses.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-red-600', bgColor: 'bg-red-100' },
    { name: 'Active Trips', value: tripsReq.count || 0, icon: FileText, color: 'text-green-600', bgColor: 'bg-green-100' },
  ]

  // Fetch recent trips for the table
  const { data: recentTrips } = await supabase
    .from('trips')
    .select('id, start_location, end_location, start_date, vehicles(vehicle_number)')
    .order('start_date', { ascending: false })
    .limit(5)

  // Mock chart data for current month (in reality you'd aggregate via SQL view)
  const chartData = [
    {
      name: 'This Month',
      Milkrun: sumMilkrun,
      Linehaul: sumLinehaul,
      Maintenance: sumMaintenance,
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <dt>
              <div className={`absolute rounded-xl p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Linehaul Trips</h3>
            <Link href="/expenses/linehaul" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</Link>
          </div>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {recentTrips?.map((trip) => (
                <li key={trip.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{trip.start_location} → {trip.end_location}</p>
                      <p className="truncate text-sm text-gray-500">
                        {/* @ts-ignore */}
                        {trip.vehicles?.vehicle_number} • {new Date(trip.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/expenses/linehaul/${trip.id}`}
                        className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
              {(!recentTrips || recentTrips.length === 0) && (
                <li className="py-4 text-center text-sm text-gray-500">No active trips found.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <h3 className="text-base font-semibold leading-6 text-gray-900 self-start">Cost Breakdown (Current Month)</h3>
          <DashboardChart data={chartData} />
        </div>
      </div>
    </div>
  )
}

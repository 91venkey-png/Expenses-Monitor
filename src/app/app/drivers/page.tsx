import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function DriversPage() {
  const supabase = await createClient()

  // Fetch drivers list
  const { data: drivers } = await supabase
    .from('drivers')
    .select(`
      id,
      driver_name,
      mobile_number,
      joining_date,
      vehicles(vehicle_number)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Drivers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all drivers in your organization including their name, contact, and assigned vehicle.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/app/drivers/new"
            className="flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add driver
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border border-gray-100">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mobile
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Assigned Vehicle
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Joined Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {drivers?.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {driver.driver_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{driver.mobile_number}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* @ts-ignore - Supabase type casting varies */}
                        {driver.vehicles?.vehicle_number || <span className="text-gray-400 italic">Unassigned</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {driver.joining_date ? new Date(driver.joining_date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/app/drivers/${driver.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {driver.driver_name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {(!drivers || drivers.length === 0) && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                        No drivers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

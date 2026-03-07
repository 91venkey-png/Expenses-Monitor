import { createClient } from '@/lib/supabase/server'
import { createLinehaulTrip } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default async function NewLinehaulTripPage() {
  const supabase = await createClient()

  const [vehiclesReq, driversReq] = await Promise.all([
    supabase.from('vehicles').select('id, vehicle_number').eq('vehicle_type', 'linehaul').order('vehicle_number'),
    supabase.from('drivers').select('id, driver_name').order('driver_name')
  ])

  const vehicles = vehiclesReq.data || []
  const drivers = driversReq.data || []

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Create Linehaul Trip
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Start a new long-distance trip. You can log expenses against this trip later.
        </p>
      </div>

      <form action={createLinehaulTrip} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 relative">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-3">
              <label htmlFor="vehicle_id" className="block text-sm font-medium leading-6 text-gray-900">
                Vehicle (Linehaul Only) *
              </label>
              <div className="mt-2">
                <select
                  id="vehicle_id"
                  name="vehicle_id"
                  required
                  className="block w-full rounded-lg border-0 py-3 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white uppercase"
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.vehicle_number}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="driver_id" className="block text-sm font-medium leading-6 text-gray-900">
                Driver *
              </label>
              <div className="mt-2">
                <select
                  id="driver_id"
                  name="driver_id"
                  required
                  className="block w-full rounded-lg border-0 py-3 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="">Select Driver</option>
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>{d.driver_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <Input label="Start Location" name="start_location" required placeholder="e.g. Mumbai" />
            </div>

            <div className="sm:col-span-3">
              <Input label="End Location" name="end_location" required placeholder="e.g. Delhi" />
            </div>

            <div className="sm:col-span-3">
              <Input label="Start Date" name="start_date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="outline" href="/app/expenses/linehaul">Cancel</Button>
          <Button type="submit">Create Trip</Button>
        </div>
      </form>
    </div>
  )
}

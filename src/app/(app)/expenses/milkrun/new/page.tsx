import { createClient } from '@/lib/supabase/server'
import { createMilkrunExpense } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default async function NewMilkrunExpensePage() {
  const supabase = await createClient()

  // Pre-fetch active vehicles and drivers for the dropdowns
  const [vehiclesReq, driversReq] = await Promise.all([
    supabase.from('vehicles').select('id, vehicle_number').order('vehicle_number'),
    supabase.from('drivers').select('id, driver_name').order('driver_name')
  ])

  const vehicles = vehiclesReq.data || []
  const drivers = driversReq.data || []

  // Pre-fill current month
  const today = new Date()
  const currentMonthValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Log Milkrun Expense
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Record daily or monthly expenses for local delivery operations.
        </p>
      </div>

      <form action={createMilkrunExpense} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 relative">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="vehicle_id" className="block text-sm font-medium leading-6 text-gray-900">
                Vehicle *
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
              <Input
                label="Month"
                name="month"
                type="month"
                required
                defaultValue={currentMonthValue}
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="expense_type" className="block text-sm font-medium leading-6 text-gray-900">
                Expense Type *
              </label>
              <div className="mt-2">
                <select
                  id="expense_type"
                  name="expense_type"
                  required
                  className="block w-full rounded-lg border-0 py-3 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="">Select type</option>
                  <option value="Fuel">Fuel</option>
                  <option value="AdBlue">AdBlue</option>
                  <option value="Puncture">Puncture</option>
                  <option value="Police">Police / Challan</option>
                  <option value="Greasing">Greasing</option>
                  <option value="Accident">Accident</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Amount (₹)"
                name="amount"
                type="number"
                required
                min="0"
                step="0.01"
                inputMode="decimal"
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="outline" href="/app/expenses">Cancel</Button>
          <Button type="submit">Save Expense</Button>
        </div>
      </form>
    </div>
  )
}

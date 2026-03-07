import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { createLinehaulExpense } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default async function LinehaulTripPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { id } = await params

  const { data: trip } = await supabase
    .from('trips')
    .select(`
      *,
      vehicles(vehicle_number),
      drivers(driver_name),
      linehaul_expenses(id, expense_type, amount, created_at, notes)
    `)
    .eq('id', id)
    .single()

  if (!trip) {
    notFound()
  }

  // Calculate total
  const totalExpenses = trip.linehaul_expenses?.reduce((sum: number, exp: any) => sum + Number(exp.amount), 0) || 0

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Trip: {trip.start_location} → {trip.end_location}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500 font-medium">
              {/* @ts-ignore */}
              Vehicle: {trip.vehicles?.vehicle_number}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {/* @ts-ignore */}
              Driver: {trip.drivers?.driver_name}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              Started: {new Date(trip.start_date).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 gap-3">
          <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 font-bold text-lg">
            Total: ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logger Form */}
        <div className="md:col-span-1">
          <form action={createLinehaulExpense} className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
            <div className="px-4 py-6 sm:p-6 space-y-6">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">Log New Expense</h3>
              <input type="hidden" name="trip_id" value={trip.id} />

              <div>
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
                    <option value="Border Police">Border Police</option>
                    <option value="Traffic Police">Traffic Police</option>
                    <option value="Greasing">Greasing</option>
                    <option value="Accident">Accident</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <Input
                label="Amount (₹)"
                name="amount"
                type="number"
                required
                min="0"
                step="0.01"
                inputMode="decimal"
              />

              <div>
                <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
                  Notes
                </label>
                <div className="mt-2">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">Save Expense</Button>
            </div>
          </form>
        </div>

        {/* Expense List */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Recorded Expenses</h3>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {trip.linehaul_expenses?.map((expense: any) => (
                <li key={expense.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-5 sm:px-6 hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-semibold leading-6 text-gray-900">{expense.expense_type}</p>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p>{new Date(expense.created_at).toLocaleString()}</p>
                      {expense.notes && (
                        <>
                          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current"><circle cx={1} cy={1} r={1} /></svg>
                          <p className="truncate max-w-xs">{expense.notes}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <span className="font-semibold text-gray-900">₹{Number(expense.amount).toLocaleString('en-IN')}</span>
                  </div>
                </li>
              ))}
              {(!trip.linehaul_expenses || trip.linehaul_expenses.length === 0) && (
                <li className="px-4 py-8 text-center text-sm text-gray-500">
                  No expenses logged yet.
                </li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

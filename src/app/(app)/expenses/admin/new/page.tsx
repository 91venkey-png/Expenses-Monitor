import { createClient } from '@/lib/supabase/server'
import { createAdminExpense } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default async function NewAdminExpensePage() {
  const supabase = await createClient()

  const { data: vehicles } = await supabase.from('vehicles').select('id, vehicle_number').order('vehicle_number')

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Log Admin Expense
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Record organizational or fixed expenses like salary, insurance, and permits.
        </p>
      </div>

      <form action={createAdminExpense} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 relative">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-3">
              <label htmlFor="vehicle_id" className="block text-sm font-medium leading-6 text-gray-900">
                Vehicle (Optional)
              </label>
              <div className="mt-2">
                <select
                  id="vehicle_id"
                  name="vehicle_id"
                  className="block w-full rounded-lg border-0 py-3 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white uppercase"
                >
                  <option value="">General Fleet Expense</option>
                  {vehicles?.map(v => (
                    <option key={v.id} value={v.id}>{v.vehicle_number}</option>
                  ))}
                </select>
              </div>
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
                  <option value="Salary">Salary / Stipend</option>
                  <option value="Insurance">Insurance Premium</option>
                  <option value="FC">Fitness Certificate (FC)</option>
                  <option value="Permit">Permit Fees</option>
                  <option value="Tires">Tires & Spares</option>
                  <option value="Other">Other Admin Cost</option>
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

            <div className="sm:col-span-3">
              <Input label="Expense Date" name="expense_date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
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

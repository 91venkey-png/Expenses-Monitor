import { createVehicle } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function NewVehiclePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Add New Vehicle
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter the vehicle's registration and compliance information.
        </p>
      </div>

      <form action={createVehicle} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-3">
              <Input label="Vehicle Number" name="vehicle_number" placeholder="e.g. MH 04 XY 1234" required className="uppercase" />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="vehicle_type" className="block text-sm font-medium leading-6 text-gray-900">
                Vehicle Type *
              </label>
              <div className="mt-2">
                <select
                  id="vehicle_type"
                  name="vehicle_type"
                  required
                  className="block w-full rounded-lg border-0 py-3 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="">Select type</option>
                  <option value="linehaul">Linehaul (Heavy Commercial)</option>
                  <option value="milkrun">Milkrun (Light Commercial)</option>
                  <option value="pickup">Pickup / Mini Truck</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="permit_type" className="block text-sm font-medium leading-6 text-gray-900">
                Permit Type
              </label>
              <div className="mt-2">
                <select
                  id="permit_type"
                  name="permit_type"
                  className="block w-full rounded-lg border-0 py-3 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="">Select permit</option>
                  <option value="State">State Permit</option>
                  <option value="National">National Permit</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <Input label="Insurance Expiry" name="insurance_expiry" type="date" />
            </div>

            <div className="sm:col-span-3">
              <Input label="Fitness Certificate (FC) Expiry" name="fc_expiry" type="date" />
            </div>

          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="outline" href="/vehicles">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}

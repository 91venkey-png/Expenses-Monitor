import { createDriver } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function NewDriverPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Add New Driver
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter the driver's basic information and KYC details. Uploads can be handled after creation.
        </p>
      </div>

      <form action={createDriver} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-3">
              <Input label="Driver Name" name="driver_name" required />
            </div>

            <div className="sm:col-span-3">
              <Input label="Mobile Number" name="mobile_number" type="tel" required inputMode="numeric" />
            </div>

            <div className="col-span-full">
              <Input label="Address" name="address" />
            </div>

            <div className="sm:col-span-2">
              <Input label="Driving License" name="dl_number" required className="uppercase" />
            </div>

            <div className="sm:col-span-2">
              <Input label="PAN Number" name="pan_number" required className="uppercase" />
            </div>

            <div className="sm:col-span-2">
              <Input label="Aadhaar Number" name="aadhaar_number" required inputMode="numeric" />
            </div>

            <div className="sm:col-span-3">
              <Input label="Bank Account" name="bank_account" />
            </div>

            <div className="sm:col-span-3">
              <Input label="Joining Date" name="joining_date" type="date" required />
            </div>

          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="outline" href="/drivers">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}

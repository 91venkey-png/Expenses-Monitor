"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createDriver(formData: FormData) {
  const supabase = await createClient()

  // Ensure user is authenticated & get their organization ID
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: profile } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) {
    throw new Error("No organization found for user")
  }

  const payload = {
    organization_id: profile.organization_id,
    driver_name: formData.get('driver_name') as string,
    mobile_number: formData.get('mobile_number') as string,
    address: formData.get('address') as string,
    dl_number: formData.get('dl_number') as string,
    pan_number: formData.get('pan_number') as string,
    aadhaar_number: formData.get('aadhaar_number') as string,
    bank_account: formData.get('bank_account') as string,
    joining_date: formData.get('joining_date') as string,
  }

  const { error } = await supabase
    .from('drivers')
    .insert(payload)

  if (error) {
    console.error("Error creating driver:", error)
    // In a real app, handle constraint errors or return them to the client
    throw new Error(error.message)
  }

  revalidatePath('/app/drivers')
  redirect('/app/drivers')
}

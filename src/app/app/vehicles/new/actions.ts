"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createVehicle(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data: profile } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) throw new Error("No organization found")

  const payload = {
    organization_id: profile.organization_id,
    vehicle_number: (formData.get('vehicle_number') as string).toUpperCase(),
    vehicle_type: formData.get('vehicle_type') as string,
    permit_type: formData.get('permit_type') as string || null,
    insurance_expiry: formData.get('insurance_expiry') as string || null,
    fc_expiry: formData.get('fc_expiry') as string || null,
  }

  const { error } = await supabase.from('vehicles').insert(payload)

  if (error) {
    console.error("Error creating vehicle:", error)
    throw new Error(error.message)
  }

  revalidatePath('/app/vehicles')
  redirect('/app/vehicles')
}

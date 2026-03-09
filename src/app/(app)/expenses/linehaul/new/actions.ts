"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createLinehaulTrip(formData: FormData) {
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
    vehicle_id: formData.get('vehicle_id') as string,
    driver_id: formData.get('driver_id') as string,
    start_location: formData.get('start_location') as string,
    end_location: formData.get('end_location') as string,
    start_date: formData.get('start_date') as string,
    status: 'ongoing'
  }

  const { error } = await supabase.from('trips').insert(payload)

  if (error) {
    console.error("Error creating linehaul trip:", error)
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
  revalidatePath('/expenses/linehaul')
  redirect('/expenses/linehaul')
}

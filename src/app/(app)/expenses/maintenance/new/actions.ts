"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createMaintenanceLog(formData: FormData) {
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
    maintenance_type: formData.get('maintenance_type') as string,
    cost: parseFloat(formData.get('cost') as string),
    date: formData.get('date') as string,
  }

  const { error } = await supabase.from('maintenance_logs').insert(payload)

  if (error) {
    console.error("Error creating maintenance log:", error)
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
  revalidatePath('/expenses')
  redirect('/expenses')
}

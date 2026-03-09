"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createLinehaulExpense(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data: profile } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) throw new Error("No organization found")

  const tripId = formData.get('trip_id') as string

  const payload = {
    organization_id: profile.organization_id,
    trip_id: tripId,
    expense_type: formData.get('expense_type') as string,
    amount: parseFloat(formData.get('amount') as string),
    notes: formData.get('notes') as string || null,
  }

  const { error } = await supabase.from('linehaul_expenses').insert(payload)

  if (error) {
    console.error("Error logging linehaul expense:", error)
    throw new Error(error.message)
  }

  revalidatePath(`/expenses/linehaul/${tripId}`)
}

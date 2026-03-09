"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createAdminExpense(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data: profile } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) throw new Error("No organization found")

  const vehicleId = formData.get('vehicle_id') as string

  const payload = {
    organization_id: profile.organization_id,
    vehicle_id: vehicleId || null, 
    expense_type: formData.get('expense_type') as string,
    amount: parseFloat(formData.get('amount') as string),
    expense_date: formData.get('expense_date') as string,
  }

  const { error } = await supabase.from('admin_expenses').insert(payload)

  if (error) {
    console.error("Error creating admin expense:", error)
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
  revalidatePath('/expenses')
  redirect('/expenses')
}

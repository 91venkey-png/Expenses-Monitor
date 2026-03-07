"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createMilkrunExpense(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data: profile } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) throw new Error("No organization found")

  // The HTML month input returns YYYY-MM. Postgres date needs a full date.
  const monthInput = formData.get('month') as string
  const formattedMonthDate = `${monthInput}-01` // First of the month

  const payload = {
    organization_id: profile.organization_id,
    vehicle_id: formData.get('vehicle_id') as string,
    driver_id: formData.get('driver_id') as string,
    month: formattedMonthDate,
    expense_type: formData.get('expense_type') as string,
    amount: parseFloat(formData.get('amount') as string),
    notes: formData.get('notes') as string || null,
  }

  const { error } = await supabase.from('milkrun_expenses').insert(payload)

  if (error) {
    console.error("Error creating milkrun expense:", error)
    throw new Error(error.message)
  }

  revalidatePath('/app/dashboard')
  revalidatePath('/app/expenses')
  redirect('/app/expenses')
}

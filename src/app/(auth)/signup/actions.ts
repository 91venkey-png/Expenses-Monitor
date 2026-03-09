"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string

  // 1. Sign up the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (authError) {
    return redirect(`/signup?message=${encodeURIComponent(authError.message)}`)
  }

  if (!authData.user) {
    return redirect('/signup?message=Signup failed. Please try again.')
  }

  // 2. Ensure an organization exists (fetch first or create one)
  let { data: org } = await supabase.from('organizations').select('id').limit(1).single()
  
  if (!org) {
    const { data: newOrg, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: 'Default Organization' })
      .select('id')
      .single()
    
    if (orgError) {
      console.error('Error creating organization:', orgError)
      return redirect('/signup?message=Failed to initialize organization')
    }
    org = newOrg
  }

  // 3. Create the user profile in the public.users table
  const { error: profileError } = await supabase.from('users').insert({
    id: authData.user.id,
    organization_id: org.id,
    name: fullName,
    email: email,
    role: 'admin' // First user is admin
  })

  if (profileError) {
    console.error('Error creating user profile:', profileError)
    // Even if profile creation fails, the user is signed up in Auth.
    // They might need to try logging in or we might need a trigger.
    return redirect('/signup?message=Profile creation failed')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

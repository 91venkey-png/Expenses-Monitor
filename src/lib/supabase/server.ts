import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const dummyUrl = 'https://placeholder.supabase.co'
  const dummyKey = 'placeholder'

  if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('⚠️ Supabase server environment variables are missing. Using placeholders for build.')
  }

  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl || dummyUrl,
    supabaseAnonKey || dummyKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

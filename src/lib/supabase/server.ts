import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Missing Supabase env vars. Make sure .env.local exists with:\n' +
    '  NEXT_PUBLIC_SUPABASE_URL=...\n' +
    '  NEXT_PUBLIC_SUPABASE_ANON_KEY=...\n' +
    'Then restart the dev server.'
  )
}

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl as string,
    supabaseAnonKey as string,
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

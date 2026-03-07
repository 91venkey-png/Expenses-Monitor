import { createBrowserClient } from '@supabase/ssr'

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

export function createClient() {
  return createBrowserClient(supabaseUrl as string, supabaseAnonKey as string)
}

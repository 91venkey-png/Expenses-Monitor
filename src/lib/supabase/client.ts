import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // These placeholders prevent crashes during build-time (static analysis/data collection).
    const dummyUrl = 'https://placeholder.supabase.co'
    const dummyKey = 'placeholder'
    
    if (typeof window === 'undefined') {
        console.warn('⚠️ Supabase environment variables are missing. Using placeholders for build stability.')
    }
    return createBrowserClient(supabaseUrl || dummyUrl, supabaseAnonKey || dummyKey)
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

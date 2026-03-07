import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'
import { TopNav } from '@/components/layout/TopNav'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile to get role and organization
  const { data: profile } = await supabase
    .from('users')
    .select('name, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-gray-900" />
      
      <div className="flex flex-1 flex-col md:pl-64">
        <TopNav user={profile || { name: user.email || 'Unknown User' }} />
        
        <main className="flex-1 overflow-y-auto w-full">
          <div className="mx-auto max-w-7xl pb-20 md:pb-8 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>

        <MobileNav className="md:hidden" />
      </div>
    </div>
  )
}

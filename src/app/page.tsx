import Link from 'next/link'
import { Truck, BarChart3, ShieldCheck, ArrowRight, Gauge, FileSpreadsheet } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Expenses Monitor</span>
          </div>
          <div className="flex lg:flex-1 lg:justify-end">
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-8 flex justify-center">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Trusted by logistics operators nationwide.{' '}
                    <Link href="/login" className="font-semibold text-indigo-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Take Control of Your Fleet Expenses
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  The all-in-one logistics expense monitor. Track Fuel, Maintenance, Milkrun, and Linehaul operations with real-time analytics and automated KYC processing.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button size="lg" href="/login">
                    Get Started Today
                  </Button>
                  <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div id="features" className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Operations Suite</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to run a profitable fleet
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stop bleeding cash with undocumented expenses. Our platform gives you the visibility needed to optimize every kilometer.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Gauge className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Trip Mapping
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Log Milkrun delivery cycles or complex Linehaul trips with dynamic expense tracking per stop.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <BarChart3 className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Real-time Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Visualize fuel trends, maintenance costs per vehicle, and organizational spend at a glance.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <ShieldCheck className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  KYC & Compliance
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Secure document vault for Driver DLs, PAN cards, and Aadhaar with automated expiry reminders.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by Growing Fleets</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">Managing thousands of vehicles across multiple cities.</p>
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col bg-gray-400/5 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-600">Monthly Expenses Processed</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">₹45M+</dd>
                    </div>
                    <div className="flex flex-col bg-gray-400/5 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-600">Active Trucks</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">2,500+</dd>
                    </div>
                    <div className="flex flex-col bg-gray-400/5 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-600">Trips Tracked</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">12,000+</dd>
                    </div>
                    <div className="flex flex-col bg-gray-400/5 p-8">
                        <dt className="text-sm font-semibold leading-6 text-gray-600">Uptime</dt>
                        <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">99.9%</dd>
                    </div>
                </dl>
            </div>
        </div>

        {/* CTA section */}
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 lg:px-8">
          <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl" aria-hidden="true">
            <div
              className="ml-[calc(50%+20rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to streamline your logistics?
              <br />
              Start using Expenses Monitor today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join dozens of transport organizations that have digitized their operations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" href="/login">Get started</Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-32 max-w-7xl px-6 lg:px-8 pb-8 border-t border-gray-100 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-indigo-600" />
                <span className="text-gray-900 font-bold">Expenses Monitor</span>
            </div>
            <p className="text-xs leading-5 text-gray-500">
                &copy; {new Date().getFullYear()} Expenses-Monitor. All rights reserved.
            </p>
            <div className="flex gap-6">
                <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
                <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
            </div>
        </div>
      </footer>
    </div>
  )
}

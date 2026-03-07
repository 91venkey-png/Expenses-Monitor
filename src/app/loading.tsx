export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
        <p className="text-sm text-gray-500">Please wait while we prepare your dashboard.</p>
      </div>
    </div>
  )
}

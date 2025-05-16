export default function Loading() {
  return (
    <div className="min-h-dvh flex justify-between gap-16 flex-col md:flex-row animate-pulse">
      <div className="flex flex-col gap-10 w-full max-w-[550px]">
        <div className="flex flex-col gap-8 items-center md:items-start">
          <div className="h-10 md:h-16 bg-gray-700 rounded w-3/4" />
          <div className="h-8 md:h-12 bg-gray-700 rounded w-2/3" />
        </div>

        <div className="space-y-2">
          <div className="h-8 bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-600 rounded w-full" />

          <div className="flex flex-col gap-2 px-5 py-4 bg-gray-700 rounded-xl w-full">
            <div className="h-5 bg-gray-600 rounded w-1/3" />
            <hr className="border-gray-600" />
            <div className="h-3 bg-gray-600 rounded w-2/3" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-5 bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-600 rounded w-full" />
          </div>

          <div className="h-12 bg-gray-700 rounded w-full" />
        </div>
      </div>

      <div className="hidden md:block w-full max-w-sm space-y-4">
        <div className="h-6 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-600 rounded w-full" />
        <div className="h-4 bg-gray-600 rounded w-full" />
      </div>
    </div>
  )
}

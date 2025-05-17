export default function EventSubscriptionLoading() {
  return (
    <div className="flex flex-col justify-start gap-10 mb-14">
      <div className="flex flex-col gap-8 items-center md:items-start animate-pulse">
        <div className="h-10 md:h-16 bg-gray-700 rounded w-3/4" />
        <div className="h-8 md:h-12 bg-gray-700 rounded w-2/3" />
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-stretch animate-pulse">
        <div className="flex-1 flex flex-col justify-between bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 min-w-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-600 rounded w-1/3" />
              <div className="h-5 bg-purple-800 rounded w-20" />
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-600 rounded w-full" />
              <div className="h-4 bg-gray-600 rounded w-11/12" />
              <div className="h-4 bg-gray-600 rounded w-5/6" />
              <div className="h-4 bg-gray-600 rounded w-1/2" />
            </div>
          </div>

          <div className="h-4 bg-gray-500 rounded w-1/4" />
        </div>

        <div className="w-full md:w-auto md:min-w-[320px] lg:min-w-[430px]">
          <div className="bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]">
            <div className="h-6 bg-gray-600 rounded w-1/3" />

            <div className="space-y-3">
              <div className="space-y-2">
                <div className="h-10 bg-gray-600 rounded w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-10 bg-gray-600 rounded w-full" />
              </div>
            </div>

            <div className="h-10 bg-gray-500 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

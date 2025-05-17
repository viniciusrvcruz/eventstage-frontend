export default function EventsLoadingSkeleton() {
  const eventSkeletonIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6']

  return (
    <div className="space-y-5">
      <div>
        <div className="h-10 md:h-16 bg-gray-700 rounded w-3/4 mx-auto md:mx-0 animate-pulse" />
        <div className="h-5 bg-gray-600 rounded w-1/2 mt-2 mx-auto md:mx-0 animate-pulse" />
      </div>

      <section className="flex bg-gray-700 border border-gray-600 rounded-2xl p-4 gap-4 w-full animate-pulse">
        <div className="h-10 bg-gray-600 rounded w-full sm:w-1/3" />
        <div className="h-10 bg-gray-600 rounded w-1/4 hidden sm:block" />
        <div className="h-10 bg-gray-600 rounded w-1/4 hidden sm:block" />
      </section>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {eventSkeletonIds.map((id) => (
          <div key={id} className="h-60 bg-gray-700 rounded-xl animate-pulse" />
        ))}
      </div>

      <div className="flex justify-center items-center pb-5">
        <div className="animate-spin h-12 w-12 border-t-4 border-b-4 rounded-full border-gray-300" />
      </div>
    </div>
  )
}

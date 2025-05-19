export default function EventFormLoading() {
  const fields = [
    { id: 'title' },
    { id: 'subtitle' },
    { id: 'description' },
    { id: 'date' },
    { id: 'url' },
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-10 w-3/4 md:w-2/4">
        <div className="h-8 md:h-16 bg-gray-700 rounded w-3/4 mx-auto md:mx-0 animate-pulse" />
      </div>
      <div className="bg-gray-700 border border-gray-600 rounded-2xl p-4 mb-20 space-y-4 w-full sm:p-6 sm:w-[440px] animate-pulse">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-500 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-500 rounded" />
              <div className="flex-1 h-10 bg-gray-600 rounded" />
            </div>
          </div>
        ))}

        <div className="my-5 space-y-2">
          <div className="h-4 w-1/3 bg-gray-500 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-500 rounded-md" />
            <div className="h-4 w-24 bg-gray-500 rounded" />
          </div>
        </div>

        <div className="h-10 bg-gray-600 rounded w-full" />
      </div>
    </div>
  )
}

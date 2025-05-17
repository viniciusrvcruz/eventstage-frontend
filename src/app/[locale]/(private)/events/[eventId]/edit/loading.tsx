export default function EventEditLoading() {
  const fields = [
    { id: 'title', height: 10 },
    { id: 'subtitle', height: 10 },
    { id: 'description', height: 24 },
    { id: 'date', height: 10 },
    { id: 'url', height: 10 },
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-8 w-48 bg-gray-600 rounded-lg animate-pulse mb-10 md:w-96" />
      <div className="bg-gray-700 border border-gray-600 rounded-2xl p-4 mb-20 space-y-4 sm:p-6 sm:w-[440px] animate-pulse">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <div className="h-4 w-32 bg-gray-500 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-600 rounded-lg" />
              <div
                className={`flex-1 h-${field.height} bg-gray-600 rounded-lg`}
              />
            </div>
          </div>
        ))}
        <div className="space-y-2 my-5">
          <div className="h-4 w-32 bg-gray-500 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-600 rounded-md" />
            <div className="h-4 w-24 bg-gray-500 rounded" />
          </div>
        </div>
        <div className="h-10 w-full bg-gray-600 rounded-lg" />
      </div>
    </div>
  )
}

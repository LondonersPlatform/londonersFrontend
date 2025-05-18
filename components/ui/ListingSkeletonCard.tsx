export  const ListingSkeletonCard = () => (
  <div className="flex animate-pulse rounded-2xl p-0 my-6 border-gray-300 border-[1px] flex-col md:flex-row">
    <div className="hidden gap-2 md:flex w-full md:w-2/5">
      <div className="h-full w-1/2 bg-gray-300 rounded-l-2xl" />
      <div className="h-full w-1/2 bg-gray-300" />
    </div>

    <div className="md:hidden w-full h-64 bg-gray-300 rounded-t-2xl" />

    <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
      <div className="h-6 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
      <div className="flex gap-4">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
      <div className="h-6 w-1/3 bg-gray-300 rounded" />
    </div>
  </div>
);

'use client'

export function TaskSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-orange-200 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export function TaskSkeletonList() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <TaskSkeleton key={i} />
      ))}
    </div>
  )
}

export function MemorySkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl overflow-hidden border border-orange-200 animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export function MemorySkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <MemorySkeleton key={i} />
      ))}
    </div>
  )
}

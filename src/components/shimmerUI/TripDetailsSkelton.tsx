import { Skeleton } from "@/components/ui/skeleton"

export default function TripDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* --- HEADER SHIMMER --- */}
      <div className="bg-card border rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-20 w-20 rounded-lg " /> {/* Trip Image */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-48" /> {/* Trip Title */}
              <Skeleton className="h-6 w-16 rounded-full" /> {/* Owner Badge */}
            </div>
            <Skeleton className="h-4 w-32" /> {/* Subtitle */}
            <div className="flex gap-4">
              <Skeleton className="h-4 w-40" /> {/* Dates */}
              <Skeleton className="h-4 w-24" /> {/* Location */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex -space-x-2">
              <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
              <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
           </div>
           <Skeleton className="h-10 w-28 rounded-md" /> {/* Invite Button */}
        </div>
      </div>

      {/* --- TABS SHIMMER --- */}
      <div className="flex gap-4 border-b pb-2 overflow-x-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-t-lg shrink-0" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- ITINERARY SECTION (Left 3 Columns) --- */}
        <div className="lg:col-span-3 space-y-10">
          {[1, 2].map((day) => (
            <div key={day} className="relative pl-12">
              {/* Day Circle Indicator */}
              <Skeleton className="absolute left-0 top-0 h-10 w-10 rounded-full" />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" /> {/* Day X */}
                  <Skeleton className="h-4 w-36" /> {/* Full Date */}
                </div>
                
                <Skeleton className="h-4 w-12" /> {/* 'new' text placeholder */}

                {/* Activity Card */}
                <div className="border rounded-xl p-6 bg-card space-y-4">
                  <Skeleton className="h-4 w-16" /> {/* Time */}
                  <Skeleton className="h-7 w-1/3" /> {/* Activity Title */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" /> {/* Location Name */}
                  </div>
                  <Skeleton className="h-4 w-2/3 italic" /> {/* Quote/Note */}
                </div>

                <Skeleton className="h-12 w-full rounded-xl border-dashed" /> {/* Add Activity Button */}
              </div>
            </div>
          ))}
        </div>

        {/* --- SIDEBAR SHIMMER (Right 1 Column) --- */}
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" /> {/* Discussion Title */}
              <Skeleton className="h-4 w-12" /> {/* View All */}
            </div>

            <div className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" /> {/* Comment text */}
                <Skeleton className="h-3 w-20" /> {/* Timestamp */}
              </div>
            </div>

            <Skeleton className="h-10 w-full rounded-md" /> {/* Input Box */}
          </div>
        </div>
      </div>
    </div>
  )
}
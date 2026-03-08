export function ItinerarySkelton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-3xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
          <div className="h-8 w-40 bg-slate-200 rounded-xl mb-6" /> {/* Title */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50">
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 rounded-full bg-slate-100" /> {/* Icon */}
                <div className="h-4 w-32 bg-slate-200 rounded" /> {/* Title */}
              </div>
              <div className="h-6 w-20 bg-slate-100 rounded-full" /> {/* Category */}
              <div className="h-4 w-12 bg-slate-200 rounded" /> {/* Date */}
              <div className="h-8 w-8 rounded-full bg-slate-100" /> {/* Paid By */}
              <div className="h-4 w-16 bg-slate-200 rounded" /> {/* Amount */}
            </div>
          ))}
        </div>

        {/* Category Sidebar */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
          <div className="h-6 w-32 bg-slate-200 rounded-xl" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-slate-200 rounded" />
                <div className="h-3 w-12 bg-slate-100 rounded" />
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
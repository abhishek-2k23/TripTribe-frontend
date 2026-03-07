export function BudgetDashboardSkeleton() {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Top Cards Shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-3xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Expenses Table Shimmer */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
          <div className="h-6 w-48 bg-slate-200 rounded-md mb-8" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50">
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-full bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-4 w-12 bg-slate-200 rounded" />
              <div className="h-8 w-20 bg-slate-100 rounded-full" />
              <div className="h-4 w-16 bg-slate-200 rounded" />
            </div>
          ))}
        </div>

        {/* Category Breakdown Shimmer */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-8">
          <div className="h-6 w-32 bg-slate-200 rounded-md" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-3">
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
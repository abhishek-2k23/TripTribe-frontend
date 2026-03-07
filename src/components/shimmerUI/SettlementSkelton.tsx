export function SettlementSkeleton() {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Top Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-32 bg-slate-100 rounded-3xl" />
        <div className="h-32 bg-slate-100 rounded-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Who Owes Who List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-6 w-40 bg-slate-200 rounded-md mb-4 ml-2" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white border border-slate-100 rounded-3xl p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-16 bg-slate-200 rounded" />
                <div className="h-10 w-20 bg-slate-100 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Traveler Balances Sidebar */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
          <div className="h-6 w-36 bg-slate-200 rounded-md" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-8 w-8 bg-slate-200 rounded-full" />
                <div className="h-4 w-24 bg-slate-100 rounded" />
              </div>
              <div className="h-4 w-12 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
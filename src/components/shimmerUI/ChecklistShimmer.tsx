export function ChecklistSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 space-y-6 min-h-[300px]">
          {/* Header & Progress Bar */}
          <div className="space-y-3">
            <div className="h-6 w-32 bg-slate-200 rounded-lg" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full w-1/2 bg-slate-200 rounded-full" />
            </div>
          </div>
          
          {/* List Items */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded bg-slate-100" />
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                </div>
                <div className="h-6 w-6 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
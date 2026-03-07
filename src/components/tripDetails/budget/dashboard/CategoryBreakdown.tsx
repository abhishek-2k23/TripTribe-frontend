import { Progress } from "@/components/ui/progress";

export function CategoryBreakdown({ categories }: { categories: any[] }) {

    if(!CategoryBreakdown){
        return <div>NO category</div>
    }
  return (
    <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6 min-w-[30%]">
      <h3 className="font-bold text-lg">Category Breakdown</h3>
      <div className="space-y-5">
        {categories && categories?.map((cat) => (
          <div key={cat.category} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-medium">{cat.category}</span>
              <span className="font-bold">₹{cat.spent} / ₹{cat.limit}</span>
            </div>
            <Progress 
              value={cat.percentage} 
              className="h-2 bg-slate-100" 
              // Custom color based on percentage
              indicatorClassName={cat.percentage > 90 ? "bg-red-500" : "bg-orange-500"} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
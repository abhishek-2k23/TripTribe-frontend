export function BudgetSummary({ data }: { data: any }) {
    console.log(data);
    if(!data){
        return <div> No summary </div>
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: "Total Budget", value: data.totalBudget, color: "bg-slate-50" },
        { label: "Spent", value: data.totalSpent, color: "bg-orange-50 text-orange-600" },
        { label: "Remaining", value: data.remaining, color: "bg-green-50 text-green-600" }
      ].map((card) => (
        <div key={card.label} className={`${card.color} p-6 rounded-3xl border border-transparent hover:border-slate-200 transition-all`}>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70">{card.label}</p>
          <p className="text-2xl font-bold mt-1">₹{card.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
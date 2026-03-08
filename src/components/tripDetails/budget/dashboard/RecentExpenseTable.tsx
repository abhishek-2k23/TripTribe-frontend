import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBudgetStore from "@/store/useBudgetStore";

export function RecentExpensesTable() {
  const expenses = useBudgetStore((state) => state.dashboard?.recentExpenses || []);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Accommodation": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Food": return "bg-orange-50 text-orange-600 border-orange-100";
      case "Transport": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="bg-card rounded-3xl border shadow-sm overflow-hidden min-w-[70%] mb-10">
      <div className="p-6 flex justify-between items-center border-b border-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Recent Expenses</h2>
      </div>
      {expenses.length === 0 ? <div className="mx-auto w-full  flex flex-col items-center justify-center">
          {" "}
          <img
            src="https://res.cloudinary.com/daamrpzus/image/upload/v1772927233/TripTribe/ChatGPT_Image_Mar_8__2026__05_14_22_AM-removebg-preview_gtthaf.png"
            alt="no deb"
          />{" "}
          <p className="text-navy text-2xl font-semibold -mt-20 mb-3">
            No recent spending
          </p>
        </div> :
      <Table className="min-w-[70%]">
        <TableHeader className="bg-slate-50/50 ">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[250px] uppercase text-[10px] font-bold tracking-wider text-slate-400 pl-8">Expense</TableHead>
            <TableHead className="uppercase text-[10px] font-bold tracking-wider text-slate-400">Category</TableHead>
            <TableHead className="uppercase text-[10px] font-bold tracking-wider text-slate-400">Date</TableHead>
            <TableHead className="uppercase text-[10px] font-bold tracking-wider text-slate-400">Paid By</TableHead>
            <TableHead className="uppercase text-[10px] font-bold tracking-wider text-slate-400">Split</TableHead>
            <TableHead className="uppercase text-[10px] font-bold tracking-wider text-slate-400 text-right pr-8">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp._id} className="group cursor-pointer hover:bg-slate-50/50 border-slate-50 transition-colors">
              {/* Expense Title with Icon */}
              <TableCell className="py-5 pl-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    {/* You can map actual icons here based on category */}
                    <span className="text-lg">🏨</span>
                  </div>
                  <span className="font-bold text-slate-700 block max-w-[150px] truncate">
                    {exp.title}
                  </span>
                </div>
              </TableCell>

              {/* Category Badge */}
              <TableCell>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getCategoryStyles(exp.category)}`}>
                  {exp.category}
                </span>
              </TableCell>

              {/* Formatted Date */}
              <TableCell className="text-slate-400 text-sm">
                {new Date(exp.expenseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </TableCell>

              {/* Paid By Avatar */}
              <TableCell>
                <Avatar className="h-8 w-8 border-2 border-white ring-1 ring-slate-100">
                  <AvatarImage src={exp.paidBy?.imageUrl} />
                  <AvatarFallback>{exp.paidBy?.name?.[0]}</AvatarFallback>
                </Avatar>
              </TableCell>

              {/* Split Avatar Stack */}
              <TableCell>
                <div className="flex -space-x-2">
                  {exp.participants.slice(0, 2).map((p: any) => (
                    <Avatar key={p._id} className="h-7 w-7 border-2 border-white">
                      <AvatarImage src={p.imageUrl} />
                      <AvatarFallback className="text-[8px]">{p.name?.[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {exp.participants.length > 2 && (
                    <div className="h-7 w-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                      +{exp.participants.length - 2}
                    </div>
                  )}
                </div>
              </TableCell>

              {/* Amount */}
              <TableCell className="text-right pr-8 font-bold text-slate-900 text-lg">
                ₹{exp.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
    </div>
  );
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Receipt, Calendar, Share2 } from "lucide-react";

export function ExpenseDetailSidebar({ expense }: { expense: any }) {
  if (!expense) return null;

  return (
    <div className="bg-[#0f172a] text-white rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Expense Details</p>
          <h2 className="text-2xl font-bold">{expense.title}</h2>
        </div>
        <div className="bg-orange-500 p-2 rounded-xl">
          <Receipt className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-slate-400 text-sm">Total Amount</p>
          <p className="text-3xl font-bold">${expense.amount.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
           <Calendar className="h-3 w-3" />
           {new Date(expense.expenseDate).toLocaleDateString()}
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* Split Details Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Split Details ({expense.participants.length} Ways)
          </p>
          <span className="text-[10px] bg-slate-800 px-2 py-1 rounded-full text-slate-300">
            {expense.splitType}
          </span>
        </div>

        <div className="space-y-3">
          {/* 1. Show the Payer (Paid By) */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-orange-500/50">
                <AvatarImage src={expense.paidBy?.imageUrl} />
                <AvatarFallback className="bg-slate-800">{expense.paidBy?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{expense.paidBy?.name} (You)</p>
                <p className="text-[10px] text-orange-400">Paid full amount</p>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400">${expense.amount.toFixed(2)}</p>
          </div>

          {/* 2. Show the people who owe (SplitDetails) */}
          {expense.splitDetails.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-slate-700">
                  <AvatarImage src={item.user?.imageUrl} />
                  <AvatarFallback className="bg-slate-800">{item.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{item.user?.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {item.isSettled ? "Settled" : "Owes you"}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${item.isSettled ? 'text-green-400' : 'text-slate-200'}`}>
                ${item.share.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-6 flex gap-2">
        <Share2 className="h-4 w-4" />
        Settle Expense
      </Button>
    </div>
  );
}
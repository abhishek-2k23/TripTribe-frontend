import useBudgetStore from "@/store/useBudgetStore"
import DebtCard from "./DebtCard"
import { ArrowRightLeft } from "lucide-react";

export default function WhoOwesWhoList() {
  const debts = useBudgetStore((s) => s.debts)
  const loading = useBudgetStore((s) => s.loading)
  console.log(debts);
  return (
    <div className="space-y-4">
      <h2 className="font-semibold flex gap-2 items-center justify-start text-navy text-lg"><ArrowRightLeft className="w-8 h-4 "/>Who Owes Who</h2>

      {loading ? <p> loading debts</p> : debts?.map((debt) => (
        <DebtCard key={debt.expenseId} debt={debt} />
      ))}
    </div>
  )
}

import  useBudgetStore  from "@/store/useBudgetStore"
import { Card } from "@/components/ui/card"

export default function BudgetSummaryCards() {

  const totalDebt = useBudgetStore(s => s.totalDebt)
  const yourBalance = useBudgetStore(s => s.yourBalance)
  console.log(totalDebt, yourBalance);
  return (

    <div className="grid grid-cols-2 gap-6">

      <Card className="p-6 flex items-center justify-between">

        <div>
          <p className="text-sm text-muted-foreground">
            TOTAL GROUP DEBT
          </p>

          <h2 className="text-2xl font-semibold">
            ₹{totalDebt.toFixed(2)}
          </h2>
        </div>

      </Card>

      <Card className="p-6 flex items-center justify-between">

        <div>
          <p className="text-sm text-muted-foreground">
            YOUR BALANCE
          </p>

          <h2
            className={`text-2xl font-semibold ${
              yourBalance < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            ₹{yourBalance.toFixed(2)}
          </h2>
        </div>

      </Card>

    </div>

  )
}
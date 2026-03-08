import { Button } from "@/components/ui/button"
import { BudgetSummary } from "./BudgetSummary"
import { CategoryBreakdown } from "./CategoryBreakdown"
import useBudget from "@/hooks/useBudget"
import useBudgetStore from "@/store/useBudgetStore"
import { useEffect } from "react"
import { RecentExpensesTable } from "./RecentExpenseTable"
import AddExpenseModal from "../AddExpenseModal"
import { BudgetFormModal } from "../BudgetFormModal"
import { BudgetDashboardSkeleton } from "@/components/shimmerUI/BudgetDashboardSkelton"

export default function BudgetScreen() {
  const openBudgetModal = useBudgetStore((s) => s.openBudgetModal)
  const dashboardData = useBudgetStore((s) => s.dashboard)
  const loading = useBudgetStore((s) => s.loading)
  const setShowSettleMentScreen = useBudgetStore(
    (s) => s.setShowSettleMentScreen,
  )
  const openModal = useBudgetStore((s) => s.openExpenseModel)
  const { getBudgetDetails } = useBudget()

  console.log(dashboardData)
  useEffect(() => {
    getBudgetDetails()
  }, [])

  if (loading) return <BudgetDashboardSkeleton />
  return (
    <div className="w-full mx-auto px-12  space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Trip Analytics</h1>
          <p className="text-muted-foreground">Monitor your spendings</p>
        </div>
        <div className="flex items-center gap-5">
          <Button onClick={() => setShowSettleMentScreen(true)} variant="hero">
            Settle
          </Button>

          <Button onClick={openBudgetModal} variant="hero">
            Edit Budget
          </Button>

          <Button variant="hero" onClick={openModal}>
            Record Payment
          </Button>

          <AddExpenseModal />
          <BudgetFormModal />
        </div>
      </header>

      <BudgetSummary data={dashboardData} />

      <div className="flex  gap-8 ">
        <RecentExpensesTable />

        <CategoryBreakdown categories={dashboardData?.categories || []} />
      </div>
    </div>
  )
}

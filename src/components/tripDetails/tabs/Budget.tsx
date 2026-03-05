import AddExpenseModal from "../budget/AddExpenseModal"

import { Button } from "@/components/ui/button"
import useBudgetStore from "@/store/useBudgetStore"
import BudgetSummaryCards from "../budget/BudgetSummaryCards"
import WhoOwesWhoList from "../budget/WhoOwesWhoList"
import TravelerBalancesCard from "../budget/TravelerBalancesCard"
import { useEffect, useRef } from "react"
import useBudget from "@/hooks/useBudget"
import toast from "react-hot-toast"
import useTripDetailsStore from "@/store/useTripDetails"
import { RefreshCwIcon } from "lucide-react"

export default function Budget() {
  const openModal = useBudgetStore((s) => s.openExpenseModel)
  const setLoading = useBudgetStore((s) => s.setLoading)
  const { getTripDebts } = useBudget()
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId);
  const fetchedData = useRef(false);
  const loadBudgetDetails = async () => {
    const toastId = toast.loading("wait, while loading your budget data")
    setLoading(true);
    try{
      getTripDebts();
      toast.success("Your budget is loaded Successfully", {id: toastId})
    }catch(e){
      toast.error(e.message);
    }finally{
      toast.dismiss(toastId);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(fetchedData.current) return;
    if(selectedTripId){
      fetchedData.current = true;
      loadBudgetDetails()

    }
  }, [])
  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Settle Up</h1>

          <p className="text-muted-foreground text-sm">
            Manage group debts and balances
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"navy"} onClick={getTripDebts} className="rounded-full w-10 h-10">
            <RefreshCwIcon />
          </Button>
          <Button variant="hero" onClick={openModal}>
            Record Payment
          </Button>
          <AddExpenseModal />
        </div>
      </div>

      <BudgetSummaryCards />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <WhoOwesWhoList />
        </div>

        <div className="space-y-6">
          <TravelerBalancesCard />
          {/* <SimplifyDebtCard /> */}
        </div>
      </div>
    </div>
  )
}

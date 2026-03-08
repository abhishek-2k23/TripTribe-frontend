import { Button } from "@/components/ui/button"
import useBudgetStore from "@/store/useBudgetStore"
import BudgetSummaryCards from "../budget/BudgetSummaryCards"
import WhoOwesWhoList from "../budget/WhoOwesWhoList"
import { useEffect, useRef } from "react"
import useBudget from "@/hooks/useBudget"
import toast from "react-hot-toast"
import useTripDetailsStore from "@/store/useTripDetails"
import { RefreshCwIcon } from "lucide-react"
import { SettlementSkeleton } from "@/components/shimmerUI/SettlementSkelton"
import TravelerBalancesCard from "../budget/TravelerBalancesCard"

export default function Budget() {
  const setLoading = useBudgetStore((s) => s.setLoading)
  const loading = useBudgetStore((s) => s.loading)
  const setShowSettleMentScreen = useBudgetStore((s) => s.setShowSettleMentScreen)

  const { getTripDebts } = useBudget()
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId);
  
  const fetchedData = useRef(false);
  const loadBudgetDetails = async () => {
    const toastId = toast.loading("wait, while loading your budget data")
    setLoading(true);
    try{
      getTripDebts();
      toast.success("Your budget is loaded Successfully", {id: toastId})
    }catch(e:any){
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
  if(loading){
    return <SettlementSkeleton />
  }
  return (
    <div className="px-8 lg:px-15 space-y-6">
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
          <Button variant="hero" onClick={() => setShowSettleMentScreen(false)}>
            Trip Analytics
          </Button>
        </div>
      </div>

      <BudgetSummaryCards />

      <div className="flex gap-8">
        <div className="w-3/4">
          <WhoOwesWhoList />
        </div>
        
        <div className="w-1/4"><TravelerBalancesCard /></div>
      </div>
    </div>
  )
}

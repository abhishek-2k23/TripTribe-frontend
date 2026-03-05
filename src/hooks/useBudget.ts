import { useApi } from "@/services/api"
import useBudgetStore from "@/store/useBudgetStore"
import useTripDetailsStore from "@/store/useTripDetails"
import toast from "react-hot-toast"

const useBudget = () => {
  const api = useApi()
  const form = useBudgetStore((state) => state.form)
  const resetForm = useBudgetStore((state) => state.resetForm)
  const closeExpenseModel = useBudgetStore((state) => state.closeExpenseModel)
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)
  const setBudgetData = useBudgetStore((state) => state.setBudgetData)

  let splitType: "equally" | "selected" | "none"

  // Determine split type
  if(form.splitEqually){
    splitType = "equally"
  }else if(form.participants.length >= 1){
    splitType = "selected"
  }else{
    splitType = "none"
  }
  const addBudget = async () => {
    const toastId = toast.loading("wait, adding your expense")
    try {
      const res = await api.post("/expenses/add", {
        selectedTripId,
        ...form,
        splitType,
      })
      if (res.success) {
        toast.success("Your budget added successfully")

        resetForm()
        closeExpenseModel()
      }
    } catch (error) {
      console.log(error)
    }finally{
      toast.dismiss(toastId)
    }
  }

  const fetchBudget = async () => {
    try {

      const res = await api.get(`/expenses/summary/${selectedTripId}`)
      console.log(res);

    } catch (error) {
      console.error("Fetch budget error:", error)

    }
  }

  const getTravellerBalance = async () => {
    try {

      const res = await api.get(`/expenses/balances/${selectedTripId}`)

      useBudgetStore.setState({
        travelerBalances: res.data,
      })
      console.log("get Traveller Balance budget", res)
    } catch (error) {
      console.error("Traveller balance error:", error)

    }
  }

  const settleExpense = async (expenseId: string, userId: string) => {
    try {

      await api.post(`/budget/settle`, {
        expenseId,
        userId,
      })

      useBudgetStore.getState().settleDebt(expenseId, userId)

    } catch (error) {
      console.error("Settle expense error:", error)

    }
  }

  const getTripDebts = async () => {
    try {

      const res = await api.get(`/expenses/debts/${selectedTripId}`)
      console.log("get Trip debts", res)
      if(res.success){
        setBudgetData(res.data);
      }

    } catch (error) {
      console.error("Get debts error:", error)

    }
  }

  const getTripBudgetSummary = async () => {
    try {

      const res = await api.get(`/expenses/summary/${selectedTripId}`)
      console.log("getTripBudget", res)
      const data = res.data

      useBudgetStore.setState({
        totalDebt: data.totalDebt,
        yourBalance: data.yourBalance,
      })

    } catch (error) {
      console.error("Budget summary error:", error)

    }
  }
  return {
    addBudget,
    fetchBudget,
    getTravellerBalance,
    settleExpense,
    getTripBudgetSummary,
    getTripDebts,
  }
}

export default useBudget

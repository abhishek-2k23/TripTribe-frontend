import { useApi } from "@/services/api"
import useBudgetStore from "@/store/useBudgetStore"
import useTripDetailsStore from "@/store/useTripDetails"
import { useState } from "react"
import toast from "react-hot-toast"

const useBudget = () => {
  const api = useApi()
  const form = useBudgetStore((state) => state.form)
  const resetForm = useBudgetStore((state) => state.resetForm)
  const closeExpenseModel = useBudgetStore((state) => state.closeExpenseModel)
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)
  const setBudgetData = useBudgetStore((state) => state.setBudgetData)
  const closeBudgetModal = useBudgetStore((state) => state.closeBudgetModal)
  const resetBudgetForm = useBudgetStore((state) => state.resetBudgetForm)
  const setDashboardData = useBudgetStore((state) => state.setDashboardData)
  const setLoading = useBudgetStore((state) => state.setLoading)

  const [isUpdating, setIsUpdating] = useState(false)

  let splitType: "equally" | "selected" | "none"

  // Determine split type
  if (form.splitEqually) {
    splitType = "equally"
  } else if (form.participants.length >= 1) {
    splitType = "selected"
  } else {
    splitType = "none"
  }
  const addBudget = async () => {
    const toastId = toast.loading("wait, adding your expense")
    try {
      const res = await api.post(`/expenses/add/${selectedTripId}`, {
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
    } finally {
      toast.dismiss(toastId)
    }
  }

  const fetchBudget = async () => {
    try {
      const res = await api.get(`/expenses/summary/${selectedTripId}`)
      console.log(res)
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
    const td = toast.loading("Wait, settling your expense");
    try {
      const res = await api.post(`/expenses/settle`, {
        expenseId,
        userId,
      })

      if(res.success){
        useBudgetStore.getState().settleDebt(expenseId, userId)
        toast.success(res.message, {id: td})
      }
    } catch (error) {
      toast.error(error.message, {id: td});
      console.error("Settle expense error:", error)
    }
  }

  const getTripDebts = async () => {
    try {
      const res = await api.get(`/expenses/debts/${selectedTripId}`)
      console.log("get Trip debts", res)
      if (res.success) {
        setBudgetData(res.data)
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


  const handleUpdateBudget = async (budgetForm: any) => {
    if (!selectedTripId) return toast.error("Trip ID is missing")

    setIsUpdating(true)
    const toastId = toast.loading("Updating trip budget...")

    try {
      const response = await api.patch(`/trips/${selectedTripId}/budget`, {
        total: budgetForm.total,
        categories: budgetForm.categories,
      })

      if (response.success) {
        toast.success("Budget updated successfully!", { id: toastId })
        closeBudgetModal()
        resetBudgetForm();
      }
    } catch (error: any) {
      console.error("Budget Update Error:", error)
      toast.error(error.message, { id: toastId })
    } finally {
      setIsUpdating(false)
    }
  }

  const getBudgetDetails = async () => {
    const toastId = toast.loading("Loading budget details")
    setLoading(true);
    try{
      const res = await api.get(`/expenses/budgetDashBoard/${selectedTripId}`);
      if(res.success){
        console.log(res);
        setDashboardData(res.data);
        toast.success("Budget Loaded successfully", {id: toastId});
      }
    }catch(e){
      console.log(e);
      toast.error(e.message, {id: toastId});
    }finally{
      setLoading(false);
    }
  }

  return {
    addBudget,
    fetchBudget,
    getTravellerBalance,
    settleExpense,
    getTripBudgetSummary,
    getTripDebts,
    isUpdating,
    handleUpdateBudget,
    getBudgetDetails,
  }
}

export default useBudget

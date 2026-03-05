import { useApi } from "@/services/api"
import useBudgetStore from "@/store/useBudgetStore"
import useTripDetailsStore from "@/store/useTripDetails"
import toast from "react-hot-toast"

const useBudget = () => {
  const api = useApi()
  const { form, resetForm, closeExpenseModel } = useBudgetStore()
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)

  const addBudget = async () => {
    const toastId = toast.loading("wait, adding your expense")
    try {
      const res = await api.post("/budget/add", {selectedTripId, ...form})
      if (res.success) {
        toast.success("Your budget added successfully")

        resetForm()
        closeExpenseModel()
      }
      toast.dismiss(toastId)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }finally{
        toast.dismiss(toastId);
    }
  }

  return {
    addBudget,
  }
}

export default useBudget

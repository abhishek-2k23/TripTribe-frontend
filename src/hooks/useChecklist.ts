import { useApi } from "@/services/api"
import { useChecklistStore } from "@/store/useCheckListStore"
import useTripDetailsStore from "@/store/useTripDetails"
import toast from "react-hot-toast"
const useChecklist = () => {
  const api = useApi()
  const selectedTripId = useTripDetailsStore((s) => s.selectedTripId)
  const setChecklist = useChecklistStore((s) => s.setChecklist)
  const checklists = useChecklistStore((s) => s.checklists)
  const setLoading = useChecklistStore((s) => s.setLoading)

  const addItems = async (
    tripId: string,
    categoryName: string,
    itemNames: string[],
  ) => {
    const td = toast.loading("Adding your checklist")
    try {
      const res = await api.post(`/checklist/addItems/${tripId}`, {
        categoryName,
        itemNames,
      })
      if (res.success) {
        setChecklist(res.data.categories)
        toast.success("Checklist Added", { id: td })
      }
      console.log(res)
    } catch (e) {
      console.log(e.message)
      toast.error(e.message, { id: td })
    } finally {
      toast.dismiss(td)
    }
  }

  const fetchChecklist = async () => {
    const td = toast.success("fetching your checklists")
    setLoading(true)
    try {
      const res = await api.get(`/checklist/fetchLists/${selectedTripId}`)
      if (res.success) {
        setChecklist(res.data.categories)
        toast.success("fetched checklists successfully", { id: td })
        setLoading(false);
      }
      console.log(res)
    } catch (e) {
      console.log(e)

      toast.error(e.message, { id: td })
    } finally {
      toast.dismiss(td)
      setLoading(false)
    }
  }

  const toggleItem = async (
    categoryId: string,
    itemId: string,
    isCompleted: boolean,
  ) => {
    const previousChecklists = [...checklists]
    const td = toast.loading("syncing your checklist with backend")

    const updatedChecklists = checklists.map((cat) => {
      if (cat._id !== categoryId) return cat
      return {
        ...cat,
        items: cat.items.map((item) =>
          item._id === itemId ? { ...item, isCompleted } : item,
        ),
      }
    })

    setChecklist(updatedChecklists)

    try {
      const res = await api.patch(
        `/checklist/${selectedTripId}/checklist/${categoryId}/items/${itemId}`,
        { isCompleted },
      )

      setChecklist(res.data.categories)
      toast.success("Checked Successfully", { id: td })
    } catch (error) {
      setChecklist(previousChecklists)
      toast.error("Failed to update item.", { id: td })
    }
  }

  return {
    addItems,
    fetchChecklist,
    toggleItem,
  }
}

export default useChecklist

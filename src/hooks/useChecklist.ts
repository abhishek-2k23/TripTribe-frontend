import { useApi } from "@/services/api"
import useAuthStore from "@/store/useAuthStore"
import { useChecklistStore } from "@/store/useCheckListStore"
import useTripDetailsStore from "@/store/useTripDetails"
import toast from "react-hot-toast"


const useChecklist = () => {
  const api = useApi()
  const user = useAuthStore((s) => s.backendUser) // Accessing current logged-in user
  
  const selectedTripId = useTripDetailsStore((s) => s.selectedTripId)
  const setChecklist = useChecklistStore((s) => s.setChecklist)
  const checklists = useChecklistStore((s) => s.checklists)
  const setLoading = useChecklistStore((s) => s.setLoading)
  const updateChecklistItem = useChecklistStore((s) => s.updateChecklistItem)

  const addItems = async (
    tripId: string,
    categoryName: string,
    itemNames: string[],
  ) => {
    const td = toast.loading("Adding items to tribe checklist...")
    try {
      const res = await api.post(`/checklist/addItems/${tripId}`, {
        categoryName,
        itemNames,
      })
      if (res.success) {
        // Backend returns the full categories array
        setChecklist(res.data.categories)
        toast.success("Items added successfully!", { id: td })
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || e.message, { id: td })
    }
  }

  const fetchChecklist = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/checklist/fetchLists/${selectedTripId}`)
      if (res.success) {
        setChecklist(res.data.categories)
      }
    } catch (e: any) {
      toast.error("Failed to load checklist")
    } finally {
      setLoading(false)
    }
  }

  const toggleItem = async (
    categoryId: string,
    itemId: string,
    isChecked: boolean, // Renamed for clarity: Are you checking or unchecking?
  ) => {
    // Save current state for potential rollback
    const previousChecklists = [...checklists]
    
    // 1. OPTIMISTIC UPDATE: Update UI immediately
    // We simulate what the backend will do: add/remove our user object from the array
    const updatedChecklists = checklists.map((cat) => {
      if (cat._id !== categoryId) return cat
      return {
        ...cat,
        items: cat.items.map((item) => {
          if (item._id !== itemId) return item
          
          const newCompletedBy = isChecked
            ? [...item.completedBy, { _id: user?._id, name: user?.name, imageUrl: user?.imageUrl }]
            : item.completedBy.filter((u: any) => u._id !== user?._id)
            
          return { ...item, completedBy: newCompletedBy }
        }),
      }
    })

    setChecklist(updatedChecklists)

    try {
      const res = await api.post(
        `/checklist/${selectedTripId}/checklist/${categoryId}/items/${itemId}`,
        { isChecked }, // Backend handles $addToSet or $pull
      )

      if (res.success) {
        // res.data is the updated item populated with user details
        updateChecklistItem(categoryId, itemId, res.data) 
      }
    } catch (error) {
      // Rollback on failure
      setChecklist(previousChecklists)
      toast.error("Sync failed. Please try again.")
    }
  }

  return {
    addItems,
    fetchChecklist,
    toggleItem,
  }
}

export default useChecklist
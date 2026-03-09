import { useEffect } from "react"
import { socket } from "@/lib/socket"
import toast from "react-hot-toast"
import { useItineraryStore } from "@/store/useItineraryStore"
import { useChecklistStore } from "@/store/useCheckListStore"
import useAuthStore from "@/store/useAuthStore"
import useTripDetailsStore from "@/store/useTripDetails"
import useMyTripStore from "@/store/useMyTrip"
import useBudgetStore from "@/store/useBudgetStore"
import { useDiscussionStore } from "@/store/useDiscussionStore"

const useWebSocketEmmits = () => {
  const tripId = useTripDetailsStore((s) => s.selectedTripId)
  const addTrip = useMyTripStore((s) => s.addTrip)
  const syncDayPlan = useItineraryStore((s) => s.syncDayPlan)
  const removeActivityLocally = useItineraryStore(
    (s) => s.removeActivityLocally,
  )
  const updateChecklistItem = useChecklistStore((s) => s.updateChecklistItem)
  const setChecklist = useChecklistStore((s) => s.setChecklist)
  const user = useAuthStore((s) => s.backendUser)
  const addExpenseToDashboard = useBudgetStore((s) => s.addExpenseToDashboard)
  const addMessage = useDiscussionStore((s) => s.addMessage);
  const setTyping = useDiscussionStore((s) => s.updateTypingStatus);

  useEffect(() => {
    if (!tripId) return
    socket.connect()

    socket.on("connect", () => {
      // 2. Join the specific Room immediately
      socket.emit("join_trip", tripId)
    })

    socket.on("expense_added", (newExpense) => {
      console.log(newExpense)
      // addRecentExpense(newExpense);
    })

    socket.on("activity_added", (dayPlan) => {
      syncDayPlan(dayPlan)
    })
    socket.on("activity_updated", (dayPlan) => {
      syncDayPlan(dayPlan)
    })

    // Listen for Deletions
    socket.on("activity_deleted", ({ itineraryId, activityId }) => {
      removeActivityLocally(itineraryId, activityId)
    })

    socket.on("checklist_updated", (updatedCategories) => {

      // Replace the local checklist state with the fresh categories from backend
      setChecklist(updatedCategories)

      toast.success("Checklist updated!")
    })

    socket.on("task_toggled", ({ categoryId, itemId, updatedItem }) => {

      updateChecklistItem(categoryId, itemId, updatedItem)

      const lastUser =
        updatedItem.completedBy[updatedItem.completedBy.length - 1]

      if (updatedItem.completedBy.length > 0 && lastUser?._id !== user?._id) {
        toast.success(`${lastUser?.name} completed: ${updatedItem.title}`)
      }
    })

    socket.on("expense_added", (newExpense) => {
      addExpenseToDashboard(newExpense)

      toast.success(`New expense: ${newExpense.title} (${newExpense.amount})`)
    })

    socket.on("new_discussion_message", (message) => {
    addMessage(message);
    // scrollToBottom(); // Function to snap view to latest message
  });

  socket.on("user_typing", ({ userName, isTyping }) => {
    setTyping(userName, isTyping);
  });

    // 4. Cleanup: Disconnect when leaving the trip details
    return () => {
      console.log(`Leaving Trip: ${tripId}`)
      socket.emit("leave_trip", tripId)
      socket.off("expense_added")
      socket.off("activity_added")
      socket.off("task_toggled")
      socket.off("expense_added")
      socket.disconnect()
    }
  }, [
    tripId,
    addTrip,
    setChecklist,
    updateChecklistItem,
    addExpenseToDashboard,
    removeActivityLocally,
    syncDayPlan,
    setTyping,
    addMessage,
  ])
}

export default useWebSocketEmmits

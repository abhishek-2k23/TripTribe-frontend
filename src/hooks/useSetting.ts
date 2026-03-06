import toast from "react-hot-toast"
import { useApi } from "@/services/api"
import useTripDetailsStore from "@/store/useTripDetails"
import useTripSettingsStore from "@/store/useSettingStore"
import useMyTripStore from "@/store/useMyTrip"

export const useTripSettings = () => {
  const api = useApi()

  const tripId = useTripDetailsStore((s) => s.selectedTripId)
  //   const setMyTripList = useMyTripStore((state) => state.setTrip)

  //   const settings = useTripSettingsStore()

  const saveSettings = async (settingsPayload: any) => {
    const toastId = toast.loading("updating trip details ")
    console.log(tripId);
    try {
      const res = await api.put(`/trips/${tripId}`, settingsPayload)
      if (res.success) {
        // Update the main trips list in global state
        useMyTripStore.getState().updateTrip(res.data);
        console.log(res)
        toast.success("Settings saved!", {id: toastId})
      }
    } catch (e) {
      console.log(e)
      toast.error(e.message, {id: toastId})
    }
  }

  const deleteTrip = async () => {
    const toastId = toast.loading("Deleting trip...")

    try {
      await api.delete(`/trips/${tripId}`)

      toast.success("Trip deleted", { id: toastId })
    } catch (e: any) {
      console.error(e)

      toast.error("Failed", { id: toastId })
    }
  }

  const { removeMember, setDeletingMember } = useTripSettingsStore()
  const selectedTripId = useTripDetailsStore((s) => s.selectedTripId)

  const handleDeleteMember = async (userId: string) => {
    setDeletingMember(userId) // Start loading state for this specific user
    try {
      const res = await api.delete(`/trips/${selectedTripId}/members/${userId}`)

      if (res.success) {
        removeMember(userId) // Update UI
        toast.success("Member removed")
      }
    } catch (error) {
      toast.error("Failed to remove member")
    } finally {
      setDeletingMember(null) // Stop loading state
    }
  }

  return {
    deleteTrip,
    handleDeleteMember,
    saveSettings,
  }
}

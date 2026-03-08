import toast from "react-hot-toast"
import { useApi } from "@/services/api"
import useTripDetailsStore from "@/store/useTripDetails"
import useTripSettingsStore from "@/store/useSettingStore"
import useMyTripStore from "@/store/useMyTrip"

export const useTripSettings = () => {
  const api = useApi()

  const tripId = useTripDetailsStore((s) => s.selectedTripId)
  const setIsUpdatingCover = useTripSettingsStore((s) => s.setIsUpdatingCover);
  const setCoverImage = useTripSettingsStore((s) => s.setCoverImage);

  //   const setMyTripList = useMyTripStore((state) => state.setTrip)

  //   const settings = useTripSettingsStore()

  const handleCoverUpload = async (file: File) => {
    if (!file) return;

    // Start loading UI
    setIsUpdatingCover(true);
    const toastId = toast.loading("Updating your cover image...");

    try {
      // 1. Prepare Multipart Form Data
      const formData = new FormData();
      formData.append("file", file); // Must match your upload.single("file") backend key

      // 2. Upload to Cloudinary via your existing route
      const res: any = await api.post("/files/upload-raw", formData);
      

      setCoverImage({ url: res.data.url, public_id: res.data.public_id });
      toast.success("cover image uploaded", {id: toastId})
      
    } catch (error: any) {
      console.error("Cover Upload Error:", error);
      toast.error(error.message || "Failed to update cover", { id: toastId });
    } finally {
      setIsUpdatingCover(false);
    }
  };

  const saveSettings = async (settingsPayload: any) => {
    const toastId = toast.loading("updating trip details ")
    console.log(tripId);
    try {
      const res:any = await api.put(`/trips/${tripId}`, settingsPayload)
      if (res.success) {
        // Update the main trips list in global state
        console.log(res);
        useMyTripStore.getState().updateTrip(res.data);
        console.log(res)
        toast.success("Settings saved!", {id: toastId})
      }
    } catch (e:any) {
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
      const res:any = await api.delete(`/trips/${selectedTripId}/members/${userId}`)

      if (res.success) {
        removeMember(userId) 
        toast.success("Member removed")
      }
    } catch (error:any) {
      toast.error(error.message||"Failed to remove member")
    } finally {
      setDeletingMember(null) // Stop loading state
    }
  }

  return {
    deleteTrip,
    handleDeleteMember,
    saveSettings,
    handleCoverUpload
  }
}

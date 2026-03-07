import { useApi } from "../services/api"
import useMyTripStore from "@/store/useMyTrip"
import useTripDetailsStore from "@/store/useTripDetails"
import toast from "react-hot-toast"

type tripData = {
  name: string
  description: string
  startDate: string
  endDate: string
  image: File | null
}
const useMyTrips = () => {
  const api = useApi()
  const { setTrip, addTrip, setIsLoading } = useMyTripStore()
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)
  const setSelectedTrip = useTripDetailsStore((state) => state.setSelectedTrip)
  const createTrip = async (tripData: any) => {
    const toastId = toast.loading("Preparing your trip...")
    try {
      const imageUrl = { url: "", public_id: "" }

      // Phase 1: Upload Image to Cloudinary if it exists
      if (tripData.image instanceof File) {
        toast.loading("Uploading trip cover...", { id: toastId })

        const formData = new FormData()
        formData.append("file", tripData.image)

        try {
          // Using your existing upload-raw route
          const uploadRes: any = await api.post("/files/upload-raw", formData)
          console.log("cover image upload: ", uploadRes)
          imageUrl.url = uploadRes.data.url
          imageUrl.public_id = uploadRes.data.publid_id
        } catch (e) {
          toast.error("Failed to upload the cover image. Using dummy image")
        }
      }

      // Phase 2: Create the Trip with the URL
      toast.loading("Finalizing trip details...", { id: toastId })

      const finalTripData = {
        ...tripData,
        image: imageUrl || {
          url: "https://www.freepik.com/free-photo/woman-with-hat-sitting-chairs-beach-beautiful-tropical-beach-woman-relaxing-tropical-beach-koh-nangyuan-island_13250004.htm#fromView=keyword&page=1&position=24&uuid=eedab40b-6627-4d58-8674-c03e419bea50&query=Travel",
          public_id: "trip_image",
        },
      }

      const response: any = await api.post("/trips/create", finalTripData)

      if (response.success) {
        toast.success("Trip created successfully", { id: toastId })
        addTrip(response.data)
        return response.data
      }
    } catch (error: any) {
      console.error("Error creating trip:", error)
      toast.error(error.message || "Failed to create trip", { id: toastId })
      throw error
    }
  }
  const fetchTrips = async () => {
    setIsLoading(true)
    console.log("fetching trip")
    try {
      const response = await api.get("/trips/my-trips")
      setTrip(response.data)
    } catch (error) {
      console.error("Error fetching trips:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOneTrip = async (tripId: string) => {
    const toastId = toast.loading("loading the trip details")
    try {
      console.log(selectedTripId)
      const res = await api.get(`/trips/${tripId}`)
      if (res.success) {
        toast.success("Trip data loaded successfully", { id: toastId })
        setSelectedTrip(res.data)
      }
      console.log(res)
    } catch (e) {
      console.log(e.message)
      toast.error(e.message, { id: toastId })
    }
  }
  const joinTrip = async (inviteCode: string) => {
    const toastId = toast.loading("joining the trip")
    try {
      const response = await api.post("/trips/join", { inviteCode })
      console.log(response)
      if (response.success) {
        addTrip(response.data)
        toast.dismiss(toastId)
        toast.success("Joined Trip successfully")
        console.log(response)
      }
    } catch (error) {
      console.log("error in joining trips: ", error)
      toast.dismiss(toastId)
      toast.error(error.message)
    }
  }
  return {
    fetchTrips,
    createTrip,
    joinTrip,
    fetchOneTrip,
  }
}

export default useMyTrips

import { useApi } from "@/services/api"
import { useItineraryStore } from "@/store/useItineraryStore"
import useTripDetailsStore from "@/store/useTripDetails"
import toast from "react-hot-toast"

export const useItinerary = () => {
  const api = useApi()
  const addActivity = useItineraryStore((state) => state.addActivity)
  const sectionTitle = useItineraryStore((state) => state.sectionTitle)
  const sectionDate = useItineraryStore((state) => state.sectionDate)
  const title = useItineraryStore((state) => state.title)
  const time = useItineraryStore((state) => state.time)
  const location = useItineraryStore((state) => state.location)
  const type = useItineraryStore((state) => state.type)
  const notes = useItineraryStore((state) => state.notes)
  const closeModal = useItineraryStore((state) => state.closeModal)
  const setLoading = useItineraryStore((s) => s.setLoading)
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)

  const fetchItineraries = async () => {
    try {
      const res = await api.get(`/itinerary/getTripItinerary/${selectedTripId}`)

      if (res.success) {
        // res.data.data is the 'dayPlan' returned by our controller
        addActivity(res.data)
      }
    }  finally {
      setLoading(false)
    }
  }

  const createActivity = async () => {
    try {
      console.log(selectedTripId)
      const formData = {
        tripId: selectedTripId,
        section: sectionTitle,
        date: sectionDate,
        title,
        time,
        location,
        type,
        notes,
      }
      const res = await api.post("/itinerary/addActivity", formData)
      if (res.success) {
        console.log(res)
        fetchItineraries()
        closeModal()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    createActivity,
    fetchItineraries,
  }
}

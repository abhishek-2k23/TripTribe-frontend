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
  const  customSection = useItineraryStore((s) => s.customSection)
  const  resetForm = useItineraryStore((s) => s.resetForm)
  const  addLocalSection = useItineraryStore((s) => s.addLocalSection)
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)


  const fetchItineraries = async () => {
    try {
      const res: any = await api.get(
        `/itinerary/getTripItinerary/${selectedTripId}`,
      )

      if (res.success) {
        console.log(res);
        addActivity(res.data.itinerary, res.data.existingSections)
      }
    } finally {
      setLoading(false)
    }
  }

  const createActivity = async () => {
  try {
    // 1. Determine the final section name
    // If 'NEW' is selected, we use the text from the custom input field
    const finalSection = sectionTitle === "NEW" ? customSection : sectionTitle;

    if (!finalSection || !sectionDate || !title) {
      return toast.error("Please fill in Section, Date, and Title");
    }

    if (sectionTitle === "NEW") {
      addLocalSection(finalSection);
    }
    const formData = {
      tripId: selectedTripId,
      section: finalSection,
      date: sectionDate,
      title,
      time,
      location,
      type,
      notes,
    }

    const res: any = await api.post("/itinerary/addActivity", formData)
    
    if (res.success) {
      
      fetchItineraries() 
      
      resetForm() 
      closeModal()
      toast.success("Activity added to your itinerary!")
    }
  } catch (e) {
    console.error("Failed to create activity:", e)
    toast.error("Something went wrong. Please try again.")
  }
}

  return {
    createActivity,
    fetchItineraries,
  }
}

import { useApi } from "@/services/api"
import { useItineraryStore } from "@/store/useItineraryStore"
import useTripDetailsStore from "@/store/useTripDetails"

export const useItinerary = () => {
  const api = useApi()
  const {
    addActivity,
    sectionTitle,
    sectionDate,
    title,
    time,
    location,
    type,
    notes,
    closeModal,
  } = useItineraryStore()
  const selectedTrip = useTripDetailsStore((state) => state.selectedTrip);
  const fetchItineraries = async () => {
    try {
      
      const res = await api.get(`/itinerary/getTripItinerary/${selectedTrip}`)

      if (res.success) {
        // res.data.data is the 'dayPlan' returned by our controller
        addActivity(res.data)
        console.log(res);
      }

    } catch (e) {
      console.log(e)
    }
  }

  const createActivity = async () => {
    try{
      console.log(selectedTrip);
const formData = {
        tripId: selectedTrip,
        section: sectionTitle,
        date: sectionDate,
        title,
        time,
        location,
        type,
        notes,
      }
    const res = await api.post("/itinerary/addActivity", formData)
      if(res.success){
        console.log(res);
        fetchItineraries();
        closeModal();
      }
    }catch(e){
      console.log(e);
    }
    
  }

  return {
    createActivity,
    fetchItineraries,
  }
}

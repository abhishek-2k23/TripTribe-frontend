import { create } from "zustand"
import useMyTripStore from "./useMyTrip"
import type { Trip } from "@/types/trip.types"

interface TripDetailsState {
  activeTab: string
  selectedTripId: string
  selectedTrip: Trip | null
  setSelectedTripId: (trip: string) => void
  setActiveTab: (activeTab: string) => void
  setSelectedTrip: (v: Trip | null) => void;
}

const useTripDetailsStore = create<TripDetailsState>((set) => ({
  selectedTripId: "",
  activeTab: "itinerary",
  selectedTrip: null,

  setSelectedTripId: (id) => {
    const trips = useMyTripStore.getState().trips
    const foundTrip = trips.find((t) => t._id === id) || null
    set({ selectedTripId: id, selectedTrip: foundTrip })
  },

  setSelectedTrip: (v) => set({ selectedTrip: v }),
  setActiveTab: (activeTab) => set({ activeTab }),
}))

// ✅ Key fix: subscribe to trips changes and re-sync selectedTrip
useMyTripStore.subscribe((state) => {
  const { selectedTripId } = useTripDetailsStore.getState()
  if (!selectedTripId) return

  const foundTrip = state.trips.find((t) => t._id === selectedTripId) || null
  useTripDetailsStore.setState({ selectedTrip: foundTrip })
})

export default useTripDetailsStore
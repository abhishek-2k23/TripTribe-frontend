import { create } from 'zustand';

interface TripDetailsState{
    activeTab: string 
    selectedTripId : string
    setSelectedTripId: (trip: string) => void
    setActiveTab: (activeTab: string) => void
}
const useTripDetailsStore = create<TripDetailsState>((set) => ({
    selectedTripId : "",
    activeTab : "itinerary",
    setSelectedTripId : (v) => set({selectedTripId:v} ),
    setActiveTab: (activeTab) => set({activeTab: activeTab}),
}))

export default useTripDetailsStore;
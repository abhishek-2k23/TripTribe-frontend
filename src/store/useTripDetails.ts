import { create } from 'zustand';

interface TripDetailsState{
    activeTab: string
    selectedTrip : string
    setSelectedTrip: (trip: string) => void
    setActiveTab: (activeTab: string) => void
}
const useTripDetailsStore = create<TripDetailsState>((set) => ({
    selectedTrip : "",
    activeTab : "itinerary",
    setSelectedTrip : (v) => set({selectedTrip:v} ),
    setActiveTab: (activeTab) => set({activeTab: activeTab}),
}))

export default useTripDetailsStore;
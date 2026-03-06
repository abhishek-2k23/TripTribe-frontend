import { create } from "zustand";
import type {TripState} from "../types/trip.types"

export const useMyTripStore = create<TripState>((set) => ({
  isCreateTripModalOpen: false,
  isJoinTripOpen: false,
  trips: [],
  isLoading: false,
  error: null,

  // Set the entire trip object from your API response
  setIsCreateTripModalOpen: (value) => set({isCreateTripModalOpen: value}),
  setIsJoinTripOpen: (value) => set({isJoinTripOpen: value}),
  setIsLoading : (v) => set({isLoading: v}),
  setTrip: (tripsData) => set({ trips: tripsData
  }),
  addTrip: (newTrip) => set(state => ({trips: [newTrip, ...state.trips]})),
  updateTrip: (updatedTrip) => set((state) => ({
    trips: state.trips.map((trip) =>
      trip._id === updatedTrip._id ? { ...trip, ...updatedTrip } : trip
    ),
  })),

  // Clear trip (e.g., on logout or leaving the planner)
  clearTrip: () => set({ 
    trips: [] 
  }),

  
}));

export default useMyTripStore; 
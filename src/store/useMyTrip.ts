import { create } from "zustand";
import type {TripState} from "../types/trip.types"

export const useMyTripStore = create<TripState>((set) => ({
    isCreateTripModalOpen: false,
  trips: [],
  isLoading: false,
  error: null,

  // Set the entire trip object from your API response
  setIsCreateTripModalOpen: (value) => set({isCreateTripModalOpen: value}),
  setIsLoading : (v) => set({isLoading: v}),
  setTrip: (tripsData) => set({ trips: tripsData
  }),
  addTrip: (newTrip) => set(state => ({trips: [newTrip, ...state.trips]})),

  // Clear trip (e.g., on logout or leaving the planner)
  clearTrip: () => set({ 
    trips: [] 
  }),

  
}));

export default useMyTripStore; 
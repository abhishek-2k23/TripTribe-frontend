import { create } from "zustand";

export type UserRole = "owner" | "editor" | "viewer";

export interface TripMember {
  user: string; // The User ID
  role: UserRole;
  joinedAt: string; // ISO Date String
}

export interface Trip {
  _id: string;
  name: string;
  description: string;
  location: string;
  startDate: string; // ISO Date String
  endDate: string;   // ISO Date String
  inviteCode: string;
  members: TripMember[];
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Interface for the Zustand Store state
export interface TripState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  
    isCreateTripModalOpen: boolean;
    setIsCreateTripModalOpen: (open: boolean) => void;
  
  // Actions
  setTrip: (trip: Trip[]) => void;
  addTrip: (trip: Trip) => void;
  clearTrip: () => void;
}
export const useMyTripStore = create<TripState>((set) => ({
    isCreateTripModalOpen: false,
  trips: [],
  isLoading: false,
  error: null,

  // Set the entire trip object from your API response
  setIsCreateTripModalOpen: (value) => set({isCreateTripModalOpen: value}),
  setTrip: (tripsData) => set({ trips: tripsData
  }),
  addTrip: (newTrip) => set(state => ({trips: [newTrip, ...state.trips]})),

  // Clear trip (e.g., on logout or leaving the planner)
  clearTrip: () => set({ 
    trips: [] 
  }),

  
}));

export default useMyTripStore; 
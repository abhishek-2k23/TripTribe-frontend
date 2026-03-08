export type UserRole = "owner" | "editor" | "viewer";


// Match your JSON object exactly
type UserProfile = {
  _id: string
  name: string
  email: string
  imageUrl: string
}

export interface TripCardProps {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  image?: { url: string };
  members: TripMember[];
  description?: string;
  activityCount?: number;
  budgetTotal?: number;
  // Remove or make createdBy optional if not used in the UI
  createdBy?: any; 
}
export interface TripMember {
  user: UserProfile; // The User ID
  role: UserRole;
  joinedAt: string; // ISO Date String
}

export interface Trip {
  _id: string;
  name: string;
  description: string;
  location: string;
  startDate: string; 
  endDate: string;  
  inviteCode: string;
  members: TripMember[];
  image?: {url: string}
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
  isJoinTripOpen: boolean;
  isCreateTripModalOpen: boolean;

  // Actions
  setIsCreateTripModalOpen: (open: boolean) => void;
  setIsJoinTripOpen: (open: boolean) => void;
  setTrip: (trip: Trip[]) => void;
  setIsLoading: (v: boolean) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (updatedTrip: Trip) => void;
  clearTrip: () => void;
}
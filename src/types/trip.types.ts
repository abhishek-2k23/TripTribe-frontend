export type UserRole = "owner" | "editor" | "viewer";


// Match your JSON object exactly
type UserProfile = {
  _id: string
  name: string
  email: string
  imageUrl: string
}

interface Member {
  user: UserProfile // Strictly an object as per your JSON
  role: string
  joinedAt: string
}

export interface TripCardProps {
  _id: string
  name: string
  description?: string
  location: string
  startDate: string
  endDate: string
  inviteCode: string
  members: Member[]
  createdBy: UserProfile
  createdAt: string
  updatedAt: string
  image?: { url: string }
  activityCount: number
  budgetTotal: number
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
  setIsLoading: (v: boolean) => void;
  addTrip: (trip: Trip) => void;
  clearTrip: () => void;
}
export interface ActivityComment {
  _id: string;
  user: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  text: string;
  createdAt: string;
}

export interface Activity {
  _id: string;
  title: string;
  time: string;
  location: string;
  type: "Flight" | "Hotel" | "Food" | "Sightseeing" | "Activity" | "Other";
  notes: string;
  attachment: string | null;
  isDone: boolean;
  comments: any[]; // Matches your schema's internal discussion array
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  _id: string;
  trip: string;
  date: string; 
  sections: {
    section: string;
    activities: Activity[];
    _id: string;
  }[];
}

export interface GetItineraryResponse {
  success: boolean;
  count: number;
  data: {
    itinerary: ItineraryDay[];
    existingSections: string[];
  };
}
export interface ItineraryState {
  // UI State
  isAddActivityOpen: boolean;
  loading: boolean;
  
  // The Main Data Array (Single State)
  timeline: ItineraryDay[];
  existingSections: string[];

  // Modal Form Data
  sectionTitle: string;
  customSection: string;
  sectionDate: Date | null;
  title: string;
  time: string;
  location: string;
  type: string;
  notes: string;

  // Actions
  openModal: () => void;
  closeModal: () => void;
  setLoading: (v: boolean) => void;
  addActivity: (itinerary: ItineraryDay, sections: any[]) => void;
  
  // Form Setters
  setSectionTitle: (v: string) => void;
  setCustomSection: (v: string) => void;
  setSectionDate: (v: Date | null) => void;
  setTitle: (v: string) => void;
  setTime: (v: string) => void;
  setLocation: (v: string) => void;
  setType: (v: string) => void;
  setNotes: (v: string) => void;
  syncDayPlan: (v: any) => void;

  resetForm : () => void;
  addLocalSection: (v: string) => void
  removeActivityLocally: (id: string, aId: string) => void
}
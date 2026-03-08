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
  comments: ActivityComment[]; 
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetItineraryResponse {
  success: boolean;
  count: number;
  data: ItineraryDay[];
}
export interface ItineraryState {

  isAddActivityOpen: boolean

  sectionTitle: string
  customSection: string
  sectionDate: Date | null

  timeline: ItineraryDay[];

  title: string
  time: string
  location: string
  type: string
  notes: string
  loading: boolean,

  // data
  activities: Activity[]

  // modal actions
  openModal: () => void
  closeModal: () => void
  setLoading: (v: boolean) => void

  // form setters
  setSectionTitle: (v: string) => void
  setCustomSection: (v: string) => void
  setSectionDate: (v: Date | null) => void

  setTitle: (v: string) => void
  setTime: (v: string) => void
  setLocation: (v: string) => void
  setType: (v: string) => void
  setNotes: (v: string) => void
  setTimeline: (data: ItineraryDay[]) => void;
  addActivityToTimeline: (newDay: ItineraryDay) => void;
  syncDayPlan: (v: any) => void;
  getSectionOptions: () => string[];
  // actions
  addActivity: (activities: GetItineraryResponse) => void
  resetForm: () => void
}
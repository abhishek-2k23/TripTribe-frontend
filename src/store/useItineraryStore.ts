// store/useItineraryStore.ts
import type { ItineraryState } from "@/types/itinerary.types"
import { create } from "zustand"

export const useItineraryStore = create<ItineraryState>((set) => ({
  // --- UI & Modal State ---
  isAddActivityOpen: false,
  loading: false,

  // --- Itinerary Source of Truth ---
  timeline: [], 
  existingSections: [],

  // --- Form Data for Modal ---
  sectionTitle: "",
  customSection: "",
  sectionDate: null,
  title: "",
  time: "",
  location: "",
  type: "Activity",
  notes: "",

  // --- Actions ---
  openModal: () => set({ isAddActivityOpen: true }),
  closeModal: () => {
    set({ isAddActivityOpen: false })
    set({
      sectionTitle: "",
      customSection: "",
      sectionDate: null,
      title: "",
      time: "",
      location: "",
      type: "Activity",
      notes: "",
    })
  },
  
  setLoading: (v) => set({ loading: v }),

  // This single function sets everything from the backend
  addActivity: (itinerary, sections) => {

  set({
    timeline: itinerary,
    existingSections: sections,
  });
},

  // Form Setters
  setSectionTitle: (v) => set({ sectionTitle: v }),
  setCustomSection: (v) => set({ customSection: v }),
  setSectionDate: (v) => set({ sectionDate: v }),
  setTitle: (v) => set({ title: v }),
  setTime: (v) => set({ time: v }),
  setLocation: (v) => set({ location: v }),
  setType: (v) => set({ type: v }),
  setNotes: (v) => set({ notes: v }),

  // Required by interface but keeping it simple
  setTimeline: (data, sections) => set({ timeline: data, existingSections: sections }),
  addActivityToTimeline: (newDay) => set((state) => ({ timeline: [...state.timeline, newDay] })),
  syncDayPlan: (updatedDay) => {
    set((state) => ({
      timeline: state.timeline.map((day) => 
        day._id === updatedDay._id ? updatedDay : day
      )
    }));
  },
  addLocalSection: (v) => set((state) => ({ existingSections: [...state.existingSections, v] })),
  resetForm: () => set({ sectionTitle: "", customSection: "", sectionDate: null, title: "", time: "", location: "", type: "Activity", notes: "" }),
  removeActivityLocally: (itineraryId: string, activityId: string) => {
    set((state) => ({
      timeline: state.timeline.map((day) => {
        if (day._id !== itineraryId) return day;
        return {
          ...day,
          sections: day.sections.map((sec) => ({
            ...sec,
            activities: sec.activities.filter((act) => act._id !== activityId)
          }))
        };
      })
    }));
  },
}))
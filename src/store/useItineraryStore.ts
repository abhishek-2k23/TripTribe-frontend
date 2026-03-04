import type { ItineraryState } from "@/types/itinerary.types"
import { create } from "zustand"

export const useItineraryStore = create<ItineraryState>((set, get) => ({

  isAddActivityOpen: false,

  sectionTitle: "",
  customSection: "",
  sectionDate: null,

  title: "",
  time: "",
  location: "",
  type: "",
  notes: "",
  attachment: null,
  activities: [], 
  timeline: [],

  openModal: () => set({ isAddActivityOpen: true }),

  closeModal: () => {
    set({ isAddActivityOpen: false })
    get().resetForm()
  },
  setTimeline: (data) => set({ timeline: data }),

  // This handles the response from our addActivity controller
  addActivityToTimeline: (updatedDay) => {
    set((state) => {
      const existingDayIndex = state.timeline.findIndex(
        (d) => new Date(d.date).toDateString() === new Date(updatedDay.date).toDateString()
      );

      if (existingDayIndex > -1) {
        // Replace the existing day with the updated version from backend
        const newTimeline = [...state.timeline];
        newTimeline[existingDayIndex] = updatedDay;
        return { timeline: newTimeline };
      } else {
        // Add as a new day and sort by date
        return { 
          timeline: [...state.timeline, updatedDay].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          ) 
        };
      }
    });
  },

  setSectionTitle: (v) => set({ sectionTitle: v }),
  setCustomSection: (v) => set({ customSection: v }),
  setSectionDate: (v) => set({ sectionDate: v }),

  setTitle: (v) => set({ title: v }),
  setTime: (v) => set({ time: v }),
  setLocation: (v) => set({ location: v }),
  setType: (v) => set({ type: v }),
  setNotes: (v) => set({ notes: v }),
  setAttachment: (v) => set({ attachment: v }),

  addActivity: (activities) => {
    set({activities: activities})
    get().resetForm()
  },

  resetForm: () =>
    set({
      sectionTitle: "",
      customSection: "",
      sectionDate: null,
      title: "",
      time: "",
      location: "",
      type: "",
      notes: "",
      attachment: null
    })

}))
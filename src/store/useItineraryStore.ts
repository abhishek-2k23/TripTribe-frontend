// store/useItineraryStore.ts
import type { ItineraryDay, ItineraryState } from "@/types/itinerary.types"
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
    if (Array.isArray(itinerary)) {
      set({
        timeline: itinerary,
        existingSections: sections,
      })
    }
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
  setTimeline: (data: any, sections: any) =>
    set({ timeline: data, existingSections: sections }),
  addActivityToTimeline: (newDay: any) =>
    set((state) => ({ timeline: [...state.timeline, newDay] })),

  //sync day for ws
  syncDayPlan: (updatedDay: ItineraryDay) => {
    set((state) => {
      // Check if this day already exists in our local state
      const dayExists = state.timeline.some((day) => day._id === updatedDay._id)

      if (dayExists) {
        // CASE 2: Day exists. Replace the old version with the new one (includes new activities/sections)
        return {
          timeline: state.timeline.map((day) =>
            day._id === updatedDay._id ? updatedDay : day,
          ),
        }
      } else {
        // CASE 1: Completely new day. Add it to the array and re-sort by date.
        const newTimeline = [...state.timeline, updatedDay].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )

        return {
          timeline: newTimeline,
          // Also update existingSections if the new day brought a new section title
          existingSections: Array.from(
            new Set([
              ...state.existingSections,
              ...updatedDay.sections.map((s) => s.section),
            ]),
          ),
        }
      }
    })
  },

  
  addLocalSection: (v) =>
    set((state) => ({ existingSections: [...state.existingSections, v] })),
  resetForm: () =>
    set({
      sectionTitle: "",
      customSection: "",
      sectionDate: null,
      title: "",
      time: "",
      location: "",
      type: "Activity",
      notes: "",
    }),
  removeActivityLocally: (itineraryId: string, activityId: string) => {
    set((state) => ({
      timeline: state.timeline.map((day) => {
        if (day._id !== itineraryId) return day
        return {
          ...day,
          sections: day.sections.map((sec: any) => ({
            ...sec,
            activities: sec.activities.filter(
              (act: any) => act._id !== activityId,
            ),
          })),
        }
      }),
    }))
  },
}))

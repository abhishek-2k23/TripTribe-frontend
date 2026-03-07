import { create } from "zustand"
import type { TripSettingsState } from "../types/setting.types"

const useTripSettingsStore = create<TripSettingsState>((set) => ({
  tripName: "",
  tripDescription: "",
  tripLocation: "",
  startDate: null,
  endDate: null,
  coverImage: { url: "", public_id: "" },
  isUpdatingCover: false,
  members: [],

  inviteEmail: "",
  inviteRole: "editor",
  isDeletingMember: null,

  setTripName: (v) => set({ tripName: v }),
  setStartDate: (v) => set({ startDate: v }),
  setEndDate: (v) => set({ endDate: v }),
  setCoverImage: (v) =>
    set((state) => ({
      coverImage: {
        ...state.coverImage, // Keep existing fields if necessary
        url: v.url,
        public_id: v.public_id,
      },
    })),
  setTripDescription: (v) => set({ tripDescription: v }),
  setTripLocation: (v) => set({ tripLocation: v }),

  setMembers: (v) => set({ members: v }),

  updateMemberRole: (userId, role) =>
    set((state) => ({
      members: state.members.map((m) =>
        m._id === userId ? { ...m, role } : m,
      ),
    })),

  setInviteEmail: (v) => set({ inviteEmail: v }),
  setInviteRole: (v) => set({ inviteRole: v }),

  removeMember: (userId) =>
    set((state) => ({
      members: state.members.filter((m) => m._id !== userId),
    })),

  setDeletingMember: (userId) => set({ isDeletingMember: userId }),

  reset: () =>
    set({
      tripName: "",
      startDate: null,
      endDate: null,
      coverImage: { url: "", public_id: "" },
      members: [],
      inviteEmail: "",
      inviteRole: "editor",
    }),

  setIsUpdatingCover: (v) => set({ isUpdatingCover: v }),
}))

export default useTripSettingsStore

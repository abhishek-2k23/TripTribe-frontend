
export interface Member {
  _id: string
  name: string
  email: string
  imageUrl?: string
  role: "owner" | "editor" | "viewer"
}

export interface TripSettingsState {

  tripName: string
  tripDescription: string
  tripLocation: string
  startDate: Date | null
  endDate: Date | null
  coverImage: {url: string, public_id: string}

  members: Member[]

  inviteEmail: string
  inviteRole: "editor" | "viewer"

  isUpdatingCover: boolean

  removeMember: (userId: string) => void;
  isDeletingMember: string | null;
  setDeletingMember: (userId: string | null) => void;
  setTripName: (v:string)=>void
  setStartDate: (v:Date)=>void
  setEndDate: (v:Date)=>void
  setCoverImage: (v:{url: string, public_id: string})=>void
  setTripDescription: (v:string) => void
  setTripLocation: (v:string) => void

  setMembers: (v:Member[])=>void
  updateMemberRole: (userId:string,role:Member["role"])=>void

  setInviteEmail: (v:string)=>void
  setInviteRole: (v:"editor"|"viewer")=>void

  reset: ()=>void
  setIsUpdatingCover: (v:boolean) => void
}

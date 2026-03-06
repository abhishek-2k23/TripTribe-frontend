"use client"


import { Button } from "@/components/ui/button"
import { useTripSettings } from "@/hooks/useSetting"
import GeneralInfoCard from "../settings/GeneralInfoCard"
import CollaborationCard from "../settings/CollaborationCard"
import InviteMemberCard from "../settings/InviteMemberCard"
import DangerZoneCard from "../settings/DangerZoneCard"
import useTripDetailsStore from "@/store/useTripDetails"
import useMyTripStore from "@/store/useMyTrip"
import useTripSettingsStore from "@/store/useSettingStore"
import { useEffect } from "react"

export default function SettingsPage(){
    // 1. Get IDs and Data from existing stores
  const selectedTripId = useTripDetailsStore((s) => s.selectedTripId);
  const trips = useMyTripStore((s) => s.trips);
  
  // 2. Get Setters from the Settings store
  const settings = useTripSettingsStore();

  useEffect(() => {
    // Find the specific trip detail from our list
    const trip = trips.find((t) => t._id === selectedTripId);

    if (trip) {
      // Sync basic info
      settings.setTripName(trip.name);
      settings.setStartDate(new Date(trip.startDate));
      settings.setEndDate(new Date(trip.endDate));
      settings.setCoverImage(trip.image?.url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e");
      settings.setTripDescription(trip.description);
      settings.setTripLocation(trip.location);

      // Map TripMember (nested user object) to your Setting's Member structure
      const formattedMembers = trip.members.map((m) => ({
        _id: m.user._id,
        name: m.user.name,
        email: m.user.email,
        imageUrl: m.user.imageUrl,
        
        role: m.role as "owner" | "editor" | "viewer",
      }));

      settings.setMembers(formattedMembers);
    }
  }, [selectedTripId, trips]);
  const {saveSettings} = useTripSettings()

  const handleSave = () => {
    const {tripName, startDate, endDate, members} = settings;
    saveSettings({tripName, startDate, endDate, members});
  }
  return (

    <div className="space-y-6 p-6">

      <GeneralInfoCard />

      <CollaborationCard />

      <InviteMemberCard />

      <DangerZoneCard />

      <div className="flex justify-end gap-4">

        <Button variant="outline">
          Cancel
        </Button>

        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={handleSave}
        >
          Save Changes
        </Button>

      </div>

    </div>

  )

}
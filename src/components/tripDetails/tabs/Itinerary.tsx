import { useItinerary } from "@/hooks/useItinerary"
import { useItineraryStore } from "@/store/useItineraryStore"
import ActivityTimeline from "../itinerary/ActivityTimeLine"
import useTripDetailsStore from "@/store/useTripDetails"
import { useEffect } from "react"
import DiscussionPanel from "../sidebar/DiscussionPanel"
import AddActivityButton from "../AddActivityButton"
import { ItinerarySkelton } from "@/components/shimmerUI/itineraryShimmer"

export default function Itinerary() {
  const { fetchItineraries } = useItinerary()
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)
  const activites = useItineraryStore((state) => state.activities)
  const loading = useItineraryStore((state) => state.loading)

  useEffect(() => {
    fetchItineraries()
  }, [selectedTripId])

  if (loading) {
    return <ItinerarySkelton />
  }

  return (
    <div className="w-full flex justify-between space-y-4 gap-6">
      {/* Day Header */}
      <div className="w-3/4">
        {activites.length === 0 ? (
          <div className="mx-auto w-full flex flex-col items-center justify-center">
            {" "}
            <img
              src="https://res.cloudinary.com/daamrpzus/image/upload/v1772927233/TripTribe/ChatGPT_Image_Mar_8__2026__05_12_30_AM-removebg-preview_orutvf.png"
              alt="no deb"
            />{" "}
            <div className="space-y-6 w-1/2 flex flex-col items-center">
              <p className="text-navy text-2xl font-semibold w-fit">
                No itinerary added yet
              </p>
              <AddActivityButton />
            </div>
          </div>
        ) : (
          <ActivityTimeline activities={activites} />
        )}
      </div>
      <div className="w-1/4 space-y-6">
        {/* <TripSummary /> */}
        <DiscussionPanel />
      </div>
    </div>
  )
}

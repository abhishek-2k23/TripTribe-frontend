import { useItinerary } from "@/hooks/useItinerary";
import { useItineraryStore } from "@/store/useItineraryStore";
import ActivityTimeline from "../itinerary/ActivityTimeLine";
import useTripDetailsStore from "@/store/useTripDetails";
import { useEffect } from "react";
import TripSummary from "../sidebar/TripSummary";
import DiscussionPanel from "../sidebar/DiscussionPanel";

export default function Itinerary() {
  const {fetchItineraries} = useItinerary();
  const selectedTripId = useTripDetailsStore(state => state.selectedTripId)
  const activites = useItineraryStore(state => state.activities);

  useEffect(() => {
    fetchItineraries();
  }, [selectedTripId])

  return (
    <div className="w-full flex justify-between space-y-4 gap-6">

      {/* Day Header */}
      <div className="w-3/4">

          <ActivityTimeline activities={activites} />
      </div>
    <div className="w-1/4 space-y-6">
        <TripSummary />
        <DiscussionPanel />
      </div>

    </div>
  );
}
import { useItinerary } from "@/hooks/useItinerary";
import { useItineraryStore } from "@/store/useItineraryStore";
import ActivityTimeline from "../itinerary/ActivityTimeLine";
import useTripDetailsStore from "@/store/useTripDetails";
import { useEffect } from "react";

export default function Itinerary() {
  const {fetchItineraries} = useItinerary();
  const selectedTrip = useTripDetailsStore(state => state.selectedTrip)
  const activites = useItineraryStore(state => state.activities);

  useEffect(() => {
    fetchItineraries();
  }, [selectedTrip])

  return (
    <div className="space-y-4">

      {/* Day Header */}
    <ActivityTimeline activities={activites} />
    
    </div>
  );
}
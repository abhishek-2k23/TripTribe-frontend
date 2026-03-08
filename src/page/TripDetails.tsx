import TripBodyLayout from "@/components/tripDetails/TripBody"
import TripHeader from "@/components/tripDetails/TripHeader"
import useMyTrips from "@/hooks/useMyTrips"
import useMyTripStore from "@/store/useMyTrip"
import useTripDetailsStore from "@/store/useTripDetails"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useWebSocketEmmits from "@/hooks/useWebSocketEmmit"
import TripDetailsSkeleton from "@/components/shimmerUI/TripDetailsSkelton"

function TripDetails() {
  const { tripId } = useParams()
  const { setSelectedTripId } = useTripDetailsStore()
  const { trips } = useMyTripStore()
  const { fetchOneTrip } = useMyTrips()

  useEffect(() => {
    if (!tripId) return
    setSelectedTripId(tripId)
    fetchOneTrip(tripId)
  }, [])

  useWebSocketEmmits();

  const selectedTrip = useTripDetailsStore((s) => s.selectedTrip)
  console.log(selectedTrip, trips)
  if (!selectedTrip) return <TripDetailsSkeleton />

  return (
    <div>
      <TripHeader {...selectedTrip} />
      <TripBodyLayout />
    </div>
  )
}

export default TripDetails

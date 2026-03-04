import TripBodyLayout from '@/components/tripDetails/TripBody';
import TripHeader from '@/components/tripDetails/TripHeader';
import useTripDetailsStore from '@/store/useTripDetails';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'

function TripDetails() {
    const {state} = useLocation();
   const { tripId } = useParams(); 
  const { selectedTrip, setSelectedTrip } = useTripDetailsStore();
  useEffect(() => {
    setSelectedTrip(tripId || "")
  }, [tripId])

  if (!selectedTrip) return <p>Loading trip...</p>;

  return (
    <div>
      <TripHeader  {...state.trip}/>
      <TripBodyLayout />
    </div>
  )
}




export default TripDetails
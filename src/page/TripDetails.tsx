import TripBodyLayout from '@/components/tripDetails/TripBody';
import TripHeader from '@/components/tripDetails/TripHeader';
import useTripDetailsStore from '@/store/useTripDetails';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'

function TripDetails() {
    const {state} = useLocation();
   const { tripId } = useParams(); 
  const { selectedTripId, setSelectedTripId } = useTripDetailsStore();
  useEffect(() => {
    setSelectedTripId(tripId || state.trip._id)
  }, [tripId])

  if (!selectedTripId) return <p>Loading trip...</p>;

  return (
    <div>
      <TripHeader  {...state.trip}/>
      {
        selectedTripId === "" ? <p>Loading trip...</p> : <TripBodyLayout />
      }
      
    </div>
  )
}




export default TripDetails
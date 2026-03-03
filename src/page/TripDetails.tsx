import TripHeader from '@/components/tripDetails/TripHeader';
import React from 'react'
import { useLocation } from 'react-router-dom'

function TripDetails() {
    const {state} = useLocation();
    console.log(state.trip);

  return (
    <div>
      <TripHeader  {...state.trip}/>
    </div>
  )
}




export default TripDetails
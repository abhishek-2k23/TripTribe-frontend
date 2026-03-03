import useMyTripStore from "@/store/useMyTrip"
import TripCard from "./TripCard"
import { useNavigate } from "react-router-dom"
import TripCardSkeleton from "./TripCardSkelton"
import traveller from '../../assets/travellers.png'
import { Button } from "../ui/button"
import { LucideRefreshCw} from "lucide-react"
import useMyTrips from "@/hooks/useMyTrips"
function Trips() {
  const navigate = useNavigate()
  const trips = useMyTripStore((state) => state.trips)
  const isLoading = useMyTripStore((state) => state.isLoading)
  const {fetchTrips} = useMyTrips();
  console.log(trips);
  return (
    <div className="mt-5 p-3">
      <div className="flex justify-between items-center text-primary">
        <h1 className="text-navy font-bold text-3xl">My Trips</h1>
        <div className=' flex gap-4 text-primary'>
            <Button variant={"navy"} className='w-10 h-10 rounded-full border' onClick={fetchTrips}> <LucideRefreshCw /> </Button>
        </div>
      </div>

      {isLoading ? (
        <TripCardSkeleton />
      ) : trips.length === 0 ? <div className="w-full flex flex-col justify-center items-center"><img src={traveller} alt="no trips found" className="w-fit"/><p className="text-navy font-bold text-2xl">No trips Found</p></div> : (<div className="flex flex-wrap gap-5 mt-5">
          {trips?.map((trip) => (
            <div
              key={trip?._id}
              onClick={() =>
                navigate(`/home/my-trips/trip-details`, { state: { trip: trip } })
              }
            >
              <TripCard key={trip._id} {...trip} activityCount={0} budgetTotal={0} />{" "}
            </div>
          ))}
        </div>) }
    </div>
  )
}

export default Trips

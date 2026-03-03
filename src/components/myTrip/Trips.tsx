
import useMyTripStore from '@/store/useMyTrip'
import TripCard from './TripCard';

function Trips() {
  const trips = useMyTripStore((state) => state.trips);
  console.log(trips);
  return (
    <div className='mt-5 p-3'>
      <div className='flex justify-between items-center text-primary'> 
        <h1 className='text-navy font-bold text-3xl'>My Trips</h1>
        {/* <div className=' flex gap-4 text-primary'>
            <Button variant={"navy"} className='w-20' >List </Button>
            <Button variant={"navy"}>Coloumn </Button>
        </div> */}
      </div>

      <div className='flex flex-wrap gap-5 mt-5'>

      {
        trips?.map((trip) => <TripCard {...trip} activityCount={0} budgetTotal={0}/>)
      }
      </div>
    </div>
  )
}

export default Trips
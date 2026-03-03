import useAuthStore from '@/store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import useMyTripStore from '@/store/useMyTrip';
import JoinTripButton from './JoinTripButton';

function Header() {
    
    const clerkUser = useAuthStore((state) => state.clerkUser);

    const setOpen = useMyTripStore((state) => state.setIsCreateTripModalOpen);  
    const setIsJoinTripOpen = useMyTripStore((state) => state.setIsJoinTripOpen);  

    const handleCreateNewTrip = () => {
        setOpen(true);
    }

    const handleJoinTrip = () => {
        setIsJoinTripOpen(true);
    }
    
  return (
    <div className='flex justify-between items-center px-3'>
        <div className='flex gap-3 justify-center items-center'>
            <Avatar>
                <AvatarImage src={clerkUser?.image}  alt={clerkUser?.name?.substring(0, 2) || 'User Avatar'} />
                <AvatarFallback>{clerkUser?.name?.substring(0, 2) || 'NA'}</AvatarFallback>
            </Avatar>
            <div className='flex-col gap-2 '>
                <p className='font-bold text-lg'>Welcome back, {clerkUser?.name}!</p>
                <p className='text-sm font-normal'>Ready for your next adventure?</p>
            </div>
        </div>
        <div className='flex gap-2'>

            <JoinTripButton />
            <Button variant="hero" onClick={handleCreateNewTrip} > + Create New Trip</Button>
        </div>
    </div>
  )
}

export default Header
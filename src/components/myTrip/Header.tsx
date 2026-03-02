import useAuthStore from '@/store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import useMyTripStore from '@/store/useMyTrip';

function Header() {
    
    const clerkUser = useAuthStore((state) => state.clerkUser);

    const setOpen = useMyTripStore((state) => state.setIsCreateTripModalOpen);  

    const handleCreateNewTrip = () => {
        setOpen(true);
    }
    
  return (
    <div className='flex justify-between items-center px-3'>
        <div className='flex gap-3 justify-center items-center'>
            <Avatar>
                <AvatarImage  alt={clerkUser?.name?.substring(0, 2) || 'User Avatar'} />
                <AvatarFallback>{clerkUser?.name?.substring(0, 2) || 'NA'}</AvatarFallback>
            </Avatar>
            <div className='flex-col gap-2 '>
                <p className='font-bold text-lg'>Welcome back, {clerkUser?.name}!</p>
                <p className='text-sm font-normal'>Ready for your next adventure?</p>
            </div>
        </div>

        <Button className='bg-[#FF7A00] p-5 py-6 rounded-full font-bold text-lg' onClick={handleCreateNewTrip} > + Create New Trip</Button>
    </div>
  )
}

export default Header
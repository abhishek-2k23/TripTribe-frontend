import { useApi } from "../services/api";
import useMyTripStore from "@/store/useMyTrip";
import useTripDetailsStore from "@/store/useTripDetails";
import toast from "react-hot-toast";

 type tripData = {
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    image: File | null,
}
const useMyTrips = () => {
    const api = useApi();
    const {setTrip, addTrip, setIsLoading
    } = useMyTripStore()
    const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)
    const setSelectedTrip = useTripDetailsStore((state) => state.setSelectedTrip)
    const createTrip = async (tripData: tripData) => {
        
            const toastId = toast.loading("creating your trip");
        try {
            const response = await api.post("/trips/create", tripData);
            if(response.success){
                toast.dismiss(toastId);
                toast.success("Trip created successfully")
                addTrip(response.data);
            }
        } catch (error) {
            console.error("Error creating trip:", error);
            toast.dismiss(toastId)
            toast.error(error.message);
            throw error;
        }
    };
    const fetchTrips = async () => {
        setIsLoading(true);
        console.log("fetching trip");
        try{
            const response = await api.get("/trips/my-trips");
            setTrip(response.data)
        }catch(error){
            console.error("Error fetching trips:", error);
        }finally{
            setIsLoading(false);
        }
    }

    const fetchOneTrip =  async (tripId: string) => {
        const toastId = toast.loading("loading the trip details");
        try{
            console.log(selectedTripId);
            const res = await api.get(`/trips/${tripId}`);
            if(res.success){
                toast.success("Trip data loaded successfully", {id: toastId});
                setSelectedTrip(res.data);
            }
            console.log(res);
        }catch(e){
            console.log(e.message);
            toast.error(e.message, {id: toastId})
        }
    }
    const joinTrip = async (inviteCode: string) => {
        const toastId = toast.loading("joining the trip")
        try{
            const response = await api.post("/trips/join", {inviteCode});
            console.log(response);
            if(response.success){
                addTrip(response.data);
                toast.dismiss(toastId);
                toast.success("Joined Trip successfully");
                console.log(response);
            }
        }catch(error){
            console.log("error in joining trips: ", error);
            toast.dismiss(toastId);
            toast.error(error.message)
        }
    }
    return {
        fetchTrips,
        createTrip,
        joinTrip,
        fetchOneTrip
    }
}

export default useMyTrips;
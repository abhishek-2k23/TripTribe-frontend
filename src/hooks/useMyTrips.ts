import { useEffect } from "react";
import { useApi } from "../services/api";
import useMyTripStore from "@/store/useMyTrip";
import toast, { ToastIcon } from "react-hot-toast";

 type tripData = {
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    image: File | null,
}
const useMyTrips = () => {
    const api = useApi();
    const {setTrip, addTrip, setIsLoading, trips
    } = useMyTripStore()
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
    useEffect(() => {
        if(trips.length === 0){

            fetchTrips();
        }
    }, [])
    return {
        fetchTrips,
        createTrip,
        joinTrip,
    }
}

export default useMyTrips;
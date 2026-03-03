import { useEffect } from "react";
import { useApi } from "../services/api";
import useMyTripStore from "@/store/useMyTrip";

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
    const createTrip = async (tripData: tripData) => {
        try {
            const response = await api.post("/trips/create", tripData);
            if(response.success){
                addTrip(response.data);
            }
        } catch (error) {
            console.error("Error creating trip:", error);
            throw error;
        }
    };
    const fetchTrips = async () => {
        setIsLoading(true);
        try{
            const response = await api.get("/trips/my-trips");
            setTrip(response.data)
        }catch(error){
            console.error("Error fetching trips:", error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchTrips();
    }, [])
    return {
        createTrip,
    }
}

export default useMyTrips;
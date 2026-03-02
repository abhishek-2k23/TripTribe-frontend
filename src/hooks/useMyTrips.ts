import { useApi } from "../services/api";

 type tripData = {
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    image: File | null,
}
const useMyTrips = () => {
    const api = useApi();

    const createTrip = async (tripData: tripData) => {
        try {
            const response = await api.post("/trips/create", tripData);
            return response.data;
        } catch (error) {
            console.error("Error creating trip:", error);
            throw error;
        }
    };
    const fetchTrips = async () => {
        try{
            const response = await api.get("/trips");
            return response.data;
        }catch(error){
            console.error("Error fetching trips:", error);
        }
    }

    return {
        createTrip,
        fetchTrips
    }
}

export default useMyTrips;
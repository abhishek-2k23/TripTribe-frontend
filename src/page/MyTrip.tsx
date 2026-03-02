import Header from "@/components/myTrip/Header";
import CreateTripModal from "@/components/myTrip/CreateTripModal";
import useMyTripStore from "@/store/useMyTrip";
import useMyTrips from "@/hooks/useMyTrips";

export default function MyTrips() {
  const isCreateTripModalOpen = useMyTripStore((state) => state.isCreateTripModalOpen);
  const setIsCreateTripModalOpen = useMyTripStore((state) => state.setIsCreateTripModalOpen);
  useMyTrips();
  return (
    <div>
      <Header />
      {isCreateTripModalOpen && <CreateTripModal open={isCreateTripModalOpen} onClose={() => setIsCreateTripModalOpen(false)} />}

    </div>
  );
}
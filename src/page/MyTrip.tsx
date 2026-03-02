import Header from "@/components/myTrip/Header";
import CreateTripModal from "@/components/myTrip/CreateTripModal";
import useMyTripStore from "@/store/useMyTrip";

export default function MyTrips() {
  const isCreateTripModalOpen = useMyTripStore((state) => state.isCreateTripModalOpen);
  const setIsCreateTripModalOpen = useMyTripStore((state) => state.setIsCreateTripModalOpen);
  return (
    <div>
      <Header />
      {isCreateTripModalOpen && <CreateTripModal open={isCreateTripModalOpen} onClose={() => setIsCreateTripModalOpen(false)} />}

    </div>
  );
}
import useAuthStore from "../store/useAuthStore";
export default function MyTrips() {
    const clerkUser = useAuthStore((state) => state.clerkUser);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Trips {clerkUser?.name}</h1>
      <p className="text-gray-600">
        Here you will see all trips you are part of.
      </p>
    </div>
  );
}
import { create } from "zustand";

interface MyTripState{
    isCreateTripModalOpen: boolean;
    setIsCreateTripModalOpen: (open: boolean) => void;
}
const useMyTripStore =  create<MyTripState>((set) => ({
    isCreateTripModalOpen: false,
    setIsCreateTripModalOpen: (open) => set({isCreateTripModalOpen: open}),
}))

export default useMyTripStore; 
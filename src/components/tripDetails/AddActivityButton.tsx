
import { Plus } from "lucide-react";
import AddActivityModal from "./tabs/AddActivityModal";
import { useItineraryStore } from "@/store/useItineraryStore";
import { Button } from "../ui/button";

export default function AddActivityButton() {
  const openModel = useItineraryStore((state) => state.openModal);


  return (
    <>
      <Button
        onClick={openModel}
        variant="heroOutline"
        className="w-full mb-5 rounded-md hover:bg-navy-foreground"
      >
        <Plus size={16} />
        Add Activity
      </Button>

      <AddActivityModal />
    </>
  );
}
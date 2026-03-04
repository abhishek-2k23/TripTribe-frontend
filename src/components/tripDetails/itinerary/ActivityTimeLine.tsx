import DayCard from "./DayCard";
import type { Activity } from "@/types/itinerary.types";
interface Props {
  activities: Activity[];
}

export default function ActivityTimeline({ activities }: Props) {
  return (
    <div className="space-y-10">

      {activities.map((day, index) => (
        <DayCard key={day._id} day={day} index={index} />
      ))}

    </div>
  );
}
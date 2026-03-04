import { Card } from "@/components/ui/card";
import { MapPin, Paperclip } from "lucide-react";
import type { Activity } from "@/types/itinerary.types";

interface Props {
  activity: Activity;
}

export default function ActivityCard({ activity }: Props) {
  return (
    <Card className="p-4 rounded-xl shadow-sm">

      <p className="text-sm text-muted-foreground mb-1">
        {activity.time}
      </p>

      <h4 className="font-semibold">
        {activity.title}
      </h4>

      {activity.location && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <MapPin size={14} />
          {activity.location}
        </div>
      )}

      {activity.attachment && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Paperclip size={14} />
          Attachment
        </div>
      )}

      {activity.notes && (
        <p className="text-xs italic text-muted-foreground mt-2">
          "{activity.notes}"
        </p>
      )}

    </Card>
  );
}
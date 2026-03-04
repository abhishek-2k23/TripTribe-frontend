import { Card } from "@/components/ui/card";
import { MapPin, Paperclip } from "lucide-react";

interface Props {
  time: string;
  title: string;
  location?: string;
  note?: string;
  attachment?: string;
}

export default function ActivityCard({
  time,
  title,
  location,
  note,
  attachment
}: Props) {
  return (
    <Card className="p-4 rounded-xl shadow-sm">

      <p className="text-sm text-muted-foreground mb-2">
        {time}
      </p>

      <h4 className="font-semibold">{title}</h4>

      {location && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <MapPin size={14} />
          {location}
        </div>
      )}

      {attachment && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Paperclip size={14} />
          {attachment}
        </div>
      )}

      {note && (
        <p className="text-xs text-muted-foreground italic mt-2">
          "{note}"
        </p>
      )}

    </Card>
  );
}
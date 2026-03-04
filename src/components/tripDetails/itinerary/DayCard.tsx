import { format } from "date-fns";
import SectionBlock from "./SectionBlock";

interface Props {
  day: any;
  index: number;
}

export default function DayCard({ day, index }: Props) {
  const date = new Date(day.date);

  return (
    <div className="flex gap-6">

      {/* DAY NUMBER */}
      <div className="flex flex-col items-center">

        <div className="bg-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="w-px flex-1 bg-border mt-2" />

      </div>

      {/* DAY CONTENT */}
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">
            Day {index + 1}
          </h3>

          <p className="text-sm text-muted-foreground">
            {format(date, "EEEE, MMMM d")}
          </p>
        </div>

        {/* Sections */}
        {day.sections.map((section: any) => (
          <SectionBlock key={section._id} section={section} />
        ))}

      </div>

    </div>
  );
}
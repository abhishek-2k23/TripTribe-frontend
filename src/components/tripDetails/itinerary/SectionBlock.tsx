import AddActivityButton from "../AddActivityButton";
import ActivityCard from "./ActivityCard";

interface Props {
  section: any;
}

export default function SectionBlock({ section }: Props) {
  return (
    <div className="space-y-4">

      {/* SECTION TITLE */}
      <h4 className="font-semibold text-base">
        {section.section}
      </h4>

      {/* ACTIVITIES */}
      <div className="space-y-3">

        {section.activities.map((activity: any) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
        <AddActivityButton />

      </div>

    </div>
  );
}
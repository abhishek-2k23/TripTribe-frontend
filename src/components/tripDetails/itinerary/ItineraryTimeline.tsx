import { useItineraryStore } from "@/store/useItineraryStore";
import { format } from "date-fns";
import AddActivityButton from "../AddActivityButton";

export function ItineraryTimeline() {
  const timeline  = useItineraryStore((s) => s.timeline);


  return (
    <div className="space-y-12 p-6">
      {timeline.map((day, dayIndex) => (
        <div key={day._id} className="relative">
          {/* Day Header (e.g., 01 Arrival & Gion District) */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-navy text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
              {String(dayIndex + 1).padStart(2, '0')}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {day.sections[0]?.section || "Daily Plan"}
              </h2>
              <p className="text-slate-500 font-medium">
                {format(new Date(day.date), "EEEE, MMMM dd")}
              </p>
            </div>
          </div>

          {/* Activities List */}
          <div className="ml-6  border-slate-100 pl-10 space-y-6">
            {day.sections.map((section) => 
              section.activities.map((activity) => (
                <div key={activity._id} className="relative bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[51px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-300 border-4 border-white" />
                  
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                      {activity.time}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{activity.title}</h3>
                  <div className="flex items-center text-slate-500 gap-1 text-sm mb-4">
                     <span className="text-xs">📍</span> {activity.location}
                  </div>

                  {activity.notes && (
                    <p className="text-slate-500 italic text-sm">"{activity.notes}"</p>
                  )}
                </div>
              ))
            )}
            <AddActivityButton />
          </div>
        </div>
      ))}
    </div>
  );
}
import { useItineraryStore } from "@/store/useItineraryStore"
import { format } from "date-fns"
import AddActivityButton from "../AddActivityButton"
import { useState } from "react"
import type { Activity } from "@/types/itinerary.types"
import { useItinerary } from "@/hooks/useItinerary"
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  MapPin,
  Trash2,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ItineraryTimeline() {
  const timeline = useItineraryStore((s) => s.timeline)
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>(
    {},
  )
  const [deleteConfig, setDeleteConfig] = useState<{
    itineraryId: string
    activityId: string
  } | null>(null)
  const toggleDay = (dayId: string) => {
    setCollapsedDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }))
  }
  const { handleDelete, handleToggle } = useItinerary()

  const confirmDelete = () => {
    if (!deleteConfig) return
    handleDelete(deleteConfig?.activityId, deleteConfig?.itineraryId)
    setDeleteConfig(null)
  }

  return (
    <div className="space-y-12 p-6">
      {timeline.map((day, dayIndex) => {
        const isCollapsed = collapsedDays[day._id]

        return (
          <div key={day._id} className="relative">
            {/* Day Header */}
            <div
              className="flex items-center justify-between cursor-pointer group mb-8"
              onClick={() => toggleDay(day._id)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-navy text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  {String(dayIndex + 1).padStart(2, "0")}
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
              <div className="text-slate-400 group-hover:text-navy transition-colors">
                {isCollapsed ? (
                  <ChevronDown size={24} />
                ) : (
                  <ChevronUp size={24} />
                )}
              </div>
            </div>

            {/* Activities List - Collapsible */}
            {!isCollapsed && (
              <div className="ml-6 border-l-2 border-slate-100 pl-10 space-y-6 transition-all">
                {day.sections.map((section: {section: string, activities: Activity[]}) =>
                  section.activities.map((activity) => (
                    <div
                      key={activity._id}
                      className={`relative bg-white border rounded-2xl p-6 shadow-sm transition-all ${
                        activity.isDone
                          ? "border-green-200 bg-green-50/30"
                          : "border-slate-200"
                      }`}
                    >
                      {/* Timeline Dot */}
                      <div
                        className={`absolute -left-[51px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white transition-colors ${
                          activity.isDone ? "bg-green-500" : "bg-slate-300"
                        }`}
                      />

                      <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                          {activity.time}
                        </span>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggle(activity, day._id)}
                            className={`p-1 rounded-full transition-colors ${activity.isDone ? "text-green-600" : "text-slate-400 hover:text-green-600"}`}
                          >
                            {activity.isDone ? (
                              <CheckCircle2 size={20} />
                            ) : (
                              <Circle size={20} />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfig({
                                itineraryId: day._id,
                                activityId: activity._id,
                              })
                            }
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <h3
                        className={`text-lg font-bold mb-1 transition-colors ${
                          activity.isDone
                            ? "text-slate-400 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {activity.title}
                      </h3>

                      <div className="flex items-center text-slate-500 gap-1 text-sm mb-4">
                        <MapPin size={14} className="text-slate-400" />{" "}
                        {activity.location}
                      </div>

                      {activity.notes && (
                        <p
                          className={`italic text-sm transition-colors ${
                            activity.isDone
                              ? "text-slate-300"
                              : "text-slate-500"
                          }`}
                        >
                          "{activity.notes}"
                        </p>
                      )}
                    </div>
                  )),
                )}
                <AddActivityButton />
              </div>
            )}
          </div>
        )
      })}

      <AlertDialog
        open={!!deleteConfig}
        onOpenChange={(open) => !open && setDeleteConfig(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This action cannot be undone. This will permanently delete the
              activity from your itinerary.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-full border-slate-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmDelete()}
              className="rounded-full bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Activity
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

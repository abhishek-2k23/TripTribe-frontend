"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useChecklistStore } from "@/store/useCheckListStore"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddChecklistModal } from "../checklist/AddCheckListItem"
import useTripDetailsStore from "@/store/useTripDetails"
import useChecklist from "@/hooks/useChecklist"
import { ChecklistSkeleton } from "@/components/shimmerUI/ChecklistShimmer"
import useAuthStore from "@/store/useAuthStore"

export default function Checklist() {
  const user = useAuthStore((s) => s.backendUser);
  const selectedTripId = useTripDetailsStore((s) => s.selectedTripId)
  const checklists = useChecklistStore((s) => s.checklists)
  const [isModalOpen, setModalOpen] = useState(false)
  const { fetchChecklist, toggleItem } = useChecklist()
  const isLoading = useChecklistStore((s) => s.isLoading)

  useEffect(() => {
    if (selectedTripId) fetchChecklist()
  }, [selectedTripId])

  console.log(checklists);
  if (isLoading) return <ChecklistSkeleton />

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-navy">Trip Checklists</h1>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Items
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(!checklists || checklists.length === 0) ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-90">
            <img
              src="https://res.cloudinary.com/daamrpzus/image/upload/v1772930403/TripTribe/ChatGPT_Image_Mar_8__2026__06_00_55_AM-removebg-preview_yszlxr.png"
              className="w-64 h-auto"
              alt="No checklists"
            />
            <p className="text-muted-foreground text-xl font-medium mt-4">
              Your tribe hasn't started a list yet.
            </p>
          </div>
        ) : (
          checklists.map((category) => {
            if (!category) return null; // Safety break

            const items = category.items || [];
            const totalItems = items.length;
            
            // Safe progress calculation
            const myCompletedCount = items.filter((item) =>
              item?.completedBy?.some((u) => u?._id === user?._id)
            ).length;
            
            const progress = totalItems > 0 ? (myCompletedCount / totalItems) * 100 : 0;

            return (
              <div key={category._id} className="bg-card border rounded-xl p-6 shadow-sm flex flex-col border-slate-100">
                <h3 className="text-xl font-semibold mb-1 truncate">{category.name || "Unnamed Category"}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Progress: {myCompletedCount} / {totalItems}
                </p>
                <Progress value={progress} className="h-2 mb-6" />

                <div className="space-y-4">
                  {items.map((item) => {
                    if (!item) return null; // Avoid crashing on null items

                    const completedBy = item.completedBy || [];
                    const isCheckedByMe = completedBy.some((u) => u?._id === user?._id);

                    return (
                      <div key={item._id} className="flex items-center justify-between gap-4 group">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <Checkbox
                            checked={!!isCheckedByMe}
                            onCheckedChange={(val) =>
                              toggleItem(category._id, item._id, !!val)
                            }
                          />
                          <span className={`truncate text-sm ${isCheckedByMe ? "line-through text-muted-foreground italic" : "text-slate-700 font-medium"}`}>
                            {item.title || "Untitled Item"}
                          </span>
                        </div>

                        {/* Safe Avatar Stack */}
                        <div className="flex -space-x-2 shrink-0 p-1">
                          {completedBy.slice(0, 3).map((member) => (
                            <Avatar key={member?._id} className="h-6 w-6 border-2 border-background ring-1 ring-black/5">
                              <AvatarImage src={member?.imageUrl} alt={member?.name} />
                              <AvatarFallback className="text-[10px] bg-slate-200">
                                {member?.name?.[0] || "?"}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {completedBy.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-slate-100 border-2 border-background flex items-center justify-center text-[10px] font-bold text-slate-500">
                              +{completedBy.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}
      </div>

      <AddChecklistModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        tripId={selectedTripId}
      />
    </div>
  )
}
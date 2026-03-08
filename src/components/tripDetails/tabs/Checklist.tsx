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

export default function Checklist() {
  const selectedTripId = useTripDetailsStore((s) => s.selectedTripId)
  const checklists = useChecklistStore((s) => s.checklists)
  const [isModalOpen, setModalOpen] = useState(false)
  const { fetchChecklist, toggleItem } = useChecklist()
  const isLoading = useChecklistStore((s) => s.isLoading)

  useEffect(() => {
    if (selectedTripId) fetchChecklist()
  }, [])

  if (isLoading) {
    return <ChecklistSkeleton />
  }
  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trip Checklists</h1>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="mr-2" /> Create New Checklist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklists.length === 0 ? (
          <div className="mx-auto w-full flex flex-col items-center justify-center">
            {" "}
            <img
              src="https://res.cloudinary.com/daamrpzus/image/upload/v1772930403/TripTribe/ChatGPT_Image_Mar_8__2026__06_00_55_AM-removebg-preview_yszlxr.png"
              alt="no deb"
            />{" "}
            <p className="text-navy text-2xl font-semibold">
              No checklists added
            </p>
          </div>
        ) : (
          checklists.map((category) => {
            const totalItems = category.items.length
            const completedItems = category.items.filter(
              (i) => i.isCompleted,
            ).length
            const progress =
              totalItems > 0 ? (completedItems / totalItems) * 100 : 0

            return (
              <div
                key={category._id}
                className="bg-card border rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {completedItems} of {category.items.length} items completed
                </p>
                <Progress value={progress} className="h-2 mb-6" />

                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={item.isCompleted}
                          onCheckedChange={(val) =>
                            toggleItem(category._id, item._id, !!val)
                          }
                        />
                        <span
                          className={
                            item.isCompleted
                              ? "line-through text-muted-foreground"
                              : ""
                          }
                        >
                          {item.title}
                        </span>
                      </div>
                      {item.isCompleted && item.completedBy && (
                        <Avatar className="h-6 w-6 border">
                          <AvatarImage src={item.completedBy.imageUrl} />
                          <AvatarFallback>
                            {item.completedBy.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
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

import { Pencil, CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils" // Standard Shadcn utility
import useTripSettingsStore from "@/store/useSettingStore"
import { Textarea } from "@/components/ui/textarea"
import { useTripSettings } from "@/hooks/useSetting"
import { useRef } from "react"

export default function TripGeneralInfo() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    tripName,
    setTripName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    coverImage,
    setCoverImage,
    tripDescription,
    setTripDescription,
    tripLocation,
    setTripLocation,
    isUpdatingCover,
  } = useTripSettingsStore()
  const { handleCoverUpload } = useTripSettings()

  return (
    <Card className="p-6 space-y-6">
      <h3 className="font-semibold text-lg border-b pb-2">
        General Information
      </h3>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Inputs Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Trip Title
            </label>
            <Input
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              className="text-lg font-medium"
              placeholder="e.g. Europe Backpacking"
            />

            <label className="text-sm font-medium text-muted-foreground">
              Trip Description
            </label>
            <Textarea
              value={tripDescription}
              onChange={(e) => setTripDescription(e.target.value)}
              className="text-lg font-medium"
              placeholder="Trip Description"
            />

            <label className="text-sm font-medium text-muted-foreground">
              Trip Location
            </label>
            <Input
              value={tripLocation}
              onChange={(e) => setTripLocation(e.target.value)}
              className="text-lg font-medium"
              placeholder="Trip Description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Starts On
              </label>
              <DatePickerItem
                value={startDate}
                onChange={setStartDate}
                label="Start Date"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Ends On
              </label>
              <DatePickerItem
                value={endDate}
                onChange={setEndDate}
                label="End Date"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Image Hover Section */}
        <div className="w-full lg:w-72">
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            Cover Photo
          </label>

          <div
            className="group relative h-48 w-full rounded-xl overflow-hidden shadow-md cursor-pointer border-2 border-dashed border-transparent hover:border-primary/50 transition-all"  onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleCoverUpload(file)
              }}
            />
            {/* Dark Overlay - Hidden by default, shown on group-hover */}
            <div className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isUpdatingCover ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                  <span className="text-white text-xs font-bold drop-shadow-md">
                    Uploading...
                  </span>
                </div>
              ) : (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/30">
                  <Pencil className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            {/* The Image */}
            <img
              src={
                coverImage?.url ||
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              }
              alt="Cover"
              className="absolute inset-0 h-full w-full object-cover z-10"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

/** * Isolated DatePicker component to ensure the
 * Calendar actually opens and state updates correctly.
 */
function DatePickerItem({ value, onChange, label }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-11",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value), "PPP") : `Select ${label}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => onChange(date || null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

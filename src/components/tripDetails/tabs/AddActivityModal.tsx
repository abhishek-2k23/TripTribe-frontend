"use client";

import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { useItineraryStore } from "@/store/useItineraryStore";
import { useItinerary } from "@/hooks/useItinerary";


export default function AddActivityModal() {

  const sectionDate = useItineraryStore((state) => state.sectionDate);
  const sectionTitle = useItineraryStore((state) => state.sectionTitle);
  const customSection = useItineraryStore((state) => state.customSection);
  const title = useItineraryStore((state) => state.title);
  const time = useItineraryStore((state) => state.time);
  const location = useItineraryStore((state) => state.location);
  const type = useItineraryStore((state) => state.type);
  const notes = useItineraryStore((state) => state.notes);
  const isAddActivityOpen = useItineraryStore((state) => state.isAddActivityOpen);

  // Individual Setter Selectors
  const setTitle = useItineraryStore((state) => state.setTitle);
  const setLocation = useItineraryStore((state) => state.setLocation);
  const setCustomSection = useItineraryStore((state) => state.setCustomSection);
  const setNotes = useItineraryStore((state) => state.setNotes);
  const setSectionDate = useItineraryStore((state) => state.setSectionDate);
  const setSectionTitle = useItineraryStore((state) => state.setSectionTitle);
  const setType = useItineraryStore((state) => state.setType);
  const setTime = useItineraryStore((state) => state.setTime);
  const closeModal = useItineraryStore((state) => state.closeModal);
  const getSectionOptions = useItineraryStore((state) => state.getSectionOptions);

  const {createActivity} = useItinerary();

  const sectionOptions = getSectionOptions();

  const activityTypes = [
    "Flight",
    "Hotel",
    "Food",
    "Transport",
    "Sightseeing",
    "Shopping",
    "Other",
  ];

  

  return (
    <Dialog open={isAddActivityOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* SECTION TITLE / CATEGORY */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Section / Category</label>
            <Select value={sectionTitle} onValueChange={setSectionTitle}>
              <SelectTrigger>
                <SelectValue placeholder="Select section or create new" />
              </SelectTrigger>
              <SelectContent className="bg-card border shadow-md">
                {/* Dynamically populated categories from the timeline */}
                {sectionOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
                <SelectItem value="new" className="text-primary font-bold">+ Create New Section</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sectionTitle === "new" && (
            <Input
              placeholder="Enter section title"
              value={customSection}
              onChange={(e) => setCustomSection(e.target.value)}
            />
          )}

          {/* SECTION DATE */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Section Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {sectionDate ? format(sectionDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={sectionDate ?? undefined}
                  onSelect={(date) => setSectionDate(date ?? null)}
                  className="bg-accent"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="border-t pt-4"></div>

          {/* ACTIVITY DETAILS */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Activity Title</label>
              <Input placeholder="Activity Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">Activity Time</label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">Activity Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent className="bg-card border shadow-md">
                  {activityTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Activity Description</label>
              <Textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={createActivity}>Add Activity</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
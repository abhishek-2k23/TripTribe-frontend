import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFileActions } from "@/hooks/useFile";
import { useFileStore } from "@/store/useFileStore";
import { useEffect, useState } from "react";

export function FileDetailDialog({ tripId }: { tripId: string }) {
  const { isDialogOpen, tempFileData, setDialogOpen } = useFileStore();
  const { saveFileDetails } = useFileActions(tripId);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [notes, setNotes] = useState("");

  // Update name when tempFileData arrives
  useEffect(() => {
    if (tempFileData) setName(tempFileData.originalName);
  }, [tempFileData]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogContent>
        <DialogHeader><DialogTitle>File Details</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="File Name" />
          <Select onValueChange={setCategory} defaultValue="General">
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {["Bookings", "Tickets", "Photos", "Guides", "DOCUMENTS", "TEXT"].map(cat => (
                <SelectItem key={cat} value={cat} className="bg-card">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add notes..." />
        </div>
        <DialogFooter>
          <Button onClick={() => saveFileDetails({ name, category, notes })}>Save to Trip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
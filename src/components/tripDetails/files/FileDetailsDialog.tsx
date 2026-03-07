import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFileActions } from "@/hooks/useFile";
import { useFileStore } from "@/store/useFileStore";

export function FileDetailDialog() {
  const { isDialogOpen, setDialogOpen, setFileNotes, fileInfo, setFileCategory, setFileName} = useFileStore();
  const { saveFileDetails } = useFileActions();

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogContent>
        <DialogHeader><DialogTitle>File Details</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <Input value={fileInfo.name} onChange={(e) => setFileName(e.target.value)} placeholder="File Name" />
          <Select onValueChange={setFileCategory} defaultValue="Other">
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {["Bookings", "Tickets", "Photos", "Guides", "DOCUMENTS", "TEXT"].map(cat => (
                <SelectItem key={cat} value={cat} className="bg-card">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea value={fileInfo.notes} onChange={(e) => setFileNotes(e.target.value)} placeholder="Add notes..." />
        </div>
        <DialogFooter>
          <Button onClick={saveFileDetails}>Save to Trip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChecklistStore } from "@/store/useCheckListStore";
import useChecklist from '@/hooks/useChecklist';

export function AddChecklistModal({ isOpen, onClose, tripId }: any) {
  const { checklists } = useChecklistStore();
  const [categoryType, setCategoryType] = useState<string>("");
  const [newCategory, setNewCategory] = useState("");
  const [items, setItems] = useState<string[]>([""]);
  const {addItems} = useChecklist();

  const handleAddItemField = () => setItems([...items, ""]);
  const handleRemoveItemField = (index: number) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const categoryName = categoryType === "new" ? newCategory : categoryType;
    const filteredItems = items.filter(i => i.trim() !== "");
    
    if (!categoryName || filteredItems.length === 0) return;

    await addItems(tripId, categoryName, filteredItems);
    onClose();
    setItems([""]); // Reset
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Checklist</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select onValueChange={setCategoryType} value={categoryType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {checklists.map((cat) => (
                  <SelectItem key={cat._id} value={cat.name} >{cat.name}</SelectItem>
                ))}
                <SelectItem value="new">+ Create New Category</SelectItem>
              </SelectContent>
            </Select>
            {categoryType === "new" && (
              <Input 
                placeholder="New Category Name" 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)} 
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Items</label>
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input 
                  placeholder={`Item ${idx + 1}`} 
                  value={item} 
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = e.target.value;
                    setItems(newItems);
                  }}
                />
                <Button size="icon" variant="ghost" onClick={() => handleRemoveItemField(idx)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={handleAddItemField}>
              <Plus className="h-4 w-4 mr-2" /> Add More Items
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save Checklist</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
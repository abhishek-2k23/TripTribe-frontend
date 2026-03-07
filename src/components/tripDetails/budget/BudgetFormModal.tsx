import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBudgetStore from "@/store/useBudgetStore";
import useBudget from "@/hooks/useBudget";

export function BudgetFormModal() {
  const { 
    budgetModal, 
    closeBudgetModal, 
    budgetForm, 
    setBudgetTotal, 
    setCategoryBudget 
  } = useBudgetStore();
  
  const { handleUpdateBudget, isUpdating } = useBudget();

  const categories = Object.keys(budgetForm.categories);

  return (
    <Dialog open={budgetModal} onOpenChange={closeBudgetModal}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Trip Budget Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Total Budget Input */}
          <div className="grid gap-2">
            <Label htmlFor="total" className="text-orange-600 font-bold">Overall Trip Budget</Label>
            <Input
              id="total"
              type="number"
              min="0"
              value={budgetForm.total}
              onChange={(e) => setBudgetTotal(Number(e.target.value))}
              className="rounded-xl border-orange-200 focus:ring-orange-500"
            />
          </div>

          <hr className="border-slate-100" />
          <Label className="text-slate-500 text-xs uppercase tracking-wider">Category Limits</Label>

          {/* Category Inputs */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat} className="grid gap-2">
                <Label htmlFor={cat} className="text-xs text-slate-600">{cat}</Label>
                <Input
                  id={cat}
                  type="number"
                  min="0"
                  value={(budgetForm.categories as any)[cat]}
                  onChange={(e) => setCategoryBudget(cat, Number(e.target.value))}
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="ghost" 
            onClick={closeBudgetModal} 
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => handleUpdateBudget(budgetForm)}
            disabled={isUpdating}
            className="bg-slate-900 text-white rounded-full px-8 hover:bg-slate-800"
          >
            {isUpdating ? "Saving..." : "Update Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
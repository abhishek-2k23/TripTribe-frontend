import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoveRight } from "lucide-react"
import useAuthStore from "@/store/useAuthStore"
import useBudget from "@/hooks/useBudget"

export default function DebtCard({ debt }: any) {
  const {settleExpense} = useBudget();
  
    const backendUser = useAuthStore((s) => s.backendUser);
    const paidUserId = debt.to._id;
    const canSettle = paidUserId === backendUser?._id;

  return (
    <Card className="p-4 flex flex-row items-center justify-between">
      <div className="flex flex-col  items-center gap-1">
        <div className="flex ">
          <Avatar>
            <AvatarImage src={debt.from.imageUrl} />
          </Avatar>

          <Badge className="bg-muted rounded-sm px-1 h-4 text-navy">
            <MoveRight />
          </Badge>
        </div>

        <div className="pl-3">
          <Avatar>
            <AvatarImage src={debt.to.imageUrl} />
          </Avatar>
        </div>
      </div>

      <div>
        <p className="text-sm">
          <span className="font-semibold">{debt.from.email}</span> owes{" "}
          <span className="font-semibold">{debt.to.email}</span>
        </p>


        <p className="text-xs text-muted-foreground">{debt.title}</p>
      </div>
      
      <div className="flex items-center gap-3">
      <p>{debt.amount.toFixed(2)}</p>
      <Button
        variant="hero"
        disabled={!canSettle}
        onClick={() => settleExpense(debt.expenseId, debt.from._id)}
      >
        Settle
      </Button>
      </div>
    </Card>
  )
}

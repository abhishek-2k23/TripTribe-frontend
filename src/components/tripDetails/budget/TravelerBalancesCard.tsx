import { Card } from "@/components/ui/card"
import useBudgetStore from "@/store/useBudgetStore"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

export default function TravelerBalancesCard() {
  const balances = useBudgetStore((s) => s.travelerBalances)
  const loading = useBudgetStore((s) => s.loading)
  console.log(balances)

  return (
    <div className="flex flex-col gap-3 mt-2">
      <div className="flex gap-2 items-center font-semibold text-lg">
        <User className="w-10 h-6"/>
        <h3>Traveler Balances</h3>
      </div>
      <Card className="p-4 space-y-4">
        {loading ? (
          <p>loading travellers balance</p>
        ) : (
          balances?.map((b) => (
            <div key={b.user._id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={b.user.imageUrl} />
                </Avatar>

                <p className="text-sm">{b.user.name}</p>
              </div>

              <p
                className={`font-semibold ${
                  b.balance < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                ${b.balance.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </Card>
    </div>
  )
}

import { Card } from "@/components/ui/card"

export default function SimplifyDebtCard() {

  return (

    <Card className="p-6 bg-navy text-white space-y-3">

      <h3 className="font-semibold">
        Simplify Debts
      </h3>

      <p className="text-sm opacity-80">
        Voyager automatically calculates the fewest number of
        transactions to settle all debts.
      </p>

      <button className="underline text-sm">
        Learn how it works
      </button>

    </Card>

  )
}
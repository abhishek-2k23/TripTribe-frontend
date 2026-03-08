import useBudgetStore from "@/store/useBudgetStore"
import DebtCard from "./DebtCard"
import { ArrowRightLeft } from "lucide-react"

export default function WhoOwesWhoList() {
  const debts = useBudgetStore((s) => s.debts)
  const loading = useBudgetStore((s) => s.loading)
  console.log(debts)
  return (
    <div className="space-y-4">
      <h2 className="font-semibold flex gap-2 items-center justify-start text-navy text-lg">
        <ArrowRightLeft className="w-8 h-4 " />
        Who Owes Who
      </h2>

      {loading ? (
        <p> loading debts</p>
      ) : debts.length === 0 ? (
        <div className="mx-auto w-full flex flex-col items-center justify-center">
          {" "}
          <img
            src="https://res.cloudinary.com/daamrpzus/image/upload/v1772927233/TripTribe/ChatGPT_Image_Mar_8__2026__05_12_24_AM-removebg-preview_fcutxd.png"
            alt="no deb"
          />{" "}
          <p className="text-navy text-2xl font-semibold">
            No Debt. All settled
          </p>
        </div>
      ) : (
        debts?.map((debt, index) => (
          <DebtCard key={debt.expenseId + "index" + index} debt={debt} />
        ))
      )}
    </div>
  )
}

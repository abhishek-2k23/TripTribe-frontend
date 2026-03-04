import { Card } from "@/components/ui/card";

export default function TripSummary() {
  return (
    <Card className="p-6 bg-navy text-white rounded-2xl">

      <h4 className="text-sm uppercase opacity-70 mb-4">
        Trip Summary
      </h4>

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs opacity-70">Days Total</p>
        </div>

        <div>
          <p className="text-2xl font-bold">28</p>
          <p className="text-xs opacity-70">Activities</p>
        </div>
      </div>

      <div>
        <p className="text-sm mb-2">Budget Spent</p>

        <div className="h-2 bg-white/20 rounded-full">
          <div className="h-2 bg-primary rounded-full w-1/2"></div>
        </div>

        <p className="text-xs mt-2">
          $1,450 / $3,000
        </p>
      </div>

    </Card>
  );
}
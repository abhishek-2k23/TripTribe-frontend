import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTripSettings } from "@/hooks/useSetting"

export default function DangerZoneCard(){

  const {deleteTrip} = useTripSettings()

  return(

    <Card className="p-6 border-red-200 bg-red-50">

      <div className="flex items-center justify-between">

        <div>

          <p className="font-semibold text-red-600">
            Danger Zone
          </p>

          <p className="text-sm text-red-500">
            Once you delete a trip, there is no going back.
          </p>

        </div>

        <Button
          variant="destructive"
          onClick={deleteTrip}
        >
          Delete Trip
        </Button>

      </div>

    </Card>

  )

}
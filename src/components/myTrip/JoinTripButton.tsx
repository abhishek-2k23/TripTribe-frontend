import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import useMyTrips from "@/hooks/useMyTrips";


export default function JoinTripButton() {
  const [code, setCode] = useState("");
  const {joinTrip} = useMyTrips()

  return (
    <div className="relative group">

      {/* Main Button */}
      <Button
        variant="hero"
        className="w-24 flex items-center justify-center gap-2"
      >
        Join Trip
      </Button>

      {/* Hover Panel */}
      <div
        className="
          absolute right-0 mt-2 w-64
          opacity-0 invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all duration-200
          z-50
        "
      >
        <div className="bg-card border border-border shadow-lg rounded-xl p-4 space-y-3">

          <div className="flex gap-2">
            <Input placeholder="Enter invite code" value={code} onChange={(e) => setCode(e.target.value)}/>
            <Button variant="hero" className="h-8 w-14" onClick={() => joinTrip(code)}>Join</Button>
          </div>

        </div>
      </div>

    </div>
  );
}
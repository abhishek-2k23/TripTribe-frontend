import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, BadgeCheck, Users } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import useAuthStore from "@/store/useAuthStore"
import type{TripCardProps} from "../../types/trip.types"


export default function TripCard({
  name,
  startDate,
  endDate,
  image,
  members = [],
  description
}: TripCardProps) {
  const backenduser = useAuthStore((state) => state.backendUser)
  const start = new Date(startDate)
  const end = new Date(endDate)

  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

  const displayMembers = members.slice(0, 3)
  const remainingCount = Math.max(0, members.length - 3)

  const currentUserId = backenduser?._id

  // logic is safe now because user is guaranteed to be an object
  const isOwner = members.some(
    (member) => member.user._id === currentUserId && member.role === "owner"
  )

  return (
    <Card className="rounded-xl overflow-hidden hover:shadow-lg transition-all">

      {/* Image */}
      <div className="relative h-44">
        <img
          src={image?.url}
          alt={name}
          className="max-w-64 h-full object-cover"
        />

        <Badge
          className={`absolute top-3 left-3 ${
            isOwner
              ? "bg-navy text-primary-foreground"
              : "bg-navy text-secondary-foreground"
          }`}
        >
          {isOwner ? <BadgeCheck data-icon="inline-start" /> :  <Users />}
          {isOwner ? "Owner" : "Shared"}
        </Badge>
      </div>

      <CardContent className="px-4 py-2 space-y-3">

        <h3 className="text-lg font-semibold text-foreground">
          {name}
        </h3>

        <p>{description}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays size={16} />
          {format(start, "dd MMM")} –{" "}
          {format(end, "dd MMM yyyy")}
        </div>

        <div className="flex justify-between items-center text-sm font-medium text-foreground">
          <div className="flex flex-col items-center ">
            <div>Duration</div>
            <div className="text-xs text-muted-foreground">
              {days} {days > 1 ? "Days" : "Day"}
            </div>
          </div>


          <div className="flex flex-col items-center ">
            <div>Group</div>
            <div className="text-xs text-muted-foreground">
              {displayMembers.length} {displayMembers.length === 1 ? "Traveller" : "Travellers"}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            {displayMembers.map((m) => (
              <Avatar
                key={m.user._id}
                className="border-2 border-card"
              >
                <AvatarImage src={m.user.imageUrl} />
                <AvatarFallback>
                  {m.user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {remainingCount > 0 && (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-card">
                +{remainingCount}
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {members.length} {members.length > 1 ? "Members" : "Member"}
          </span>
        </div>

      </CardContent>
    </Card>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import useAuthStore from "@/store/useAuthStore";
import { BadgeCheck } from "lucide-react";

type user ={
    _id: string,
    name: string,
    email: string,
    imageUrl: string
}
interface Member {
  user: user,
  role: string,
}

interface TripCardProps 
  { _id: string; name: string; description: string; location: string; startDate: string; endDate: string; inviteCode: string; members: Member[]; createdBy: { name: string; email: string; }; createdAt: string; updatedAt: string; image?: {url: string}, activityCount: number, budgetTotal: number}


export default function TripCard({
  name,
  startDate,
  endDate,
  image,
  members,
  activityCount = 0,
  budgetTotal = 0,
}: TripCardProps) {
    const backenduser = useAuthStore((state) => state.backendUser);
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days =
    Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  const displayMembers = members.slice(0, 3);
  const remainingCount =
    members.length > 3 ? members.length - 3 : 0;

    const currentUserId = backenduser?._id
    const isOwner = members.some(
  (member) =>
    member.user._id === currentUserId &&
    member.role === "owner"
);
  const dummyImage =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-84 pt-0">

      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden ">
        <img
          src={image?.url || dummyImage}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Role Badge */}
        <Badge
          className={`absolute top-3 left-3 ${
            isOwner
              ? "bg-navy"
              : "bg-navy"
          } text-white`}
        >
            <BadgeCheck data-icon="inline-start" />
          {isOwner ? "Owner" : "Shared"}
        </Badge>
      </div>

      <CardContent className="pt-0 mt-0 flex flex-col gap-2">

        {/* Trip Name */}
        <h3 className="text-lg font-semibold truncate pt-0">
          {name}
        </h3>

        {/* Date Row */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarDays size={16} />
          <span>
            {format(start, "dd MMM yyyy")} –{" "}
            {format(end, "dd MMM yyyy")}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between text-sm text-gray-700 font-medium">

          <div className="flex flex-col items-center">
            <span>{days}</span>
            <span className="text-xs text-gray-500">Days</span>
          </div>

          <div className="flex flex-col items-center">
            <span>{activityCount}</span>
            <span className="text-xs text-gray-500">Activities</span>
          </div>

          <div className="flex flex-col items-center">
            <span>₹ {budgetTotal}</span>
            <span className="text-xs text-gray-500">Budget</span>
          </div>

        </div>

        {/* Avatar Group */}
        <div className="flex items-center justify-between mt-2">

          <div className="flex -space-x-3">
            {displayMembers.map((member) => (
              <Avatar
                key={member.user._id}
                className="border-2 border-white h-8 w-8"
              >
                <AvatarImage src={member.user.imageUrl} />
                <AvatarFallback>
                  {member.user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}

            {remainingCount > 0 && (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                +{remainingCount}
              </div>
            )}
          </div>

          <span className="text-xs text-gray-500">
           {members.length} {members.length > 1 ? "Members" : "Member"}
          </span>

        </div>

      </CardContent>
    </Card>
  );
}
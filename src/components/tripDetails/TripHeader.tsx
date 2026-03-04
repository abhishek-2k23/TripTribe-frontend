import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Settings } from "lucide-react";
import { format } from "date-fns";
import useAuthStore from '@/store/useAuthStore';
import type { Trip } from "@/types/trip.types";
import InviteButton from "./InviteButton";

export default function TripHeader({name, startDate, endDate, description, members, inviteCode, location, image}: Trip) {
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const currentUser = useAuthStore(state => state.backendUser);
  const displayMembers = members.slice(0, 3);
  const remainingCount = members.length > 3 ? members.length - 3 : 0;

    const  currentUserId = currentUser?._id;
    const isOwner = members.some(
    (member) => member.user._id === currentUserId && member.role === "owner"
  )

  const fallbackImage =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-5">

        {/* Trip Image */}
        <img
          src={image?.url || fallbackImage}
          alt={name}
          className="w-28 h-24 rounded-xl object-cover"
        />

        {/* Trip Info */}
        <div className="flex flex-col gap-1">

          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">{name}</h2>

            {isOwner && (
              <Badge className="bg-navy text-gray-50">
                Owner
              </Badge>
            )}
          </div>
          <p>{description}</p>
          {/* Date + Location */}
          <div className="flex items-center gap-4 text-sm text-gray-500">

            <div className="flex items-center gap-1">
              <CalendarDays size={14} />
              <span>
                {format(start, "MMM dd")} –{" "}
                {format(end, "MMM dd, yyyy")}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{location}</span>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* Avatar Group */}
        <div className="flex -space-x-3">
          {displayMembers.map((member) => (
            <Avatar
              key={member.user._id}
              className="h-9 w-9 border-2 border-white"
            >
              <AvatarImage src={member.user.imageUrl} />
              <AvatarFallback>
                {member.user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}

          {remainingCount > 0 && (
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
              +{remainingCount}
            </div>
          )}
        </div>

        {/* Invite Button */}
        {isOwner  && (
          <InviteButton inviteCode={inviteCode}/>
        )}

        {/* Settings Button */}
        <Button variant="ghost" size="icon">
          <Settings size={18} />
        </Button>

      </div>
    </div>
  );
}
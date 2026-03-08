import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useTripSettingsStore from "@/store/useSettingStore"

export default function CollaborationCard() {
  const { members, updateMemberRole } = useTripSettingsStore()

  return (
    <Card className="p-6 space-y-4">
      <h3 className="font-semibold">Collaboration & Permissions</h3>

      {members.map((member) => (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={member.imageUrl} />
            </Avatar>
            <div className="flex flex-col">
              <p className=" text-md">{member.name}</p>
              <p className="text-sm -mt-1">{member.email}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <Select
              value={member.role}
              disabled={member.role === "owner"}
              onValueChange={(v) => updateMemberRole(member._id, v as any)}
            >
              <SelectTrigger className="w-28 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {member.role === "owner" && (
                  <SelectItem value="owner">Owner</SelectItem>
                )}
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            {/* {member.role !== "owner" && (
              <DeleteMemberConfirm
                member={member}
                isDeleting={isDeletingMember === member._id}
                onConfirm={handleDeleteMember}
              />
            )} */}
          </div>
        </div>
      ))}
    </Card>
  )
}

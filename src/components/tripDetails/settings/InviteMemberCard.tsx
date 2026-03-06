import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select"
import { useTripSettings } from "@/hooks/useSetting"
import useTripSettingsStore from "@/store/useSettingStore"


export default function InviteMemberCard(){

  const {
    inviteEmail,
    inviteRole,
    setInviteEmail,
    setInviteRole
  } = useTripSettingsStore()

  const {inviteMember} = useTripSettings()

  return(

    <Card className="p-6 space-y-4">

      <h3 className="font-semibold">
        Invite Members
      </h3>

      <div className="flex gap-3">

        <Input
          value={inviteEmail}
          onChange={(e)=>setInviteEmail(e.target.value)}
          placeholder="Email address"
        />

        <Select
          value={inviteRole}
          onValueChange={(v)=>setInviteRole(v as any)}
        >

          <SelectTrigger className="w-32">
            <SelectValue/>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="editor">
              Editor
            </SelectItem>

            <SelectItem value="viewer">
              Viewer
            </SelectItem>
          </SelectContent>

        </Select>

        <Button onClick={inviteMember}>
          Invite
        </Button>

      </div>

    </Card>

  )

}
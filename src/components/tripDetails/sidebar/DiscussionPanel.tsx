import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function DiscussionPanel() {
  return (
    <Card className="p-5 space-y-4">

      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Discussion</h4>
        <Button variant="ghost" size="sm">View All</Button>
      </div>

      <div className="flex gap-3">
        <Avatar />
        <div>
          <p className="text-sm">
            <strong>Sarah</strong> added a note
          </p>
          <p className="text-xs text-muted-foreground">
            2 hours ago
          </p>
        </div>
      </div>

      <input
        placeholder="Write a comment..."
        className="w-full border rounded-md px-3 py-2 text-sm"
      />

    </Card>
  );
}
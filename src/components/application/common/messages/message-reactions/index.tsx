"use client"

import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { Doc, Id } from "../../../../../../convex/_generated/dataModel"
import { useCurrentMember } from "@/features/members/api/use-current-member"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Hint } from "../../hint"
import { EmojiPopover } from "../../emoji-popover"
import { SmilePlusIcon } from "lucide-react"

interface MessageReactionsProps {
  data: Array<
  Omit<Doc<"reactions">, "memberId"> & {
      count: number
      memberIds: Id<"members">[]
    }
  >
  onChange: (value: string) => void
}

export const MessageReactions = ({ data, onChange }: MessageReactionsProps) => {
  const workspaceId = useWorkspaceId()
  const { data: currentMember } = useCurrentMember({ workspaceId })
  const currentMemberId = currentMember?._id

  if (data.length === 0 || !currentMemberId) {
    return null
  }

  return (
    <div className="my-2 flex items-center gap-1">
      {data.map((reaction) => (
        <Hint
          key={reaction._id}
          label={`${reaction.count} ${reaction.count === 1 ? "pessoa reagiu" : "pessoas reagiram"}  com este emoji`}
        >
          <Button
            key={reaction._id}
            type="button"
            size="sm"
            variant="ghost"
            className={cn(
              "px-2 gap-x-1 bg-gray-200 hover:bg-gray-300 rounded-full",
              reaction.memberIds.includes(currentMemberId) && "bg-gray-200 hover:bg-gray-300"
            )}
            onClick={() => onChange(reaction.value)}
          >
            {reaction.value}
            <span className="text-sm font-bold">
              {reaction.count}
            </span>
          </Button>
        </Hint>
      ))}
      <EmojiPopover
        hint="Adicionar reação"
        onEmojiSelect={(emoji) => onChange(emoji)}
      >
        <div>
          <Button
            type="button"
            size="sm"
            variant="default"
            className="group/button bg-gray-300 rounded-full"
          >
            <SmilePlusIcon className="size-4 text-black group-hover/button:text-white" />
          </Button>
        </div>
      </EmojiPopover>
    </div>
  )
}

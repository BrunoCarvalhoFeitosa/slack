"use client"
import { useState } from "react"
import { differenceInMinutes, format } from "date-fns"
import { api } from "../../../../../../convex/_generated/api"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useCurrentMember } from "@/features/members/api/use-current-member"
import { ChannelHero } from "@/components/application/channel/channel-hero"
import { ConversationHero } from "@/components/application/conversation/conversation-hero"
import { Message } from "../message"
import { formatDateLabel, TIME_THRESHOLD } from "@/utils"
import { Loader2Icon } from "lucide-react"

interface MessageListProps {
  memberName?: string
  memberImage?: string
  channelName?: string
  channelCreationTime?: number
  variant?: "channel" | "thread" | "conversation"
  data?: (typeof api.messages.get._returnType)["page"]
  loadMore: () => void
  isLoadingMore: boolean
  canLoadMore: boolean
}

export const MessageList = ({
  memberName,
  memberImage,
  channelName,
  channelCreationTime,
  variant,
  data,
  loadMore,
  isLoadingMore,
  canLoadMore
}: MessageListProps) => {
  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null)
  const workspaceId = useWorkspaceId()
  const { data: currentMember, } = useCurrentMember({ workspaceId })

  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime)
      const dateKey = format(date, "yyyy-MM-dd")

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].unshift(message)
      return groups
    },
    {} as Record<string, typeof data>
  )

  return (
    <div className="pb-4 flex flex-1 flex-col-reverse overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="relative my-2 text-center">
            <hr className="absolute top-1/2 left-0 right-0 border-t" />
            <span className="relative inline-block px-4 py-1 bg-white border rounded-full text-xs">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          <div>
            {messages.map((message, index) => {
              const prevMessage = messages[index - 1]
              const isCompact =
                prevMessage &&
                prevMessage.user?._id === message.user._id &&
                differenceInMinutes(
                  new Date(message._creationTime),
                  new Date(prevMessage._creationTime)
                ) < TIME_THRESHOLD

              return (
                <Message
                  key={message._id}
                  id={message._id}
                  memberId={message.memberId}
                  authorName={message.user.name}
                  authorImage={message.user.image}
                  reactions={message.reactions}
                  body={message.body}
                  image={message.image}
                  createdAt={message._creationTime}
                  updatedAt={message.updatedAt}
                  threadCount={message.threadCount}
                  threadName={message.threadName}
                  threadImage={message.threadImage}
                  threadTimestamp={message.threadTimestamp}
                  isEditing={editingId === message._id}
                  setEditingId={setEditingId}
                  isCompact={isCompact}
                  hideThreadButton={variant === "thread"}
                  isAuthor={message.memberId === currentMember?._id}
                />
              )
            })}
          </div>
        </div>
      ))}
      <div
        className="h-1"
        ref={(el) => {
          if (el) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting && canLoadMore) {
                  loadMore()
                }
              }, { threshold: 1.0 }
            )

            observer.observe(el)
            return () => observer.disconnect()
          }
        }}
      />
      {isLoadingMore && (
        <div className="relative my-2 text-center">
          <hr className="absolute top-1/2 left-0 right-0 border-t" />
          <span className="relative inline-block px-4 py-1 bg-white border rounded-full text-xs">
            <Loader2Icon className="size-4 animate-spin" />
          </span>
        </div>
      )}
      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHero
          name={channelName}
          creationTime={channelCreationTime}
        />
      )}
      {variant === "conversation" && memberName && (
        <ConversationHero
          name={memberName}
          image={memberImage}
        />
      )}
    </div>
  )
}

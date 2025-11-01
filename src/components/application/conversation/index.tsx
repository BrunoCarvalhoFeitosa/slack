"use client"
import { Id } from "../../../../convex/_generated/dataModel"
import { useMemberId } from "@/hooks/use-member-id"
import { useGetMember } from "@/features/members/api/use-get-member"
import { useGetMessages } from "@/features/messages/api/use-get-messages"
import { usePanel } from "@/hooks/use-panel"
import { ConversationHeader } from "./conversation-header"
import { ConversationChatInput } from "./conversation-chat-input"
import { MessageList } from "../common/messages/message-list"
import { Loader2Icon } from "lucide-react"

interface ConversationProps {
  id: Id<"conversations">
}

export const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId()
  const { data: member, isLoading: memberLoading } = useGetMember({ id: memberId })
  const { results, status, loadMore } = useGetMessages({ conversationId: id })
  const { onOpenProfile } = usePanel()

  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
       <ConversationHeader
          memberName={member?.user.name}
          memberImage={member?.user.image}
          onClick={() => onOpenProfile(memberId)}
       />
       <MessageList
          data={results}
          variant="conversation"
          memberName={member?.user.name}
          memberImage={member?.user.image}
          loadMore={loadMore}
          isLoadingMore={status === "LoadingMore"}
          canLoadMore={status === "CanLoadMore"}
       />
       <ConversationChatInput
          placeholder={`Mensagem para ${member?.user.name}`}
          conversationId={id}
       />
    </div>
  )
}
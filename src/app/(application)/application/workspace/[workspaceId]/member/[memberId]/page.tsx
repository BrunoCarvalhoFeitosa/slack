"use client"
import { useEffect, useState } from "react"
import { Id } from "../../../../../../../../convex/_generated/dataModel"
import { useCreateOrGetConversation } from "@/features/conversations/use-create-or-get-conversation"
import { useMemberId } from "@/hooks/use-member-id"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { toast } from "sonner"
import { Conversation } from "@/components/application/conversation"
import { AlertTriangleIcon, Loader2Icon } from "lucide-react"

const MemberIdPage = () => {
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null)
  const memberId = useMemberId()
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateOrGetConversation()

  useEffect(() => {
    mutate({
      memberId,
      workspaceId
    }, {
      onSuccess: (data) => {
        setConversationId(data)
      },
      onError: () => {
        toast.error("Ocorreu um erro ao carregar a conversa.", {
          classNames: {
            description: "text-gray-700!"
          },
          actionButtonStyle: {
            backgroundColor: "var(--destructive)",
            color: "var(--secondary)"
          } as React.CSSProperties
        })
      }
    })
  }, [memberId, workspaceId, mutate])

  if (isPending) {
    return (
      <div className="h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!conversationId) {
    return (
      <div className="h-[calc(100dvh-60px)] flex flex-col justify-center items-center gap-y-2">
        <AlertTriangleIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversa não encontrada.
        </span>
      </div>
    )
  }

  return (
    <Conversation id={conversationId} />
  )
}

export default MemberIdPage

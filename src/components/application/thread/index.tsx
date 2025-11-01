import { useRef, useState } from "react"
import { differenceInMinutes, format } from "date-fns"
import dynamic from "next/dynamic"
import Quill from "quill"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { useCurrentMember } from "@/features/members/api/use-current-member"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useCreateMessage } from "@/features/messages/api/use-create-message"
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url"
import { useChannelId } from "@/hooks/use-channel-id"
import { useGetMessage } from "@/features/messages/api/use-get-message"
import { useGetMessages } from "@/features/messages/api/use-get-messages"
import { toast } from "sonner"
import { Message } from "../common/messages/message"
import { Button } from "@/components/ui/button"
import { formatDateLabel, TIME_THRESHOLD } from "@/utils"
import { Loader2Icon, XIcon } from "lucide-react"
import { Alert } from "../common/alert"
const Editor = dynamic(() => import("@/components/application/common/editor"), { ssr: false })

interface ThreadProps {
  messageId: Id<"messages">
  onClose: () => void
}

type submitType = {
  body: string
  image: File | null
}

type CreateMessageValues = {
  channelId: Id<"channels">
  workspaceId: Id<"workspaces">
  parentMessageId: Id<"messages">
  body: string
  image: Id<"_storage"> | undefined
}

export const Threads = ({ messageId, onClose }: ThreadProps) => {
  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null)
  const [editorKey, setEditorKey] = useState<number>(0)
  const [isPending, setIsPending] = useState<boolean>(false)
  const editorRef = useRef<Quill | null>(null)
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const { data: currentMember } = useCurrentMember({ workspaceId })
  const { data: message, isLoading: loadingMessage } = useGetMessage({ id: messageId })
  const { mutate: createMessage } = useCreateMessage()
  const { results, status, loadMore } = useGetMessages({ channelId, parentMessageId: messageId })
  const { mutate: generateUploadUrl } = useGenerateUploadUrl()
  const canLoadMore = status === "CanLoadMore"
  const isLoadingMore = status === "LoadingMore"

  const groupedMessages = results?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime)
      const dateKey = format(date, "yyyy-MM-dd")

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].unshift(message)
      return groups
    },
    {} as Record<string, (typeof api.messages.get._returnType)["page"]>
  )

  const handleSubmit = async ({ body, image }: submitType) => {
    try {
      setIsPending(true)

      editorRef?.current?.enable(false)

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        parentMessageId: messageId,
        body,
        image: undefined
      }

      if (image) {
        const url = await generateUploadUrl("", { throwError: true })

        if (!url) {
          throw new Error("Url not found")
        }

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image
        })

        if (!result.ok) {
          throw new Error("Error while upload image")
        }

        const { storageId } = await result.json()

        values.image = storageId
      }
      
      await createMessage(values, {
        throwError: true
      })
  
      setEditorKey((prevKey) => prevKey + 1)
    } catch (error) {
      console.error("Error while send message", error)

      toast.error("Erro ao enviar mensagem.", {
        classNames: {
          description: "text-gray-700!"
        },
        actionButtonStyle: {
          backgroundColor: "var(--destructive)",
          color: "var(--secondary)"
        } as React.CSSProperties
      })
    } finally {
      setIsPending(false)
      editorRef?.current?.enable(true)
    }
  }

  if (loadingMessage || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader2Icon className="size-5 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!message) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-4 h-[49px] flex justify-between items-center border-b">
          <p className="text-lg font-semibold">
            Thread
          </p>
          <Button
            type="button"
            size="sm"
            variant="default"
            onClick={onClose}
          >
            <XIcon className="size-4" />
          </Button>
        </div>
        <Alert text="Mensagem não encontrada." />
      </div>
    )
  }

  return (
    <div className="px-3 h-full flex flex-col">
      <div className="h-[52px] flex justify-between items-center border-b">
        <p className="text-lg font-semibold">
          Thread
        </p>
        <Button
          type="button"
          size="sm"
          variant="default"
          onClick={onClose}
        >
          <XIcon className="size-4" />
        </Button>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto messages-scrollbar">
        <div className="py-4 flex-1 overflow-y-auto messages-scrollbar">
          <div className="flex flex-col-reverse">
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
                        hideThreadButton
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
            <Message
              id={message._id}
              memberId={message.memberId}
              authorName={message.user.name}
              authorImage={message.user.image}
              isAuthor={message.memberId === currentMember?._id}
              body={message.body}
              image={message.image}
              createdAt={message._creationTime}
              updatedAt={message.updatedAt}
              reactions={message.reactions}
              isEditing={editingId === message._id}
              setEditingId={setEditingId}
            />
          </div>
        </div>
        <div className="px-4">
          <Editor
            key={editorKey}
            innerRef={editorRef}
            placeholder="Responder esta mensagem..."
            disabled={isPending}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
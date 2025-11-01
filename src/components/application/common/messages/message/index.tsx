"use client"
import { Fragment } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { Doc, Id } from "../../../../../../convex/_generated/dataModel"
import { toast } from "sonner"
import { format, isToday, isYesterday } from "date-fns"
import { useConfirm } from "@/hooks/use-confirm"
import { useUpdateMessage } from "@/features/messages/api/use-update-message"
import { useRemoveMessage } from "@/features/messages/api/use-remove-message"
import { useToggleReaction } from "@/features/reactions/api/use-toggle-reaction"
import { usePanel } from "@/hooks/use-panel"
import { Thumbnail } from "../thumbnail"
import { Hint } from "../../hint"
import { MessageToolbar } from "../message-toolbar"
import { MessageReactions } from "../message-reactions"
import { ThreadBar } from "../thread-bar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getDate } from "@/utils"
import { ClockIcon } from "lucide-react"
const Renderer = dynamic(() => import("@/components/application/common/messages/renderer"), { ssr: false })
const Editor = dynamic(() => import("@/components/application/common/editor"), { ssr: false })

interface MessageProps {
  id: Id<"messages">
  memberId: Id<"members">
  authorName?: string
  authorImage?: string
  isAuthor?: boolean
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number
      memberIds: Id<"members">[]
    }
  >
  body: Doc<"messages">["body"]
  image: string | null | undefined
  createdAt: Doc<"messages">["_creationTime"]
  updatedAt: Doc<"messages">["updatedAt"]
  isEditing: boolean
  isCompact?: boolean
  setEditingId: (id: Id<"messages"> | null) => void
  hideThreadButton?: boolean
  threadCount?: number
  threadName?: string
  threadImage?: string
  threadTimestamp?: number
}

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Hoje" : isYesterday(date) ? "Ontem" : format(date, "MMM d, yyyy")} em ${format(date, "HH:mm:ss a")}`
}

export const Message = ({
  id,
  memberId,
  authorName = "Membro",
  authorImage,
  isAuthor,
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadName,
  threadImage,
  threadTimestamp
} : MessageProps) => {
  const { mutate: updateMessage, isPending: updatingMessage } = useUpdateMessage()
  const { mutate: removeMessage, isPending: removingMessage } = useRemoveMessage()
  const { mutate: toggleReaction, isPending: togglingReaction } = useToggleReaction()
  const { parentMessageId, onOpenMessage, onClose, onOpenProfile } = usePanel()
  const isPending = updatingMessage || togglingReaction
  const avatarFallback = authorName.charAt(0).toUpperCase()

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja prosseguir?",
    "Esta ação fará com que a mensagem seja excluída permanentemente."
  )

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage({
      id,
      body
    }, {
      onSuccess: () => {
        toast("Sucesso ao editar mensagem.", {
          description: getDate(),
          classNames: {
            description: "text-gray-700!"
          },
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo")
          },
          actionButtonStyle: {
            backgroundColor: "var(--primary)",
            color: "var(--secondary)"
          } as React.CSSProperties
        })
      },
      onError: () => {
        toast.error("Erro ao editar mensagem.", {
          classNames: {
            description: "text-gray-700!"
          },
          actionButtonStyle: {
            backgroundColor: "var(--destructive)",
            color: "var(--secondary)"
          } as React.CSSProperties
        })
      },
      onSettled: () => {
        setEditingId(null)
      }
    })
  }

  const handleRemove = async () => {
    const ok = await confirm()

    if (!ok) {
      return
    }

    removeMessage({
      id
    }, {
      onSuccess: () => {
        toast("Sucesso ao deletar mensagem.", {
          description: getDate(),
          classNames: {
            description: "text-gray-700!"
          },
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo")
          },
          actionButtonStyle: {
            backgroundColor: "var(--primary)",
            color: "var(--secondary)"
          } as React.CSSProperties
        })

        if (parentMessageId === id) {
          onClose()
        }
      },
      onError: () => {
        toast.error("Erro ao deletar mensagem.", {
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
  }

  const handleReaction = (value: string) => {
    toggleReaction({
      messageId: id,
      value
    }, {
      onError: () => {
        toast.error("Erro ao Adicionar reação.", {
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
  }

  if (isCompact) {
    return (
      <Fragment>
        <ConfirmDialog />
        <div className={cn(
          "group min-h-[36px] relative p-1.5 px-5 flex flex-col gap-2 hover:bg-gray-100/60",
          isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
          removingMessage && "bg-rose-500/50 transform transitionall scale-y-0 origin-bottom duration-200"
        )}>
          <div className="flex items-start gap-2">
            <Hint label={formatFullTime(new Date(createdAt))}>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="px-0! h-[22px] leading-[10px] text-[11px] text-muted-foreground items-center gap-x-1"
              >
                <ClockIcon className="size-[14px]" />
                {createdAt ? format(new Date(Number(createdAt)), "HH:mm") : "--:--"}
              </Button>
            </Hint>
            <div className="w-full flex flex-col">
              {isEditing ? (
                <Editor
                  onSubmit={handleUpdate}
                  disabled={isPending}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                  variant="update"
                />
              ) : (
                <>
                  <Renderer value={body} />
                  <Thumbnail url={image} />
                  {updatedAt && (
                    <span className="text-xs text-muted-foreground">
                      (editado)
                    </span>
                  )}
                  <MessageReactions
                    data={reactions}
                    onChange={handleReaction}
                  />
                  <ThreadBar
                    count={threadCount}
                    name={threadName}
                    image={threadImage}
                    timestamp={threadTimestamp}
                    onClick={() => onOpenMessage(id)}
                  />
                </>
              )}
            </div>
          </div>

          {!isEditing && (
            <MessageToolbar
              isAuthor={isAuthor}
              isPending={isPending}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleDelete={handleRemove}
              handleReaction={handleReaction}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <ConfirmDialog />
      <div className={cn(
        "group min-h-[36px] relative p-1.5 px-5 flex flex-col gap-2 hover:bg-gray-100/60",
        isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
        removingMessage && "bg-rose-500/50 transform transitionall scale-y-0 origin-bottom duration-200"
      )}>
        <div className="flex items-start gap-2">
          <Button
            type="button"
            variant="ghost"
            className="p-0"
            onClick={() => onOpenProfile(memberId)}
          >
            <Avatar className="rounded-md mr-1">
              <AvatarImage src={authorImage} alt="Foto do usuário" />
              <AvatarFallback className="rounded-md bg-gray-300 hover:bg-gray-300 text-xl text-black">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </Button>
          {isEditing ? (
            <div className="w-full h-full">
              <Editor
                onSubmit={handleUpdate}
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="update"
              />
            </div>
          ) : (
          <div className="w-full flex flex-col overflow-hidden">
            <div className="flex gap-x-2">
              <Button
                type="button"
                variant="ghost"
                className="p-0 h-4 text-base hover:underline"
                onClick={() => onOpenProfile(memberId)}
              >
                {authorName}
              </Button>
              <Hint label={formatFullTime(new Date(createdAt))}>
                <Button
                  type="button"
                  variant="ghost"
                  className="p-0 h-4 text-xs text-muted-foreground hover:underline"
                >
                  {format(new Date(createdAt), "HH:mm a")}
                </Button>
              </Hint>
            </div>
            <div className="w-full flex flex-col ">
              <Renderer value={body} />
              <Thumbnail url={image} />
              {updatedAt && (
                <span className="text-xs text-muted-foreground">
                  (editado)
                </span>
              )}
              <MessageReactions
                data={reactions}
                onChange={handleReaction}
              />
              <ThreadBar
                count={threadCount}
                name={threadName}
                image={threadImage}
                timestamp={threadTimestamp}
                onClick={() => onOpenMessage(id)}
              />
            </div>
          </div>
          )}
        </div>
        {!isEditing && (
          <MessageToolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleDelete={handleRemove}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    </Fragment>
  )
}

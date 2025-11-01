"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageSquareTextIcon, PencilIcon, SmileIcon, Trash2Icon } from "lucide-react"
import { Hint } from "../../hint"
import { EmojiPopover } from "../../emoji-popover"

interface MessageToolbarProps {
  isAuthor: boolean | undefined
  isPending: boolean
  handleEdit: () => void
  handleThread: () => void
  handleDelete: () => void
  handleReaction: (value: string) => void
  hideThreadButton?: boolean
}

export const MessageToolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleThread,
  handleDelete,
  handleReaction,
  hideThreadButton
}: MessageToolbarProps) => {
  return (
    <div className="absolute -top-2 right-5 z-10">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity bg-white border rounded-md shadow-sm">
        <EmojiPopover
          hint="Adicionar reação"
          onEmojiSelect={handleReaction}
        >
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={isPending}
            className="group-hover:text-black"
          >
            <SmileIcon className={cn(
              "size-4 stroke-[2px] text-black group-hover:text-black",
            )} />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Responder mensagem">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={isPending}
              onClick={handleThread}
            >
              <MessageSquareTextIcon className={cn(
                "size-4 stroke-[2px] text-black group-hover:text-black",
              )} />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Editar mensagem">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={isPending}
              onClick={handleEdit}
            >
              <PencilIcon className={cn(
                "size-4 stroke-[2px] text-black group-hover:text-black",
              )} />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Deletar mensagem">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={isPending}
              onClick={handleDelete}
            >
              <Trash2Icon className={cn(
                "size-4 stroke-[2px] text-black group-hover:text-black",
              )} />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  )
}

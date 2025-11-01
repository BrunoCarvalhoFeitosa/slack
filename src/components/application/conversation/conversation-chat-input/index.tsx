import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import Quill from "quill"
import { toast } from "sonner"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useCreateMessage } from "@/features/messages/api/use-create-message"
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url"
import { Id } from "../../../../../convex/_generated/dataModel"
const Editor = dynamic(() => import ("@/components/application/common/editor"), { ssr: false })

interface ConversationChatInputProps {
  placeholder: string
  conversationId: Id<"conversations">
}

type submitType = {
  body: string
  image: File | null
}

type createMessageValues = {
  conversationId: Id<"conversations">
  workspaceId: Id<"workspaces">
  body: string
  image?: Id<"_storage"> | undefined
}

export const ConversationChatInput = ({ placeholder, conversationId }: ConversationChatInputProps) => {
  const [editorKey, setEditorKey] = useState<number>(0)
  const [isPending, setIsPending] = useState<boolean>(false)
  const editorRef = useRef<Quill | null>(null)
  const workspaceId = useWorkspaceId()
  const { mutate: createMessage } = useCreateMessage()
  const { mutate: generateUploadUrl } = useGenerateUploadUrl()

  const handleSubmit = async ({ body, image }: submitType) => {
    try {
      setIsPending(true)

      editorRef?.current?.enable(false)

      const values: createMessageValues = {
        conversationId,
        workspaceId,
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

  return (
    <div className="p-5 pb-0 mt-auto w-full">
      <Editor
        key={editorKey}
        variant="create"
        placeholder={placeholder}
        innerRef={editorRef}
        disabled={isPending}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

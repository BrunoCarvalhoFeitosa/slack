import { useEffect, useRef, RefObject, useLayoutEffect, useState } from "react"
import Quill, { type Delta, type QuillOptions, type Op } from "quill"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Hint } from "../hint"
import { CaseSensitiveIcon, ImageIcon, SendHorizonalIcon, SmileIcon, XIcon } from "lucide-react"
import { EmojiPopover } from "../emoji-popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import "quill/dist/quill.snow.css"

type EditorValue = {
  image: File | null
  body: string
}

interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void
  onCancel?: () => void
  placeholder?: string
  defaultValue?: Delta | Op[]
  disabled?: boolean
  innerRef?: RefObject<Quill | null>
  variant?: "create" | "update"
}

const Editor = ({
  onSubmit,
  onCancel,
  placeholder = "Escreva algo...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) => {
  const [text, setText] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false)
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const submitRef = useRef(onSubmit)
  const placeholderRef = useRef(placeholder)
  const quillRef = useRef<Quill | null>(null)
  const defaultValueRef = useRef(defaultValue)
  const disabledRef = useRef(disabled)
  const imageElementRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    submitRef.current = onSubmit
    placeholderRef.current = placeholder
    defaultValueRef.current = defaultValue
    disabledRef.current = disabled
  })

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const container = containerRef.current

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    )

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }]
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                const text = quill.getText()
                const addedImage = imageElementRef.current?.files?.[0] || null
                const isEmpty = !addedImage && text.replace(/<(.|\n*?)/g, "").trim().length === 0

                if (isEmpty) {
                  return
                }
                
                const body = JSON.stringify(quill.getContents())

                submitRef.current?.({ body, image: addedImage })

              }
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n")
              }
            }
          }
        }
      }
    }

    const quill = new Quill(editorContainer, options)

    quillRef.current = quill
    quillRef.current.focus()

    if (innerRef) {
      innerRef.current = quill
    }

    quill.setContents(defaultValueRef.current)
    setText(quill.getText())

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText())
    })

    return () => {
      quill.off(Quill.events.TEXT_CHANGE)

      if (container) {
        container.innerHTML = ""
      }

      if (quillRef.current) {
        quillRef.current = null
      }

      if (innerRef) {
        innerRef.current = null
      }
    }
  }, [innerRef])

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current)

    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar")

    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden")
    }
  }

  const onEmojiSelect = (emoji: string) => {
    const quill = quillRef.current

    if (!quill) {
      return
    }

    let selection = quill.getSelection()

    if (!selection) {
      quill.focus()
      selection = quill.getSelection()
    }

    const index = selection ? selection.index : quill.getLength()
    quill.insertText(index, emoji)
    quill.setSelection(index + emoji.length)
  }

  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, "").trim().length === 0

  return (
    <div className="flex flex-col">
      <div className="hidden">
        <Input
          ref={imageElementRef}
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event?.target?.files![0])}
        />
      </div>
      <div className={cn(
        "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:shadow-sm transition bg-white",
        disabled && "opacity-50"
      )}>
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
          <div className="p-2">
            <div className="group/image relative size-[62px] flex justify-center items-center">
              <Hint label="Remover imagem">
                <Button
                  type="button"
                  size="sm"
                  className="hidden absolute -top-2.5 -right-2.5 group-hover/image:flex justify-center items-center size-6 rounded-full border-2 border-white bg-black/70 hover:bg-black text-white z-[4]"
                  onClick={() => {
                    setImage(null)
                    imageElementRef.current!.value = ""
                  }}
                >
                  <XIcon className="size-3.5" />
                </Button>
              </Hint>
              <Image
                fill
                src={URL.createObjectURL(image)}
                alt="Image uploaded"
                className="object-cover border rounded-xl overflow-hidden"
              />
            </div>
          </div>
        )}
        <div className="px-2 pb-2 flex items-center gap-x-1 z-[5]">
          <div className="flex flex-1 items-center gap-x-1 z-[5]">
            <Hint label={isToolbarVisible ? "Exibir formatação" : "Ocultar formatação"}>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={disabled}
                className={cn(
                  "group/button bg-[#dfdfdf] hover:bg-[#5c2c5f]",
                  isToolbarVisible && "bg-[#5c2c5f] group-hover/button:text-white"
                )}
                onClick={toggleToolbar}
              >
                <CaseSensitiveIcon className={cn(
                  "size-5 text-black group-hover/button:text-white",
                  isToolbarVisible && "text-white"
                )} />
              </Button>
            </Hint>
            <EmojiPopover
              onEmojiSelect={onEmojiSelect}
              onOpenChange={setIsEmojiPickerVisible}
            >
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={disabled}
                className={cn(
                  "group/button bg-[#dfdfdf] hover:bg-[#5c2c5f]",
                  isEmojiPickerVisible && "bg-[#5c2c5f] group-hover/button:text-white"
                )}
              >
                <SmileIcon className={cn(
                  "size-4 stroke-[2px] text-black group-hover/button:text-white",
                  isEmojiPickerVisible && "text-white"
                )} />
              </Button>
            </EmojiPopover>
            {variant === "create" && (
              <Hint label="Imagem">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={disabled}
                  className="group/button bg-[#dfdfdf] hover:bg-[#5c2c5f]"
                  onClick={() => imageElementRef.current?.click()}
                >
                  <ImageIcon className="size-4 text-black group-hover/button:text-white" />
                </Button>
              </Hint>
            )}
          </div>
          {variant === "update" && (
            <div className="flex items-center gap-x-2">
              <Button
                type="button"
                variant="outline"
                disabled={disabled}
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="default"
                disabled={disabled || isEmpty}
                onClick={() => {
                  onSubmit({
                    body: JSON.stringify(quillRef?.current?.getContents()),
                    image
                  })
                }}
              >
                Salvar
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
              type="button"
              size="sm"
              variant="default"
              disabled={disabled || isEmpty}
              onClick={() => {
                onSubmit({
                  body: JSON.stringify(quillRef?.current?.getContents()),
                  image
                })
              }}
            >
              <SendHorizonalIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div className="p-2 flex justify-end text-[10px] text-muted-foreground">
          <p>
            <strong>Shift + Enter</strong> para inserir uma nova linha.
          </p>
        </div>
      )}
    </div>
  )
}

export default Editor

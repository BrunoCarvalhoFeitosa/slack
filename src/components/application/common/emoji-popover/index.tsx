"use client"
import { useState } from "react"
import EmojiPicker, { Categories } from "emoji-picker-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface EmojiPopoverProps {
  children: React.ReactNode
  hint?: string
  onEmojiSelect: (emoji: string) => void
  onOpenChange?: (open: boolean) => void
}

export const EmojiPopover = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
  onOpenChange,
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setPopoverOpen(open)
    onOpenChange?.(open)
  }

  const onSelect = (emojiData: any) => {
    onEmojiSelect(emojiData.emoji)
    setPopoverOpen(false)
    onOpenChange?.(false)

    setTimeout(() => {
      setTooltipOpen(true)
    }, 500)
  }

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={handleOpenChange}>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
          <PopoverTrigger>
            <TooltipTrigger>
              {children}
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white border border-white/5">
              <p className="text-xs font-semibold">{hint}</p>
            </TooltipContent>
          </PopoverTrigger>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <EmojiPicker
            onEmojiClick={onSelect}
            searchPlaceholder="Buscar por emoji"
            categories={[
              { category: Categories.SUGGESTED, name: "Recentes" },
              { category: Categories.SMILEYS_PEOPLE, name: "Rostos & Pessoas" },
              { category: Categories.ANIMALS_NATURE, name: "Animais & Natureza" },
              { category: Categories.FOOD_DRINK, name: "Comida & Bebida" },
              { category: Categories.TRAVEL_PLACES, name: "Viagem & Lugares" },
              { category: Categories.ACTIVITIES, name: "Atividades" },
              { category: Categories.OBJECTS, name: "Objetos" },
              { category: Categories.SYMBOLS, name: "Símbolos" },
              { category: Categories.FLAGS, name: "Bandeiras" },
            ]}
          />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}

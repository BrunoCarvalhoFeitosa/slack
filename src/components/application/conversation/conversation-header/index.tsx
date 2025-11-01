"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FaChevronDown } from "react-icons/fa"

interface ConversationHeaderProps {
  memberName?: string
  memberImage?: string
  onClick?: () => void
}

export const ConversationHeader = ({ memberName = "Membro", memberImage, onClick }: ConversationHeaderProps) => {
  const avatarFallback = memberName.charAt(0).toUpperCase()

  return (
    <div className="h-[49px] flex items-center border-b overflow-hidden bg-white">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="px-0"
        onClick={onClick}
      >
        <Avatar className="size-8 rounded-md">
          <AvatarImage src={memberImage} alt="Foto do usuário" />
          <AvatarFallback className="rounded-md bg-gray-300 hover:bg-gray-300 text-xl text-black">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-base truncate">
          {memberName}
        </span>
        <FaChevronDown className="size-2.5" />
      </Button>
    </div>
  )
}

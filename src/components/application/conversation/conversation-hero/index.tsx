import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ConversationHeroProps {
  name: string
  image?: string
}

export const ConversationHero = ({ name, image }: ConversationHeroProps) => {
  const avatarFallback = name.charAt(0).toUpperCase()

  return (
    <div className="mt-14 px-4 mb-4">
      <div className="flex items-center gap-x-1">
        <Avatar className="rounded-md">
          <AvatarImage src={image} alt="Foto do usuário" />
          <AvatarFallback className="rounded-md bg-gray-300 hover:bg-gray-300 text-xl text-black">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-lg font-semibold truncate">
          {name}
        </span>
      </div>
      <div className="mt-2 flex flex-col">
        <p className="mb-4">
          Esta conversa é apenas entre você e <strong className="font-semibold">{name}</strong>.
        </p>
      </div>
    </div>
  )
}
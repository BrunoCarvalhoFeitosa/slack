"use client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ChannelHeroProps {
  name: string
  creationTime: number
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return (
    <div className="mt-14 mx-2 mb-4">
      <p className="mb-2 flex items-center text-2xl font-bold">
        #{name}
      </p>
      <p className="mb-4">
        Este canal foi criado em {format(creationTime, "MMMM 'de' yyyy", { locale: ptBR })}. Este é o começo da conversa em <strong>#{name}</strong>, lembre-se de respeitar os membros.
      </p>
    </div>
  )
}

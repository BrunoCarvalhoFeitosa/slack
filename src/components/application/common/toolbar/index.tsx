"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useGetChannels } from "@/features/channels/api/use-get-channels"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { InfoIcon, SearchIcon } from "lucide-react"

export const Toolbar = () => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { data } = useGetWorkspace({ id: workspaceId })
  const { data: channels } = useGetChannels({ workspaceId })
  const { data: members } = useGetMembers({ workspaceId })

  const onChannelClick = (channelId: string) => {
    setOpen(false)

    router.push(`/application/workspace/${workspaceId}/channel/${channelId}`)
  }

  const onMemberClick = (memberId: string) => {
    setOpen(false)

    router.push(`/application/workspace/${workspaceId}/member/${memberId}`)
  }

  return (
    <div className="w-full bg-primary">
      <nav className="p-1.5 h-[60px] flex justify-between items-center">
        <div className="flex-1" />
        <div className="min-w-[280px] max-[642px] grow-[2] shrink">
          <Button
            type="button"
            className="px-2 w-full h-10 justify-start font-normal bg-accent/25 hover:bg-accent-25"
            onClick={() => setOpen(true)}
          >
            <SearchIcon className="size-5 text-white" />
            <span>
              Buscar em {data?.name}
            </span>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Escreva algo na barra de busca..." />
            <CommandList>
              <CommandEmpty>
                Nenhum resultado encontrado.
              </CommandEmpty>
              <CommandGroup heading="Canais">
                {channels?.map((channel) => (
                  <CommandItem key={channel._id} onSelect={() => onChannelClick(channel._id)}>
                    {channel.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Membros">
                {members?.map((member) => (
                  <CommandItem key={member._id} onSelect={() => onMemberClick(member._id)}>
                    <Avatar className="rounded-md mr-1">
                      <AvatarImage src={member.user?.image} alt="Foto do usuário" />
                      <AvatarFallback className="rounded-md bg-gray-300 hover:bg-gray-300 text-xl text-black">
                        {member.user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {member?.user?.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        <div className="ml-auto flex flex-1 justify-end items-center">
          <Button
            type="button"
            variant="ghost"
          >
            <InfoIcon className="size-5 text-white" />
          </Button>
        </div>
      </nav>
    </div>
  )
}

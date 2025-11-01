"use client"
import { Fragment, useState } from "react"
import { Doc } from "../../../../../convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from "lucide-react"
import { Hint } from "../../common/hint"
import { PreferencesModal } from "../../common/modals/preferences-modal"
import { InviteModal } from "../../common/modals/invite-modal"

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">
  isAdmin: boolean
}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  const [inviteOpen, setInviteOpen] = useState<boolean>(false)
  const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false)
  
  return (
    <Fragment>
      <InviteModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        name={workspace.name}
        joinCode={workspace.joinCode}
      />
      <PreferencesModal
        initialValue={workspace.name}
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
      />
      <div className="px-4 h-[49px] flex justify-between items-center gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              size="sm"
              className="group p-1.5 w-auto text-lg font-semibold overflow-hidden bg-white hover:bg-white"
            >
              <span className="truncate text-black group-hover:text-black">
                {workspace.name}
              </span>
              <ChevronDownIcon className="size-4 shrink-0 text-black group-hover:text-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer">
              <div className="relative flex justify-center items-center size-9 bg-[#ABABAB] hover:bg-[#ABABAB]/80 rounded text-xl text-slate-800 font-semibold overflow-hidden">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="text-base font-semibold">
                  {workspace.name}
                </p>
                <p className="text-muted-foreground">
                  Espaço de trabalho ativo
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <Fragment>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-2 cursor-pointer"
                  onClick={() => setInviteOpen(true)}
                >
                  Convidar pessoa à {workspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-2 cursor-pointer"
                  onClick={() => setPreferencesOpen(true)}
                >
                  Preferências
                </DropdownMenuItem>
              </Fragment>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-x-0.5">
          <Hint label="Filtrar conversas" side="bottom">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="group hover:bg-white"
            >
              <ListFilterIcon className="size-4 text-white group-hover:text-black" />
            </Button>
          </Hint>
          <Hint label="Nova mensagem" side="bottom">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="group hover:bg-white"
            >
              <SquarePenIcon className="size-4 text-white group-hover:text-black" />
            </Button>
          </Hint>
        </div>
      </div>
    </Fragment>
  )
}

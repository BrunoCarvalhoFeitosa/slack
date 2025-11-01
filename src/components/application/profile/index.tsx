"use client"
import { Fragment } from "react"
import { Id } from "../../../../convex/_generated/dataModel"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/hooks/use-confirm"
import { useGetMember } from "@/features/members/api/use-get-member"
import { useCurrentMember } from "@/features/members/api/use-current-member"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useUpdateMember } from "@/features/members/api/use-update-member"
import { useRemoveMember } from "@/features/members/api/use-remove-member"
import Link from "next/link"
import { toast } from "sonner"
import { Loader } from "../common/loader"
import { Alert } from "../common/alert"
import { Button } from "@/components/ui/button"
import { ProfileHeader } from "./profile-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { getDate } from "@/utils"
import { ChevronDownIcon, MailIcon } from "lucide-react"

interface ProfileProps {
  memberId: Id<"members">
  onClose: () => void
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { data: currentMember, isLoading: isLoadingCurrentMember } = useCurrentMember({ workspaceId })
  const { data: member, isLoading: isLoadingMember } = useGetMember({ id: memberId })
  const { mutate: updateMember, isPending: updatingMember } = useUpdateMember()
  const { mutate: removeMember, isPending: removingMember } = useRemoveMember()

  const [LeaveDialog, confirmLeave] = useConfirm(
    "Tem certeza que deseja prosseguir?",
    "Esta ação é irreversível e fará com que você deixe este espaço de trabalho."
  )

  const [UpdateDialog, confirmUpdate] = useConfirm(
    "Tem certeza que deseja prosseguir?",
    "Esta ação é irreversível e fará com que este membro seja alterado."
  )

  const [RemoveDialog, confirmRemove] = useConfirm(
    "Tem certeza que deseja prosseguir?",
    "Esta ação é irreversível e fará com que este membro seja removido para sempre."
  )

  const onLeave = async () => {
    const ok = await confirmLeave()

    if (!ok) {
      return
    }

    removeMember({
      id: memberId
    }, {
      onSuccess: () => {
        toast("Sucesso ao sair do espaço de trabalho.", {
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

        router.replace(`/application/`)
      },
      onError: () => {
        toast.error("Erro ao sair do espaço de trabalho.", {
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
        onClose()
      }
    })
  }
  
  const onUpdate = async (role: "admin" | "member") => {
    const ok = await confirmUpdate()

    if (!ok) {
      return
    }

    updateMember({
      id: memberId,
      role
    }, {
      onSuccess: () => {
        toast("Sucesso ao atualizar membro.", {
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
        toast.error("Erro ao atualizar membro.", {
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
        onClose()
      }
    })
  }
  
  const onRemove = async () => {
    const ok = await confirmRemove()

    if (!ok) {
      return
    }

    removeMember({
      id: memberId
    }, {
      onSuccess: () => {
        toast("Sucesso ao remover membro.", {
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
        toast.error("Erro ao remover membro.", {
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
        onClose()
      }
    })
  }

  if (isLoadingMember || isLoadingCurrentMember) {
    return (
      <div className="px-2 h-full flex flex-col">
        <ProfileHeader onClose={onClose} />
        <Loader />
      </div>
    )
  }

  if (!member) {
    return (
      <div className="px-2 h-full flex flex-col">
        <ProfileHeader onClose={onClose} />
        <Alert text="Perfil de usuário não encontrado." />
      </div>
    )
  }

  const avatarFallback = member.user.name?.charAt(0).toUpperCase()

  return (
    <Fragment>
      <LeaveDialog />
      <UpdateDialog />
      <RemoveDialog />
      <div className="px-2 h-full flex flex-col">
        <ProfileHeader onClose={onClose} />
        <div className="py-4 flex flex-col items-center">
          <Avatar className="max-w-[140px] max-h-[140px] size-full rounded-md overflow-hidden">
            <AvatarImage src={member.user.image} alt="Foto do usuário" />
            <AvatarFallback className="bg-gray-200 aspect-square rounded-md text-6xl">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="py-2 px-4 flex flex-col items-center">
          <p className="text-xl font-bold">
            {member.user.name}
          </p>
          {currentMember?.role === "admin" && currentMember._id !== memberId ? (
            <div className="py-2 w-full flex items-center gap-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 capitalize"
                    disabled={updatingMember}
                  >
                    {member.role === "member" ? "Membro" : "Admin"} <ChevronDownIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) => onUpdate(role as "admin" | "member")}
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="member">
                      Membro
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={removingMember}
                onClick={onRemove}
              >
                Remover
              </Button>
            </div>
          ) : currentMember?._id === memberId && currentMember.role !== "admin" ? (
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onLeave}
              >
                Sair
              </Button>
            </div>
          ) : null}
        </div>
        <Separator />
        <div className="p-4 flex flex-col">
          <p className="mb-2 text-base font-bold">
            Informações de contato
          </p>
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center size-9 rounded-md bg-gray-200">
              <MailIcon className="size-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text text-muted-foreground">
                Endereço de e-mail
              </p>
              <Link
                href={`mailto:${member.user.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {member.user.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
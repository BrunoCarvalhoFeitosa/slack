"use client"
import { Fragment } from "react"
import { toast } from "sonner"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code"
import { useConfirm } from "@/hooks/use-confirm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getDate } from "@/utils"
import { CopyIcon, RefreshCcwIcon } from "lucide-react"

interface InviteModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  name: string
  joinCode: string
}

export const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
  const workspaceId = useWorkspaceId()
  const { mutate: generateCode, isPending: generatingCode } = useNewJoinCode()

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja prosseguir?",
    "Esta ação fará com que o código atual seja descartado e um novo seja gerado."
  )

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/application/join/${workspaceId}`

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast("Código copiado com sucesso.", {
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
    })
  }

  const handleNewCode = async () => {
    const ok = await confirm()

    if (!ok) {
      return
    }

    generateCode({
      workspaceId
    }, {
      onSuccess: async () => {
        toast("Novo código gerado com sucesso.", {
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
        toast.error("Erro ao gerar novo código.", {
          classNames: {
            description: "text-gray-700!"
          },
          actionButtonStyle: {
            backgroundColor: "var(--destructive)",
            color: "var(--secondary)"
          } as React.CSSProperties
        })
      }
    })
  }

  return (
    <Fragment>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="xl:p-0 bg-gray-100 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>
              Convide pessoas à {name}
            </DialogTitle>
            <DialogDescription>
              Use o código abaixo para convidar pessoas a este espaço de trabalho.
            </DialogDescription>
          </DialogHeader>
          <div className="px-4 pb-4 w-full flex flex-col justify-center items-center gap-y-2">
            <div className="pb-3 w-full flex flex-col justify-center items-center gap-x-3">
              <p className="text-4xl font-bold text-center uppercase tracking-widest">
                {joinCode.replaceAll(",","")}
              </p>
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-fit font-semibold text-gray-500 hover:text-gray-700"
                  onClick={handleCopy}
                >
                  <CopyIcon />
                  <span>
                    Copiar
                  </span>
                </Button>
              </div>
            </div>
            <div className="w-full flex justify-end items-center gap-x-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={generatingCode}
                  className="h-12 text-base"
                >
                  Fechar
                </Button>
              </DialogClose>
              <Button
                type="button"
                disabled={generatingCode}
                className="w-fit h-12 text-base"
                onClick={handleNewCode}
              >
                <RefreshCcwIcon className="size-4" />
                <span>
                  Gerar novo código
                </span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
"use client"
import { Fragment, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace"
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useConfirm } from "@/hooks/use-confirm"
import { updateWorkspaceSchema } from "@/features/workspaces/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { getDate } from "@/utils"
import { Trash2Icon } from "lucide-react"

interface PreferencesModalProps {
  initialValue: string
  open: boolean
  setOpen: (open: boolean) => void
}

export const PreferencesModal = ({ initialValue, open, setOpen }: PreferencesModalProps) => {
  const [value, setValue] = useState<string>(initialValue)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { mutate: updateWorkspace, isPending: updatingWorkspace } = useUpdateWorkspace()
  const { mutate: removeWorkspace, isPending: removingWorkspace } = useRemoveWorkspace()

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja prosseguir?",
    "Esta ação fará com que o espaço de trabalho seja excluído permanentemente."
  )

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      name: value,
    }
  })

  const handleClose = () => {
    setEditOpen(false)
  }

  const onEdit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    updateWorkspace({
      id: workspaceId,
      name: values.name
    }, {
      onSuccess: () => {
        toast("Espaço de trabalho editado com sucesso.", {
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

        setValue(values.name)
        setEditOpen(false)
      },
      onError: (error) => {
        console.error("Error while edit workspace", error)

        toast.error("Erro ao atualizar espaço de trabalho.", {
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
        handleClose()
        form.reset()
        router.refresh()
      }
    })
  }

  const onRemove = async () => {
    const ok = await confirm()

    console.log("ok", ok)

    if (!ok) {
      return
    }

    removeWorkspace({
      id: workspaceId
    }, {
      onSuccess: () => {
        toast("Espaço de trabalho deletado com sucesso.", {
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

        router.replace("/application")
      },
      onError: (error) => {
        console.error("Error while delete workspace", error)

        toast.error("Erro ao deletar espaço de trabalho.", {
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
              Detalhes do espaço de trabalho
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 w-full flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 w-full border rounded cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        Nome do espaço de trabalho
                      </p>
                      <p>
                        {value}
                      </p>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="px-0 text-base text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="xl:p-0 bg-gray-100 overflow-hidden">
                <DialogHeader className="p-4 border-b bg-white">
                  <DialogTitle>
                    Renomear este espaço de trabalho
                  </DialogTitle>
                </DialogHeader>
                <div className="px-4 py-5 w-full">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onEdit)} className="space-y-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                autoFocus
                                autoComplete="off"
                                maxLength={80}
                                placeholder="Nome do espaço de trabalho"
                                className="h-12 placeholder:text-base"
                                disabled={updatingWorkspace}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <DialogClose className="mt-4 w-full flex items-center justify-end gap-x-2">
                          <div>
                            <Button
                              type="button"
                              variant="outline"
                              className="h-12 text-lg"
                              disabled={updatingWorkspace}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="submit"
                              variant="default"
                              className="h-12 text-lg bg-primary"
                              disabled={updatingWorkspace}
                            >
                              Renomear espaço de trabalho
                            </Button>
                          </div>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
            <div className="w-full">
              <Button
                type="button"
                className="px-5 w-full h-12 flex items-center gap-x-1 bg-primary text-base"
                disabled={removingWorkspace}
                onClick={onRemove}
              >
                <Trash2Icon className="size-5 text-white" />
                <span className="font-medium text-white">
                  Deletar este espaço de trabalho
                </span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

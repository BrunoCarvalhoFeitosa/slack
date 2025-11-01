"use client"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useChannelId } from "@/hooks/use-channel-id"
import { useUpdateChannel } from "@/features/channels/api/use-update-channel"
import { useConfirm } from "@/hooks/use-confirm"
import { useRemoveChannel } from "@/features/channels/api/use-delete-channel"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateChannelSchema } from "@/features/channels/schemas"
import { getDate } from "@/utils"
import { FaChevronDown } from "react-icons/fa"
import { Trash2Icon } from "lucide-react"
import { useCurrentMember } from "@/features/members/api/use-current-member"

interface ChannelHeaderProps {
  title: string
}

export const ChannelHeader = ({ title }: ChannelHeaderProps) => {
  const [editOpen, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const { data: member } = useCurrentMember({ workspaceId })
  const { mutate: updateChannel, isPending: updatingChannel } = useUpdateChannel()
  const { mutate: removeChannel, isPending: removingChannel } = useRemoveChannel()

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja prosseguir?",
    "Esta ação fará com que o canal seja excluído permanentemente."
  )

  const form = useForm<z.infer<typeof updateChannelSchema>>({
    resolver: zodResolver(updateChannelSchema),
    defaultValues: {
      name: title,
    }
  })

  const handleOpen = (value: boolean) => {
    if (member?.role !== "admin") {
      return
    }

    setOpen(value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (values: z.infer<typeof updateChannelSchema>) => {
    const name = values.name.replace(/\s+/g, "-").toLocaleLowerCase()

    updateChannel({
      id: channelId,
      name
    }, {
      onSuccess: (id) => {
        toast("Nome do canal atualizado com sucesso.", {
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
        toast.error("Erro ao atualizar nome do canal.", {
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
      }
    })
  }

  const onRemove = async () => {
    const ok = await confirm()

    if (!ok) {
      return
    }

    removeChannel({
      id: channelId
    }, {
      onSuccess: (id) => {
        toast("Canal deletado com sucesso.", {
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

        router.push(`/application/workspace/${workspaceId}`)
      },
      onError: (error) => {
        console.error("Error while delete channel", error)

        toast.error("Erro ao deletar canal.", {
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
        router.refresh()
      }
    })
  }

  return (
    <div className="px-4 h-[49px] flex items-center border-b overflow-hidden bg-white">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="px-2 w-auto text-lg font-semibold overflow-hidden hover:bg-[#5c2c5f] hover:text-white"
          >
            <span className="truncate">#{title}</span>
            <FaChevronDown className="size-2.5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="xl:p-0 bg-gray-100 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>
              #{title}
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={handleOpen}>
              <DialogTrigger asChild>
                <div className="px-4 py-4 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-base font-semibold">
                        Nome do canal
                      </p>
                      <p className="text-base">
                        #{title}
                      </p>
                    </div>
                    {member?.role === "admin" && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-base font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="xl:p-0 bg-gray-100 overflow-hidden">
                <DialogHeader className="p-4 border-b bg-white">
                  <DialogTitle>
                    Renomear este canal
                  </DialogTitle>
                </DialogHeader>
                <div className="p-4 flex flex-col gap-y-2">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                                placeholder="Nome do canal"
                                className="h-12 placeholder:text-base"
                                disabled={updatingChannel}
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
                              disabled={updatingChannel}
                            >
                              Cancelar
                            </Button>
                          </div>
                          <div>
                            <Button
                              type="submit"
                              variant="default"
                              className="h-12 text-lg bg-primary"
                              disabled={updatingChannel}
                            >
                              Editar canal
                            </Button>
                          </div>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
            {member?.role === "admin" && (
              <div className="w-full">
                <Button
                  type="button"
                  className="w-full h-12 text-base"
                  disabled={removingChannel}
                  onClick={onRemove}
                >
                  <Trash2Icon className="size-5 text-white" />
                  <span className="font-medium text-white">
                    Deletar este canal
                  </span>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

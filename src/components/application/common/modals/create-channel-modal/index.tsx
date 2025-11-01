"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { createChannelSchema } from "@/features/channels/schemas"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useCreateChannel } from "@/features/channels/api/use-create-channel"
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getDate } from "@/utils"

export const CreateChannelModal = () => {
  const [open, setOpen] = useCreateChannelModal()
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { mutate: createChannel, isPending: creatingChannel } = useCreateChannel()

  const form = useForm<z.infer<typeof createChannelSchema>>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      name: "",
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (values: z.infer<typeof createChannelSchema>) => {
    const name = values.name.replace(/\s+/g, "-").toLocaleLowerCase()

    createChannel({
      name, workspaceId
    }, {
      onSuccess: (id) => {
        toast("Canal criado com sucesso.", {
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

        router.push(`/application/workspace/${workspaceId}/channel/${id}`)
      },
      onError: (error) => {
        console.error("Error while create channel", error)

        toast.error("Erro ao criar canal.", {
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
        form.reset()
        handleClose()
        router.refresh()
      }
    })
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="xl:p-0 bg-gray-100 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>
            Criar um canal
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 w-full flex flex-col gap-y-2">
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
                        disabled={creatingChannel}
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
                      disabled={creatingChannel}
                    >
                      Cancelar
                    </Button>
                  </div>
                  <div>

                    <Button
                      type="submit"
                      variant="default"
                      className="h-12 text-lg bg-primary"
                      disabled={creatingChannel}
                    >
                      Criar canal
                    </Button>
                  </div>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
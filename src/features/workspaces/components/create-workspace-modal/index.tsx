"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useCreateWorkspaceModal } from "../../store/use-create-workspace-modal"
import { useCreateWorkspace } from "../../api/use-create-workspace"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDate } from "@/utils"
import { createWorkspaceSchema } from "../../schemas"

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal()
  const { mutate, isPending } = useCreateWorkspace()
  const router = useRouter()

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    mutate({
      name: values.name
    }, {
      onSuccess: (id) => {
        toast("Espaço de trabalho criado com sucesso.", {
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

        setTimeout(() => {
          router.push(`/application/workspace/${id}`)
        })
      },
      onError: (error) => {
        console.error("Error while create workspace", error)

        toast.error("Erro ao criar espaço de trabalho.", {
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
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="xl:p-0 bg-gray-100 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>
            Criar um espaço de trabalho
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 w-full">
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
                        placeholder="Nome do espaço de trabalho"
                        className="h-12 placeholder:text-base"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  className="h-12 text-lg bg-primary"
                  disabled={isPending}
                >
                  Criar espaço de trabalho
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

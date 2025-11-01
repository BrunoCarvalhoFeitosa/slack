import { JSX, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void} | null>(null)

  const confirm = () => new Promise((resolve) => {
    setPromise({ resolve })
  })

  const handleClose = () => {
    setPromise(null)
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }
  
  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const ConfirmDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent className="xl:p-0 bg-gray-100 overflow-hidden">
       <DialogHeader className="p-4 h-fit border-b bg-white">
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 w-full min-h-[75px]">
          <p className="text-muted-foreground">
            {message}
          </p>
        </div>
        <DialogFooter className="p-4 w-full">
          <Button
            variant="outline"
            className="h-12 text-base"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            className="h-12 text-base"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmDialog, confirm]
}

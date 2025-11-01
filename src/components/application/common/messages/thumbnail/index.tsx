"use client"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

interface ThumbnailProps {
  url: string | null | undefined
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative my-2 max-w-[360px] border rounded-lg overflow-hidden cursor-zoom">
          <img
            src={url}
            alt="Imagem"
            className="size-full rounded-md object-cover"
          /> 
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-[800px] border-none bg-transparent shadow-none">
        <img
          src={url}
          alt="Imagem"
          className="size-full rounded-md object-cover"
        />
      </DialogContent>
    </Dialog>
  )
}

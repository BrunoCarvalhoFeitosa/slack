"use client"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

interface ProfileHeaderProps {
  onClose: () => void
}

export const ProfileHeader = ({ onClose }: ProfileHeaderProps) => {
  return (
    <div className="h-[49px] flex justify-between items-center border-b">
      <div>
        <h2 className="text-lg font-semibold">
          Perfil
        </h2>
      </div>
      <div className="box-border">
        <Button
          type="button"
          size="sm"
          variant="default"
          onClick={onClose}
        >
          <XIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
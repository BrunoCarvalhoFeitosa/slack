import { cn } from "@/lib/utils"
import { useToggle } from "react-use"
import { Hint } from "../../common/hint"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { FaCaretDown as FaCaretDownIcon } from "react-icons/fa"

interface WorkspaceSectionProps {
  children: React.ReactNode
  label: string
  hint: string
  onNew?: () => void
}

export const WorkspaceSection = ({ children, label, hint, onNew }: WorkspaceSectionProps) => {
  const [on, toggle] = useToggle(true)

  return (
    <div className="mt-3 px-2 w-full flex flex-col">
      <div className="group w-full flex items-center pl-2.5">
        <Button
          type="button"
          className="p-0.5 text-sm text-white size-6 shrink-0"
          onClick={toggle}
        >
          <FaCaretDownIcon className={cn(
            "size-4 transition-transform",
            on && "rotate-90"
          )} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="px-1.5 h-[28px] justify-start text-sm text-white shrink-0 overflow-hidden hover:bg-transparent hover:text-white"
        >
          <span className="truncate">
            {label}
          </span>
        </Button>
        {onNew && (
          <div className="ml-auto">
            <Hint label={hint} side="top" align="center">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="ml-auto p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-white hover:text-white size-6 shrink-0"
                onClick={onNew}
              >
                <PlusIcon className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
      </div>
      {on && children}
    </div>
  )
}

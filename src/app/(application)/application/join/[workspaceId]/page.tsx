"use client"
import Link from "next/link"
import { toast } from "sonner"
import VerificationInput from "react-verification-input"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info"
import { useJoin } from "@/features/workspaces/api/use-join"
import { SlackLogoText } from "@/components/common/slack-logo-text"
import { Button } from "@/components/ui/button"
import { getDate } from "@/utils"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useMemo } from "react"

const JoinPage = () => {
  const workspaceId = useWorkspaceId()
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId })
  const { mutate: join, isPending: isJoin } = useJoin()
  const router = useRouter()

  const isMember = useMemo(() => data?.isMember, [data?.isMember])

  useEffect(() => {
    if (isMember) {
      router.push(`/application/workspace/${workspaceId}`)
    }
  }, [isMember, router, workspaceId])

  const handleJoinComplete = (value: string) => {
    join({
      workspaceId,
      joinCode: value
    }, {
      onSuccess: (id) => {
        toast("Sucesso, você agora faz parte deste grupo.", {
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

        router.replace(`/application/workspace/${id}`)
      },
      onError: () => {
        toast.error("Ocorreu um erro, o código pode estar errado.", {
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

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 w-full h-full flex flex-col justify-center items-center gap-y-6">
      <Link href="/application">
        <SlackLogoText width="150" height="50" showLabel />
      </Link>
      <div className="max-w-md flex flex-col gap-y-4 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">
            Junte-se ao espaço de trabalho {data?.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            Insira o código para juntar-se.
          </p>
        </div>
        <div>
          <VerificationInput
            length={6}
            autoFocus
            classNames={{
              container: cn("flex! gap-x-2! w-auto!", isJoin && "opacity-50 cursor-not-allowed"),
              character: "uppercase! flex! justify-center! items-center! rounded! border! border-gray-300! text-4xl! font-bold! w-18! h-18!",
              characterInactive: "bg-gray-100! text-gray-300!",
              characterSelected: "bg-white! text-black!",
              characterFilled: "bg-white! text-black!",
            }}
            onComplete={handleJoinComplete}
          />
        </div>
        <div className="mt-8">
          <Button
            type="button"
            className="h-12 text-base"
            asChild
          >
            <Link href="/application">
              Voltar para página principal
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JoinPage

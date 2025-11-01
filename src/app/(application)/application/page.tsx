"use client"
import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"

const ApplicationPage = () => {
  const [open, setOpen] = useCreateWorkspaceModal()
  const { data, isLoading } = useGetWorkspaces()
  const router = useRouter()
  const workspaceId = useMemo(() => data?.[0]?._id, [data])

  useEffect(() => {
    if (isLoading) {
      return
    }

    console.log("workspaceId", workspaceId)
    console.log("open", open)

    if (workspaceId) {
      router.replace(`/application/workspace/${workspaceId}`)
    } else if (!open) {
      setOpen(true)
    }
  }, [workspaceId, isLoading, open, setOpen])

  return null
}

export default ApplicationPage

"use client"
import { Fragment, useEffect, useState } from "react"
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal"
import { CreateChannelModal } from "../application/common/modals/create-channel-modal"

export const Modals = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Fragment>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </Fragment>
  )
}
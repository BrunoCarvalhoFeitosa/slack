"use client"
import { Fragment } from "react"
import { usePanel } from "@/hooks/use-panel"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Toolbar } from "@/components/application/common/toolbar"
import { Sidebar } from "@/components/application/common/sidebar"
import { WorkspaceSidebar } from "@/components/application/workspace/workspace-sidebar"
import { Threads } from "@/components/application/thread"
import { Profile } from "@/components/application/profile"
import { Loader2Icon } from "lucide-react"

interface WorkspaceIdLayoutProps {
  children: React.ReactNode
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel()
  const showPanel = !!parentMessageId || !!profileMemberId

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-60px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="ca-workspace-layout"
        >
          <ResizablePanel
            defaultSize={28}
            minSize={11}
            className="bg-[#5c2c5f]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={28}>
            <div className="h-[calc(100dvh-60px)] py-0.5 px-2">
              {children}
            </div>
          </ResizablePanel>
          {showPanel && (
            <Fragment>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={28} defaultSize={35}>
                {parentMessageId ? (
                  <Threads
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  <Profile
                    memberId={profileMemberId as Id<"members">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
                  </div>
                )}
              </ResizablePanel>
            </Fragment>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default WorkspaceIdLayout

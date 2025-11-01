"use client"
import { useChannelId } from "@/hooks/use-channel-id"
import { useGetChannel } from "@/features/channels/api/use-get-channel"
import { useGetMessages } from "@/features/messages/api/use-get-messages"
import { ChannelHeader } from "@/components/application/channel/channel-header"
import { MessageList } from "@/components/application/common/messages/message-list"
import { ChannelChatInput } from "@/components/application/channel/channel-chat-input"
import { Loader2Icon, TriangleAlertIcon } from "lucide-react"

const ChannelIdPage = () => {
  const channelId = useChannelId()
  const { data: channel, isLoading: channelLoading } = useGetChannel({ id: channelId })
  const { results, status, loadMore } = useGetMessages({ channelId })

  console.log({results})

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-[calc(100dvh-60px)] flex flex-1 justify-center items-center">
        <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="h-[calc(100dvh-60px)] flex flex-col flex-1 justify-center items-center gap-y-2">
        <TriangleAlertIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Canal não encontrado.
        </span>
      </div>
    )
  }

  return (
    <div className="h-full py-0.5 px-2 flex flex-col">
      <ChannelHeader title={channel.name} />
      {/* <div className="flex-1"> */}
        <MessageList
          channelName={channel.name}
          channelCreationTime={channel._creationTime}
          variant="channel"
          data={results}
          loadMore={loadMore}
          isLoadingMore={status === "LoadingMore"}
          canLoadMore={status === "CanLoadMore"}
        />
        <ChannelChatInput placeholder={`Escreva algo em #${channel.name}...`} />
      {/* </div> */}
    </div>
  )
}

export default ChannelIdPage

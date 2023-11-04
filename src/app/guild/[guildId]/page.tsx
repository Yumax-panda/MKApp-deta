import GuildDetail from "@/components/GuildDetail/GuildDetail"

export default function GuildDetailPage({
  params,
}: {
  params: { guildId: string }
}) {
  return <GuildDetail params={params} />
}

export const fetchCache = "force-no-store"

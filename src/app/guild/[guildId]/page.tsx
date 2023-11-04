import Guild from "@/components/Guild/Guild"

export default function GuildPage({ params }: { params: { guildId: string } }) {
  return <Guild params={params} />
}

export const fetchCache = "force-no-store"

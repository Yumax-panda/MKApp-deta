import { notFound } from "next/navigation"
import Profile from "@/components/Guild/Profile"
import Result from "@/components/Guild/Result"
import SectionContainer from "@/components/Section/SectionContainer/SectionContainer"
import { DetaClient } from "@/repository/deta"

async function getGuild({ params }: { params: { guildId: string } }) {
  const client = new DetaClient()
  const [results, detail] = await Promise.all([
    client.result.get(params.guildId),
    client.guildDetail.get(params.guildId),
  ])
  return { results, detail }
}

export default async function GuildPage({
  params,
}: {
  params: { guildId: string }
}) {
  const { results, detail } = await getGuild({ params })

  if (!detail) notFound()
  console.log("detail", detail)

  return (
    <SectionContainer>
      <Profile detail={detail} />
      <Result guildId={params.guildId} results={results} />
    </SectionContainer>
  )
}

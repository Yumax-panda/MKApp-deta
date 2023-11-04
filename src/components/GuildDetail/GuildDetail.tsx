import { notFound } from "next/navigation"
import SectionContainer from "../SectionContainer/SectionContainer"
import Profile from "./Profile"
import Result from "./Result"
import { DetaClient } from "@/repository/deta"

export default async function GuildDetail({
  params,
}: {
  params: { guildId: string }
}) {
  const client = new DetaClient()
  const [results, detail] = await Promise.all([
    client.result.get(params.guildId),
    client.guildDetail.get(params.guildId),
  ])

  if (!detail) notFound()

  return (
    <SectionContainer>
      <Profile detail={detail} />
      <Result guildId={params.guildId} results={results} />
    </SectionContainer>
  )
}

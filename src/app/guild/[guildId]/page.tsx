"use client"

import ResultTable from "@/components/Table/ResultTable"
import { useGuildDetail } from "@/hooks/useGuildDetail"

export default function GuildPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params
  const { guild } = useGuildDetail(guildId)
  const rows = (guild?.results ?? []).map((result, index) => ({
    id: index,
    ...result,
  }))
  return <ResultTable rows={rows} />
}

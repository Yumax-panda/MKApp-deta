"use client"

import ResultTable from "@/components/Table/ResultTable"
import WinLoseHistory from "@/components/WinLoseHistoryGraph/WinLoseHistory"
import { useGuildDetail } from "@/hooks/useGuildDetail"

export default function GuildPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params
  const { guild } = useGuildDetail(guildId)
  const rows = (guild?.results ?? []).map((result, index) => ({
    id: index,
    ...result,
  }))
  const history = (guild?.results ?? []).map((result) => ({
    score: result.score,
    enemyScore: result.enemyScore,
  }))
  return (
    <div>
      <WinLoseHistory history={history} />
      <h2>Results</h2>
      <ResultTable rows={rows} />
    </div>
  )
}

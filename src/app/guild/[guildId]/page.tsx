"use client"

import GuildSettings from "@/components/GuildSettings/GuildSettings"
import GuildTab from "@/components/GuildTabs/GuildTabs"
import TabPanel from "@/components/TabPanel/TabPanel"
import ResultTable from "@/components/Table/ResultTable"
import WinLoseHistory from "@/components/WinLoseHistory/WinLoseHistory"
import { useGuildDetail } from "@/hooks/useGuildDetail"
import { useGuildResults } from "@/hooks/useGuildResults"
import { useTabs } from "@/hooks/useTabs"

export default function GuildPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params
  const { value, setValue } = useTabs()
  const { results } = useGuildResults(guildId)
  const manager = useGuildDetail(guildId)
  const rows = results.map((result, index) => ({
    id: index,
    ...result,
  }))

  return (
    <div>
      <GuildTab value={value} setValue={setValue} />
      <TabPanel value={value} index={0}>
        <ResultTable rows={rows} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WinLoseHistory history={rows} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GuildSettings {...manager} />
      </TabPanel>
    </div>
  )
}

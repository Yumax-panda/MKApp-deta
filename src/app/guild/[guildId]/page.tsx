"use client"

import GuildTab from "@/components/GuildTabs/GuildTabs"
import TabPanel from "@/components/TabPanel/TabPanel"
import ResultTable from "@/components/Table/ResultTable"
import WinLoseHistory from "@/components/WinLoseHistory/WinLoseHistory"
import { useGuildDetail } from "@/hooks/useGuildDetail"
import { useTabs } from "@/hooks/useTabs"

export default function GuildPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params
  const { value, setValue } = useTabs()
  const { guild } = useGuildDetail(guildId)
  const rows = (guild?.results ?? []).map((result, index) => ({
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
        <WinLoseHistory history={guild?.results ?? []} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Settings
      </TabPanel>
    </div>
  )
}

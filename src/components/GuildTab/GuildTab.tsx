import { Settings, QueryStats, TableRowsOutlined } from "@mui/icons-material"
import { Tabs, Tab } from "@mui/material"
import { useState } from "react"

type Props = {
  guildId: string
}

function GuildTab({ guildId }: Props) {
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab icon={<TableRowsOutlined />} label="Results" />
      <Tab icon={<QueryStats />} label="Analysis" />
      <Tab icon={<Settings />} label="Settings" />
    </Tabs>
  )
}

export default GuildTab

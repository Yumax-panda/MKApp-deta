import { Settings, QueryStats, TableRowsOutlined } from "@mui/icons-material"
import { Tabs, Tab } from "@mui/material"
import type { SyntheticEvent } from "react"

type Props = {
  value: number
  setValue: (value: number) => void
}

function GuildTab({ value, setValue }: Props) {
  const handleChange = (event: SyntheticEvent, newValue: number) => {
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

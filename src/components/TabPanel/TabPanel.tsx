import React from "react"
import SectionContainer from "../SectionContainer/SectionContainer"

type Props = {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: Props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <SectionContainer>{children}</SectionContainer>}
    </div>
  )
}

export default TabPanel

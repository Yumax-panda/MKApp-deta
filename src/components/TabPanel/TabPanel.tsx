import { Box } from "@mui/material"
import React from "react"

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
      {value === index && (
        <Box
          sx={{
            py: 3,
            width: {
              xs: "90vw",
              sm: "80vw",
            },
            margin: "auto",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

export default TabPanel

import { Box } from "@mui/material"
import Drawer from "../Drawer/Drawer"

type Props = {
  titile: string
  children: React.ReactNode
}

function Template({ titile, children }: Props) {
  return (
    <Drawer titile={titile}>
      <Box>{children}</Box>
    </Drawer>
  )
}

export default Template

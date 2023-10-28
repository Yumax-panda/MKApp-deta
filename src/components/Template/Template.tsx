import { Box } from "@mui/material"
import Drawer from "../Drawer/Drawer"

type Props = {
  children: React.ReactNode
}

function Template({ children }: Props) {
  return (
    <Drawer>
      <Box>{children}</Box>
    </Drawer>
  )
}

export default Template

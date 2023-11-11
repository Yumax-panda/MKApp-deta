import { Paper as MuiPaper } from "@mui/material"
import type { PaperProps } from "@mui/material"

type Props = PaperProps

function Paper(props: Props) {
  return <MuiPaper sx={{ borderRadius: "10px" }} {...props} />
}

export default Paper

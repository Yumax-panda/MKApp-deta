import { Paper as MuiPaper } from "@mui/material"
import type { PaperProps } from "@mui/material"

type Props = Omit<PaperProps, "borderRadius">

function Paper({ sx, ...props }: Props) {
  return <MuiPaper sx={{ borderRadius: "10px", ...sx }} {...props} />
}

export default Paper

import { Paper as MuiPaper } from "@mui/material"
import type { PaperProps } from "@mui/material"

type Props = Omit<PaperProps, "sx"> & { sx?: SxProps }
type SxProps = Omit<PaperProps["sx"], "borderRadius">

function Paper({ sx, ...props }: Props) {
  return <MuiPaper sx={{ borderRadius: "10px", ...sx }} {...props} />
}

export default Paper

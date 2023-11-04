import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import { useContext } from "react"
import ColorModeContext from "@/context/ColorModeContext"

function ModeChangeIcon() {
  const { toggleColorMode } = useContext(ColorModeContext)
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"

  return (
    <Tooltip title={isDark ? "Dark mode" : "Light mode"}>
      <IconButton onClick={toggleColorMode}>
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  )
}

export default ModeChangeIcon

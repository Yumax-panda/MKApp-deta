"use client"

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material"

type Props = {
  children: React.ReactNode
}

const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function ThemeProvider({ children }: Props) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

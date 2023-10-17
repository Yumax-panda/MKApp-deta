"use client"

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from "@mui/material"
import { useMemo, useState, useEffect } from "react"
import type { ReactNode } from "react"
import ColorModeContext from "@/context/ColorModeContext"

type Props = {
  children: ReactNode
}

export default function ThemeProvider({ children }: Props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState<"light" | "dark">("light")
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  useEffect(() => {
    if (prefersDarkMode) {
      setMode("dark")
    } else {
      setMode("light")
    }
  }, [prefersDarkMode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  )
}

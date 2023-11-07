"use client"

import { LocalizationProvider as Provider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

type Props = {
  children: React.ReactNode
}

export default function LocalizationProvider({ children }: Props) {
  return <Provider dateAdapter={AdapterDayjs}>{children}</Provider>
}

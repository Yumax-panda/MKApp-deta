import { useState } from "react"

type UseTabsReturn = {
  value: number
  setValue: (value: number) => void
}

export const useTabs = (): UseTabsReturn => {
  const [value, setValue] = useState(0)
  return { value, setValue }
}

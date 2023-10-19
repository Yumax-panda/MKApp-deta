import { useState } from "react"
import type { SyntheticEvent } from "react"

type UseTabsReturn = {
  value: number
  setValue: (value: number) => void
  handleChange: (event: SyntheticEvent, newValue: number) => void
}

export const useTabs = (): UseTabsReturn => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return { value, setValue, handleChange }
}

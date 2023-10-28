"use client"

import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"
import Privacy from "@/components/Section/Policy/Privacy"
import Terms from "@/components/Section/Policy/Terms"

export default function PolicyPage() {
  const [value, setValue] = useState("terms")
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth="lg">
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="text alignment"
        sx={{ mb: 2, display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="terms" aria-label="left aligned">
          利用規約
        </ToggleButton>
        <ToggleButton value="privacy" aria-label="centered">
          プライバシーポリシー
        </ToggleButton>
      </ToggleButtonGroup>
      {value === "terms" ? <Terms /> : <Privacy />}
    </Container>
  )
}

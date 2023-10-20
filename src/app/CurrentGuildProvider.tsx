"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import CurrentGuildContext from "@/context/CurrentGuildContext"
import type { GuildDetail } from "@/models/guildDetail"

type Props = {
  children: ReactNode
}

export default function CurrentGuildProvider({ children }: Props) {
  const [guild, setGuild] = useState<GuildDetail | null>(null)

  return (
    <CurrentGuildContext.Provider value={{ guild, setGuild }}>
      {children}
    </CurrentGuildContext.Provider>
  )
}

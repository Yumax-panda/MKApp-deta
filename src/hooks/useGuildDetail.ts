import { useState, useEffect } from "react"
import type { GuildDetail as DefaultGuildDetail } from "@/models/guildDetail"
import type { Result } from "@/models/result"

type GuildDetail = {
  results: Result[]
} & DefaultGuildDetail

type UseGuildDetailReturn = {
  guild: GuildDetail | null
  isLoading: boolean
  refresh: () => Promise<void>
}

const fetchGuildDetail = async (guildId: string): Promise<GuildDetail> => {
  const res = await fetch(`/api/guild/${guildId}/detail`)
  const data = await res.json()
  return data
}

export const useGuildDetail = (guildId: string): UseGuildDetailReturn => {
  const [guild, setGuild] = useState<GuildDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const _refresh = async () => {
      setIsLoading(true)
      const data = await fetchGuildDetail(guildId)
      setGuild(data)
      setIsLoading(false)
    }
    _refresh()
  }, [guildId])

  const refresh = async () => {
    setIsLoading(true)
    const data = await fetchGuildDetail(guildId)
    setGuild(data)
    setIsLoading(false)
  }

  return { guild, isLoading, refresh }
}

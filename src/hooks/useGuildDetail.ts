import { useState, useEffect, useContext } from "react"
import CurrentGuildContext from "@/context/CurrentGuildContext"
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
  const { setGuild: setContextGuild } = useContext(CurrentGuildContext)

  useEffect(() => {
    const _refresh = async () => {
      setIsLoading(true)
      const data = await fetchGuildDetail(guildId)
      setGuild(data)
      setContextGuild(data)
      setIsLoading(false)
    }
    _refresh()
  }, [guildId]) // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = async () => {
    setIsLoading(true)
    const data = await fetchGuildDetail(guildId)
    setGuild(data)
    setContextGuild(data)
    setIsLoading(false)
  }

  return { guild, isLoading, refresh }
}

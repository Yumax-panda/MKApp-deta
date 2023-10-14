import { useState, useEffect } from "react"
import type { GuildDetail } from "@/models/guildDetail"
import type { Result } from "@/models/result"

type APIResponse = {
  results: Result[]
} & GuildDetail

type UseResultsReturn = {
  detail: GuildDetail | null
  results: Result[]
  isLoading: boolean
  refresh: () => Promise<void>
}

export const useResults = (guildId: string): UseResultsReturn => {
  const [results, setResults] = useState<Result[]>([])
  const [detail, setDetail] = useState<GuildDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchGuild = async (guildId: string) => {
    const res = await fetch(`/api/guild/${guildId}/results`)
    return (await res.json()) as APIResponse
  }

  useEffect(() => {
    const _fetch = async () => {
      setIsLoading(true)
      const { results, ...detail } = await fetchGuild(guildId)
      setResults(results)
      setDetail(detail)
      setIsLoading(false)
    }
    _fetch()
  }, [guildId])

  const refresh = async () => {
    setIsLoading(true)
    const { results, ...rest } = await fetchGuild(guildId)
    setResults(results)
    setDetail(rest)
    setIsLoading(false)
  }

  return {
    detail,
    results,
    isLoading,
    refresh,
  }
}

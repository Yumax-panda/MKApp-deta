import { useState, useEffect } from "react"
import type { Result } from "@/models/result"

type UseResultsReturn = {
  results: Result[]
  isLoading: boolean
  refresh: () => Promise<void>
}

export const useResults = (guildId: string): UseResultsReturn => {
  const [results, setResults] = useState<Result[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchResults = async (guildId: string) => {
    const res = await fetch(`/api/guild/${guildId}/results`)
    return (await res.json()) as Result[]
  }

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const results = await fetchResults(guildId)
      setResults(results)
      setIsLoading(false)
    }
    fetch()
  }, [guildId])

  const refresh = async () => {
    setIsLoading(true)
    const results = await fetchResults(guildId)
    setResults(results)
    setIsLoading(false)
  }

  return { results, isLoading, refresh }
}

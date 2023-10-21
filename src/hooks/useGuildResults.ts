import { useState, useEffect } from "react"
import type { Result } from "@/models/result"

export type UseGuildResultsReturn = {
  results: Result[]
}

export const useGuildResults = (guildId: string): UseGuildResultsReturn => {
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    async function _fetch() {
      const res = await fetch(`/api/guild/${guildId}/results`)
      const data = await res.json()
      setResults(data)
    }
    _fetch()
  }, [guildId])

  return {
    results,
  }
}

import { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Result } from "@/models/result"

export type UseGuildResultsReturn = {
  results: Result[]
  setResults: Dispatch<SetStateAction<Result[]>>
}

export const useGuildResults = (guildId: string): UseGuildResultsReturn => {
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    async function _fetch() {
      const res = await fetch(`/api/guilds/${guildId}/results`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
      })
      const data = await res.json()
      setResults(data)
    }
    _fetch()
  }, [guildId])

  return {
    results,
    setResults,
  }
}

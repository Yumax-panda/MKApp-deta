import { Lounge } from "mk8dx"
import type { AdapterUser } from "next-auth/adapters"
import { useState, useEffect } from "react"
import type { DiscordAccount } from "@/models"

type UseLoungeReturn = {
  player: Lounge.PlayerDetails | null
  discordAccount: DiscordAccount | null
  season: Season
  setSeason: (season: Season) => void
}

type Season = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const useLounge = (user: AdapterUser): UseLoungeReturn => {
  const [player, setPlayer] = useState<Lounge.PlayerDetails | null>(null)
  const [discordAccount, setDiscordAccount] = useState<DiscordAccount | null>(
    null,
  )
  const [season, setSeason] = useState<Season>(9)

  useEffect(() => {
    const fetchPlayer = async () => {
      const url = `/api/users/${user.id}/discord`
      const res = await fetch(url)
      const account = (await res.json()) as DiscordAccount
      setDiscordAccount(account)
      const player = await Lounge.getPlayer({
        discordId: account.linkedId,
        season,
      }).then((p) => Lounge.getPlayerDetails({ name: p.name, season }))
      setPlayer(player)
    }
    try {
      fetchPlayer()
    } catch (e) {
      console.error(e)
    }
  }, [user, season])

  return { player, discordAccount, season, setSeason }
}

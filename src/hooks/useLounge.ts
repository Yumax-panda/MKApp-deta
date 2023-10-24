import type { AdapterUser } from "next-auth/adapters"
import { useState, useEffect } from "react"
import { getPlayer, getPlayerDetails } from "@/lib/lounge"
import type { PlayerDetails, Season } from "@/lib/lounge"
import type { DiscordAccount } from "@/models"

type UseLoungeReturn = {
  player: PlayerDetails | null
  discordAccount: DiscordAccount | null
  season: Season
  setSeason: (season: Season) => void
}

export const useLounge = (user: AdapterUser): UseLoungeReturn => {
  const [player, setPlayer] = useState<PlayerDetails | null>(null)
  const [discordAccount, setDiscordAccount] = useState<DiscordAccount | null>(
    null,
  )
  const [season, setSeason] = useState<Season>(8)

  useEffect(() => {
    const fetchPlayer = async () => {
      const url = `/api/users/${user.id}/discord`
      const res = await fetch(url)
      const account = (await res.json()) as DiscordAccount
      setDiscordAccount(account)
      const detailUrl = `/api/players?discordId=${account.linkedId}&season=${season}`
      const playerDetailRes = await fetch(detailUrl)
      const playerDetail =
        (await playerDetailRes.json()) as PlayerDetails | null
      setPlayer(playerDetail)
    }
    try {
      fetchPlayer()
    } catch (e) {
      console.error(e)
    }
  }, [user, season])

  return { player, discordAccount, season, setSeason }
}

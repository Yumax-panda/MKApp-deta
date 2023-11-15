import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { PlayerInfo } from "@/models/bookmark"

export type PinnedPlayer = {
  displayName: string
  playerId: number
}

export class BookmarkRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("pinnedPlayers")
  }

  async get(discordId: string): Promise<PinnedPlayer[]> {
    const data = await this.db.get(discordId)
    if (!data) return []
    const { key, value } = data
    const pinnedPlayers = value as PlayerInfo[]
    return pinnedPlayers.map((item: PlayerInfo) => {
      const [playerId, displayName] = item.split(" ", 2)
      return { playerId: Number(playerId), displayName }
    })
  }
}

import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { PartialGuild } from "@/models/guild"

export type GuildPayload = {
  id: string
  name: string
  icon: string
}

type PutGuildPayload = GuildPayload | PartialGuild
export class GuildRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("guild")
  }

  async get(userId: string): Promise<GuildPayload[]> {
    const data = await this.db.get(userId)
    if (!data) return []
    return data.guilds as GuildPayload[]
  }

  async put(
    userId: string,
    guilds: PutGuildPayload[],
  ): Promise<GuildPayload[]> {
    const data = guilds.map((guild) => ({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
    }))
    await this.db.put({ guilds: data }, userId)
    const created = await this.get(userId)
    if (created.length !== data.length) throw new Error("Failed to put guilds")
    return created
  }
}

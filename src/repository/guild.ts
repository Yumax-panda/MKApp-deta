import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { GetResponse } from "deta/dist/types/types/base/response"
import { format } from "@/utils"
import type { Update } from "@/utils"

type GuildPayload = {
  id: string
  name: string
  icon: string
}
type UpdateGuild = Update<GuildPayload, "id">

export class GuildRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("guild")
  }

  async put(guild: GuildPayload): Promise<GuildPayload> {
    const payload = {
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
    }
    await this.db.put(payload, guild.id)
    const created = await this.get(guild.id)
    if (!created) throw new Error("Failed to fetch created guild")
    return created
  }

  async putMany(guilds: GuildPayload[]): Promise<GuildPayload[]> {
    const payload = guilds.map((guild) => ({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
    }))
    const newGuilds = await Promise.all(payload.map((guild) => this.put(guild)))
    return newGuilds
  }

  async get(guildId: string): Promise<GuildPayload | null> {
    const data = await this.db.get(guildId)
    return this.parse(data)
  }

  private parse(data: GetResponse): GuildPayload | null {
    if (!data) return null
    const { key, ...rest } = data
    return format<GuildPayload>(rest)
  }
}

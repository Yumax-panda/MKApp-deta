import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { GetResponse } from "deta/dist/types/types/base/response"
import type { PartialGuild } from "@/models/guild"
import { format } from "@/utils"
import type { Update } from "@/utils"

type StoredGuild = {
  id: string
  name: string
  icon: string
  approximate_member_count: number
  approximate_presence_count: number
}
type GuildPayload = StoredGuild | PartialGuild
type UpdateGuild = Update<GuildPayload, "id">

export class GuildRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("guild")
  }

  private parse(data: GetResponse): StoredGuild | null {
    if (!data) return null
    const { key, ...rest } = data
    return format<StoredGuild>(rest)
  }
}

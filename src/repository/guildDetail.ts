import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { GetResponse } from "deta/dist/types/types/base/response"
import type { GuildDetail } from "@/models/guildDetail"

type Put = Omit<GuildDetail, "nickname" | "updatedAt">

type Update = {
  id: string
  nickname: string | null
}

export class GuildDetailRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("guild")
  }

  async get(guildId: string): Promise<GuildDetail | null> {
    const data = await this.db.get(guildId)
    return this.parse(data)
  }

  async put({ id, name, icon }: Put): Promise<GuildDetail | null> {
    const updatedAt = new Date().toISOString()
    await this.db.put({ id, name, icon, updatedAt, nickname: name }, id)
    const created = await this.get(id)
    if (!created) throw new Error("Failed to put guild")
    return created
  }

  async update({ id, nickname }: Update): Promise<GuildDetail | null> {
    const original = await this.get(id)
    if (!original) return null
    const updatedAt = new Date().toISOString()
    await this.db.update({ nickname, updatedAt }, id)
    const updated = await this.get(id)
    if (!updated) throw new Error("Failed to update guild")
    return updated
  }

  private parse(data: GetResponse): GuildDetail | null {
    if (!data) return null
    const { key, ...rest } = data
    return rest as GuildDetail
  }
}

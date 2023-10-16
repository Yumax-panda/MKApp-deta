import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { GetResponse } from "deta/dist/types/types/base/response"
import type { GuildDetail } from "@/models/guildDetail"
import type { Update as UtilUpdate } from "@/utils"

type Put = Omit<GuildDetail, "nickname" | "createdAt" | "updatedAt">
type UpsertUpdate = Put
type UpdateField = Omit<GuildDetail, "createdAt" | "updatedAt">
type Update = UtilUpdate<UpdateField, "id">

export class GuildDetailRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("GuildDetail")
  }

  async get(guildId: string): Promise<GuildDetail | null> {
    const data = await this.db.get(guildId)
    return this.parse(data)
  }

  async put({ id, name, icon }: Put): Promise<GuildDetail | null> {
    const now = new Date().toISOString()
    await this.db.put(
      { id, name, icon, nickname: name, createdAt: now, updatedAt: now },
      id,
    )
    const created = await this.get(id)
    if (!created) throw new Error("Failed to put guild")
    return created
  }

  // for upsert
  private async _upsertUpdate({
    id,
    name,
    icon,
  }: UpsertUpdate): Promise<GuildDetail> {
    const updatedAt = new Date().toISOString()
    await this.db.update({ id, name, icon, updatedAt }, id)
    const updated = await this.get(id)
    if (!updated) throw new Error("Failed to update guild")
    return updated
  }

  async update(params: Update): Promise<GuildDetail> {
    const original = await this.get(params.id)
    const { id, ...rest } = params
    if (!original) throw new Error("Guild not found")
    await this.db.update(params, params.id)
    const updated = await this.get(params.id)
    if (!updated) throw new Error("Failed to update guild")
    return updated
  }

  async upsert(params: Put): Promise<GuildDetail> {
    const original = await this.get(params.id)
    if (!original) return (await this.put(params)) as GuildDetail
    return await this._upsertUpdate(params)
  }

  private parse(data: GetResponse): GuildDetail | null {
    if (!data) return null
    const { key, ...rest } = data
    return rest as GuildDetail
  }
}

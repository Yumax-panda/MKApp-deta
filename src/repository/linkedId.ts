import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"

type Response = {
  key: `lounge_ids`
  [discordId: string]: string
}

export class LinkedIdRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("user")
  }

  async get(discordId: string): Promise<string> {
    const data = (await this.db.get("lounge_ids")) as Response
    const linkedId = data[discordId]
    return linkedId || discordId
  }

  async connect(discordId: string, linkedId: string): Promise<string> {
    const data = (await this.db.get("lounge_ids")) as Response
    const { key, ...rest } = data
    rest[discordId] = linkedId
    await this.db.put(rest, "lounge_ids")
    return linkedId
  }
}

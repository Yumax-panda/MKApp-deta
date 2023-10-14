import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { Result } from "@/models/result"

type GetResponse = {
  key: string
  data: Result[]
} | null

export class ResultRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("results")
  }

  async get(guildId: string): Promise<Result[]> {
    const data = (await this.db.get(guildId)) as GetResponse
    return this.parse(data)
  }

  async set(guildId: string, results: Result[]): Promise<Result[]> {
    await this.db.put({ data: results }, guildId)
    const data = (await this.db.get(guildId)) as GetResponse
    const newResults = this.parse(data)
    if (!newResults) throw new Error("Results is not set")
    return newResults
  }

  private parse(data: GetResponse): Result[] {
    if (!data) return []
    const { key, data: results } = data
    return results
  }
}

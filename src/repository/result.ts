import dayjs from "dayjs"
import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { Result } from "@/models/result"
import { isSame } from "@/models/result"

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

  async add(guildId: string, result: Result): Promise<Result[]> {
    const results = (await this.get(guildId)).filter((r) => !isSame(r, result))
    const newResults = [...results, result].sort((a, b) =>
      dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1,
    )
    await this.db.put({ data: newResults }, guildId)
    return newResults
  }

  async update(
    guildId: string,
    { prev, next }: { prev: Result; next: Result },
  ): Promise<void> {
    const results = await this.get(guildId)
    const index = results.findIndex((result) => isSame(result, prev))
    if (index === -1) throw new Error("Result is not found")
    results[index] = next
    const newResults = results
      .sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1))
      .filter((result, i, self) => {
        i === 0 || !isSame(result, self[i - 1])
      })

    await this.db.put({ data: newResults }, guildId)
  }

  async remove(guildId: string, target: Result): Promise<void> {
    const results = await this.get(guildId)
    const newResults = results.filter((result) => !isSame(result, target))
    await this.db.put({ data: newResults }, guildId)
  }

  private parse(data: GetResponse): Result[] {
    if (!data) return []
    const { key, data: results } = data
    return results
  }
}

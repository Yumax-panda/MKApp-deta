import type DetaClass from "deta/dist/types/deta"
import type BaseClass from "deta/dist/types/base"
import type { GetResponse } from "deta/dist/types/types/base/response"
import type { Account } from "@/models/account"
import { format } from "@/utils/format"

type Key = {
  provider: string
  providerAccountId: string
}

export class AccountRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("Account")
  }

  private getId(key: Key): string {
    return `${key.provider}___${key.providerAccountId}`
  }

  private getKey(key: string): Key {
    const [provider, providerAccountId] = key.split("___")
    return { provider, providerAccountId }
  }

  async get(key: Key): Promise<Account | null> {
    const data = await this.db.get(this.getId(key))
    return this.parse(data)
  }
  async delete(key: Key): Promise<Account | null> {
    const account = await this.get(key)
    await this.db.delete(this.getId(key))
    return account
  }
  async deleteAll(userId: string): Promise<Account[]> {
    const { items } = await this.db.fetch({ userId })
    const results = await Promise.all(
      items.map(({ key }) => this.delete(this.getKey(key as string))),
    )
    return results.filter((item) => item !== null) as Account[]
  }

  private parse(data: GetResponse): Account | null {
    if (!data) return null
    const { key, ...rest } = data
    return format<Account>(rest)
  }
}

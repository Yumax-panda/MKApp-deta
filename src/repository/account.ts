import type DetaClass from "deta/dist/types/deta"
import type BaseClass from "deta/dist/types/base"
import type { GetResponse } from "deta/dist/types/types/base/response"
import type { DetaAccount } from "@/models/account"
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

  async create(account: DetaAccount): Promise<DetaAccount> {
    const { provider, providerAccountId, expires_at } = account
    const key = this.getId({ provider, providerAccountId })
    await this.db.put(account, key, { expireAt: expires_at })
    const created = await this.get({ provider, providerAccountId })
    if (!created) throw new Error("Failed to fetch created account")
    return created
  }

  async get(key: Key): Promise<DetaAccount | null> {
    const data = await this.db.get(this.getId(key))
    return this.parse(data)
  }

  async getAll(userId: string): Promise<DetaAccount[]> {
    const { items } = await this.db.fetch({ userId })
    return items
      .map((item) => this.parse(item))
      .filter(Boolean) as DetaAccount[]
  }

  async delete(key: Key): Promise<DetaAccount | null> {
    const account = await this.get(key)
    await this.db.delete(this.getId(key))
    return account
  }

  async deleteAll(userId: string): Promise<DetaAccount[]> {
    const accounts = await this.getAll(userId)
    return (
      await Promise.all(
        accounts.map(({ provider, providerAccountId }) =>
          this.delete({ provider, providerAccountId }),
        ),
      )
    ).filter(Boolean) as DetaAccount[]
  }

  private parse(data: GetResponse): DetaAccount | null {
    if (!data) return null
    const { key, expires_at, __expires, ...rest } = data
    const account = format<DetaAccount>(rest)
    account.expires_at = expires_at as number | undefined
    return account as DetaAccount
  }
}

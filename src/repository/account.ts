import type DetaClass from "deta/dist/types/deta"
import type BaseClass from "deta/dist/types/base"
import type { DetaAccount, Account } from "@/models/account"
import { format, toPayload } from "@/utils/format"

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

  private getKey(key: Key): string {
    return `${key.provider}___${key.providerAccountId}`
  }

  async get(key: Key): Promise<Account | null> {
    const account = await this.db.get(this.getKey(key))
    if (!account) return null
    const { key: _, ...rest } = account
    return format<Account>(rest)
  }
}

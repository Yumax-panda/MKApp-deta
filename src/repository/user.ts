import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { GetResponse } from "deta/dist/types/types/base/response"
import { AccountRepository } from "./account"
import type { User } from "@/models/user"
import { format, toPayload } from "@/utils"
import type { Update } from "@/utils"

type UpdateUser = Update<User, "id">

export class UserRepository {
  deta: DetaClass
  db: BaseClass
  accountRepo: AccountRepository

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("User")
    this.accountRepo = new AccountRepository(deta)
  }

  async create<T extends User>(user: Omit<T, "id">): Promise<T> {
    const id = crypto.randomUUID()
    const payload = { ...toPayload(user), id }
    await this.db.put(payload, id)
    const created = await this.getById(id)
    if (!created) throw new Error("User is not created")
    return created as T
  }

  async getById(id: string): Promise<User | null> {
    const data = await this.db.get(id)
    return this.parse(data)
  }

  async getByEmail(email: string): Promise<User | null> {
    const { items } = await this.db.fetch({ email })
    if (!items.length) return null
    return this.parse(items[0])
  }

  async update(data: UpdateUser): Promise<User> {
    const user = await this.getById(data.id)
    if (!user) throw new Error("User not found")
    await this.db.update(toPayload(data), data.id)
    const updated = await this.getById(data.id)
    if (!updated) throw new Error("User is not updated")
    return updated
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.getById(id)
    if (!user) return null
    await Promise.all([this.accountRepo.deleteAll(id), this.db.delete(id)])
    return user
  }

  private parse(data: GetResponse): User | null {
    if (!data) return null
    const { key, ...rest } = data
    return format<User>(rest)
  }
}

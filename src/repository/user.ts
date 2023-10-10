import type DetaClass from "deta/dist/types/deta"
import type BaseClass from "deta/dist/types/base"
import type { DetaUser, User } from "@/models/user"
import { format, toPayload } from "@/utils/format"

export class UserRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("User")
  }

  private getKey(user: User | DetaUser): string {
    return user.id
  }

  async create<T extends User>(user: Omit<T, "id">): Promise<T> {
    const id = crypto.randomUUID()
    const payload = { ...toPayload(user), id }
    await this.db.put(payload, id)
    return { ...payload, id } as unknown as T
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.db.get(id)
    if (!user) return null
    const { key, ...rest } = user
    return format<User>(rest)
  }

  async getByEmail(email: string): Promise<User | null> {
    const { items } = await this.db.fetch({ email })
    if (!items.length) return null
    const { key, ...rest } = items[0]
    return format<User>(rest)
  }

  async update(data: Partial<User> & Pick<User, "id">): Promise<User> {
    const user = await this.getById(data.id)
    if (!user) throw new Error("User not found")
    await this.db.update(toPayload(data), data.id)
    return { ...user, ...data }
  }
}

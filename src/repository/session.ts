import type BaseClass from "deta/dist/types/base"
import type DetaClass from "deta/dist/types/deta"
import type { GetResponse } from "deta/dist/types/types/base/response"
import type { DetaSession } from "@/models"
import { format, toPayload } from "@/utils"
import type { Update } from "@/utils"

type UpdateSession = Update<DetaSession, "sessionToken">
export class SessionRepository {
  deta: DetaClass
  db: BaseClass

  constructor(deta: DetaClass) {
    this.deta = deta
    this.db = deta.Base("Session")
  }

  async get(sessionToken: string): Promise<DetaSession | null> {
    const session = await this.db.get(sessionToken)
    return this.parse(session)
  }

  async create(session: DetaSession): Promise<DetaSession> {
    await this.db.put(toPayload(session), session.sessionToken)
    const created = await this.get(session.sessionToken)
    if (!created) throw new Error("Session not found")
    return created
  }

  async getByUserId(userId: string): Promise<DetaSession[]> {
    const { items } = await this.db.fetch({ userId })
    return items
      .map((item) => this.parse(item))
      .filter(Boolean) as DetaSession[]
  }

  async update(session: UpdateSession): Promise<DetaSession | null> {
    const { sessionToken } = session
    const current = await this.get(sessionToken)
    if (!current) return null
    await this.db.update(toPayload(session), sessionToken)
    const updated = await this.get(sessionToken)
    if (!updated) throw new Error("Failed to fetch updated session")
    return updated
  }

  async delete(sessionToken: string): Promise<DetaSession | null> {
    const session = await this.get(sessionToken)
    await this.db.delete(sessionToken)
    return session
  }

  async deleteAll(userId: string): Promise<DetaSession[]> {
    const sessions = await this.getByUserId(userId)
    return (
      await Promise.all(
        sessions.map(({ sessionToken }) => this.delete(sessionToken)),
      )
    ).filter(Boolean) as DetaSession[]
  }

  private parse(data: GetResponse): DetaSession | null {
    if (!data) return null
    return format<DetaSession>(data)
  }
}

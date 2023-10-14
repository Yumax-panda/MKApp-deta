import { Deta } from "deta"
import { AccountRepository } from "./account"
import { SessionRepository } from "./session"
import { UserRepository } from "./user"

export interface DetaClientType {
  user: UserRepository
  session: SessionRepository
  account: AccountRepository
}

export class DetaClient implements DetaClientType {
  user: UserRepository
  session: SessionRepository
  account: AccountRepository

  constructor(projectKey?: string) {
    const token = projectKey || process.env.NEXT_PUBLIC_DETA_PROJECT_KEY
    if (!token) throw new Error("Project key is not found")
    const deta = Deta(token)
    this.user = new UserRepository(deta)
    this.session = new SessionRepository(deta)
    this.account = new AccountRepository(deta)
  }
}

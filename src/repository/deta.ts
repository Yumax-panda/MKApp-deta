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

  constructor(projectKey: string) {
    const deta = Deta(projectKey)
    this.user = new UserRepository(deta)
    this.session = new SessionRepository(deta)
    this.account = new AccountRepository(deta)
  }
}

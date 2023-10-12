import { Deta } from "deta"
import { UserRepository } from "./user"
import { SessionRepository } from "./session"
import { AccountRepository } from "./account"

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

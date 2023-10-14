import { Deta } from "deta"
import { AccountRepository } from "./account"
import { GuildRepository } from "./guild"
import { ResultRepository } from "./result"
import { SessionRepository } from "./session"
import { UserRepository } from "./user"

export interface DetaClientType {
  user: UserRepository
  session: SessionRepository
  account: AccountRepository
  guild: GuildRepository
  result: ResultRepository
}

export class DetaClient implements DetaClientType {
  user: UserRepository
  session: SessionRepository
  account: AccountRepository
  guild: GuildRepository
  result: ResultRepository

  constructor() {
    const Authtoken = process.env.NEXT_PUBLIC_DETA_PROJECT_KEY
    const BotDBToken = process.env.NEXT_PUBLIC_BOT_DB_PROJECT_KEY
    if (!(Authtoken && BotDBToken)) throw new Error("Project key is not found")
    const deta = Deta(Authtoken)
    const botDB = Deta(BotDBToken)
    this.user = new UserRepository(deta)
    this.session = new SessionRepository(deta)
    this.account = new AccountRepository(deta)
    this.guild = new GuildRepository(deta)
    this.result = new ResultRepository(botDB)
  }
}

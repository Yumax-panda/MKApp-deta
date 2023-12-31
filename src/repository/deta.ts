import { Deta } from "deta"
import { AccountRepository } from "./account"
import { BookmarkRepository } from "./bookmark"
import { GuildRepository } from "./guild"
import { GuildDetailRepository } from "./guildDetail"
import { LinkedIdRepository } from "./linkedId"
import { ResultRepository } from "./result"
import { SessionRepository } from "./session"
import { UserRepository } from "./user"

export interface DetaClientType {
  user: UserRepository
  session: SessionRepository
  account: AccountRepository
  bookmark: BookmarkRepository
  guild: GuildRepository
  guildDetail: GuildDetailRepository
  result: ResultRepository
  linkedId: LinkedIdRepository
}

export class DetaClient implements DetaClientType {
  user: UserRepository
  session: SessionRepository
  account: AccountRepository
  bookmark: BookmarkRepository
  guild: GuildRepository
  guildDetail: GuildDetailRepository
  result: ResultRepository
  linkedId: LinkedIdRepository

  constructor() {
    const Authtoken = process.env.DETA_PROJECT_KEY
    const BotDBToken = process.env.BOT_DB_PROJECT_KEY
    if (!(Authtoken && BotDBToken)) throw new Error("Project key is not found")
    const deta = Deta(Authtoken)
    const botDB = Deta(BotDBToken)
    this.user = new UserRepository(deta)
    this.session = new SessionRepository(deta)
    this.account = new AccountRepository(deta)
    this.bookmark = new BookmarkRepository(botDB)
    this.guild = new GuildRepository(deta)
    this.guildDetail = new GuildDetailRepository(deta)
    this.result = new ResultRepository(botDB)
    this.linkedId = new LinkedIdRepository(botDB)
  }
}

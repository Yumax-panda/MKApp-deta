import { Deta } from "deta"
import { UserRepository } from "./user"
import { TokenRepository } from "./token"
import { SessionRepository } from "./session"
import { VerificationTokenRepository } from "./verificationToken"
import { AccountRepository } from "./account"

const deta = Deta()

export const DetaClient = {
  user: new UserRepository(deta),
  account: new AccountRepository(deta),
  token: new TokenRepository(deta),
  session: new SessionRepository(deta),
  verificationToken: new VerificationTokenRepository(deta),
}

export type DetaClientType = typeof DetaClient

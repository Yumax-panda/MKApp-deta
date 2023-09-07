import { Deta } from "deta";
import { UserRepository } from "./user";
import { TokenRepository } from "./token";
import { SessionRepository } from "./session";
import { VerificationTokenRepository } from "./verificationToken";

const deta = Deta();

export const DetaClient = {
  user: new UserRepository(deta),
  token: new TokenRepository(deta),
  session: new SessionRepository(deta),
  verificationToken: new VerificationTokenRepository(deta),
} as const;

export type DetaClientType = typeof DetaClient;

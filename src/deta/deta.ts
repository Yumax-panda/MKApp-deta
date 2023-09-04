import { Deta } from "deta";
import { UserRepository } from "./user";
import { TokenRepository } from "./token";

const deta = Deta();

export const DetaClient = {
  user: new UserRepository(deta),
  token: new TokenRepository(deta),
} as const;

export type DetaClientType = typeof DetaClient;

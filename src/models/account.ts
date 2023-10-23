import type { User } from "./user"

// @@id[povider, providerAccountId]
export type DetaAccount = {
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

export type Account = {
  user: User
} & DetaAccount

export type DiscordAccount = {
  linkedId: string
} & DetaAccount

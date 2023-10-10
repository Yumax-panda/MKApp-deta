import type { Account } from "./account"
import type { Session } from "./session"

export type DetaUser = {
  id: string // @id
  name?: string
  email: string // @unique
  emailVerified?: string
  image: string
}

export type User = {
  emailVerified?: Date
  accounts: Account[]
  sessions: Session[]
} & Omit<DetaUser, "emailVerified">

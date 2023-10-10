import type { Account } from "./account"
import type { Session } from "./session"

export type DetaUser = {
  id: string // @id
  name?: string | null
  email?: string // @unique
  emailVerified?: string | null
  image?: string | null
}

export type User = {
  emailVerified?: Date | null
  accounts?: Account[]
  sessions?: Session[]
} & Omit<DetaUser, "emailVerified">

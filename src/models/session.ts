import type { User } from "./user"

export type DetaSession = {
  sessionToken: string // @unique
  userId: string
  expires: Date
}

export type Session = {
  user: User
} & DetaSession

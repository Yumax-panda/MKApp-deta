export type VerificationToken = {
  identifier: string
  token: string // @unique
  expires: Date
  // @@id[identifier, token]
}

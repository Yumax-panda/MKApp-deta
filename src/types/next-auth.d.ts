import NextAuth, { DefaultSession } from "next-auth"
import type { AdapterUser } from "next-auth/adapters"

import type { PartialGuild } from "@/models/guild"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      image: string
      email: string
      emailVerified: Date | null
    }
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: string
    name: string
    image: string
    email: string
    emailVerified: Date | null
  }
}

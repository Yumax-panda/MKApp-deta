import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { DetaAdapter } from "@/adapter/deta"
import { DetaClient } from "@/repository/deta"

export const client = new DetaClient()

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],
  adapter: DetaAdapter(client),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async redirect({ url }) {
      return url
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user = user
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, handler as PATCH }

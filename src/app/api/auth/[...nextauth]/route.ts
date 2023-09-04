import { DetaAdapter } from "@/adapter/deta";
import { DetaClient } from "@/deta/deta";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  adapter: DetaAdapter(DetaClient),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user = user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

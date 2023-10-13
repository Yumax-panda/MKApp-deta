import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions, client } from "./auth/[...nextauth]/route"
import { fetchPartialGuilds } from "@/lib/discord"

export async function GET(req: Request) {
  const session = await getServerSession({ req, ...authOptions })
  console.log(JSON.stringify(session, null, 2))
  if (!session) return NextResponse.json({ message: "test" })
  const accounts = await client.account.getAll(session.user.id)
  if (!accounts.length) return NextResponse.json({ message: "test" })
  const guilds = await fetchPartialGuilds(accounts[0].access_token as string)
  console.log(JSON.stringify(guilds, null, 2))
  return NextResponse.json(session)
}

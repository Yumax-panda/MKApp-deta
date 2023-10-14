import { NextResponse } from "next/server"
import { fetchPartialGuilds } from "@/lib/discord"
import { DetaClient } from "@/repository/deta"

const client = new DetaClient()

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      userId: string
    }
  },
) {
  const { userId } = params
  const guilds = await client.guild.get(userId)
  return NextResponse.json(guilds)
}

// export async function PUT(req: Request, { params }: Params) {
//   const { userId } = params
//   const { guilds } = await req.json()
//   const updated = await client.guild.put(userId, guilds)
//   return NextResponse.json(updated)
// }

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      userId: string
    }
  },
) {
  const { userId } = params
  const account = await client.account.getAll(userId)
  if (!account.length) {
    console.error("Account is not found")
    return NextResponse.json([])
  }
  const discordAccount = account[0]
  if (!discordAccount.access_token) {
    console.error("Access token is not found")
    return NextResponse.json([])
  }
  const guilds = await fetchPartialGuilds(discordAccount.access_token)
  const data = guilds.map((guild) => ({
    id: guild.id,
    name: guild.name,
    icon: guild.icon,
  }))
  const updated = await client.guild.put(userId, data)
  return NextResponse.json(updated)
}

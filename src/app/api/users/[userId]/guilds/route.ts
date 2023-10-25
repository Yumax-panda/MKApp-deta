import { NextResponse } from "next/server"
import { fetchPartialGuilds } from "@/lib/discord"
import { DetaClient } from "@/repository/deta"

const client = new DetaClient()

type UrlParams = {
  params: {
    userId: string
  }
}

type Guild = {
  id: string
  name: string
  icon: string | null
}

async function fetchGuilds(userId: string): Promise<Guild[]> {
  const account = await client.account.getAll(userId)
  if (!account.length) {
    console.error("Account is not found")
    return []
  }
  const discordAccount = account[0]
  if (!discordAccount.access_token) {
    console.error("Access token is not found")
    return []
  }
  const guilds = await fetchPartialGuilds(discordAccount.access_token)
  return guilds.map((guild) => ({
    id: guild.id,
    name: guild.name,
    icon: guild.icon,
  }))
}

async function saveGuilds(userId: string, guilds: Guild[]) {
  const tasks = guilds.map((guild) => client.guildDetail.upsert(guild))
  const [updated, _] = await Promise.all([
    client.guild.put(userId, guilds),
    ...tasks,
  ])
  return updated
}

export async function GET(req: Request, { params }: UrlParams) {
  const { userId } = params
  const guilds = await client.guild.get(userId)
  if (!guilds.length) {
    try {
      const data = await fetchGuilds(userId)
      await saveGuilds(userId, data)
      return NextResponse.json(data)
    } catch (e) {
      console.error(e)
      return NextResponse.json([])
    }
  }
  return NextResponse.json(guilds)
}

export async function PATCH(req: Request, { params }: UrlParams) {
  const { userId } = params
  const guilds = await fetchGuilds(userId)
  await saveGuilds(userId, guilds)
  return NextResponse.json(guilds)
}

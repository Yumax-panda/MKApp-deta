import { NextResponse } from "next/server"
import { DetaClient } from "@/repository/deta"

type Params = {
  params: {
    userId: string
  }
}

const client = new DetaClient()

export async function GET(req: Request, { params }: Params) {
  const { userId } = params
  const guilds = await client.guild.get(userId)
  return NextResponse.json(guilds)
}

export async function PUT(req: Request, { params }: Params) {
  const { userId } = params
  const { guilds } = await req.json()
  const updated = await client.guild.put(userId, guilds)
  return NextResponse.json(updated)
}

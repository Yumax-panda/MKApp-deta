import { NextResponse } from "next/server"
import { DetaClient } from "@/repository/deta"

const client = new DetaClient()

type UrlParams = {
  params: {
    guildId: string
  }
}

export async function GET(req: Request, { params }: UrlParams) {
  const { guildId } = params
  const [results, detail] = await Promise.all([
    client.result.get(guildId),
    client.guildDetail.get(guildId),
  ])
  if (!detail) {
    console.error("Guild detail is not found")
    return NextResponse.json({ error: "Guild detail is not found" })
  }
  return NextResponse.json({ results, ...detail })
}

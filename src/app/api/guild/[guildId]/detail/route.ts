import { NextResponse } from "next/server"
import { UpdateGuildDetail } from "./types"
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

export async function PATCH(req: Request, { params }: UrlParams) {
  const { guildId } = params
  const body = await req.json()
  const data = UpdateGuildDetail.safeParse(body)
  if (!data.success) {
    console.error("Invalid request body", data.error)
    return NextResponse.json({ error: "Invalid request body" })
  }
  const detail = await client.guildDetail.update({ id: guildId, ...data.data })
  return NextResponse.json(detail)
}

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
  const results = await client.result.get(guildId)
  return NextResponse.json(results)
}

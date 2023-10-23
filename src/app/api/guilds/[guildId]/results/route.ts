import { NextResponse } from "next/server"
import type { Result } from "@/models/result"
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

export async function PATCH(req: Request, { params }: UrlParams) {
  const { guildId } = params
  const payload = (await req.json()) as Result[]
  const newResults = await client.result.set(guildId, payload)
  return NextResponse.json(newResults)
}

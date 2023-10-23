import { NextResponse } from "next/server"
import type { DiscordAccount } from "@/models"
import { DetaClient } from "@/repository/deta"

const client = new DetaClient()

type UrlParams = {
  params: {
    userId: string
  }
}

export async function GET(req: Request, { params }: UrlParams) {
  const { userId } = params
  const account = await client.account.getAll(userId)
  if (!account.length) {
    console.error("Account is not found")
    return NextResponse.json([])
  }
  const discordAccount = account[0]
  const linkedId = await client.linkedId.get(discordAccount.providerAccountId)
  const payload: DiscordAccount = { linkedId, ...discordAccount }
  return NextResponse.json(payload)
}

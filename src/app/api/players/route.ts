import { NextResponse } from "next/server"
import { getPlayer, getPlayerDetails } from "@/lib/lounge"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const season = searchParams.get("season")
  const name = searchParams.get("name")
  const discordId = searchParams.get("discordId")

  if (!discordId && !name) {
    console.error("Discord ID or name is required")
    return NextResponse.json(null)
  }

  if (name) {
    const player = await getPlayerDetails({
      name,
      season: season ? Number(season) : null,
    })
    return NextResponse.json(player)
  } else if (!discordId) {
    console.error("Discord ID is required")
    return NextResponse.json(null)
  }

  const player = await getPlayer({
    discordId,
    season: season ? Number(season) : null,
  })
  if (!player) {
    console.error("Player is not found")
    return NextResponse.json(null)
  }
  const detail = await getPlayerDetails({
    name: player.name,
    season: season ? Number(season) : null,
  })
  return NextResponse.json(detail)
}

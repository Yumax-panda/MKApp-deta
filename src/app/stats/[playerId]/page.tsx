import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import LoungeSection from "@/components/Section/Lounge/LoungeSection"
import { getPlayerDetails } from "@/lib/lounge"
import { DetaClient } from "@/repository/deta"

export const revalidate = 3600

async function getBookmarksByUserId(discordId: string) {
  const client = new DetaClient()
  return await client.bookmark.get(discordId)
}

async function getDiscordIdByUserId(userId: string) {
  const client = new DetaClient()
  const accounts = await client.account.getAll(userId)
  if (!accounts.length) return null
  return accounts[0].providerAccountId
}

export default async function StatsPage({
  params,
}: {
  params: { playerId: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const discordId = await getDiscordIdByUserId(session.user.id)
  if (!discordId) notFound()

  const bookmarks = await getBookmarksByUserId(discordId)
  const playerDetails = await getPlayerDetails({ id: params.playerId })
  if (!playerDetails) notFound()

  return <LoungeSection player={playerDetails} bookmarks={bookmarks} />
}

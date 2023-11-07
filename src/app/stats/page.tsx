import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getPlayer } from "@/lib/lounge"
import { DetaClient } from "@/repository/deta"

export const revalidate = 3600

async function getPlayerByUserId(userId: string) {
  const client = new DetaClient()
  const accounts = await client.account.getAll(userId)
  if (!accounts.length) return null
  const discordAccount = accounts[0]
  const linkedId = await client.linkedId.get(discordAccount.providerAccountId)
  return await getPlayer({ discordId: linkedId })
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const player = await getPlayerByUserId(session.user.id)

  if (!player) notFound()

  redirect(`/stats/${player.id}`)
}

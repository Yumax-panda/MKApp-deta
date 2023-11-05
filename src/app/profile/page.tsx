import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import LoungeSection from "@/components/Section/Lounge/LoungeSection"
import UserProfileSection from "@/components/Section/UserProfile/UserProfileSection"
import { getPlayer, getPlayerDetails } from "@/lib/lounge"
import { DetaClient } from "@/repository/deta"

async function getDetailByUserId(userId: string) {
  const client = new DetaClient()
  const accounts = await client.account.getAll(userId)
  if (!accounts.length) return null
  const discordAccount = accounts[0]
  const linkedId = await client.linkedId.get(discordAccount.providerAccountId)
  const player = await getPlayer({ discordId: linkedId })
  if (!player) return null
  const playerDetails = await getPlayerDetails({ name: player.name })
  return playerDetails
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const playerDetails = await getDetailByUserId(session.user.id)

  return (
    <div>
      <UserProfileSection user={session.user} />
      {playerDetails && <LoungeSection player={playerDetails} />}
    </div>
  )
}

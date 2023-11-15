import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Bookmark from "@/components/Section/Bookmark/Bookmark"
import { DetaClient } from "@/repository/deta"

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

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const discordId = await getDiscordIdByUserId(session.user.id)

  if (!discordId) notFound()

  const bookmarks = await getBookmarksByUserId(discordId)

  return <Bookmark players={bookmarks} />
}

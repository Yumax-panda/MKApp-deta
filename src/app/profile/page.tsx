import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import UserProfileSection from "@/components/Section/UserProfile/UserProfileSection"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  return <UserProfileSection user={session.user} />
}

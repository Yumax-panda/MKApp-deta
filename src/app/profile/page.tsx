"use client"

import { useSession } from "next-auth/react"
import LoungeSection from "@/components/LoungeSection/LoungeSection"
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection"

export default function ProfilePage() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div>
      <UserProfileSection user={session.user} />
      <LoungeSection user={session.user} />
    </div>
  )
}

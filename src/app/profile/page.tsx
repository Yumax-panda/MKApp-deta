"use client"

import { useSession } from "next-auth/react"
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection"

export default function ProfilePage() {
  const { data: session } = useSession()

  if (!session) return null

  return <UserProfileSection user={session.user} />
}

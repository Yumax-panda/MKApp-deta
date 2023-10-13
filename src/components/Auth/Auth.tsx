"use client"

import { useSession } from "next-auth/react"

type Props = {
  children: React.ReactNode
}

function Auth({ children }: Props) {
  const { status } = useSession({ required: true })

  return <div>{status === "loading" ? <p>Loading...</p> : children}</div>
}

export default Auth

"use client"

import { signIn, useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"

export default function Home() {
  const session = useSession()
  const [msg, setMsg] = useState<string>("")

  useEffect(() => {
    const _fetch = async () => {
      const res = await fetch("/api")
      const data = await res.json()
      setMsg(JSON.stringify(data))
    }
    _fetch()
  }, [session])
  return (
    <>
      <button onClick={() => signIn("discord")}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <p>{JSON.stringify(session)}: test</p>
      <p>{msg}</p>
    </>
  )
}

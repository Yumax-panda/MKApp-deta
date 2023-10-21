import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import type { GuildPayload } from "@/repository/guild"
import { getGuildImageUrl as url } from "@/utils/url"

type UsePartialGuildsReturn = {
  guilds: GuildPayload[]
  importGuilds: () => void
}

export const usePartialGuilds = (): UsePartialGuildsReturn => {
  const [guilds, setGuilds] = useState<GuildPayload[]>([])
  const { data: session, status } = useSession({ required: true })

  useEffect(() => {
    const fetchGuilds = async () => {
      if (status === "loading") return
      if (!session?.user?.id) return
      const res = await fetch(`/api/user/${session.user.id}/guilds`)
      const guilds = (await res.json()) as GuildPayload[]
      setGuilds(guilds.map((g) => ({ ...g, icon: url(g) })))
    }
    fetchGuilds()
  }, [session, status])

  const importGuilds = async () => {
    if (status === "loading") return
    if (!session?.user?.id) return
    const res = await fetch(`/api/user/${session.user.id}/guilds`, {
      method: "PATCH",
    })
    const guilds = (await res.json()) as GuildPayload[]
    setGuilds(guilds.map((g) => ({ ...g, icon: url(g) })))
  }

  return {
    guilds,
    importGuilds: () => {
      toast.promise(importGuilds(), {
        pending: "サーバーを読み込んでいます",
        success: "サーバーを読み込みました",
        error: "サーバーの読み込みに失敗しました",
      })
    },
  }
}

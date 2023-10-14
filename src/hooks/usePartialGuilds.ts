import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import type { PartialGuild } from "@/models/guild"
import type { GuildPayload } from "@/repository/guild"

type UsePartialGuildsReturn = {
  guilds: GuildPayload[]
  importGuilds: () => void
  loading: boolean
}

function url(guild: GuildPayload | PartialGuild): string | null {
  if (!guild.icon) return null
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
}

export const usePartialGuilds = (): UsePartialGuildsReturn => {
  const [guilds, setGuilds] = useState<GuildPayload[]>([])
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession({ required: true })

  useEffect(() => {
    const fetchGuilds = async () => {
      if (status === "loading") return
      if (!session?.user?.id) return
      setLoading(true)
      const res = await fetch(`/api/user/${session.user.id}/guilds`)
      const guilds = (await res.json()) as GuildPayload[]
      setGuilds(guilds.map((g) => ({ ...g, icon: url(g) })))
      setLoading(false)
    }
    fetchGuilds()
  }, [session, status])

  const importGuilds = async () => {
    if (status === "loading") return
    if (!session?.user?.id) return
    setLoading(true)
    const res = await fetch(`/api/user/${session.user.id}/guilds`, {
      method: "PATCH",
    })
    const guilds = (await res.json()) as GuildPayload[]
    setGuilds(guilds.map((g) => ({ ...g, icon: url(g) })))
    setLoading(false)
  }

  return {
    guilds,
    importGuilds,
    loading,
  }
}

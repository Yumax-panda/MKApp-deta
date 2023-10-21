import { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import type { UseFormRegister } from "react-hook-form"
import { toast } from "react-toastify"
import CurrentGuildContext from "@/context/CurrentGuildContext"
import type { GuildDetail as DefaultGuildDetail } from "@/models/guildDetail"
import type { Result } from "@/models/result"

type FormValues = {
  nickname: string
}

type GuildDetail = {
  results: Result[]
} & DefaultGuildDetail

export type UseGuildDetailReturn = {
  guild: GuildDetail | null
  refresh: () => Promise<void>
  updateDetail: () => Promise<void>
  reset: () => void
  register: UseFormRegister<FormValues>
}

const fetchGuildDetail = async (guildId: string): Promise<GuildDetail> => {
  const res = await fetch(`/api/guild/${guildId}/detail`)
  const data = await res.json()
  return data
}

export const useGuildDetail = (guildId: string): UseGuildDetailReturn => {
  const [guild, setGuild] = useState<GuildDetail | null>(null)
  const { setGuild: setContextGuild } = useContext(CurrentGuildContext)
  const { register, handleSubmit, reset: defaultReset } = useForm<FormValues>()

  useEffect(() => {
    const _refresh = async () => {
      const data = await fetchGuildDetail(guildId)
      setGuild(data)
      setContextGuild(data)
      defaultReset({ nickname: data.nickname })
    }
    _refresh()
  }, [guildId]) // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = async () => {
    await toast.promise(
      async () => {
        const data = await fetchGuildDetail(guildId)
        setGuild(data)
        setContextGuild(data)
        defaultReset({ nickname: data.nickname })
      },
      {
        pending: "Refreshing guild detail...",
        success: "Guild detail refreshed!",
        error: "Failed to refresh guild detail",
      },
    )
  }

  const updateDetail = handleSubmit(async (data) => {
    await toast.promise(
      async () => {
        const res = await fetch(`/api/guild/${guildId}/detail`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        const json = await res.json()
        setContextGuild(json)
        defaultReset({ nickname: json.nickname })
      },
      {
        pending: "Updating guild detail...",
        success: "Guild detail updated!",
        error: "Failed to update guild detail",
      },
    )
  })

  const reset = () => {
    defaultReset({
      nickname: guild?.nickname ?? "",
    })
  }

  return { guild, refresh, reset, updateDetail, register }
}

import { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import type { UseFormRegister } from "react-hook-form"
import { toast } from "react-toastify"
import CurrentGuildContext from "@/context/CurrentGuildContext"
import type { GuildDetail } from "@/models/guildDetail"

type FormValues = {
  nickname: string
}

const REFRESHING_MESSAGE = {
  pending: "サーバー情報を更新しています...",
  success: "サーバー情報を更新しました",
  error: "サーバー情報の更新に失敗しました",
}

export type UseGuildDetailReturn = {
  detail: GuildDetail | null
  refresh: () => Promise<void>
  update: () => Promise<void>
  reset: () => void
  register: UseFormRegister<FormValues>
}

const fetchGuildDetail = async (
  guildId: string,
): Promise<GuildDetail | null> => {
  const res = await fetch(`/api/guilds/${guildId}/details`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
    },
  })
  const data = await res.json()
  return data
}

export const useGuildDetail = (guildId: string): UseGuildDetailReturn => {
  const [detail, setDetail] = useState<GuildDetail | null>(null)
  const { setGuild: setContextGuild } = useContext(CurrentGuildContext)
  const { register, handleSubmit, reset: defaultReset } = useForm<FormValues>()

  useEffect(() => {
    const _refresh = async () => {
      const data = await fetchGuildDetail(guildId)
      setDetail(data)
      setContextGuild(data)
      defaultReset({ nickname: data?.nickname ?? "" })
    }
    _refresh()
  }, [guildId]) // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = async () => {
    await toast.promise(async () => {
      const data = await fetchGuildDetail(guildId)
      setDetail(data)
      setContextGuild(data)
      defaultReset({ nickname: data?.nickname ?? "" })
    }, REFRESHING_MESSAGE)
  }

  const update = handleSubmit(async (data) => {
    await toast.promise(async () => {
      const res = await fetch(`/api/guilds/${guildId}/details`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      setContextGuild(json)
      setDetail(json)
      defaultReset({ nickname: json.nickname })
    }, REFRESHING_MESSAGE)
  })

  const reset = () => {
    defaultReset({
      nickname: detail?.nickname ?? "",
    })
  }

  return { detail, refresh, reset, update, register }
}

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import type { GuildDetail } from "@/models/guildDetail"

type FormValues = {
  nickname: string
}

const REFRESHING_MESSAGE = {
  pending: "サーバー情報を更新しています...",
  success: "サーバー情報を更新しました",
  error: "サーバー情報の更新に失敗しました",
}

export const useGuildProfile = (initial: GuildDetail) => {
  const [detail, setDetail] = useState<GuildDetail>(initial)

  const {
    register,
    handleSubmit,
    reset: defaultReset,
  } = useForm<FormValues>({
    defaultValues: {
      nickname: detail.nickname,
    },
  })

  const guildId = detail.id

  const reset = () => {
    defaultReset({
      nickname: detail.nickname,
    })
  }

  const update = handleSubmit(async (data) => {
    await toast.promise(async () => {
      const res = await fetch(`/api/guilds/${guildId}/details`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      setDetail(json)
      defaultReset({ nickname: json.nickname })
    }, REFRESHING_MESSAGE)
  })

  return { reset, update, register }
}

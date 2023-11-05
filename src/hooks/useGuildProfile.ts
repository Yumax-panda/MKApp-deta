import { useState, useEffect } from "react"
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

export const useGuildProfile = (guildId: string) => {
  const [detail, setDetail] = useState<GuildDetail | null>(null)

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      nickname: detail?.nickname ?? "",
    },
  })

  useEffect(() => {
    fetch(`/api/guilds/${guildId}/details`)
      .then((res) => res.json() as Promise<GuildDetail | null>)
      .then((detail) => {
        setDetail(detail)
        reset({ nickname: detail?.nickname ?? "" })
      })
  }, [guildId]) // eslint-disable-line react-hooks/exhaustive-deps

  const update = handleSubmit(async (data) => {
    await toast.promise(async () => {
      const res = await fetch(`/api/guilds/${guildId}/details`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json() as Promise<GuildDetail | null>)
      reset({ nickname: res?.nickname ?? "" })
    }, REFRESHING_MESSAGE)
  })

  return { reset, update, register, detail }
}

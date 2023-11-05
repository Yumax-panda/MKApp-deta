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

export const useGuildProfile = (detail: GuildDetail) => {
  const {
    register,
    handleSubmit,
    reset: defaultReset,
  } = useForm<FormValues>({
    defaultValues: {
      nickname: detail.nickname,
    },
  })

  const reset = () => {
    defaultReset({
      nickname: detail.nickname,
    })
  }

  const update = handleSubmit(async (data) => {
    await toast.promise(async () => {
      await fetch(`/api/guilds/${detail.id}/details`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })
    }, REFRESHING_MESSAGE)
  })

  return { reset, update, register }
}

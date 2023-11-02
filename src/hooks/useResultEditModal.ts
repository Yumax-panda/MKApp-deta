import dayjs from "dayjs"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { Control } from "react-hook-form"
import { toast } from "react-toastify"
import type { Result } from "@/models/result"
import { isSame } from "@/models/result"

type FormValues = {
  enemy: string
  score: number
  enemyScore: number
  date: dayjs.Dayjs
}

type Props = {
  open: boolean
  guildId: string
  results: Result[]
  resultId: number
  onClose: () => void
  setResults: (results: Result[]) => void
}

type UseResultEditModalReturn = {
  control: Control<FormValues>
  handleSubmit: () => Promise<void>
}

export const useResultEditModal = ({
  open,
  guildId,
  results,
  resultId,
  setResults,
  onClose,
}: Props): UseResultEditModalReturn => {
  const result = results[resultId]
  const original = {
    ...result,
    date: dayjs(result.date),
  }

  const {
    control,
    handleSubmit: defaultHandleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: original,
  })

  const innerOnSubmit = async (data: FormValues) => {
    const newResult = {
      ...data,
      date: data.date.format("YYYY-MM-DD HH:mm:ss"),
    }

    const originalResults = await fetch(`/api/guilds/${guildId}/results`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    }).then((res) => res.json() as Promise<Result[]>)

    const original = results[resultId]
    const payload = originalResults
      // this operation looks redundant,
      // but it makes sure not to change wrong element due to editing one by other user simultaneously
      .map((result) => (isSame(result, original) ? newResult : result))
      .sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1))

    if (!payload.some((result) => isSame(result, newResult))) {
      throw new Error(
        "戦績が見つかりません。他のユーザーが編集した可能性があります。データを更新して再度お試しください。",
      )
    }

    const res = await fetch(`/api/guilds/${guildId}/results`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    setResults(res)
    onClose()
  }

  const onSubmit = (data: FormValues) => {
    return toast
      .promise(innerOnSubmit(data), {
        pending: "送信中...",
        success: "戦績を編集しました",
        error: {
          render({ data }) {
            if (data instanceof Error) {
              console.error("edit error", data)
              return data.message
            }
            return "エラーが発生しました"
          },
        },
      })
      .catch(() => {})
  }

  const handleSubmit = defaultHandleSubmit(onSubmit)

  const score = watch("score")

  useEffect(() => {
    const enemyScore = 984 - score
    setValue("enemyScore", enemyScore)
  }, [score, setValue])

  useEffect(() => {
    if (!results[resultId]) return
    const selected = results[resultId]
    const formValues = {
      ...selected,
      date: dayjs(selected.date),
    }
    reset(formValues)
  }, [results, resultId, reset, open])

  return {
    control,
    handleSubmit,
  }
}

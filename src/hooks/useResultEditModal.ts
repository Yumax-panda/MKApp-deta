import dayjs from "dayjs"
import { use, useEffect } from "react"
import { useForm } from "react-hook-form"
import type { Control } from "react-hook-form"
import { toast } from "react-toastify"
import type { Result } from "@/models/result"

type FormValues = {
  enemy: string
  score: number
  enemyScore: number
  date: dayjs.Dayjs
}

type Props = {
  guildId: string
  results: Result[]
  resultId: number
  setResults: (results: Result[]) => void
}

type UseResultEditModalReturn = {
  control: Control<FormValues>
  handleSubmit: () => Promise<void>
}

export const useResultEditModal = ({
  guildId,
  results,
  resultId,
  setResults,
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
    console.log(data)
  }

  const onSubmit = (data: FormValues) => {
    return toast
      .promise(innerOnSubmit(data), {
        pending: "送信中...",
        success: "戦績を追加しました",
        error: {
          render({ data }) {
            if (data instanceof Error) {
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

  // FIXME: 同じ戦績の2回目以降も初期化させる
  useEffect(() => {
    if (!results[resultId]) return
    const selected = results[resultId]
    const formValues = {
      ...selected,
      date: dayjs(selected.date),
    }
    reset(formValues)
  }, [results, resultId, reset])

  return {
    control,
    handleSubmit,
  }
}

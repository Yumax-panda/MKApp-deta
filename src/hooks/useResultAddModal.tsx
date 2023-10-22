import dayjs from "dayjs"
import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import type { Control } from "react-hook-form"
import { toast } from "react-toastify"
import type { Result } from "@/models/result"

type FormValues = {
  score: number
  enemyScore: number
  enemy: string
  date: dayjs.Dayjs
}

type Props = {
  guildId: string
  results: Result[]
  setResults: Dispatch<SetStateAction<Result[]>>
  onClose: () => void
}

type UseResultAddModalReturn = {
  handleSubmit: () => Promise<void>
  control: Control<FormValues, any>
  reset: () => void
}

export const useResultAddModal = ({
  guildId,
  results,
  setResults,
  onClose,
}: Props): UseResultAddModalReturn => {
  const {
    handleSubmit: defaultHandleSubmit,
    control,
    reset: defaultReset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      score: 0,
      enemyScore: 0,
      enemy: "",
      date: dayjs(new Date()),
    },
  })

  const hasDuplicate = (newResult: Result, results: Result[]) => {
    return results.some((result) => {
      return (
        result.enemy === newResult.enemy &&
        result.score === newResult.score &&
        result.enemyScore === newResult.enemyScore &&
        result.date === newResult.date
      )
    })
  }

  const innerOnSubmit = async (data: FormValues) => {
    const result = {
      ...data,
      date: dayjs(data.date).format("YYYY-MM-DD HH:mm:ss"),
    }
    if (hasDuplicate(result, results)) {
      throw new Error("戦績が重複しています")
    }
    const payload = [result, ...results].sort((a, b) =>
      dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1,
    )
    const newResults = await fetch(`/api/guild/${guildId}/results`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    setResults(newResults)
    reset()
    onClose()
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

  const reset = () => {
    defaultReset({
      score: 0,
      enemyScore: 0,
      enemy: "",
      date: dayjs(new Date()),
    })
  }

  useEffect(() => {
    defaultReset({
      score: 0,
      enemyScore: 0,
      enemy: "",
      date: dayjs(new Date()),
    })
  }, [guildId, defaultReset])

  const score = watch("score")

  useEffect(() => {
    const enemyScore = 984 - score
    setValue("enemyScore", enemyScore)
  }, [score, setValue])

  return {
    handleSubmit,
    control,
    reset,
  }
}

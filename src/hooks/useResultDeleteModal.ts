import { toast } from "react-toastify"
import type { Result } from "@/models/result"
import { isSame } from "@/models/result"

type Props = {
  guildId: string
  resultId: number
  results: Result[]
  setResults: (results: Result[]) => void
  onClose: () => void
}

type UseResultDeleteModalReturn = {
  onDelete: () => Promise<void>
}

export const useResultDeleteModal = ({
  guildId,
  resultId,
  results,
  setResults,
  onClose,
}: Props): UseResultDeleteModalReturn => {
  const innerOnDelete = async () => {
    const newResults = results.filter((r) => !isSame(r, results[resultId]))
    if (newResults.length === results.length)
      throw new Error("該当する戦績が見つかりません")
    const res = await fetch(`/api/guilds/${guildId}/results`, {
      method: "PATCH",
      body: JSON.stringify(newResults),
    })
    const newResults2 = (await res.json()) as Result[]
    setResults(newResults2)
    onClose()
  }

  const onDelete = async () => {
    return toast
      .promise(innerOnDelete(), {
        pending: "削除しています",
        success: "削除しました",
        error: {
          render: ({ data }) => {
            if (data instanceof Error) return data.message
            console.error("delete error", data)
            return "削除に失敗しました"
          },
        },
      })
      .catch(() => {})
  }

  return { onDelete }
}

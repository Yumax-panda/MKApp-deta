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
    const updates = await fetch(`/api/guilds/${guildId}/results`).then(
      (res) => res.json() as Promise<Result[]>,
    )
    const selected = results[resultId]
    const newResults = updates.filter((r) => !isSame(r, selected))
    const res = await fetch(`/api/guilds/${guildId}/results`, {
      method: "PATCH",
      body: JSON.stringify(newResults),
    })
    const newResults2 = (await res.json()) as Result[]
    setResults(newResults2)
    onClose()
  }

  const onDelete = async () => {
    return toast.promise(innerOnDelete(), {
      pending: "削除しています",
      success: "削除しました",
      error: "削除に失敗しました",
    })
  }

  return { onDelete }
}

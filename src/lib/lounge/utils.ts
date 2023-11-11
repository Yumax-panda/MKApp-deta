import type { MmrChange } from "."

export function getValidMmrChanges(mmrChanges: MmrChange[]): MmrChange[] {
  if (!mmrChanges.length) return []
  const deletedIds = new Set(
    mmrChanges.filter((c) => c.reason === "TableDelete").map((c) => c.changeId),
  )
  const initial = mmrChanges[0]
  return [
    initial,
    ...mmrChanges.slice(1).filter((c) => !deletedIds.has(c.changeId)),
  ]
}

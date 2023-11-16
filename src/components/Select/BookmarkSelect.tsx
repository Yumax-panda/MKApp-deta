"use client"

import { Select, MenuItem, InputLabel } from "@mui/material"
import { useRouter, usePathname } from "next/navigation"
import type { PinnedPlayer } from "@/repository/bookmark"

type Props = {
  bookmarks: PinnedPlayer[]
}

function BookmarkSelect({ bookmarks }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const initial = bookmarks.find((player) =>
    pathname.includes(player.playerId.toString()),
  )

  return (
    <div>
      <InputLabel id="bookmark-select-label">Bookmark</InputLabel>
      <Select
        id="bookmark-select"
        onChange={(event) => {
          router.push(`/stats/${event.target.value}`)
        }}
        value={initial?.playerId}
        fullWidth
      >
        {bookmarks.map((player) => (
          <MenuItem key={player.playerId} value={player.playerId}>
            {player.displayName}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default BookmarkSelect

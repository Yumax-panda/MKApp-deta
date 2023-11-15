import { Stack, Box } from "@mui/material"
import Link from "next/link"
import SectionContainer from "../SectionContainer/SectionContainer"
import type { PinnedPlayer } from "@/repository/bookmark"

type Props = {
  players: PinnedPlayer[]
}

function Bookmark({ players }: Props) {
  return (
    <SectionContainer>
      <Stack spacing={2}>
        {players.map((player) => (
          <Box
            key={player.playerId}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href={`/stats/${player.playerId}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {`${player.displayName} (ID: ${player.playerId})`}
            </Link>
          </Box>
        ))}
      </Stack>
    </SectionContainer>
  )
}

export default Bookmark

import { Stack, Grid } from "@mui/material"
import LoungeProfile from "./LoungeProfile"
import MmrHistoryTable from "./MmrHistory/Table"
import SectionContainer from "@/components/Section/SectionContainer/SectionContainer"
import BookmarkSelect from "@/components/Select/BookmarkSelect"
import { type PlayerDetails, getValidMmrChanges } from "@/lib/lounge"
import type { PinnedPlayer } from "@/repository/bookmark"

type Props = {
  player: PlayerDetails
  bookmarks: PinnedPlayer[]
}

function LoungeSection({ player, bookmarks }: Props) {
  const mmrChanges = getValidMmrChanges(player.mmrChanges)

  return (
    <SectionContainer>
      <Stack spacing={2}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <BookmarkSelect bookmarks={bookmarks} />
          </Grid>
        </Grid>
        <LoungeProfile player={player} />
        <MmrHistoryTable changes={mmrChanges} />
      </Stack>
    </SectionContainer>
  )
}

export default LoungeSection

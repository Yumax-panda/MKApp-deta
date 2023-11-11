import { Stack } from "@mui/material"
import LoungeProfile from "./LoungeProfile"
import MmrHistoryTable from "./MmrHistory/Table"
import SectionContainer from "@/components/Section/SectionContainer/SectionContainer"
import { type PlayerDetails, getValidMmrChanges } from "@/lib/lounge"

type Props = {
  player: PlayerDetails
}

function LoungeSection({ player }: Props) {
  const mmrChanges = getValidMmrChanges(player.mmrChanges)

  return (
    <SectionContainer>
      <Stack spacing={2}>
        <LoungeProfile player={player} />
        <MmrHistoryTable changes={mmrChanges} />
      </Stack>
    </SectionContainer>
  )
}

export default LoungeSection

import LoungeProfile from "./LoungeProfile"
import MmrHistoryTable from "./MmrHistory/Table"
import SectionContainer from "@/components/Section/SectionContainer/SectionContainer"
import type { PlayerDetails } from "@/lib/lounge"

type Props = {
  player: PlayerDetails
}

function LoungeSection({ player }: Props) {
  return (
    <SectionContainer>
      <LoungeProfile player={player} />
      <MmrHistoryTable changes={player.mmrChanges} />
    </SectionContainer>
  )
}

export default LoungeSection

import LoungeProfile from "./LoungeProfile"
import SectionContainer from "@/components/Section/SectionContainer/SectionContainer"
import type { PlayerDetails } from "@/lib/lounge"

type Props = {
  player: PlayerDetails
}

function LoungeSection({ player }: Props) {
  return (
    <SectionContainer>
      <LoungeProfile player={player} />
    </SectionContainer>
  )
}

export default LoungeSection

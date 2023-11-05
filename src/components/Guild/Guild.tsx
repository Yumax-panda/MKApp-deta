import SectionContainer from "../Section/SectionContainer/SectionContainer"
import Profile from "./Profile"
import Result from "./Result"

export default function Guild({ params }: { params: { guildId: string } }) {
  return (
    <SectionContainer>
      <Profile guildId={params.guildId} />
      <Result guildId={params.guildId} />
    </SectionContainer>
  )
}

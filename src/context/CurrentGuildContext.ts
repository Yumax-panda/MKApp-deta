import { createContext } from "react"
import type { GuildDetail } from "@/models/guildDetail"

type Props = {
  guild: GuildDetail | null
  setGuild: (guild: GuildDetail | null) => void
}

const CurrentGuildContext = createContext<Props>({
  guild: null,
  setGuild: () => {},
})

export default CurrentGuildContext

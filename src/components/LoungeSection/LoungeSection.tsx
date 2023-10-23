import type { AdapterUser } from "next-auth/adapters"
import { useLounge } from "@/hooks/useLounge"

type Props = {
  user: AdapterUser
}

function LoungeSection({ user }: Props) {
  const { player, discordAccount } = useLounge(user)

  if (!player || !discordAccount) return null

  return (
    <div>
      <h2>Lounge</h2>
      <p>Player: {player.name}</p>
      <p>Discord: {discordAccount.linkedId}</p>
    </div>
  )
}

export default LoungeSection

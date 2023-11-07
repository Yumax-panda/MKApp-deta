import { notFound } from "next/navigation"
import LoungeSection from "@/components/Section/Lounge/LoungeSection"
import { getPlayerDetails } from "@/lib/lounge"

export const revalidate = 3600

export default async function StatsPage({
  params,
}: {
  params: { playerId: string }
}) {
  const playerDetails = await getPlayerDetails({ id: params.playerId })
  if (!playerDetails) notFound()

  return <LoungeSection player={playerDetails} />
}

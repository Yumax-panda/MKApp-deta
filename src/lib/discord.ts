import type { PartialGuild } from "@/models/guild"

export async function fetchPartialGuilds(
  accessToken: string,
): Promise<PartialGuild[]> {
  const url = "https://discordapp.com/api/users/@me/guilds"
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())
  return response as PartialGuild[]
}

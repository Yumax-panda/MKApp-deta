type GuildImageProps = {
  id: string
  icon: string | null
}

export function getGuildImageUrl({ id, icon }: GuildImageProps) {
  if (!icon) return "/discord.svg"
  return `https://cdn.discordapp.com/icons/${id}/${icon}.webp`
}

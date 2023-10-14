import { useState } from "react"
import type { PartialGuild } from "@/models/guild"

type UsePartialGuildsReturn = {
  guilds: PartialGuild[]
}

const sample: PartialGuild[] = [
  {
    id: "1155226298625556602",
    name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
  {
    id: "1155226298625556602",
    name: "Discord Bot List",
    icon: "https://cdn.discordapp.com/avatars/815565736557936640/0c95ffe446c556d40a26492a03d6feb9.png",
    owner: true,
    permissions: "admin",
    features: [],
    approximate_member_count: 25000,
    approximate_presence_count: 25000,
  },
]

export const usePartialGuilds = (): UsePartialGuildsReturn => {
  const [guilds, setGuilds] = useState<PartialGuild[]>(sample)

  return {
    guilds,
  }
}

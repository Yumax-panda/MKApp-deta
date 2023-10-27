import { usePathname } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import CurrentGuildContext from "@/context/CurrentGuildContext"

type PathMapping = Record<string, string>
const __pathMappings__: PathMapping[] = [
  { "^/guild": "Server info" },
  { "^/policy": "Policy" },
]

function getTitle(pathname: string): string {
  for (const mapping of __pathMappings__) {
    for (const [key, value] of Object.entries(mapping)) {
      if (new RegExp(key).test(pathname)) {
        return value
      }
    }
  }
  return "Home"
}

export const useTitle = () => {
  const { guild } = useContext(CurrentGuildContext)
  const [title, setTitle] = useState("Home")
  const pathname = usePathname()

  useEffect(() => {
    if (guild && pathname.includes(guild.id)) {
      return setTitle(guild.nickname)
    }
    setTitle(getTitle(pathname))
  }, [pathname, guild])

  return { title }
}

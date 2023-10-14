import { usePathname } from "next/navigation"

type PathMapping = Record<string, string>
const __pathMappings__: PathMapping[] = [{ "^/guild": "サーバー情報" }]

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
  const pathname = usePathname()
  return { title: getTitle(pathname) }
}

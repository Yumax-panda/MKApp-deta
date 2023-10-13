import { useRouter } from "next/navigation"
import type { AdapterUser } from "next-auth/adapters"
import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"

type UseAccountIconReturn = {
  user: AdapterUser | null
  open: boolean
  anchorEl: HTMLElement | null
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleClose: () => void
}

export const useAccountIcon = (): UseAccountIconReturn => {
  const { data: session } = useSession()
  const [user, setUser] = useState<AdapterUser | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (session) {
      const user = session.user as AdapterUser
      setUser(user)
    }
  }, [session])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return {
    user,
    open,
    anchorEl,
    handleClick,
    handleClose,
  }
}

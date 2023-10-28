import { Logout, Policy } from "@mui/icons-material"
import { Avatar, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material"
import { useRouter } from "next/navigation"
import type { AdapterUser } from "next-auth/adapters"
import { signOut } from "next-auth/react"
import React from "react"
import type { MouseEvent } from "react"

type Props = {
  user: AdapterUser | null
  anchorEl: null | HTMLElement
  open: boolean
  onClose: () => void
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function AccountMenu({ anchorEl, open, onClose, user }: Props) {
  const router = useRouter()

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          router.push("/profile")
        }}
      >
        <ListItemIcon>
          <Avatar src={user?.image || ""} sx={{ height: 24, width: 24 }} />
        </ListItemIcon>
        Profile
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          router.push("/policy")
        }}
      >
        <ListItemIcon>
          <Policy fontSize="small" />
        </ListItemIcon>
        Policy
      </MenuItem>
      <MenuItem
        onClick={() => {
          signOut()
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )
}

export default AccountMenu

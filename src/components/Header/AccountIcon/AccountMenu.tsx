import { Logout, Policy, Bookmark, TrendingUp } from "@mui/icons-material"
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material"
import { useRouter } from "next/navigation"
import type { AdapterUser } from "next-auth/adapters"
import { signOut } from "next-auth/react"
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
      keepMounted
    >
      <GroupLabel label="Application" />
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
      <Divider />
      <GroupLabel label="Lounge" />
      <MenuItem
        onClick={() => {
          router.push("/stats")
        }}
      >
        <ListItemIcon>
          <TrendingUp fontSize="small" />
        </ListItemIcon>
        Stats
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/bookmarks")
        }}
      >
        <ListItemIcon>
          <Bookmark fontSize="small" />
        </ListItemIcon>
        Bookmarks
      </MenuItem>
    </Menu>
  )
}

const GroupLabel = ({ label }: { label: string }) => (
  <Typography
    variant="caption"
    color="textSecondary"
    display="block"
    sx={{ pl: 1 }}
  >
    {label}
  </Typography>
)

export default AccountMenu

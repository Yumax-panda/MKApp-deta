import { Avatar, IconButton, Tooltip } from "@mui/material"
import AccountMenu from "./AccountMenu"
import { useAccountIcon } from "@/hooks/useAccountIcon"

function AccountIcon() {
  const { user, open, anchorEl, handleClick, handleClose } = useAccountIcon()

  return (
    <div>
      <Tooltip title={user?.name || "Account Profile"}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} src={user?.image || ""} />
        </IconButton>
      </Tooltip>
      <AccountMenu
        user={user}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClick}
      />
    </div>
  )
}

export default AccountIcon

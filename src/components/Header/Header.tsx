import MenuIcon from "@mui/icons-material/Menu"
import { Toolbar, Typography, AppBar, IconButton, Box } from "@mui/material"
import AccountIcon from "../AccountIcon/AccountIcon"
import ModeChangeIcon from "../ModeChangeIcon/ModeChangeIcon"
import { drawerWidth } from "@/utils/style"

interface Props {
  handleDrawerToggle: () => void
  title: string
}

function Header({ handleDrawerToggle, title }: Props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth})` },
        ml: { sm: drawerWidth },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: "block" }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ModeChangeIcon />
        <AccountIcon />
      </Toolbar>
    </AppBar>
  )
}

export default Header

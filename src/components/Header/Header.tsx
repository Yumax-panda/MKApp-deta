import MenuIcon from "@mui/icons-material/Menu"
import { Toolbar, Typography, AppBar, IconButton, Box } from "@mui/material"
import AccountIcon from "../AccountIcon/AccountIcon"
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
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <AccountIcon />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

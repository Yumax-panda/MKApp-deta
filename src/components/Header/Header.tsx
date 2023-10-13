import MenuIcon from "@mui/icons-material/Menu"
import { Toolbar, Typography, AppBar, IconButton } from "@mui/material"
import { drawerWidth } from "@/utils/style"

interface Props {
  handleDrawerToggle: () => void
}

function Header({ handleDrawerToggle }: Props) {
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
        <Typography variant="h6" noWrap component="div">
          MKApp-deta
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header

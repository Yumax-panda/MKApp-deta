"use client"

import { Box, Drawer as MuiDrawer, Toolbar } from "@mui/material"
import { useState } from "react"
import Header from "../Header/Header"
import DrawerItem from "./DrawerItem"
import { drawerWidth } from "@/utils/style"

interface Props {
  window?: () => Window
  children: React.ReactNode
}

function Drawer({ window, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#F8F9FA" : undefined,
        minHeight: "100vh",
      }}
    >
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <MuiDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerItem />
        </MuiDrawer>
        <MuiDrawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerItem />
        </MuiDrawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          width: { sm: `calc(100% - ${drawerWidth})` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Drawer

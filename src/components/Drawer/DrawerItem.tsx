"use client"

import { Add } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { usePartialGuilds } from "@/hooks/usePartialGuilds"

function DrawerItem() {
  const { guilds, importGuilds } = usePartialGuilds()

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <Toolbar
        sx={{
          top: 0,
          display: "flex",
          justifyContent: "center",
          p: 0,
        }}
      >
        <Box
          sx={{
            margin: "auto",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              MKApp-Deta
            </Typography>
          </Link>
        </Box>
      </Toolbar>
      <Divider />

      <List
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          height: "80vh",
        }}
      >
        {guilds.map((guild, index) => (
          <ListItem key={`${guild.id}_${index}`}>
            <Link
              href={`/guild/${guild.id}`}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Avatar src={guild.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "black",
                      }}
                    >
                      {guild.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", paddingTop: "3vh" }}>
        <Button
          startIcon={<Add />}
          sx={{ margin: "auto" }}
          onClick={importGuilds}
        >
          サーバーを追加
        </Button>
      </Box>
    </div>
  )
}

export default DrawerItem

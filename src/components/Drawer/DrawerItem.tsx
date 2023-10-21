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
import { usePathname } from "next/navigation"
import { usePartialGuilds } from "@/hooks/usePartialGuilds"

function DrawerItem() {
  const { guilds, importGuilds } = usePartialGuilds()
  const pathname = usePathname()

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "hidden",
        backgroundColor: "#081627",
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
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ color: "#fff" }}
            >
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
          backgroundColor: "#101F33",
        }}
      >
        {guilds.map((guild, index) => (
          <ListItem key={`${guild.id}_${index}`}>
            <Link
              href={`/guild/${guild.id}`}
              style={{
                textDecoration: "none",
                width: "100%",
                color: "inherit",
              }}
            >
              <ListItemButton
                selected={pathname.includes(guild.id.toString())}
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover, &:focus": {
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <ListItemIcon>
                  <Avatar src={guild.icon || "/discord.svg"} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#fff",
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "3vh",
        }}
      >
        <Button
          startIcon={<Add />}
          sx={{ margin: "auto", fontWeight: "bold" }}
          onClick={importGuilds}
        >
          サーバーを追加
        </Button>
      </Box>
    </div>
  )
}

export default DrawerItem

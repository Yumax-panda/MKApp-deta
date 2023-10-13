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
  const { guilds } = usePartialGuilds()

  return (
    <div style={{ height: "100%" }}>
      <Toolbar>
        <Box sx={{ margin: "auto" }}>
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
      <List style={{ overflowX: "hidden", overflowY: "scroll", height: "80%" }}>
        {guilds.map((guild, index) => (
          <ListItem
            key={`${guild.id}_${index}`}
            sx={{
              paddingRight: "2rem",
              paddingLeft: "0",
            }}
          >
            <Link
              href={`/guild/${guild.id}`}
              style={{ textDecoration: "none" }}
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
        }}
      >
        <Button startIcon={<Add />} sx={{ margin: "auto" }}>
          サーバーを追加
        </Button>
      </Box>
    </div>
  )
}

export default DrawerItem

import { Grid, Avatar, Stack, Box } from "@mui/material"
import Paper from "../Paper/Paper"
import type { GuildDetail } from "@/models/guildDetail"
import { getGuildImageUrl } from "@/utils/url"

type Props = {
  guild: GuildDetail
}

function GuildSettings({ guild }: Props) {
  return (
    <Paper component="form">
      <Grid container columns={{ xs: 6, md: 12 }}>
        <Grid item xs={4}>
          <Avatar src={getGuildImageUrl({ id: guild.id, icon: guild.icon })} />
        </Grid>
        <Grid item xs={8}>
          <Stack>
            <Box>{guild.name}</Box>
            <Box>{guild.id}</Box>
            <Box>{guild.nickname}</Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default GuildSettings

import { Edit } from "@mui/icons-material"
import {
  Grid,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  Button as MuiButton,
  Box,
} from "@mui/material"
import Paper from "../Paper/Paper"
import type { UseGuildDetailReturn } from "@/hooks/useGuildDetail"
import type { GuildDetail } from "@/models/guildDetail"
import { getGuildImageUrl } from "@/utils/url"

type Props = {
  guild: GuildDetail
} & UseGuildDetailReturn

type ButtonProps = {
  variant: "contained" | "outlined"
  color: "primary" | "error"
  label: string
  type?: "submit" | "reset" | "button"
  onClick?: () => void
}

const Button = ({ variant, color, label, onClick, type }: ButtonProps) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{ margin: 1 }}
      type={type}
    >
      {label}
    </MuiButton>
  )
}

function GuildSettings({ guild, updateDetail, reset, register }: Props) {
  return (
    <Paper component="form" onSubmit={updateDetail} id="edit-guild-settings">
      <Grid
        container
        columns={{ xs: 6, md: 12 }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Grid item xs={4}>
          <Avatar
            src={getGuildImageUrl({ id: guild.id, icon: guild.icon })}
            alt="guild icon"
            sx={{ width: 128, height: 128, margin: "auto" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <TextField
              id="guild_settings_name"
              label="サーバー名"
              defaultValue={guild.name}
              disabled
            />
            <TextField
              id="guild_settings_id"
              label="サーバーID"
              defaultValue={guild.id}
              disabled
            />
            <TextField
              id="guild_settings_nick"
              label="表示名"
              {...register("nickname")}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Edit />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Grid>
        <Grid item sx={{ paddingTop: 2 }} xs={6} md={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div style={{ padding: 3 }}>
              <Button
                variant="contained"
                color="error"
                label="reset"
                onClick={reset}
                type="button"
              />
              <Button
                variant="contained"
                color="primary"
                label="save"
                type="submit"
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default GuildSettings

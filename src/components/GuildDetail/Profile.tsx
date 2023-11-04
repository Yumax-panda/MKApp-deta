"use client"

import {
  Box,
  TextField,
  Button as MuiButton,
  InputAdornment,
} from "@mui/material"
import { useGuildProfile } from "@/hooks/useGuildProfile"
import type { GuildDetail } from "@/models/guildDetail"

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
      sx={{ margin: 1, border: "none" }}
      type={type}
      size="small"
    >
      {label}
    </MuiButton>
  )
}

type Props = {
  detail: GuildDetail
}

export default function Profile({ detail }: Props) {
  const { register, update } = useGuildProfile(detail)

  return (
    <Box sx={{ mb: 4, mx: 2 }} component="form" onSubmit={update}>
      <TextField
        {...register("nickname")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="outlined"
                color="primary"
                label="save"
                type="submit"
              />
            </InputAdornment>
          ),
          style: { fontSize: 20 },
        }}
        variant="standard"
      />
    </Box>
  )
}

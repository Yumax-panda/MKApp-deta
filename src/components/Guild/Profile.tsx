"use client"

import {
  Box,
  TextField,
  Button as MuiButton,
  InputAdornment,
} from "@mui/material"
import { useGuildProfile } from "@/hooks/useGuildProfile"

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
  guildId: string
}

export default function Profile({ guildId }: Props) {
  const { register, update, detail } = useGuildProfile(guildId)

  return detail ? (
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
  ) : null
}

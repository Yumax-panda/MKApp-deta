"use client"

import { Grid, Stack, Typography, Avatar } from "@mui/material"
import type { AdapterUser } from "next-auth/adapters"
import Paper from "@/components/Paper/Paper"
import SectionContainer from "@/components/Section/SectionContainer/SectionContainer"

type FieldProps = {
  label: string
  value: string | number
}

const Field = ({ label, value }: FieldProps) => (
  <Stack>
    <Typography sx={{ fontSize: "1rem" }} color="GrayText">
      {label}
    </Typography>
    <Typography
      sx={{
        borderBottom: "solid",
        fontSize: "1.2rem",
        color: (theme) =>
          theme.palette.mode === "dark" ? "lightGrey" : undefined,
      }}
    >
      {value}
    </Typography>
  </Stack>
)

type Props = {
  user: AdapterUser
}

function UserProfileSection({ user }: Props) {
  const { id, name, email, image } = user

  return (
    <SectionContainer>
      <Paper>
        <Typography variant="h5" sx={{ p: 3 }}>
          User Profile
        </Typography>
        <Grid
          container
          sx={{ p: 3, display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={image}
              sx={{
                margin: "auto",
                height: 128,
                width: 128,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Field label="Name" value={name} />
              <Field label="Email" value={email} />
              <Field label="ID" value={id} />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </SectionContainer>
  )
}

export default UserProfileSection

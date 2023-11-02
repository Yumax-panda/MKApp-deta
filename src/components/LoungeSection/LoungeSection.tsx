"use client"

import { Grid, Stack, Typography } from "@mui/material"
import type { TypographyProps } from "@mui/material"
import Paper from "../Paper/Paper"
import SectionContainer from "../SectionContainer/SectionContainer"
import type { PlayerDetails } from "@/lib/lounge"

type Props = {
  player: PlayerDetails
}

type FieldProps = {
  label: string
  value?: string | number
  sx?: TypographyProps["sx"]
}

const Field = ({ label, value, sx }: FieldProps) => (
  <Grid item xs={12} md={3} sx={{ mb: 1 }}>
    <Stack>
      <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.8rem",
          color: (theme) =>
            theme.palette.mode === "dark" ? "lightGrey" : undefined,
          ...sx,
        }}
      >
        {value || "N/A"}
      </Typography>
    </Stack>
  </Grid>
)

function LoungeSection({ player }: Props) {
  // TODO: Add Field
  return (
    <SectionContainer>
      <Paper>
        <Typography variant="h5" sx={{ p: 3 }}>
          {`${player.name} - ${player.rank}`}
        </Typography>
        <Grid container sx={{ p: 3 }}>
          <Field label="Rank" value={player.overallRank} />
          <Field label="MMR" value={player.mmr} />
          <Field label="Peak MMR" value={player.maxMmr} />
          <Field
            label="Win Rate"
            value={
              player.winRate
                ? `${(player.winRate * 100).toFixed(1)}%`
                : undefined
            }
          />
          <Field label="Win - Loss(Last 10)" value={player.winLossLastTen} />
          <Field label="Gain/Loss (Last 10)" value={player.gainLossLastTen} />
          <Field label="Events Played" value={player.eventsPlayed} />
          <Field label="Largest Gain" value={player.largestGain} />
          <Field label="Largest Loss" value={player.largestLoss} />
          <Field
            label="Average Score"
            value={player.averageScore?.toFixed(1)}
          />
          <Field
            label="Average Score (Last 10)"
            value={player.averageLastTen?.toFixed(1)}
          />
          <Field
            label="Partner Average Score"
            value={player.partnerAverage?.toFixed(1)}
          />
        </Grid>
      </Paper>
    </SectionContainer>
  )
}

export default LoungeSection

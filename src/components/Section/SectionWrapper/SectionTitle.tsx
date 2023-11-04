import { Typography, Grid } from "@mui/material"

type Props = {
  title?: string
}

function SectionTitle({ title }: Props) {
  return title ? (
    <Grid item sx={{ marginY: "auto" }}>
      <Typography
        sx={{ fontWeight: "bold" }}
        fontSize={{ xs: "1.6rem", md: "2rem" }}
      >
        {title}
      </Typography>
    </Grid>
  ) : null
}

export default SectionTitle

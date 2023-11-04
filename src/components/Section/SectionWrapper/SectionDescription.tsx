import { Typography, Grid } from "@mui/material"

type Props = {
  description?: string
}

function SectionDescription({ description }: Props) {
  return description ? (
    <Grid item sx={{ marginY: "auto" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
        fontSize={{ xs: "1.1rem", md: "1.5rem" }}
      >
        {description}
      </Typography>
    </Grid>
  ) : null
}

export default SectionDescription

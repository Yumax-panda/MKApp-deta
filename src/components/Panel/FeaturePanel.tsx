import { Grid, Typography, Paper } from "@mui/material"

type Props = {
  title: string
  description: string
}

// TODO: 画像を追加する
function FeaturePanel({ title, description }: Props) {
  return (
    <Grid item xs={12} sm={6} lg={4} sx={{ p: 2 }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "20rem",
        }}
      >
        <Typography variant="h5" sx={{ margin: "auto" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ margin: "auto" }}>
          {description}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default FeaturePanel

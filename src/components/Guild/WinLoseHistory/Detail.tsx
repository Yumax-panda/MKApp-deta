import { Grid } from "@mui/material"

type Score = {
  score: number
  enemyScore: number
}

type Props = {
  history: Score[]
}

type FieldProps = {
  label: string
  value: number | string
}

const Field = ({ label, value }: FieldProps) => {
  return (
    <Grid item xs={3} sx={{ marginX: "auto", marginBottom: "0.5rem" }}>
      <Grid
        container
        columns={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{ fontWeight: "bold" }}
          fontSize={{
            xs: "1rem",
            md: "1.2rem",
          }}
          textAlign={{ md: "center" }}
        >
          {label}
        </Grid>
        <Grid item xs={6} textAlign={{ md: "center" }}>
          {value}
        </Grid>
      </Grid>
    </Grid>
  )
}

function Detail({ history }: Props) {
  const win = history.filter(
    (result) => result.score > result.enemyScore,
  ).length
  const lose = history.filter(
    (result) => result.score < result.enemyScore,
  ).length
  const draw = history.length - win - lose
  const winRate = (win / history.length) * 100

  return (
    <Grid
      container
      sx={{ p: 3, display: "flex", flexDirection: "row" }}
      columns={{
        xs: 3,
        md: 12,
      }}
    >
      <Field label="Win" value={win} />
      <Field label="Lose" value={lose} />
      <Field label="Draw" value={draw} />
      <Field label="Win Rate" value={`${winRate.toFixed(1)}%`} />
    </Grid>
  )
}

export default Detail

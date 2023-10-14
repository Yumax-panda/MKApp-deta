import { Grid } from "@mui/material"
import SectionDescription from "./SectionDescription"
import SectionTitle from "./SectionTitle"

type Props = {
  title?: string
  description?: string
  children: React.ReactNode
}

function SectionWrapper({ title, description, children }: Props) {
  return (
    <div>
      <Grid
        container
        sx={{
          borderBottom: "solid 1px #868E96",
          margin: "1rem",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
        columns={{ xs: 12 }}
      >
        <Grid
          item
          container
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
          spacing={2}
          xs={8}
        >
          <SectionTitle title={title} />
          <SectionDescription description={description} />
        </Grid>
      </Grid>
      {children}
    </div>
  )
}

export default SectionWrapper

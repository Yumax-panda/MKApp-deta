import { Typography, Grid, Container } from "@mui/material"
import FeatureSection from "@/components/Section/FeatureSection"
import Template from "@/components/Template/Template"

export default function Home() {
  return (
    <Template titile="Home">
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h5">このサイトについて</Typography>
        <FeatureSection />
      </Container>
    </Template>
  )
}

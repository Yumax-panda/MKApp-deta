import { Typography, Container } from "@mui/material"
import FeatureSection from "@/components/Section/Feature/FeatureSection"

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">このサイトについて</Typography>
      <FeatureSection />
    </Container>
  )
}
